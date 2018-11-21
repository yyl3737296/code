<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { WxcButton, WxcPopup, WxcSearchbar } from 'weex-ui';
  module.exports = {
    components: { WxcButton, WxcPopup, WxcSearchbar },
    data: () => ({
      isShow: false
    }),
    methods: {
      buttonClicked () {
        this.isShow = true;
      },
      overlayClicked () {
        this.isShow = false;
      }
    }
  };
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
</style>