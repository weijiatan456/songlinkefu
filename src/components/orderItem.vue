<template>
<div>
  <div class="order_item">
    <img class="itemImg" :src="orderMsg.image_default_id">
    <h2>订单号：{{orderMsg.order_id}}</h2>
    <div class="state">订单状态：{{orderMsg.status}}</div>
    <div class="msg">共{{orderMsg.itemnum}}件&nbsp;&nbsp;&nbsp;&nbsp;合计：￥{{orderMsg.final_amount}}</div>
    <div class="arrow">
      <el-button size="mini" @click="_openDetail($event)" :data-id="orderMsg.order_id" plain>
        <span v-if="open">缩合<i class="el-icon-caret-top el-icon--right"></i></span>
        <span v-else>展开<i class="el-icon-caret-bottom el-icon--right"></i></span>
      </el-button>
      <el-button size="mini" type="primary" plain>发送</el-button>
    </div>
  </div>
  <el-collapse-transition>
    <div class="order_detail" v-show="open">
      <ul>
        <li v-for="(item,index) in detail.order_items">
          <div class="pd_number">{{index+1}}</div>
          <div class="pd_name">{{item.name}}</div>
          <div class="pd_msg">￥{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{item.nums}}</div>
          <div class="pd_sku">sku:{{item.bn}}</div>
        </li>
      </ul>
      <div class="order_msg">
        <div>下单时间：{{detail.pay_time}}</div>
        <div>收件人：{{detail.ship_name}}</div>
        <div>联系方式：{{detail.ship_mobile}}</div>
        <div>地址：{{detail.ship_addr}}</div>
        <div>订单留言：{{detail.memo}}</div>
      </div>
      <div class="wuliu">
        <h3>物流信息</h3>
        <el-steps :space="200" :active="parseInt(detail.progress)"  align-center>
          <el-step title="创建"></el-step>
          <el-step title="付款"></el-step>
          <el-step title="备货"></el-step>
          <el-step title="发货"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
    </div>
  </el-collapse-transition>
</div>
</template>

<script type="text/ecmascript-6">
import {getOrderDetail} from 'api/order'
import {ERR_OK} from 'api/config'
export default {
  data(){
    return {
      list:[],
      detail:'',
      active:1,
      open:false
    }
  },
  props: ['orderMsg'],
  methods:{
    _openDetail(event){
      this.open = !this.open;
      if(this.open){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getOrderDetail(event.currentTarget.getAttribute('data-id')).then((res) => {
          if (res.status == ERR_OK) {
            this.detail = res.success;
            loading.close();
          }
        })
      }
    }
  }
}
</script>
  
<style scoped>
.order_item{padding:15px 0 15px 80px;height:74px;position:relative;background:#f5f5f5;}
.itemImg{width:72px;height:72px;border:1px solid #e0e0e0;position:absolute;top:15px;left:0;}
h2{font-weight:bold;line-height:26px;}
.state{line-height:24px;}
.msg{line-height:22px;}
.col .send{position:absolute;bottom:0;right:0;}
.arrow{position:absolute;right:10px;top:36px;}
.order_detail{padding:10px 0 20px;border-top:1px solid #ccc;}
.order_detail li{height:54px;position:relative;padding:5px 0 5px 34px;}
.pd_number{position:absolute;top:50%;left:5px;border:1px solid #666;border-radius:50%;width:20px;height:20px;line-height:20px;text-align:center;margin-top:-11px;}
.pd_name,.pd_msg,.pd_sku{line-height:18px;}
.order_msg{border-top:1px dotted #999;padding:5px 10px;line-height:24px;margin-top:5px;}
.wuliu h3{text-align:center;line-height:30px;background:#f5f5f5;margin-bottom:20px;}
</style>