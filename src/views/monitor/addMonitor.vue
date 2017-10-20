<template>
  <div class="add-monitor">
    <!--header-->
    <mu-appbar title='添加监控点' class='header'>
      <router-link to='/monitor' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
    </mu-appbar>
    <div class="page-part">
      <el-select placeholder="请选择产品">
        <el-option>
        </el-option>
      </el-select>
      <br/>
      <el-select placeholder="请选择设备">
        <el-option>
        </el-option>
      </el-select>
      <br/>
      <el-select placeholder="请选择监控字段">
        <el-option>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created() {

    },
    methods: {
      addDevice() {
        this.$store.dispatch('addDevice', this.deviceinfo).then(() => {
          console.log('添加设备成功！');
          this.$router.push({path: '/devices'});
        }).catch(err => {
          console.log('添加设备失败!');
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .add-monitor {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: #fff;
  }

  .select {
    text-align: left;
  }

  .page-part {
    padding-top: 60px;
  }
</style>
