<template>
<div v-if="isLoad">
  <p-head :head="showHead"></p-head>
  <div class="list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="最近浏览" name="first">
        <div v-if="liulan.length">
          <div class="liulan"  v-for="(item,key,index) in liulan[0]">
            <el-collapse v-model="activeNames">
              <el-collapse-item :title="key" :name="index">
                <div class="item_box" v-for="child in item">
                  <img :src="child.image_default_id">
                  <h1>{{child.name}}</h1>
                  <div class="msg">价格：￥{{child.price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库存：{{child.store}}</div>
                  <div class="sku">sku：{{child.bn}}</div>
                  <div class="send">
                    <el-button type="primary"  size="mini" plain>发送</el-button>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="noneData" v-else>暂无数据</div>
      </el-tab-pane>
      <el-tab-pane label="ta的购物车" name="second">
        <div v-if="cart.length">
          <div class="cartBox" v-for="item in cart">
              <img :src="item.image_default_id">
              <h1>{{item.name}}</h1>
              <div class="msg">价格：￥{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数量：{{item.quantity}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库存：{{item.store}}</div>
              <div class="sku">sku：{{item.bn}}</div>
              <div class="send">
                <el-button type="primary"  size="mini" plain>发送</el-button>
              </div>
          </div>
        </div>
        <div class="noneData" v-else>暂无数据</div>
      </el-tab-pane>
      <el-tab-pane label="搜索商品" name="third">
        <el-input size="medium" placeholder="请输入商品名称" v-model="input4" class="input-with-select" @keyup.enter.native="_getSearchPd">
          <el-button slot="append" icon="el-icon-search" @click="_getSearchPd"></el-button>
        </el-input>
        <div class="searchBox" v-if="search.length">
          <div class="cartBox" v-for="item in search">
              <img :src="item.image_default_id">
              <h1>{{item.name}}</h1>
              <div class="msg">价格：￥{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>库存：{{item.store}}</span>（冻结{{item.freez}}）</div>
              <div class="sku">sku：{{item.bn}}</div>
              <div class="send">
                <el-button type="primary"  size="mini" plain>发送</el-button>
              </div>
          </div>
        </div>
        <div class="noneData" v-else>暂无数据</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import PHead from 'components/header'
  import {getList,getSearchResult} from 'api/list'
  import {ERR_OK} from 'api/config'
  export default{
    data(){
      return {
        showHead:true,
        activeName: 'first',
        activeNames: [0],
        isLoad:false,
        liulan:[],
        cart:[],
        input4: '',
        search:[]
      }
    },
    created(){
      this._getList();
    },
    components: {
      PHead
    },
    methods:{
      _getList(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getList().then((res) => {
          if (res.status == ERR_OK) {
            this.isLoad = true,
            this.liulan = res.success.liulan,
            this.cart = res.success.cart
          };
          loading.close()
        })
      },
      _getSearchPd(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getSearchResult(this.input4).then((res) => {
          if (res.status == ERR_OK) {
            this.search = res.success
          }
          loading.close();
        })
      }
    }
  }
</script>
<style scoped>
.list{padding:0 5px;}
.item_box{border-top:1px solid #eee;margin-top:15px;padding:15px 0 0 80px;height:74px;position:relative;}
.item_box:first-child{border:0;margin-top:5px;}
.item_box img{width:72px;height:72px;border:1px solid #e0e0e0;position:absolute;top:15px;left:0;}
.item_box .send{position:absolute;bottom:0;right:0;}
h1{line-height:26px;color:#333;}
.msg{line-height:24px;}
.msg span{color:#f00;}
.sku{font-weight:bold;line-height:22px;}
.cartBox{border-bottom:1px solid #eee;margin-bottom:15px;padding:0 0 15px 80px;height:74px;position:relative;}
.cartBox:last-child{border:0;}
.cartBox img{width:72px;height:72px;border:1px solid #e0e0e0;position:absolute;top:0;left:0;}
.cartBox .send{position:absolute;bottom:15px;right:0;}
.noneData{text-align:center;margin-top:20px;}
.searchBox{padding-top:15px;}
</style>