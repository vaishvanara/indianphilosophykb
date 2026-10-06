import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { visit } from 'unist-util-visit';

function remarkRewriteMdLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (typeof node.url === 'string') {
        const url = node.url.trim();
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

        if (filename === 'indianphilosophykb.md') {
          node.url = `/${hashSuffix}`;
        } else if (filename.endsWith('.md')) {
          const slug = filename.replace(/\.md$/, '');
          node.url = `/terms/${slug}${hashSuffix}`;
        }
      }
    });
  };
}

export default defineConfig({
  site: 'https://vaishvanara.github.io',
  base: '/indianphilosophykb', // or repository name
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
    unified: {
      remarkPlugins: [remarkRewriteMdLinks],
    },
  },
});