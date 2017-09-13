<template>
	<div class="monitor">
    <mu-appbar title="监控" class='header'>
      <mu-icon-button icon="add" slot="right" to='/monitor/addmonitor'/>
    </mu-appbar>
        <div class="monitor-data">
        	<mu-flexbox class='flex-box'>
        		<mu-flexbox-item class='flex-item'>名称</mu-flexbox-item>
        		<mu-flexbox-item class='flex-item'>数值</mu-flexbox-item>
        		<mu-flexbox-item class='flex-item'>时间</mu-flexbox-item>
        		<mu-flexbox-item class='flex-item'>操作</mu-flexbox-item>
        	</mu-flexbox>
        	<div id='sortable'>
        		<div v-for='item,index in monitorData' :key='index'>
        			<mu-flexbox class='flex-box' v-for='(value, key) in item.state.reported' :key='key'>
        				<mu-flexbox-item class='flex-item-monitor'>
        					<span class="monitor-key">{{key}}</span>
        					<span class="monitor-dev">{{item.deviceAlias}}</span>
        				</mu-flexbox-item>
        				<mu-flexbox-item class='flex-item-monitor'>{{value}}</mu-flexbox-item>
        				<mu-flexbox-item class='flex-item-time'
        					v-for='(value1, key1) in item.metadata.reported'
        					v-if='key1 === key'
        					:key='key1'>
        					{{value1.timestamp | time}}
        				</mu-flexbox-item>
        				<mu-flexbox-item class='flex-item-monitor'>
        					<mu-icon-menu icon="menu" tooltip="操作" :anchorOrigin="targetOrigin" :targetOrigin="targetOrigin">
        						<mu-menu-item title="查看" @click='getMonitorInfo(item)'/>
        						<mu-menu-item title="分享" />
        						<mu-menu-item title="删除" @click='handleDelete(item)'/>
        					</mu-icon-menu>
        				</mu-flexbox-item>
        			</mu-flexbox>
        		</div>
        	</div>
        </div>
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
//		this.interval = setInterval(this.getAllData, 1000);
		//this.getAllData();
	},
	mounted () {
	},
	computed:{
		monitorData() {
			return this.$store.state.monitors.monitorData;
		}
	},
	filters: {
		time: function (timestamp) {
			return new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0,17)
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
<style lang='scss' scoped>
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
.monitor-data{
	text-align: center;
	.flex-box {
		border: 1px solid #e0e0e0;
		.flex-item {
			height: 32px;
			text-align: center;
			line-height: 32px;
		}
		.flex-item-monitor {
			height: 60px;
			//background-color: #e0e0e0;
			text-align: center;
			line-height: 60px;
			.monitor-key {
				color: green;
				display: block;
				height: 30px;
				line-height: 30px;
			}
			.monitor-dev {
				display: block;
				height: 30px;
				line-height: 30px;
			}
		}
		.flex-item-time {
			text-align: center;
		}
	}
}
</style>
