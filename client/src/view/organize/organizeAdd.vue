<template>
  <Modal v-model="modal"
         title="新增"
         :width="400"
         :loading="loading"
         @on-ok="asyncOK">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="top">
        <FormItem label="组织名称" prop="organize">
            <Input v-model="formInline.organize"></Input>
        </FormItem>
        <FormItem label="组织登录名" prop="user">
            <Input v-model="formInline.user"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formInline.password"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="password2">
            <Input type="password" v-model="formInline.password2"></Input>
        </FormItem>
        <FormItem label="描述">
            <Input></Input>
        </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { add } from '@/api/organize'
export default {
  name: 'OrganizeAdd',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重新输入密码'));
      } else if (value !== this.formInline.password) {
        callback(new Error('两次密码输入不一致!'));
      } else {
        callback();
      }
    };
    return {
      modal: false,
      loading: true,
      formInline: {
        user:'',
        organize: '',
        password:'',
        password2:''
      },
      ruleInline: {
        organize: [
          { required: true, message: '组织名称不能为空', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '组织登录不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
  },
  methods:{
    show() {
      this.$refs.formInline.resetFields();
      this.modal = true;
    },
    asyncOK() {
      this.$refs.formInline.validate((valid) => {
          if (valid) {
            add({
              'asdfasdf':'asdfasdf',
              'asdfasdfasdf':'asdfasdf'
            }).then(res => {
            if (res) {
              
            }
          }).catch(err => {
          })
          } else {
              this.loading = false;
              setTimeout(() => {
                  this.loading = true;
              });
          }
      });
    }
  }
}
</script>