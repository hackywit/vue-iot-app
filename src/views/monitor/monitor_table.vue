<template>
	<div class="monitor">
		<mu-appbar title="监控" class='header' >
        	<mu-icon-button icon="add" slot="right" to='/monitor/addmonitor'/>
        </mu-appbar>
        <mu-table  :showCheckbox='false'>
        	<mu-thead slot='header'>
        		<mu-tr>
        			<mu-th tooltip='名称'>名称</mu-th>
        			<mu-th tooltip='数值'>数值</mu-th>
        			<mu-th tooltip='时间'>时间</mu-th>
        			<mu-th tooltip='操作'>操作</mu-th>
        		</mu-tr>
        	</mu-thead>
        	<mu-tbody id='sortable'>
        		<!--<mu-tr v-for='item,index in tableData' :key='index'>
        			<mu-td class='drag-handler'><p style='color: green'> {{item.monitor}} </p><p class="small"> {{item.device_name}} </p></mu-td>
        			<mu-td><mu-switch v-model="item.flag" class="demo-switch" /></mu-td>
        			<mu-td> {{item.unit}} </mu-td>
        			<mu-td class='last'>
        				<mu-icon-menu icon="menu" tooltip="操作" :anchorOrigin="targetOrigin" :targetOrigin="targetOrigin">
        					<mu-menu-item title="查看" @click='getMonitorInfo(item)'/>
        					<mu-menu-item title="分享" />
        					<mu-menu-item title="删除" @click='handleDelete(item)'/>
        				</mu-icon-menu>
        			</mu-td>
        		</mu-tr>-->
        		<div v-for='item,index in monitorData' :key='index'>
        		<!--<p>{{index}}{{item}}</p><br/>-->
        		<mu-tr v-for='(key, value) in item.state.reported' :key='key'>
        			<mu-td class='drag-handler'><p style='color: green'> {{key}} </p><p class="small"> {{item.deviceAlias}} </p></mu-td>
        			<mu-td>{{key}}</mu-td>
        			<mu-td> {{item.state.reported.key}} </mu-td>
        			<mu-td class='last'>
        				<mu-icon-menu icon="menu" tooltip="操作" :anchorOrigin="targetOrigin" :targetOrigin="targetOrigin">
        					<mu-menu-item title="查看" @click='getMonitorInfo(item)'/>
        					<mu-menu-item title="分享" />
        					<mu-menu-item title="删除" @click='handleDelete(item)'/>
        				</mu-icon-menu>
        			</mu-td>
        		</mu-tr>
        		</div>
        	</mu-tbody>
        </mu-table>
        <!-- add device group dialog -->
        <mu-dialog :open='dialogVisible' title='删除' @close='closeDelDialog'>
        	<p>确定删除监控点: {{temp.monitor}} ?</p>
        	<mu-flat-button slot='actions' @click='closeDelDialog' primary label='取消' />
        	<mu-flat-button slot='actions' @click='delMonitor' primary label='确定' />
        </mu-dialog>
        <transition name='router-show'>
        	<router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
	data () {
		return {
			targetOrigin: {
				vertical: 'top',
				horizontal: 'right'
			},
			tableData: [],
			newList: [],
			fixedHeader: true,
			dialogVisible: false,
			temp: {
				id: 0,
				device_name: '',
				monitor: '',
				unit: '',
				status: 0,
				data: 0,
				switch: false
			},
			interval: 0
		}
	},
	created() {
		//this.getMonitorList();
		this.$store.state.selected = 'monitor';
		//this.interval = setInterval(this.getAllData, 1000);
		this.getAllData();
	},
	mounted () {
	},
	computed:{
		monitorData() {
			return this.$store.state.monitors.monitorData;
		}
	},
	methods: {
		getMonitorList() {
			this.$store.dispatch('getMonitorList').then(() => {
				console.log('获取监控数据列表成功！');
				this.tableData = this.$store.state.monitors.list;
				this.$nextTick(() => {
					this.setSort()
				})
			}).catch(err => {
				console.log('获取监控数据列表失败！');
			});
			//this.$store.dispatch('getAllData');
		},
		setSort() {
			const el = document.getElementById('sortable');
			this.sortable = Sortable.create(el, {
				handle: '.drag-handler',
				onEnd: evt => {
					console.log('oldIndex: ' + evt.oldIndex + '; newIndex: ' + evt.newIndex);
					const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
					console.log(tempIndex);
					this.newList.splice(evt.newIndex, 0, tempIndex);
					console.log(this.tableData);
				}
			});
		},
		getMonitorInfo(value) {
			this.$store.commit('SET_MONITORINFO', value);
			this.$router.push('/monitor/infor');
		},
		handleDelete(value) {
			this.dialogVisible = true;
			this.temp.monitor = value.monitor;
			this.temp.device_name = value.device_name;
		},
		closeDelDialog() {
			this.dialogVisible = false;
		},
		delMonitor() {
			this.dialogVisible = false;
		},
		getAllData() {
			this.$store.dispatch('getAllData');
		}
	},
	beforeDestroy () {
		console.log('清除定时器' + this.interval);
		clearInterval(this.interval);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
.mu-th,.mu-td {
	/*border: 1px solid orange;*/
	height: 60px;
	padding: 2px;
	text-align: center;
}
.small {
	/*overflow: hidden;*/
	color: lightgray;
	font-size: 10px;
	width: 100px;
	/*border: 1px solid red;*/
}
.router-show-enter-active,.router-show-leave-active{
	transition: all .4s;
}
.router-show-enter,.router-show-leave{
	transform:translateX(100%)
}
</style>
