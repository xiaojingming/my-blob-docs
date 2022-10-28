export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    try {
      console.log(_hmt, 'hmt-');
    } catch (error) {
      console.log('error', error)
    }
    if (typeof _hmt !== "undefined") {
      if (to.path) {
        _hmt.push(["_trackPageview", to.fullPath]);
      }
    }
    next();
  });
};
