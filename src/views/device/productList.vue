<template>
  <div class="product-list">
    <!--header-->
    <mu-appbar title='产品列表' class='header'>
      <router-link to='/devices' slot='left'>
        <mu-icon-button icon='keyboard_arrow_left' style='color: #fff'/>
      </router-link>
      <mu-icon-button icon="add" slot="right" ref='button' @click='openAddProductDialog'/>
    </mu-appbar>
    <div class="page-part">
      <mu-list>
        <mu-list-item v-for='(item,index) in productList' :key='item.productKey' :title='item.productName'
                      :describeText="item.productDesc" :open='false' class='group' toggleNested>
          <mu-icon-menu slot="leftAvatar" icon="settings_system_daydream" tooltip="操作">
            <mu-menu-item title="修改" @click='openModifyProductDialog(item)'/>
            <mu-menu-item title="删除" @click='openDelProductDialog(item)'/>
            <mu-menu-item title='添加设备' @click='gotoAddDevice(item)'/>
          </mu-icon-menu>
          <mu-list-item v-for='(sub,deviceIndex) in item.deviceList' :key='sub.deviceId' :title='sub.deviceAlias'
                        :describeText="sub.deviceName" slot='nested'>
            <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
              <mu-menu-item v-if='!sub.isSelled' title="移动分组" @click='openAllocGroup(sub.deviceId,index,deviceIndex)'/>
              <mu-menu-item title="删除机器" @click='openDelDeviceDialog(index,deviceIndex)'/>
            </mu-icon-menu>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-dialog :open='addProductDialog' title='添加产品' @close='closeDialog'>
      <mu-text-field hintText='请输入产品名称' v-model='productInfo.productName'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='addProduct' primary label='添加'/>
    </mu-dialog>
    <mu-dialog :open='modifyProductDialog' title='修改产品信息' @close='closeDialog'>
      <mu-text-field label='产品名称' v-model='productInfo.productName'></mu-text-field>
      <br/>
      <mu-text-field label='描述' multiLine :rows="3" :rowsMax="6" v-model='productInfo.productDesc'></mu-text-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='updateProduct' primary label='保存'/>
    </mu-dialog>
    <mu-dialog :open='delProductDialog' title='删除产品' @close='closeDialog'>
      <p>确定删除产品: {{productInfo.productName}} ?</p>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='deleteProduct' primary label='删除'/>
    </mu-dialog>
    <mu-dialog :open='moveToDeviceGroupDialog' title='分配至设备组' @close='closeDialog'>
      <mu-select-field class='select' v-model="updateGroup.deviceGroupId" label="请选择设备组">
        <mu-menu-item v-for='(item,index) in this.$store.state.devices.deviceLists' :key='index'
                      :value='item.deviceGroupId'
                      :title='item.deviceGroupName'/>
      </mu-select-field>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='allocGroup' primary label='确定'/>
    </mu-dialog>
    <mu-dialog :open='delDeviceDialog' title='删除设备' @close='closeDialog'>
      <p>确定删除设备: {{device.deviceAlias}} ?</p>
      <mu-flat-button slot='actions' @click='closeDialog' primary label='取消'/>
      <mu-flat-button slot='actions' @click='deleteDevice' primary label='删除'/>
    </mu-dialog>
    <mu-toast v-if="toastFlag" :message="toastMsg" @close="hideToast"/>
    <transition name='router-show'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /**
         * 界面布局有关变量
         */
        //界面弹出窗口相关变量
        addProductDialog: false,
        modifyProductDialog: false,
        delProductDialog: false,
        moveToDeviceGroupDialog: false,
        delDeviceDialog: false,
        //toast窗口相关
        toastFlag: false,
        toastTimer: 0,
        toastMsg: '',
        /**
         * 自定义与store交互变量
         */
        device: {
          deviceId: '',
          deviceAlias: ''
        },
        productInfo: {
          productKey: '',
          productName: '',
          productDesc: ''
        },
        updateGroup: {
          deviceId: '',
          deviceGroupId: '',
          shareId: ''
        },
        deviceGroup: ''
      }
    },
    computed: {
      productList() {
        return this.$store.state.devices.productList;
      }
    },
    methods: {
      /**
       * 界面布局相关函数
       */
      /*界面窗口相关函数*/
      openAddProductDialog() {
        this.addProductDialog = true;
      },
      openModifyProductDialog(productInfo) {
        this.productInfo = productInfo;
        this.modifyProductDialog = true;
      },
      openDelProductDialog(productInfo) {
        this.productInfo = productInfo;
        this.delProductDialog = true;
      },
      openDelDeviceDialog(index, deviceIndex,){
        this.device.deviceAlias = this.$store.state.devices.productList[index].deviceList[deviceIndex].deviceAlias;
        this.device.deviceId = this.$store.state.devices.productList[index].deviceList[deviceIndex].deviceId;
        this.delDeviceDialog = true;
      },
      closeDialog() {
        this.addProductDialog = false;
        this.modifyProductDialog = false;
        this.delProductDialog = false;
        this.moveToDeviceGroupDialog = false;
        this.delDeviceDialog = false;
      },
      /**
       * 界面路由相关函数
       */
      gotoAddDevice(productInfo){
        this.$store.commit('SET_PRODUCTINFO',productInfo);
        this.$router.push('/devices/adddevice');
      },
      handleClose () {
        this.openDialog = false;
      },
      addProduct() {
        this.$store.dispatch('addProduct', this.productInfo.productName).then(() => {
          this.$store.dispatch('getProducts');
          console.log('添加产品成功');
        }).catch(err => {
          console.log('添加产品失败!');
        });
        this.addProductDialog = false;
      },
      updateProduct() {
        this.modifyProductDialog = false;
        this.$store.dispatch('updateProduct', this.productInfo).then(() => {
          this.$store.dispatch('getProducts');
          console.log('更新产品成功');
          this.toastMsg = '修改产品成功';
          this.showToast();
        }).catch(err => {
          console.log('更新产品失败!');
        });
      },
      deleteProduct() {
        this.delProductDialog = false;
        this.$store.dispatch('deleteProduct', this.productInfo.productKey).then(() => {
          this.$store.dispatch('getProducts');
          console.log('删除产品成功');
          this.toastMsg = '删除产品成功！';
          this.showToast();
        }).catch(err => {
          console.log('删除产品失败!');
        });
      },
      deleteDevice(){
        this.delDeviceDialog = false;
        this.$store.dispatch('deleteDevice', this.device.deviceId).then(() => {
          this.$store.dispatch('getProducts');
          console.log('删除设备成功');
          this.toastMsg = '删除设备成功！';
          this.showToast();
        }).catch(err => {
          console.log('删除设备失败!');
        });
      },
      openAllocGroup(deviceId, index, deviceIndex) {
        this.$store.state.devices.productListIndex = index;
        this.$store.state.devices.productDeviceListIndex = deviceIndex;
        //由于这个是求post过去的数据，所以不涉及到界面的计算属性，放在methods即可
        this.updateGroup.deviceId = deviceId;
        //开启分配设备组的窗口
        this.moveToDeviceGroupDialog = true;
      },
      allocGroup() {
        this.moveToDeviceGroupDialog = false;
        this.updateGroup.shareId = this.$store.state.user.userinfo.userId;
        this.$store.dispatch('updateDeviceGroup', JSON.stringify(this.updateGroup)).then(() => {
          //这边只需要将当前的index下的按钮隐藏即可，也就是触发改变$store下数据，响应式改变DOM布局
          this.$store.commit('SET_ISSEHLLED', true);
          this.toastMsg = '分配到设备组成功！';
          this.showToast();
        }).catch(err => {
            console.log(err)
        });
      },
      showToast () {
        this.toastFlag = true;
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toastFlag = false;
        }, 2000)
      },
      hideToast () {
        this.toastFlag = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>

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
