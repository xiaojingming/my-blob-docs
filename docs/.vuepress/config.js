module.exports = {
  base: '/my-blob/',
  title: '萧~个人博客😘😘😘😘😘😘😘😘😘😘',
  description: '萧~个人博客',
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
        title: '学习总结',
        path: '/handBook/Summary',
        collapsable: false,
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
  }
};
