// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMermaid from './src/plugins/remark-mermaid.mjs';

// GitHub Pages project site: https://<user>.github.io/<repo>/
const GITHUB_USER = 'harijoshi07';
const REPO = 'backend-engineering';

const mermaidScript = `
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs';
const render = async () => {
  const nodes = [...document.querySelectorAll('pre.mermaid')];
  if (!nodes.length) return;
  const dark = document.documentElement.dataset.theme === 'dark';
  const v = dark
    ? { darkMode: true, background: '#1b1512', primaryColor: '#3a2518', primaryBorderColor: '#f0a060', primaryTextColor: '#f5ede4', secondaryColor: '#2a211c', tertiaryColor: '#241c18', lineColor: '#a8968a', clusterBkg: '#211a16', clusterBorder: '#5a4334', noteBkgColor: '#3a2a1c', noteTextColor: '#f5ede4', actorBkg: '#3a2518', actorBorder: '#f0a060', actorTextColor: '#f5ede4', signalColor: '#e8d9cc', signalTextColor: '#f5ede4' }
    : { darkMode: false, background: '#fdfaf4', primaryColor: '#fbe6d9', primaryBorderColor: '#bf5130', primaryTextColor: '#2a1f18', secondaryColor: '#f5ecdf', tertiaryColor: '#faf3ea', lineColor: '#8a786b', clusterBkg: '#f8efe4', clusterBorder: '#dcc7b4', noteBkgColor: '#fff4d6', noteTextColor: '#2a1f18', actorBkg: '#fbe6d9', actorBorder: '#bf5130', actorTextColor: '#2a1f18', signalColor: '#3b2e25', signalTextColor: '#2a1f18' };
  mermaid.initialize({ startOnLoad: false, theme: 'base', themeVariables: { ...v, fontFamily: 'Inter Variable, system-ui, sans-serif', fontSize: '15px' } });
  for (const n of nodes) {
    if (n.dataset.src === undefined) n.dataset.src = n.textContent;
    else { n.removeAttribute('data-processed'); n.textContent = n.dataset.src; }
  }
  await mermaid.run({ nodes });
};
render();
new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
`;

export default defineConfig({
  site: `https://${GITHUB_USER}.github.io`,
  base: `/${REPO}`,
  markdown: { processor: unified({ remarkPlugins: [remarkMermaid] }) },
  integrations: [
    starlight({
      title: 'Backend from First Principles',
      description: 'A 100-session, Socratic backend engineering course in Kotlin + Spring Boot, built around a fintech wallet.',
      logo: { src: './src/assets/icon.svg', replacesTitle: false },
      favicon: '/favicon.svg',
      social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${GITHUB_USER}/${REPO}` }],
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/fraunces',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/custom.css',
      ],
      expressiveCode: {
        themes: ['vitesse-dark', 'rose-pine-dawn'],
        styleOverrides: {
          borderRadius: '0.6rem',
          codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
          codeBackground: 'var(--be-code-bg)',
          frames: { editorBackground: 'var(--be-code-bg)', terminalBackground: 'var(--be-code-bg)' },
        },
      },
      head: [
        // Apply the remembered sidebar state before first paint (no flash).
        {
          tag: 'script',
          content:
            "try{if(localStorage.getItem('be-sidebar')==='collapsed')document.documentElement.dataset.sidebar='collapsed'}catch(e){}",
        },
        { tag: 'script', attrs: { type: 'module' }, content: mermaidScript },
      ],
      // No right-hand sidebar: an inline "On this page" list sits under each title instead.
      tableOfContents: false,
      components: { PageTitle: './src/components/PageTitle.astro' },
      lastUpdated: true,
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'How this course works', slug: 'start/overview' },
            { label: 'Everything we will touch', slug: 'start/topics' },
            { label: 'The flagship: a digital wallet', slug: 'start/flagship' },
          ],
        },
        { label: 'Maths: build a duel game', items: [{ autogenerate: { directory: 'maths' } }] },
        { label: 'Roadmap (100 sessions)', slug: 'roadmap' },
        { label: 'My progress', slug: 'progress' },
        { label: 'Sessions', items: [{ autogenerate: { directory: 'sessions' } }] },
        {
          label: 'Resources',
          items: [
            { label: 'Reference library', slug: 'resources/references' },
            { label: 'Sriniously notes map', slug: 'resources/sriniously-map' },
          ],
        },
      ],
    }),
  ],
});
