<template>
  <el-row v-if="head">
    <el-col :span="8">
      <router-link tag="div" class="grid-content bg-purple-light" to="/home">
        <span class="tab-link">信息</span>
      </router-link>
    </el-col>
    <el-col :span="8">
      <router-link tag="div" class="grid-content bg-purple-light" to="/list">
        <span class="tab-link">关于商品</span>
      </router-link>
    </el-col>
    <el-col :span="8">
      <router-link tag="div" class="grid-content bg-purple-light" to="/order">
        <span class="tab-link">ta的订单</span>
      </router-link>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['head'],
}
</script>

<style scoped>
.el-row {
  margin-bottom:5px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.router-link-active {
  background: #409eff;
  color:#fff;
}
.grid-content {
  min-height: 36px;
  line-height:36px;
  text-align: center;
  cursor:pointer;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>