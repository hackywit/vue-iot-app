<template>
	<div class="warning">
		<mu-appbar title="报警数据" class='header'>
			<mu-icon-button icon="add" slot="right"/>
		</mu-appbar>
        <p>11111</p>
    </div>
</template>

<script>
export default {
    created (){
        this.$parent.$children[0]._data.text = "报警";
        //this.$store.dispatch('getJoke')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 

</style>
