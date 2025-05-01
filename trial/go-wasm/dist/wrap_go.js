//@ts-check
function getImportObject(go) {
    return {
        console: {
            log: (ptr, size) => {
                const memory = go?.env?.memory?.buffer;
                if (!memory) {
                    console.error("Memory not found in go.env");
                    return;
                }
                const bytes = new Uint8Array(memory, ptr, size);
                const string = new TextDecoder("utf-8").decode(bytes);
                console.log(string);
            },
        },
    };
}

async function initTinyGo(source) {
    // @ts-ignore
    const go = new Go();
    go.importObject = { ...(go?.importObject ?? {}), ...getImportObject(go) };
    const { instance } = await WebAssembly.instantiateStreaming(
        source,
        go.importObject
    );
    go.env = go.env || {}; // Ensure go.env is defined
    go.env.memory = instance.exports.memory; // Update to use instance's memory
    go.env.free = instance.exports.free;
    go.env.malloc = instance.exports.malloc;
    go.run(instance);
    // @ts-ignore
    instance.env = go.env; // Set the env on the instance
    return { instance, go };
}
async function initGo(source) {
    // @ts-ignore
    const go = new Go();
    go.importObject = { ...(go?.importObject ?? {}), ...getImportObject(go) };
    const { instance } = await WebAssembly.instantiateStreaming(
        source,
        go.importObject
    );
    go.env = go.env || {}; // Ensure go.env is defined
    go.env.free = instance.exports.xfree;
    go.env.malloc = instance.exports.alloc;
    go.env.memory = instance.exports.mem;
    go.run(instance);
    // @ts-ignore
    instance.env = go.env; // Set the env on the instance

    return { instance, go };
}
