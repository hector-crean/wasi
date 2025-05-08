"use client"

import { ElementType, ComponentPropsWithoutRef } from 'react';
import { run } from '@/pkg/basic_triangle/wasi_basic_triangle.component.js'
import { useWasiFunction } from '@/hooks';




const Triangle = () => {
  
  // Use the advanced configuration function
  const { result, isLoading, error } = useWasiFunction(
    run.run,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }



  if (error) {
    return <p>Error running triangle: {error.message}</p>;
  }

  return (
    <canvas id="triangle-canvas" width="800" height="600"></canvas>
  );
}


export { Triangle };


