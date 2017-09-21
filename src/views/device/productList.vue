<template>
  <div class="product-list">
    <!--header-->
    <mu-appbar title='产品列表' class='header'>
      <router-link to='/devices' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
      <mu-icon-button icon="add" slot="right" ref='button' @click='openAddDialog'/>
    </mu-appbar>
    <div class="page-part">
      <mu-list>
        <mu-list-item v-for='(item,index) in productList' :key='item.productKey' :title='item.productName'
                      :describeText="item.productDesc" :open='false' class='group' toggleNested>
          <mu-icon-menu slot="leftAvatar" icon="settings_system_daydream" tooltip="操作">
            <mu-menu-item title="修改" @click='openEditDialog(item)'/>
            <mu-menu-item title="删除" @click='openDelDialog(item)'/>
            <mu-menu-item title='添加设备' @click='setindex(index)'/>
          </mu-icon-menu>
          <mu-list-item v-for='(sub,deviceIndex) in item.deviceList' :key='sub.deviceId' :title='sub.deviceAlias'
                        :describeText="sub.deviceName" slot='nested'>
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <!--添加移动分组列表选项-->
              <mu-menu-item v-if='!sub.isSelled' title="移动分组" @click='openAllocGroup(sub.deviceId,index)'/>
              <!--这边需要注意，只能传递一个参数-->
              <mu-menu-item title="删除机器" @click='openDelDeviceDialog(index,deviceIndex)'/>
            </mu-icon-menu>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-dialog :open='addDialog' title='添加产品' @close='closeDialog'>
      <mu-text-field hintText='请输入产品名称' v-model='product.productName'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addProduct' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='editDialog' title='修改产品信息' @close='closeDialog'>
      <mu-text-field label='产品名称' v-model='product.productName'></mu-text-field>
      <mu-text-field label='描述' multiLine :rows="3" :rowsMax="6" v-model='product.productDesc'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='updateProduct' primary label='保存'/>
    </mu-dialog>
    <mu-dialog :open='delProduct' title='删除产品' @close='closeDialog'>
      <p>确定删除产品: {{product.productName}} ?</p>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='deleteProduct' primary label='删除'/>
    </mu-dialog>
    <mu-dialog :open='addGroup' title='分配至设备组' @close='closeDialog'>
      <mu-select-field class='select' v-model="updateGroup.deviceGroupId" label="请选择设备组">
        <mu-menu-item v-for='(item,index) in this.$store.state.devices.deviceLists' :key='index' :value='item.deviceGroupId'
                      :title='item.deviceGroupName'/>
      </mu-select-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='allocGroup' primary label='确定'/>
    </mu-dialog>
    <mu-dialog :open='delDevice' title='删除设备' @close='closeDialog'>
      <p>确定删除设备: {{device.deviceAlias}} ?</p>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='deleteDevice' primary label='删除'/>
    </mu-dialog>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast"/>
    <transition name='router-show'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //模板临时变量
        device: {
          deviceId: '',
          deviceAlias: ''
        },
        product: {
          productKey: '',
          productName: '',
          productDesc: ''
        },
        updateGroup: {
          deviceId: '',
          deviceGroupId: '',
          shareId:''
        },
        deviceGroup: '',
        addDialog: false,
        editDialog: false,
        delProduct: false,
        addGroup: false,
        delDevice: false,
        toast: false,
        toastTimer: 0,
        toastMsg: ''
      }
    },
    computed: {
      productList() {
        return this.$store.state.devices.productList;
      }
    },
    methods: {
      //设置当前选中的list的索引
      setindex(index){
        this.$store.state.devices.productListIndex = index;
        //也可以在组件属性加to='/devices/adddevice'进行页面导航，不推荐
        this.$router.push('/devices/adddevice');
      },
      handleClose () {
        this.openDialog = false;
      },
      openAddDialog() {
        this.addDialog = true;
      },
      openEditDialog(value) {
        this.product = value;
        this.editDialog = true;
      },
      openDelDialog(value) {
        this.product = value;
        this.delProduct = true;
      },
      openDelDeviceDialog(index, deviceIndex,){
        // 先找到当前index下的设备名称，保存到模板的数据项中
        this.device.deviceAlias = this.$store.state.devices.productList[index].deviceList[deviceIndex].deviceAlias;
        this.device.deviceId = this.$store.state.devices.productList[index].deviceList[deviceIndex].deviceId;
        this.delDevice = true;
      },
      closeDialog() {
        this.addDialog = false;
        this.editDialog = false;
        this.delProduct = false;
        this.addGroup = false;
        this.delDevice = false;
      },
      addProduct() {
        this.$store.dispatch('addProduct', this.product.productName).then(() => {
          this.$store.dispatch('getProducts');
          console.log('添加产品成功');
        }).catch(err => {
          console.log('添加产品失败!');
        });
        this.addDialog = false;
      },
      updateProduct() {
        this.editDialog = false;
        this.$store.dispatch('updateProduct', this.product).then(() => {
          this.$store.dispatch('getProducts');
          console.log('更新产品成功');
          this.toastMsg = '修改产品成功';
          this.showToast();
        }).catch(err => {
          console.log('更新产品失败!');
        });
      },
      deleteProduct() {
        this.delProduct = false;
        this.$store.dispatch('deleteProduct', this.product.productKey).then(() => {
          this.$store.dispatch('getProducts');
          console.log('删除产品成功');
          this.toastMsg = '删除产品成功！';
          this.showToast();
        }).catch(err => {
          console.log('删除产品失败!');
        });
      },
      deleteDevice(){
        this.delDevice = false;
        this.$store.dispatch('deleteDevice', this.device.deviceId).then(() => {
          this.$store.dispatch('getProducts');
          console.log('删除设备成功');
          this.toastMsg = '删除设备成功！';
          this.showToast();
        }).catch(err => {
          console.log('删除设备失败!');
        });
      },
      openAllocGroup(deviceId, index) {
        //由于这个是求post过去的数据，所以不涉及到界面的计算属性，放在methods即可
        this.updateGroup.deviceId = deviceId;
        //将index保存到store的device模块下
        this.$store.state.devices.productDeviceListIndex = index;
        //开启分配设备组的窗口
        this.addGroup = true;
      },
      allocGroup() {
        this.addGroup = false;
        this.updateGroup.shareId = this.$store.state.user.userinfo.userId;
        this.$store.dispatch('updateDeviceGroup', JSON.stringify(this.updateGroup)).then(() => {
          //这边只需要将当前的index下的按钮隐藏即可，也就是触发改变$store下数据，响应式改变DOM布局
          this.$store.commit('SET_ISSEHLLED', true);
          this.toastMsg = '分配到设备组成功！';
          this.showToast();
        }).catch(err => {
        });
      },
      showToast () {
        this.toast = true;
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 2000)
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave {
    transform: translateX(100%)
  }

  .product-list {
    .page-part {
      text-align: left;
      padding-bottom: 5px;
      .add-group {
        margin-right: 65px;
      }
    }
  }
</style>
