// Turns ```mermaid fences into <pre class="mermaid"> so the client-side
// script in astro.config.mjs can render them (theme-aware). Works for .md and .mdx.
export default function remarkMermaid() {
  return (tree, file) => {
    const isMdx = String(file.path ?? file.history?.[0] ?? '').endsWith('.mdx');
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'code' && child.lang === 'mermaid') {
          if (isMdx) {
            return {
              type: 'mdxJsxFlowElement',
              name: 'pre',
              attributes: [{ type: 'mdxJsxAttribute', name: 'class', value: 'mermaid' }],
              children: [{ type: 'text', value: child.value }],
            };
          }
          const escaped = child.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return { type: 'html', value: `<pre class="mermaid">${escaped}</pre>` };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
