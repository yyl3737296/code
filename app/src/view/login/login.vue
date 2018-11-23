<template>
  <div>
    <div>
      <input type="text" placeholder="Input Text" class="input" :autofocus=true value=""/>
    </div>
    <div style="margin-top:1rem">
      <input type="text" placeholder="Input Text" class="input" value=""/>
    </div>
    <wxc-button></wxc-button>
  </div>
</template>
<script>
  import { WxcButton, WxcPopup, WxcSearchbar } from 'weex-ui'
  import { login } from '@/api/user'

  export default {
    components: { WxcButton, WxcPopup, WxcSearchbar },
    mounted() {
      login()
    }
  }
</script>
<style>
  .input {
    font-size: 60px;
    height: 80px;
    width: 100%;
  }
</style>