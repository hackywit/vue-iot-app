<template>
  <div>
    策略名字：
    <mu-text-field hintText="请输入策略名字"/>
    <br/>
    策略所属产品：
    <mu-select-field>
      <!--这边将动态添加-->
      <mu-menu-item value="1" title="阴阳师"/>
    </mu-select-field>
    <mu-flexbox class='flex-box'>
      <mu-flexbox-item class='flex-item'>名称</mu-flexbox-item>
      <mu-flexbox-item class='flex-item'>操作</mu-flexbox-item>
    </mu-flexbox>
    <!--这边是具体的动态数据-->
    <mu-flexbox class='flex-box'>
      <mu-flexbox-item class='flex-item'>名称</mu-flexbox-item>
      <mu-switch label="可读" class="demo-switch"/>
      <br/>
      <mu-switch label="可写" class="demo-switch"/>
      <br/>
    </mu-flexbox>
    <mu-raised-button label="添加策略" class="demo-raised-button"/>
    <br/>
  </div>
</template>
<script>
  //需要处理的任务，1.从服务器获取到用户下所有的产品，2.从服务器获取到上游分享者的分享策略，3.向服务器提交需要创建的策略信息
  export default {
    data(){
      return {
        //axio得到的后端数据映射
        productList: [],

      }
    }
  }
</script>
