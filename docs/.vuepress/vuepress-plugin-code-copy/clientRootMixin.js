import Vue from 'vue';
import CodeCopy from './CodeCopy.vue';

export default {
  updated() {
    setTimeout(() => {
      document.querySelectorAll('div[class*="language-"] pre').forEach((el) => {
        if (el.classList.contains('code-copy-add')) {
          return;
        }
        const ComponentClass = Vue.extend(CodeCopy);
        const instacne = new ComponentClass();
        instacne.code = el.innerText;
        instacne.$mount();
        el.classList.add('code-copy-add');
        el.appendChild(instacne.$el);
      });
    }, 100);
  },
};
