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
            title: 'JavaScript',
            path: '/handBook/JavaScript',
          },
          {
            title: 'ECMAScript',
            path: '/handBook/ES/Statement',
            collapsable: false,
            children: [
              {
                title: '声明方式',
                path: '/handBook/ES/Statement',
              },
              {
                title: '解构赋值',
                path: '/handBook/ES/Deconstruct',
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
