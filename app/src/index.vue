<template>
  <div>
    <wxc-button text="Open Popup"
                @wxcButtonClicked="buttonClicked">
    </wxc-button>
    
    <wxc-searchbar
         placeholder="搜索目的地"
         input-type="text"
         dep-name="杭州出发"></wxc-searchbar>

     <wxc-popup width="500"
           pos="left"
           :show="isShow"
           @wxcPopupOverlayClicked="overlayClicked">
    </wxc-popup>
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