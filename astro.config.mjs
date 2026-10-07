import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

const BASE = '/indianphilosophykb';

function remarkRewriteMdLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (typeof node.url !== 'string') {
        return;
      }

      const url = node.url.trim();

      // Leave external links, mail links, and anchors alone.
      if (
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('mailto:') ||
        url.startsWith('#')
      ) {
        return;
      }

      const [pathname, hash] = url.split('#');
      const hashSuffix = hash ? `#${hash}` : '';
      const filename = pathname.split('/').pop() || '';

      // Links back to the homepage.
      if (filename === 'indianphilosophykb.md') {
        node.url = hashSuffix
          ? `${BASE}/${hashSuffix}`
          : `${BASE}/`;
      }

      // Links from the KB Markdown to term pages.
      else if (filename.endsWith('.md')) {
        const slug = filename.replace(/\.md$/, '');

        // Deliberately relative so this works both locally
        // and when deployed under /indianphilosophykb/.
        node.url = `${BASE}/terms/${slug}${hashSuffix}`;
      }
    });
  };
}

export default defineConfig({
  site: 'https://vaishvanara.github.io',
  base: '/indianphilosophykb',

  devToolbar: {
    enabled: false,
  },

  server: {
    port: 4321,
    host: '0.0.0.0',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkRewriteMdLinks],
    }),
  },
});