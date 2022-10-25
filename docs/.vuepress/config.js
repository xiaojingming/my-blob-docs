module.exports = {
  base: '/my-blob/',
  title: '😘学习总结',
  description: '萧~学习总结',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        test: '萧~的个人博客',
        items: [
          {
            text: 'Github',
            link: 'https://github.com/xiaojingming'
          }
        ]
      }
    ],
    subSidebar: 'auto',
    sidebar: [
      {
        title: '欢迎',
        children: [
          {
            title: '关于',
            path: '/introduction/About',
          },
          {
            title: '勘误',
            path: '/introduction/Error'
          }
        ]
      },
      {
        title: '学习总结',
        children: [
          {
            title: 'TypeScript类型体操',
            path: '/TypeScript/IsNever',
            children: [
              {
                title: 'IsNever',
                path: '/TypeScript/IsNever'
              },
              {
                title: 'IsUnion',
                path: '/TypeScript/IsUnion'
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    ['@vuepress/last-updated'],
    [
      '@vuepress/register-components',
      {
         componentsDir: '/docs/.vuepress/components'
      }
    ]
  ]
};
