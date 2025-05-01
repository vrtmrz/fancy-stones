SETLOCAL ENABLEDELAYEDEXPANSION
SET GOOS=js
SET GOARCH=wasm

go build -trimpath -ldflags="-s -w" -o dist\output.wasm main.go

REM Copy wasm_exec.js to the current directory
FOR /F "usebackq tokens=*" %%G IN (`go env GOROOT`) DO SET GOROOT=%%G
COPY "%GOROOT%\lib\wasm\wasm_exec.js" .\dist\wasm_exec.js

tinygo build -o dist\output_tiny.wasm main.go
tinygo build -no-debug -panic=trap  -o dist\output_tiny_mini.wasm main.go 

FOR /F "usebackq tokens=*" %%G IN (`tinygo env TINYGOROOT`) DO SET TINYGOROOT=%%G
COPY "%TINYGOROOT%\targets\wasm_exec.js" .\dist\tinygo_wasm_exec.js
