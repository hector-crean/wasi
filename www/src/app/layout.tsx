import './styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>WASI Markdown Demo</title>
        {/* Add MathJax for rendering math formulas */}
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">WASI Markdown Parser Demo</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
