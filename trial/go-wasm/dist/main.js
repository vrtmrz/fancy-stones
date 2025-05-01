
function execTest(instance){
    for (let i = 0; i < 10; i++) {
        const writeStr = `Hello from JavaScript iteration ${i + 1}!`;
        const encoded = new TextEncoder().encode(writeStr);
        const ptr = instance.env.malloc(encoded.length);
        const memory = instance.env.memory.buffer; // Updated to use instance.env
        const bytes = new Uint8Array(memory, ptr, encoded.length);
        bytes.set(encoded);
        instance.exports.logViaWasm(ptr, encoded.length);
        // go.instance.exports.logViaWasm("Hello from JavaScript!");
        instance.env.free(ptr); // Free the allocated memory
    }
}
