"use client"

import { ElementType, ComponentPropsWithoutRef } from 'react';
import { parser } from '@/pkg/markdown/wasi_markdown.component.js'
import { useWasiFunction } from '@/hooks';

type MarkdownProps<E extends ElementType = 'div'> = {
  as?: E;
  str: string;
  enableSyntaxHighlighting?: boolean;
  enableMath?: boolean;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'dangerouslySetInnerHTML'>;

const Markdown = <E extends ElementType = 'div'>({ 
  as,
  str, 
  enableSyntaxHighlighting = true, 
  enableMath = true,
  className,
  ...rest
}: MarkdownProps<E>) => {
  const Component = as || 'div';
  
  // Use the advanced configuration function
  const { result: parsed, isLoading, error } = useWasiFunction(
    parser.parseMarkdownWithConfig,
    str, enableSyntaxHighlighting, enableMath
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error parsing markdown: {error.message}</p>;
  }

  return (
    <Component 
      className={className}
      dangerouslySetInnerHTML={{ __html: parsed || '' }}
      {...rest}
    />
  );
}

export { Markdown };




