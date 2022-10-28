const tsRoute = require('./router/tsRoutes');
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
    [ 'link', { rel: 'icon', href: '/icon.png' } ],
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
  ],
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/Introduction/About',
      },
      {
        test: '萧~的个人博客',
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
            path: '/Others/nginxLocation',
            children: othersRoutes,
          },
        ],
      },
    ],
  },
  plugins: [
    ['@vuepress/last-updated'],
    [
      '@vuepress/register-components',
      {
        componentsDir: '/docs/.vuepress/components',
      },
    ],
  ],
};
