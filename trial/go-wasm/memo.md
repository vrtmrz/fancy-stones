## How to build Go WebAssembly (WASM)

- Go WebAssembly (WASM)\
  GOOS=js GOARCH=wasm go build -o output.wasm main.go

- Go WebAssembly (WASM) with TinyGo\
  GOOS=js GOARCH=wasm tinygo build -o output_tiny.wasm main.go

- Go WebAssembly (WASM) with TinyGo (Mini)\
  GOOS=js GOARCH=wasm tinygo build -no-debug -o output_tiny_mini.wasm main.go

See also `build.bat` for more details.

(Also automatic picking `wasm_exec.js` are included in the build.bat).
