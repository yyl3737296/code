<template>
  <div>
    <tables ref="tables" stripe border searchable :buttons="buttons" :columns="columns"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  mounted() {

  },
        data () {
            return {
              pageTotal: 0,
              pageNum: 1,
              pageSize: 10,
                loading: true,
                buttons: [{
                  name: '新增',
                  type: 'success',
                  icon: 'md-add'
                }],
                columns: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
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
          handlePage(value) {
            alert(value);
          },
          handlePageSize(value) {
            alert(value);
          },
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

<style>
.search-div {
  overflow: hidden;
  margin-bottom: 10px;
}
.new-btn {
  float: left;
}
.search {
  float: right;
}
.page {
  margin-top: 20px;
  margin-right: 10px;
  float: right;
}
</style>
