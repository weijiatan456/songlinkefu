<template>
<div>
  <div class="order_item">
    <img class="itemImg" :src="searchMsg.image_default_id">
    <h2>订单号：{{searchMsg.order_id}}</h2>
    <div class="state">订单状态：{{searchMsg.status}}</div>
    <div class="msg">共{{searchMsg.itemnum}}件&nbsp;&nbsp;&nbsp;&nbsp;合计：￥{{searchMsg.final_amount}}</div>
    <div class="arrow">
      <el-button size="mini" class="copyBtn" type="primary" plain :data-clipboard-text="'订单号:'+searchMsg.order_id+'\n订单状态：'+searchMsg.status+'\n共计：'+ searchMsg.itemnum+'件\n合计：￥'+ searchMsg.final_amount">复制</el-button>
    </div>
  </div>
  <div class="order_detail">
    <ul>
      <li v-for="(item,index) in searchMsg.order_items">
        <div class="pd_number">{{index+1}}</div>
        <div class="pd_name">{{item.name}}</div>
        <div class="pd_msg">￥{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;<span>数量：{{item.nums}}</span></div>
        <div class="pd_sku">sku:{{item.bn}}</div>
      </li>
    </ul>
    <div class="order_msg">
      <div>下单时间：{{searchMsg.pay_time}}</div>
      <div>收件人：{{searchMsg.ship_name}}</div>
      <div>联系方式：{{searchMsg.ship_mobile}}</div>
      <div>地址：{{searchMsg.ship_addr}}</div>
      <div>订单留言：{{searchMsg.memo}}</div>
    </div>
    <div class="wuliu">
      <h3>物流信息</h3>
      <el-steps :space="200" :active="parseInt(searchMsg.progress)"  align-center>
        <el-step title="创建"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="备货"></el-step>
        <el-step title="发货"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['searchMsg'],
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
.order_detail{padding:10px 0;border-top:1px solid #ccc;}
.order_detail li{height:54px;position:relative;padding:5px 0 5px 34px;}
.pd_number{position:absolute;top:50%;left:5px;border:1px solid #666;border-radius:50%;width:20px;height:20px;line-height:20px;text-align:center;margin-top:-11px;}
.pd_name,.pd_msg,.pd_sku{line-height:18px;}
.pd_msg span{color:#f00}
.order_msg{border-top:1px dotted #999;padding:5px 10px;line-height:24px;margin-top:5px;}
.wuliu h3{text-align:center;line-height:30px;background:#f5f5f5;margin-bottom:20px;}
</style>