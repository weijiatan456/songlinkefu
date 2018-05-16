<template>
<div v-if="isLoad">
  <p-head :head="showHead"></p-head>
  <div class="home" v-if="staff">
    <div class="title">
      对方当前浏览产品
    </div>
    <div class="curview" v-if="curview.product_id">
      <img :src="curview.image_default_id">
      <h1>{{curview.name}}</h1>
      <div class="msg">价格：￥{{curview.price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库存：{{curview.store}}</div>
      <div class="send">
        <el-button size="mini" class="copyBtn3" type="primary" plain :data-clipboard-text="curview.name+'\n价格：'+curview.price+'    库存：'+ curview.store">复制</el-button>
      </div>
    </div>
    <div class="title">
      基本信息
    </div>
    <div class="baseMsg" v-if="member.member_id">
      <el-row :gutter="4">
        <el-col :span="12">ID号：{{member.member_id}}</el-col>
        <el-col :span="12"><b>手机号：{{member.login_account}}</b></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">用户名：{{member.name}}</el-col>
      </el-row>
      <el-row :gutter="4">
        <el-col :span="14">注册时间：{{member.regtime}}</el-col>
        <el-col :span="10">等级：{{member.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">地址：{{member.area}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">性别：{{member.sex}}</el-col>
        <el-col :span="12">生日：{{member.birthdate}}</el-col>
      </el-row>
    </div>

    <div class="title">标签<small>（回车提交）</small></div>
    <div class="tagBox">
      <div v-if="dynamicTags.length">
        <el-tag :key="tag.label_name" v-for="tag in dynamicTags" :type="tag.disabled==='true' ? '' : 'info'">
          <span class="tagCell" @click="_activeTag($event)" :data-state="tag.disabled==='true' ? 'true' : 'false'" :data-id="tag.label_id">{{tag.label_name}}</span>
        </el-tag>
        <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="closeInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
      </div>
      <div class="noneData" v-else>暂无数据</div>
    </div>

    <div class="title">备注<small>（回车提交）</small></div>
    <div class="beizhuBox">
      <el-tag v-if="beizhu.length"
      :key="item.rec_id"
      v-for="item in beizhu"
      closable
      :disable-transitions="false"
      @close="beizhuClose(item.rec_id)">
      {{item.remarks}}
      </el-tag>
      <el-input
      class="input-new-tag"
      v-if="beizhuVisible"
      v-model="beizhuValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="beizhuInputConfirm"
      @blur="closeBeizhu">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="beizhuInput">添加备注</el-button>
    </div>
  </div>
  <div class="staffBox" v-else>
    <el-input v-model="staffInput" placeholder="请输入您的工号"></el-input>
    <el-button type="primary" @click="staffBind">提交绑定</el-button>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import PHead from 'components/header'
  import {getHome,addTag,cancleTag,addBeizhu,delBeizhu,staffAjax} from 'api/home'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        isLoad:false,
        showHead:true,
        curview:{},
        member:{},
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        beizhu: [],
        beizhuVisible: false,
        beizhuValue: '',
        staff:false,
        staffInput:''
      }
    },
    created() {
      this._getHome()
    },
    mounted: function () {
      this.$nextTick(function () {
          var clipboard3 = new this.ClipboardJS('.copyBtn3');
      });
    },
    methods: {
      _getHome() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getHome().then((res) => {
          if (res.status == ERR_OK) {
            this.isLoad = true,
            this.member = res.data.member || {},
            this.dynamicTags = res.data.kefu_label ||  {},
            this.beizhu = res.data.kefu_remarks || {},
            this.curview = res.data.product_visit || {},
            this.staff = res.data.staff === "0" ? false :true,
            this.showHead = res.data.staff === "0" ? false :true
          }
          loading.close()
        })
      },
      // 标签相关操作
      _activeTag(event){
        if(event.target.getAttribute('data-state') == 'true'){
          // 取消标签
          const tempId = event.target.getAttribute('data-id');
          cancleTag(tempId).then((res) => {
            if (res.success) {
              for(let i=0;i<this.dynamicTags.length;i++){
                if(this.dynamicTags[i].label_name == event.target.innerHTML){
                  this.dynamicTags[i].disabled = 'false';
                }
              };
              this.$message({
                message: '操作成功',
                type: 'success'
              });
            }
          })
        }else{
          // 激活标签
          const tempVal = event.target.innerHTML;
          addTag(tempVal).then((res) => {
            if (res.success) {
              for(var i=0;i<this.dynamicTags.length;i++){
                if(this.dynamicTags[i].label_name == tempVal){
                  this.dynamicTags[i].disabled = 'true'
                }
              };
              this.$message({
                message: '操作成功',
                type: 'success'
              });
            }
          })
        }
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          addTag(inputValue).then((res) => {
            if (res.success) {
              this.dynamicTags.push({'label_id':res.label_id,'label_name':inputValue,'disabled':'true'});
              this.inputVisible = false;
              this.inputValue = ''
            }
          })
        }
      },
      closeInputConfirm(){
        this.inputVisible = false;
        this.inputValue = ''
      },

      // 备注相关操作
      beizhuClose(item) {
        delBeizhu(item).then((res) => {
          if (res.success) {
            this.beizhu.splice(this.beizhu.indexOf(item), 1);
          };
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      },

      beizhuInput() {
        this.beizhuVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      beizhuInputConfirm() {
        let beizhuValue = this.beizhuValue;
        if (beizhuValue) {
          addBeizhu(beizhuValue).then((res) => {
            if (res.success) {
              this.beizhu.push({'remarks':beizhuValue,'rec_id':res.rec_id});
              this.beizhuVisible = false;
              this.beizhuValue = '';
            }
          })
        }
      },
      closeBeizhu(){
        this.beizhuVisible = false;
        this.beizhuValue = '';
      },
      staffBind(){
        staffAjax(this.staffInput).then((res) => {
          if(res.success){
            this.$message({
              message: res.success,
              type: 'success'
            });
            this.staff = true,
            this.showHead = true
          }else{
            this.$message.error(res.error);
            this.staff = false,
            this.showHead = false
          }
        })
      }
    },
    components: {
      PHead
    }
  }
</script>

<style scoped>
  .home{padding-top:5px;}
  .baseMsg{padding:5px 10px;}
  .title{background:#f2f2f2;color:#333;line-height:32px;padding:0 10px;margin-bottom:5px;}
  .el-row {
    margin-bottom:5px;
  }
  .el-col{
    min-height:18px;
  }
  .tagBox{padding:0 5px 10px;}
  .tagBox .el-tag{margin:0 5px 5px;padding:0;}
  .tagCell{cursor:pointer;display:block;padding:0 10px;}
  .button-new-tag {
    margin:0 5px 5px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin:0 5px 5px;
    vertical-align: bottom;
  }

  .beizhuBox{padding:0 10px;}
  .beizhuBox .el-tag{display:block;margin:0 0 5px;background:#fff;color:#333;border:1px solid #ccc;width:100%;position:relative;}
  .beizhuBox .button-new-tag{width:100%;margin:0;}
  .beizhuBox .input-new-tag{width:100%;margin:0;}
  .noneData{text-align:center;}
  
  /*当前浏览*/
  .curview{padding:10px 10px 15px 90px;height:74px;position:relative;}
  .curview img{width:72px;height:72px;border:1px solid #e0e0e0;position:absolute;top:10px;left:10px;}
  .curview .send{position:absolute;bottom:15px;right:10px;}
  
  /*未绑定工号，输入工号*/
  .staffBox{padding:20% 10% 0;}
  .staffBox .el-button{width:100%;margin-top:30px;}
</style>