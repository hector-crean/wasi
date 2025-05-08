/**
 * This file provides mock implementations for WASI interfaces used by components.
 * These are used during build time to prevent errors, and the real implementations
 * are provided at runtime via the WASI runtime.
 */

// Mock for wasi:graphics-context/graphics-context
export class AbstractBuffer {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'AbstractBuffer';
  }
}

export class Context {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'Context';
  }
}

export const context = {
  // Add stub methods for any graphics context functions used by your components
  drawTriangle: () => console.log('Mock drawTriangle called'),
  clearCanvas: () => console.log('Mock clearCanvas called'),
  getCanvasWidth: () => 800,  // Default mock width
  getCanvasHeight: () => 600, // Default mock height
};

// Mock for wasi:surface/surface
export class Surface {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'Surface';
  }
}

// Mock for wasi:webgpu/webgpu
export class Gpu {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'Gpu';
  }
}

export class GpuAdapter {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuAdapter';
  }
}

export class GpuBindGroupLayout {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuBindGroupLayout';
  }
}

export class GpuCommandBuffer {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuCommandBuffer';
  }
}

export class GpuCommandEncoder {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuCommandEncoder';
  }
}

export class GpuDevice {
  queue() {
    return new GpuQueue();
  }
  
  connectGraphicsContext() {
    // Mock implementation
  }
  
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuDevice';
  }
}

export class GpuPipelineLayout {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuPipelineLayout';
  }
}

export class GpuQuerySet {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuQuerySet';
  }
}

export class GpuQueue {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuQueue';
  }
}

export class GpuRenderPassEncoder {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuRenderPassEncoder';
  }
}

export class GpuRenderPipeline {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuRenderPipeline';
  }
}

export class GpuShaderModule {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuShaderModule';
  }
}

export class GpuTexture {
  static fromGraphicsBuffer() {
    return new GpuTexture();
  }
  
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuTexture';
  }
}

export class GpuTextureView {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance === 'object' && instance.__type === 'GpuTextureView';
  }
}

export function RecordGpuPipelineConstantValue() {
  // Mock implementation
}

export function RecordOptionGpuSize64() {
  // Mock implementation
}

export function getGpu() {
  return new Gpu();
}

// Export any other mock WASI interfaces needed 