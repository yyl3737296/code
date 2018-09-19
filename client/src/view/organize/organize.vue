<template>
  <div>
    <OrganizeAdd ref="add"></OrganizeAdd>
    <Tables ref="tables" stripe border searchable :url="url" :buttons="buttons" :columns="columns">
    </Tables>
  </div>
</template>

<script>
import Tables from '_c/tables'
import OrganizeAdd from './organizeAdd'
export default {
  components: {
    Tables,
    OrganizeAdd
  },
  mounted() {

  },
  data () {
    return {
      url: 'organize',
      buttons: [{
        name: '新增',
        type: 'success',
        icon: 'md-add',
        handle: () => {
          this.$refs.add.show();
        }
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
  }
}
</script>
