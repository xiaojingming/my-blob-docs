const tsRoute = require('./router/tsRoutes');
// const testRoutes = require('./router/testRoutes');
const othersRoutes = require('./router/othersRoutes');

module.exports = {
  description: '萧~个人学习总结',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  head: [
    [ 'link', { rel: 'icon', href: '/icon.png' }, ],
    [ 'script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?453068cd0bccee05b7686aa463d0bc60";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>
    `],
    // [ 'script', { src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js' },  ],
    // [ 'script', {}, ` var vConsole = new window.VConsole();` ]
  ],
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/Introduction/About',
      },
      {
        text: '萧~的个人博客',
        items: [
          {
            text: 'Github',
            link: 'https://github.com/xiaojingming'
          ,},
        ],
      },
    ],
    subSidebar: 'auto',
    sidebar: [
      {
        title: '欢迎',
        children: [
          {
            title: '关于',
            path: '/Introduction/About',
          },
          {
            title: '勘误',
            path: '/Introduction/Error'
          },
        ],
      },
      {
        title: '学习总结',
        children: [
          {
            title: 'TypeScript类型体操',
            path: '/TypeScript/IsNever',
            children: tsRoute
          },
          {
            title: '其它',
            path: '/Others/NginxLocation',
            children: othersRoutes,
          },
          // {
          //   title: '测试',
          //   path: '/Test/Test1',
          //   children: testRoutes,
          // },
        ],
      },
    ],
  },
  markdown: {
    extendMarkdown: (md) => {
      md.use((md) => {
        const { fence } = md.renderer.rules
        md.renderer.rules.fence = function f(...args) {
          let rawCode = fence.apply(this, args);
          rawCode = rawCode.replace(/\/\/ try-link: (https:\/\/(.*))/img, '<a href="$1" class="try-button" target="_blank">Try</a>');
          return `${rawCode}`;
        }
      });
    },
  },
  plugins: [
    ['@vuepress/last-updated'],
    [
      '@vuepress/register-components',
      { componentsDir: '/docs/.vuepress/components' },
    ],
    [
      require('./vuepress-plugin-code-copy/index'),
      {
        copyButtonText: '复制',
        copiedButtonText: '已复制！',
      },
    ],
    [ require('./vuepress-plugin-code-try/index') ],
  ],
};
