<template>
	<div class="index">

		<comLibFrom @handleEventChange="onHandleEventChange" :formConfig="comLibFromConfig"></comLibFrom>
		<comLibTable
				:table-config="comLibTableConfig"
				:request-fun="requestFun"
				@onHandleSizeChange="onHandleSizeChange"
				@onHandleCurrentChange="onHandleCurrentChange"
				@onHandleSelectionChange="onHandleSelectionChange"
				@onOperateBtn="onHandleOperateBtn"
				@onHandleSortChange="onHandleSortChange"
				@onRowClick="onHandleRowClick"
		></comLibTable>

	</div>
</template>

<script>
import comLibFrom from './lib-from/comLib-from'

import comLibTable from './lib-table/comLib-table'

export default {
	components:{
		comLibFrom,
		comLibTable
	},
	data(){
		return {
			comLibFromConfig: [
				{
					id: 6,
					propName: "test1",
					className: "", //  自定义class样式
					type: "lib-switch", //  标识属于哪种form组件
					size: "small", //  大小
					defaultValue: true, //  默认值
					config: {
						"active-text": "按月付费",
						"inactive-text": "按年付费",
						"active-value":true,  //打开的值
						"inactive-value":false, //关闭的值
						"active-color": "#13ce66",
						"inactive-color": "#ff4949"
					},
					disabled: true, //禁用
					width:40,  //宽度
				},
				{
					id: 1,  //唯一标识
					propName: "address1", //字段名
					className: "", //  自定义class样式
					type: "lib-radio", //  标识属于哪种form组件 avl-radio avl-checkbox avl-input avl-select avl-cascader avl-switch
					size: "small", //  大小
					defaultValue: "beijing", //  默认值string
					//  默认的选择项
					defaultOptions: [
						{
							label: "北京",
							value: "beijing"
						},
						{
							label: "上海",
							value: "shanghai"
						},
						{
							label: "武汉",
							value: "wuhan"
						}
					],
					showBtnStyle: true, // 是否为按钮样式
					//  按钮样式下自定义样式(默认自带样式)
					// btnStyle: {
					//   textColor: "#fff",
					//   fill: "#409E"
					// },

					//  showBorder: true     //  是否显示边框
				},
				{
					id: 4,
					propName: "address3",
					className: "", //  自定义class样式
					type: "lib-select", //  标识属于哪种form组件
					size: "small", //  大小
					defaultValue: "beijing", //  默认值
					//  默认的选择项
					defaultOptions: [],
					//  获取数据的方式(请求远程数据举例)
					getInitData() {
						if (!localStorage.getItem("defaultOptions1")) {
							return new Promise((resolve, reject) => {
								setTimeout(() => {
									const defaultOptions = [
										{
											label: "北京",
											value: "beijing"
										},
										{
											label: "上海",
											value: "shanghai"
										},
										{
											label: "武汉",
											value: "wuhan"
										}
									];
									resolve(defaultOptions);
								}, 2000);
							});
						} else {
							return JSON.parse(localStorage.getItem("defaultOptions1"));
						}
					},
					//  clearable: true,  //  是否显示清除按钮
					//  multiple: true,   //  多选
					//  multipleLimit:0,   //  多选限制 0代表无限制
					//  collapseTags:true,  //  多选展示折叠
					//  filterable: true,  // 支持过滤
					//  filterMethod:null   //  自定义过滤方式 可以配合远程过滤
				},
				{
					id: 3,
					propName: "search",
					className: "", //  自定义class样式
					type: "lib-input", //  标识属于哪种form组件
					size: "small", //  大小
					defaultValue: "", //  默认值string
					placeholder: "请输入内容", //  默认的提示语
					//  clearable: true,
					//  showWordLimit: true,  // 是否显示输入字数统计
					// 最小与最大值
					// minlength: 0,
					// maxlength: 10
				},
				{
					id: 2,
					propName: "address2",
					className: "", //  自定义class样式
					type: "lib-checkboxGroup", //  标识属于哪种form组件
					size: "small", //  大小  medium / small / mini
					defaultValue: ["beijing"], //  默认值array
					//  默认的选择项
					defaultOptions: [
						{
							label: "北京",
							value: "beijing"
						},
						{
							label: "上海",
							value: "shanghai"
						},
						{
							label: "武汉",
							value: "wuhan"
						}
					],
					// showBtnStyle: true   // 是否为按钮样式
					//  按钮样式下自定义样式(默认自带样式)
					//  btnStyle: {
					//    textColor: "#fff",
					//    fill: "#409EFF"
					//  },
					//  showBorder: true //  是否显示边框
					//  可勾选的最小与最大值
					//  min:1,
					//  max:2
				},
				{
					id: 5,
					propName: "test",
					className: "", //  自定义class样式
					type: "lib-cascader", //  标识属于哪种form组件
					size: "small", //  大小
					defaultValue: "", //  默认值
					defaultOptions: [
							{
						value: 'zhinan',
						label: '指南',
						disabled: true,
						children: [{
							value: 'shejiyuanze',
							label: '设计原则',
							children: [{
								value: 'yizhi',
								label: '一致'
							}, {
								value: 'fankui',
								label: '反馈'
							}, {
								value: 'xiaolv',
								label: '效率'
							}, {
								value: 'kekong',
								label: '可控'
							}]
						}, {
							value: 'daohang',
							label: '导航',
							children: [{
								value: 'cexiangdaohang',
								label: '侧向导航'
							}, {
								value: 'dingbudaohang',
								label: '顶部导航'
							}]
						}]
					}, {
						value: 'zujian',
						label: '组件',
						children: [{
							value: 'basic',
							label: 'Basic',
							children: [{
								value: 'layout',
								label: 'Layout 布局'
							}, {
								value: 'color',
								label: 'Color 色彩'
							}, {
								value: 'typography',
								label: 'Typography 字体'
							}, {
								value: 'icon',
								label: 'Icon 图标'
							}, {
								value: 'button',
								label: 'Button 按钮'
							}]
						}, {
							value: 'form',
							label: 'Form',
							children: [{
								value: 'radio',
								label: 'Radio 单选框'
							}, {
								value: 'checkbox',
								label: 'Checkbox 多选框'
							}, {
								value: 'input',
								label: 'Input 输入框'
							}, {
								value: 'input-number',
								label: 'InputNumber 计数器'
							}, {
								value: 'select',
								label: 'Select 选择器'
							}, {
								value: 'cascader',
								label: 'Cascader 级联选择器'
							}, {
								value: 'switch',
								label: 'Switch 开关'
							}, {
								value: 'slider',
								label: 'Slider 滑块'
							}, {
								value: 'time-picker',
								label: 'TimePicker 时间选择器'
							}, {
								value: 'date-picker',
								label: 'DatePicker 日期选择器'
							}, {
								value: 'datetime-picker',
								label: 'DateTimePicker 日期时间选择器'
							}, {
								value: 'upload',
								label: 'Upload 上传'
							}, {
								value: 'rate',
								label: 'Rate 评分'
							}, {
								value: 'form',
								label: 'Form 表单'
							}]
						}, {
							value: 'data',
							label: 'Data',
							children: [{
								value: 'table',
								label: 'Table 表格'
							}, {
								value: 'tag',
								label: 'Tag 标签'
							}, {
								value: 'progress',
								label: 'Progress 进度条'
							}, {
								value: 'tree',
								label: 'Tree 树形控件'
							}, {
								value: 'pagination',
								label: 'Pagination 分页'
							}, {
								value: 'badge',
								label: 'Badge 标记'
							}]
						}, {
							value: 'notice',
							label: 'Notice',
							children: [{
								value: 'alert',
								label: 'Alert 警告'
							}, {
								value: 'loading',
								label: 'Loading 加载'
							}, {
								value: 'message',
								label: 'Message 消息提示'
							}, {
								value: 'message-box',
								label: 'MessageBox 弹框'
							}, {
								value: 'notification',
								label: 'Notification 通知'
							}]
						}, {
							value: 'navigation',
							label: 'Navigation',
							children: [{
								value: 'menu',
								label: 'NavMenu 导航菜单'
							}, {
								value: 'tabs',
								label: 'Tabs 标签页'
							}, {
								value: 'breadcrumb',
								label: 'Breadcrumb 面包屑'
							}, {
								value: 'dropdown',
								label: 'Dropdown 下拉菜单'
							}, {
								value: 'steps',
								label: 'Steps 步骤条'
							}]
						}, {
							value: 'others',
							label: 'Others',
							children: [{
								value: 'dialog',
								label: 'Dialog 对话框'
							}, {
								value: 'tooltip',
								label: 'Tooltip 文字提示'
							}, {
								value: 'popover',
								label: 'Popover 弹出框'
							}, {
								value: 'card',
								label: 'Card 卡片'
							}, {
								value: 'carousel',
								label: 'Carousel 走马灯'
							}, {
								value: 'collapse',
								label: 'Collapse 折叠面板'
							}]
						}]
					}, {
						value: 'ziyuan',
						label: '资源',
						children: [{
							value: 'axure',
							label: 'Axure Components'
						}, {
							value: 'sketch',
							label: 'Sketch Templates'
						}, {
							value: 'jiaohu',
							label: '组件交互文档'
						}]
					}], //  默认的选择项
					//  获取数据的方式(请求远程数据)
					getInitData() {
						return [];
					},
					// showLastLevel: true, //  只展示最后一级名称
					//  collapseTags:true,  //   多选展示折叠
					//  separator:'/',  //  选项分隔符
					props: {
						expandTrigger: "hover", //  次级菜单的展开方式 hover
						 multiple: true, //是否多选
						 checkStrictly: true, //是否严格的遵守父子节点不互相关联
						 lazy: false, //是否动态加载子节点，需与 lazyLoad 方法结合使用
						 lazyLoad: null, //加载动态数据的方法，仅在 lazy 为 true 时有效
						 value: "value",
						 label: "label",
						 children: "children",
						 disabled: "disabled",
						 leaf: "leaf"
					}
					//  clearable: true,  //  是否显示清除按钮
					//  filterable: true,   // 支持过滤
					//  filterMethod:null  //  自定义过滤方式 可以配合远程过滤
				},
			],

			comLibTableConfig : {
				hasSelect: true, // 有无选中列
				hasOperation: true, // 有无操作列
				border: false, // 是否带有纵向边框 默认为false
				hasExpand: true, // 有无展开行功能 默认为false
				rowClick: false, //是否开启行点击 默认为false
				expands: [], // 开启行展开之后的数据
				columns: [  //自定义列 是一个数组 数组每一项代表一列
					{
						id: "1",  //唯一标识
						label: "状态",  //列名
						prop: "analysisStatus",  //列对应的后台字段名 和自定义列slot对应
						width: "320",  //列宽
						className: "", //只自定义class类
						minWidth: "100", //最小宽度
						show: "template",  //true 代表不做任何处理 false代表隐藏 template代表自定义模板
						sortable: "custom",  //排序统一采用后台控制 custom代表后台排序  默认不排序
						// formatData: formatAddTime,  //代表数据格式化 类似于filter过滤器功能  默认为null
						showHeader: true,  //代表是否自定义表头  默认为false
						headerProp: "stateHeader"  //自定义表头slot  name值 需要showHeader配置为true
					},
					{
						id: "2",  //唯一标识
						label: "行为",  //列名
						prop: "analysi",  //列对应的后台字段名 和自定义列slot对应
						width: "320",  //列宽
						className: "", //只自定义class类
						minWidth: "100", //最小宽度
						show: "template",  //true 代表不做任何处理 false代表隐藏 template代表自定义模板
						sortable: "custom",  //排序统一采用后台控制 custom代表后台排序  默认不排序
						// formatData: formatAddTime,  //代表数据格式化 类似于filter过滤器功能  默认为null
						showHeader: true,  //代表是否自定义表头  默认为false
						headerProp: "stateHeader"  //自定义表头slot  name值 需要showHeader配置为true
					}
				],
				operation: {
					// 操作功能
					label: "操作", // 操作列的表头文字
					width: "200", // 操作列的宽度
					className: "", // 操作列的class名
					data: [
						// 操作列数据
						{
							id: 1, // 按钮循环组件的key值
							label: "保存", // 按钮文字
							Fun: "handleSubmit", // 点击按钮后触发的父组件事件
							size: "mini", // 按钮大小
							classname: "", // 按钮的类名
							type: "success" //可选的有primary / success / warning / danger / info / text
						}
					]
				},
				//  搜索参数代表是什么形式传给后台  默认是params  但是post请求下可以配置data
				searchProp: {
					//   name:'data'
				},
				//  格式化数据一定要返回一个对象  代表数据和数量
				formatTableData: ({data}) => {
					return {
						data: data.apkAnalysis,
						totalCount: data.counts
					};
				}
			},


		}
	},
	methods: {

		// 列表请求配置 返回一个promise
		requestFun() {
			return new Promise().then(res=>{
				console.log(res)
			})
		},


		// 表单变化事件监听
		onHandleEventChange(val) {
			console.log(val);
		},


		// 操作按钮事件监听
		onHandleOperateBtn(val) {
			console.log(val);
		},
		// 分页切换
		onHandleCurrentChange(val) {
			console.log(val);
		},
		onHandleSizeChange(val) {
			console.log(val);
		},
		// 表格排序监听
		onHandleSortChange(val) {
			console.log(val);
		},
		// 多选按钮操作监听
		onHandleSelectionChange(val) {
			console.log(val);
		},
		//行点击事件
		onHandleRowClick(val){
			console.log(val);
		}
	},
}
</script>

<style scoped>
.index{
	width: 100%;
	min-height: 100%;
	padding: 30px;
}
</style>
