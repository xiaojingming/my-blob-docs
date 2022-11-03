export default {
  mounted() {
    setTimeout(() => {
      document.querySelectorAll('div[class*="language-"] pre').forEach(el => {
        if (el.querySelector('.try-button')) {
          el.addEventListener('mouseover', () => {
            el.querySelector('.try-button').style.opacity = '1';
          })
          el.addEventListener('mouseout', () => {
            el.querySelector('.try-button').style.opacity = '0';
          })
        }
      })
    }, 100);
  },
};
