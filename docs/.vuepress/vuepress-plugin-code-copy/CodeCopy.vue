<template>
  <span
    class="code-copy-btn"
    @click="handleClickToClipboard"
    @touchstart.prevent="handleClickToClipboard"
  >
    {{ buttonText }}
  </span>
</template>

<script>
export default {
  data () {
    return {
      buttonText: copyButtonText,
    };
  },
  methods: {
    handleClickToClipboard() {
      this.handleSetClipboard(this.code, this.handleSetText);
    },
    handleSetClipboard(code, cb) {
      if (window.navigator.clipboard) {
        navigator.clipboard.writeText(code).then(cb)
      }
    },
    handleSetText() {
      this.buttonText = copiedButtonText;
      setTimeout(() => {
        this.buttonText = copyButtonText;
      }, 1000);
    }
  },
};

</script>
<style scoped>
.code-copy-btn {
  position: absolute;
  bottom: 10px;
  right: 7.5px;
  opacity: 0.75;
  cursor: pointer;
  font-size: 14px;
}

.code-copy-btn:hover {
  opacity: 1;
}
</style>
