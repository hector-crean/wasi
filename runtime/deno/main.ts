import { parser } from './lib/markdown/wasi_markdown.component.js'

const md = `
# Advanced Markdown Parser Test

## Formatting

This paragraph demonstrates **bold text**, *italic text*, ~~strikethrough~~, and \`inline code\`.

## Lists

### Unordered List
* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
* Item 3

### Ordered List
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

## Task Lists
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task with **formatted** text

## Code Blocks

Inline code: \`const x = 42;\`

JavaScript with syntax highlighting:
\`\`\`javascript
// This is a comment
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
\`\`\`

Rust with syntax highlighting:
\`\`\`rust
fn main() {
    // This is a comment
    let fibonacci = |n| {
        match n {
            0 => 0,
            1 => 1,
            _ => fibonacci(n - 1) + fibonacci(n - 2),
        }
    };
    
    println!("Fibonacci(10) = {}", fibonacci(10));
}
\`\`\`

## Tables

| Feature | Supported | Notes |
|---------|:---------:|-------|
| Tables | ✅ | With alignment |
| Lists | ✅ | Nested too |
| Code blocks | ✅ | With syntax highlighting |
| Math | ✅ | Using KaTeX or MathJax |

## Blockquotes

> This is a blockquote
> 
> It can span multiple lines
>
> > And can be nested

## Math Formulas

Inline math: $E = mc^2$

Block math:

$$
\\frac{d}{dx}\\left( \\int_{0}^{x} f(u)\\,du\\right)=f(x)
$$

## Footnotes

Here's a sentence with a footnote.[^1]

[^1]: This is the footnote content.

## Links and Images

[Link to GitHub](https://github.com)

![Example Image](https://via.placeholder.com/150)

## HTML Embedding

<div style="padding: 20px; background-color: #f0f0f0; border-radius: 5px;">
  <h3>HTML content</h3>
  <p>This is <em>embedded HTML</em> within markdown.</p>
</div>

---

*That's all for now!*
`;


const output = parser.parseMarkdown(md);

console.log(output);
