<template>
  <div>
    <!--添加bar-->
    <mu-appbar title="策略" class='header'>
      <mu-icon-menu v-show="isShow" icon="more_vert" slot="right">
        <mu-menu-item title="添加策略" to='/strategy/createStrategy' @click="hideMenuItem"/>
      </mu-icon-menu>
    </mu-appbar>
    <!--添加给子路由嵌套的地方，不然是显示不出结果的-->
    <transition>
      <router-view></router-view>
    </transition>
    <!--添加策略列表-->
    <mu-list>
      <!--产品列-->
      <mu-list-item v-for='productStrategy in productsStrategies' :title="productStrategy.productName" toggleNested>
        <mu-icon slot="left" value="books"/>
        <mu-list-item slot="nested" v-for='Strategies in productStrategy.strategies' :title="strategies.strategyName">
          <mu-icon slot="left" value="books"/>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<!--js代码部分-->
<script>
  export default {
    //模板需要用的的数据，赋初始值就可以了
    data(){
      return {
        //模板变量，要赋初始值
        isShow: true,//导航栏菜单隐藏
        //axio后台变量
        productsStrategies: []
      }
    },
    //界面渲染之前传入需要展示的数据
    created(){
      //必须在加载数据之前先触发http加载
      this.$store.dispatch('getAllStrategy');
      this.showStrategy();
    },
    computed: {
      showStrategy(){
        this.productsStrategies = this.$store.state.strategy.strategies;
      }
    },
    methods:{
      hideMenuItem(){
        this.isShow = false
      }
    }
  }
</script>
