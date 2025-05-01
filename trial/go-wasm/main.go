package main

import (
	// "sync"
	"unsafe"
)

//go:wasmimport console log
func consoleLog(ptr unsafe.Pointer, len int32)

var exitCh = make(chan struct{})

func main() {
	msg := "Hello, 世界!"
	ptr := unsafe.Pointer(unsafe.StringData(msg))
	len := int32(len(msg))
	consoleLog(ptr, len)

	<-exitCh
}

//go:wasmexport add
func add(a, b uint32) uint32 {
	return a + b
}

//go:wasmexport logViaWasm
func LogViaWasm(msg string) {
	result := msg + " from Go!"
	ptr := unsafe.Pointer(unsafe.StringData(result))
	len := int32(len(result))
	consoleLog(ptr, len)
}

//go:wasmexport exit
func Exit() {
	close(exitCh)
}

const SIZE = 1024 * 1024 * 10 // 10 MB
var (
	arena = make([]byte, SIZE)
	// mu    sync.Mutex
	head = 0
	tail = 0
)

// alloc allocates a block of memory of the given size and returns a pointer to it.
// Only used from GO/WASM, TINYGO exports its own malloc function.
//
//go:wasmexport alloc
func Alloc(size int32) unsafe.Pointer {
	if size <= 0 {
		return nil
	}

	ptr := unsafe.Pointer(&arena[head])
	head += int(size)
	head = head % SIZE
	return ptr
}

// xfree is a stub of free a block of memory pointed to by the given pointer. No-op in this case.
// This is a no-op because we are using a ring buffer for memory allocation.
// If we got run out of memory, simply means something got wrong.
// Only used from GO/WASM, TINYGO exports its own free function.
//
//go:wasmexport xfree
func Free(ptr unsafe.Pointer) {
	if ptr == nil {
		return
	}

	// mu.Lock()
	// defer mu.Unlock()
	// NO-OP. ring buffer.
}
