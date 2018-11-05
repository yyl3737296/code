<template>
  <div>
    <OrganizeAdd ref="add" @refreshTable="refreshTable"></OrganizeAdd>
    <Tables ref="tables" stripe border searchable :url="url" :buttons="buttons" :columns="columns">
    </Tables>
    <Modal
        v-model="deleteModal"
        title="提示"
        @on-cancel="cancel"
        @on-ok="ok">
        <p>是否确定删除这条数据</p>
    </Modal>
  </div>
</template>

<script>
import { del } from '@/api/data';
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
      deleteId: null,
      deleteModal: false,
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
                h('Icon', {
                    props: {
                        type: 'ios-trash',
                        size: 24,
                        color: '#ed4014'
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        click: () => {
                          this.deleteModal = true;
                          this.deleteId = params.row.id;
                        }
                    }
                })
            ]);
        }
      }
      ]
    }
  },
  methods: {
      ok () {
        del('organize/'+this.deleteId).then(res => {
          if (res) {
            this.deleteId = null;
            this.refreshTable();
            this.$Message.success('删除成功');
          }
        })
      },
      cancel () {
        this.deleteId = null;
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      refreshTable () {
        this.$refs.tables.refresh();
      }
  }
}
</script>
