export default {
  watch: {
    currentPage() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
