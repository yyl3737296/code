<template>
  <div>
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <tables ref="tables" stripe border searchable :url="url" :buttons="buttons" :columns="columns">
    </tables>
  </div>
</template>

<script>
import Tables from '_c/tables'
import AddModal from './authorizationAdd'
export default {
  components: {
    Tables,
    AddModal
  },
  mounted() {

  },
  data () {
    return {
      modal1: false,
      url: 'authorization',
      buttons: [{
        name: '新增',
        type: 'success',
        icon: 'md-add',
        handle: () => {
          this.modal1 = true;
        }
      },{
        name: '新增',
        type: 'success',
        icon: 'md-add'
      }],
      columns: [{
        type: 'index',
        width: 60,
        title: ' ',
        key: 'action',
        align: 'center'
      }, {
        title: 'Name',
        key: 'name'
      }, {
        title: 'Age',
        key: 'username'
      }, {
        title: 'Address',
        key: 'tel'
      },
          {
              title: ' ',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              click: () => {
                                  this.show(params.index)
                              }
                          }
                      }, 'View'),
                      h('Button', {
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.remove(params.index)
                              }
                          }
                      }, 'Delete')
                  ]);
              }
          }
      ]
    }
  },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        },
    }
</script>
