```mermaid
graph TB
%% Define main containers
subgraph "Host Environment (Browser)"
JS[JavaScript Runtime]
DOM[DOM/Canvas/WebGL]
WASI[WASI Runtime]

        %% Host-provided functions
        subgraph "Host-Provided Functions"
            H1["Graphics Context API"]
            H2["WebGPU API"]
            H3["File System API"]
            H4["Network API"]
        end
    end

    subgraph "Guest (Rust WebAssembly Component)"
        WIT["WIT Interface Definitions"]

        subgraph "Guest Implementation"
            G1["Rust Application Logic"]
            G2["Custom Algorithms"]
        end

        subgraph "Guest-Exported Functions"
            E1["parse_markdown()"]
            E2["render_triangle()"]
            E3["process_data()"]
        end
    end

    %% Define relationships and data flow
    JS -- "1. Instantiates" --> WASI
    WASI -- "2. Loads" --> WIT

    %% Host → Guest function calls
    H1 -. "3. Imported by Guest\n(via WIT definition)" .-> G1
    H2 -. "Imported by Guest" .-> G1
    H3 -. "Imported by Guest" .-> G1
    H4 -. "Imported by Guest" .-> G1

    %% Guest implementation calls host functions
    G1 -- "4. Calls imported\nhost functions" --> H1
    G1 -- "Calls" --> H2
    G2 -- "Calls" --> H1

    %% Guest → Host function calls (exports)
    G1 -- "5. Implements" --> E1
    G1 -- "Implements" --> E2
    G2 -- "Implements" --> E3

    %% Host calls guest exports
    JS -- "6. Calls exported\nguest functions" --> E1
    JS -- "Calls" --> E2
    JS -- "Calls" --> E3

    %% Host implementation details
    H1 -- "Implemented by" --> DOM
    H2 -- "Implemented by" --> DOM

    %% Add descriptions
    classDef hostFn fill:#f9f,stroke:#333,stroke-width:1px
    classDef guestFn fill:#bbf,stroke:#333,stroke-width:1px
    classDef container fill:#efefef,stroke:#999,stroke-width:1px

    class H1,H2,H3,H4 hostFn
    class E1,E2,E3 guestFn
    class JS,DOM,WASI,WIT,G1,G2 container

```

Definition in WIT:

```wit
   world graphics-app {
     import wasi:graphics-context/graphics-context;
   }
```

Host Implementation (JavaScript):

```js
// Browser provides implementation
const graphicsContext = {
  drawTriangle: (x1, y1, x2, y2, x3, y3) => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
  },
};

// Pass implementation to component
const instance = await WasiComponent.instantiate(wasmModule, {
  "wasi:graphics-context/graphics-context": graphicsContext,
});
```

Guest Usage (Rust):

```rust
      // Generated bindings from wit-bindgen
   use wasi::graphics_context::graphics_context;

   pub fn draw_shape() {
     // Call host-provided function
     graphics_context::draw_triangle(0.0, 0.0, 1.0, 0.0, 0.5, 1.0);
   }
```

Host Usage (JavaScript):

```js
// Instantiate the component
const instance = await WasiComponent.instantiate(wasmModule);

// Call Rust-implemented function from JavaScript
const htmlOutput = instance.exports.parseMarkdown("# Hello World");
document.getElementById("content").innerHTML = htmlOutput;
```
