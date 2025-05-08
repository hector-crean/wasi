build-markdown:
	cargo build -p wasi-markdown --target wasm32-unknown-unknown --release
	wasm-tools component new target/wasm32-unknown-unknown/release/wasi_markdown.wasm -o www/src/pkg/markdown/wasi_markdown.component.wasm
	jco transpile www/src/pkg/markdown/wasi_markdown.component.wasm --out-dir www/src/pkg/markdown

build-basic-triangle:
	cargo build -p wasi-basic-triangle --target wasm32-unknown-unknown --release
	wasm-tools component new target/wasm32-unknown-unknown/release/wasi_basic_triangle.wasm -o www/src/pkg/basic_triangle/wasi_basic_triangle.component.wasm
	jco transpile www/src/pkg/basic_triangle/wasi_basic_triangle.component.wasm --out-dir www/src/pkg/basic_triangle
