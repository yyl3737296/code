<template>
  <Modal v-model="modal"
         title="新增"
         :loading="loading"
         @on-ok="asyncOK">
    <Form label-position="right" :label-width="90">
        <FormItem label="组织名称">
            <Input></Input>
        </FormItem>
        <FormItem label="用户名">
            <Input></Input>
        </FormItem>
        <FormItem label="描述">
            <Input></Input>
        </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'OrganizeAdd',
  data() {
    return {
      modal: false,
      loading: true
    }
  },
  props: {
  },
  methods:{
    show() {
      this.modal = true;
    },
    asyncOK() {
      this.loading = false;
      setTimeout(() => {
          this.loading = true;
      });
    }
  }
}
</script>