<template>
	<div class="index">

		<comLibFrom @handleEventChange="onHandleEventChange" :formConfig="comLibFromConfig"></comLibFrom>

	</div>
</template>

<script>
import comLibFrom from './lib-from/comLib-from.vue'

export default {
	components:{
		comLibFrom,
	},
	data(){
		return {
			comLibFromConfig: [
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
					propName: "search2",
					className: "", //  自定义class样式
					type: "lib-input", //  标识属于哪种form组件
					size: "small", //  大小
					defaultValue: "", //  默认值string
					placeholder: "请输入内容", //  默认的提示语
					linkValueProps: ['search'],
					changeValue(data) {
						console.log(data)
						// if (!+data[0].mediaPlatformCode) {
						// 	return 0
						// }
						// return +data[0].mediaPlatformCode + 10
					},
					//  clearable: true,
					//  showWordLimit: true,  // 是否显示输入字数统计
					// 最小与最大值
					// minlength: 0,
					// maxlength: 10
				},
				{
					id: 4,
					propName: "address3",

					linkValueProps: ['search'],
					changeValue(data) {
						console.log(data)
						if (!+data[0].mediaPlatformCode) {
							return 0
						}
						return +data[0].mediaPlatformCode + 10
					},


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
				}
			],
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
