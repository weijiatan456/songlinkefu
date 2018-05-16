<template>
<div v-if="isLoad">
  <p-head :head="showHead"></p-head>
  <div class="order">
    <el-input size="medium" placeholder="请输入订单号" v-model="input5" class="input-with-select"  @keyup.enter.native="_searchOrder">
      <el-button slot="append" icon="el-icon-search" @click="_searchOrder"></el-button>
    </el-input>
    <div v-if="search">
      <div class="order_box">
        <div class="col" v-for="item in order">
          <order-item :order-msg="item"></order-item>
        </div>
      </div>
      <div class="page-footer">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="page">
        </el-pagination>
      </div>
    </div>
    <div class="searchBox" v-else>
        <search-order :search-msg="searchList"></search-order>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import PHead from 'components/header'
  import {getOrder,getSearchOrder} from 'api/order'
  import {ERR_OK} from 'api/config'
  import orderItem from 'components/orderItem'
  import searchOrder from 'components/searchOrder'
  export default{
    data(){
      return {
        showHead:true,
        isLoad:false,
        input5: '',
        order:[],
        search:true,
        searchList:'',
        page:''
      }
    },
    created(){
      this._getOrder();
    },
    components: {
      PHead,
      orderItem,
      searchOrder
    },
    mounted: function () {
      this.$nextTick(function () {
          var clipboard = new this.ClipboardJS('.copyBtn')
      });
    },
    methods:{
      _getOrder(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getOrder().then((res) => {
          if (res.status == ERR_OK) {
            this.isLoad = true,
            this.order = res.success,
            this.page = res.count
          }
          loading.close();
        })
      },
      handleCurrentChange(val) {
        getOrder(val).then((res) => {
          if (res.status == ERR_OK) {
            this.order = res.success
          }
        })
      },
      _searchOrder(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getSearchOrder(this.input5).then((res) => {
          if (res.status == ERR_OK) {
            this.search = false;
            this.searchList = res.success
          }else{
            this.$message.error('无此订单号');
          }
          loading.close();
        })
      }
    }
  }
</script>
<style scoped>
.order{padding:5px 5px 0;}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.order_box,.searchBox{margin-top:10px;}
.col{border-top:1px solid #ccc;}
.col:first-child{border:0;margin-top:0;}
.page-footer{text-align:center;padding:20px 0;}
</style>