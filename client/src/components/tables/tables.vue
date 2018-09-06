<template>
  <div class="tabls-div">
    <div v-if="loading" class="page-shade"></div>
    <div class="tables-header">
      <div class="tables-button">
        <Button v-for="(item, index) in buttons" :key="`tables-button-${index}`" :type="item.type" :icon="item.icon||''" @click="onButtonClick(item);">{{item.name}}</Button>
      </div>

      <div v-if="searchable && isShowSearchInput" class="tables-search search-con">
        <Select v-model="searchKey" class="search-col">
          <Option v-for="item in columns" v-if="item.key !== 'action'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
        </Select>
        <Input v-model="searchValue" clearable @on-enter="onSearchEnter()" placeholder="请输入关键字" style="width: 180px;">
          <Icon type="ios-search" slot="suffix"/>
        </Input>
      </div>
    </div>
    <Table
      ref="tablesMain"
      :loading="loading"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div class="table-page" v-if="insideTableData.length > 0">
      <Page @on-change="onPageNumChange" @on-page-size-change="onPageSizeChange" :current="pageNum" :total="pageTotal" :page-size="pageSize" show-total show-elevator show-sizer />
    </div>
    <!--<Spin size="large" fix v-if="loading"></Spin>-->
  </div>
</template>

<script>
import './index.less'
import axios from '@/libs/api.request'
export default {
  name: 'Tables',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    buttons: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    url: String,
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      isShowSearchInput: false,
      searchValue: '',
      searchKey: '',
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
      loading: false,
      currentPageNum: 1
    }
  },
  methods: {
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        // if (res.key === 'handle') res = this.surportHandle(res)
        if (res.type === 'index') {
          res.indexMethod = (row) => {
            return row._index + (this.currentPageNum - 1) * this.pageSize + 1
          }
        }
        return res
      })
    },
    setDefaultSearchKey () {
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].key !== 'action') {
          this.searchKey = this.columns[i].key
          break
        }
      }
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    },
    onPageNumChange (value) {
      this.pageNum = value
      this.ajaxData()
    },
    onPageSizeChange (value) {
      this.pageSize = value
      this.ajaxData()
    },
    onSearchEnter () {
      this.pageNum = 1
      this.currentPageNum = 1
      this.ajaxData()
    },
    onButtonClick (item) {
      if (item.handle) {
        item.handle()
      }
    },
    /* 用于判断是否显示search框，当设置searchable：true的时候，如果当前没有数据（未搜索前）及异常的情况不显示搜索框 */
    showSearchInput () {
      if (this.searchable) {
        if (this.insideTableData.length === 0 && this.searchValue === '') {
          this.isShowSearchInput = false
        } else {
          this.isShowSearchInput = true
        }
      }
    },
    ajaxData () {
      this.loading = true

      let params = {
        page: this.pageNum,
        size: this.pageSize
      }

      if (this.searchable) {
        params.key = this.searchKey
        params.value = this.searchValue
      }

      axios.request({
        url: this.url,
        params: params,
        method: 'get'
      }).then(res => {
        this.loading = false
        if (res) {
          this.insideTableData = res.data
          this.pageTotal = res.total
          this.currentPageNum = this.pageNum
        } else {
          this.insideTableData = []
        }
        this.showSearchInput()
      }).catch(err => {
        if (err) {
          this.loading = false
          this.insideTableData = []
        }
      })
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.ajaxData()
    if (this.searchable) {
      this.setDefaultSearchKey()
    }
  }
}
</script>
