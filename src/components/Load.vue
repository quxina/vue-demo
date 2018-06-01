<template>
  <div ref="fofo" class="load-wrapper">
		<div class="test-content" v-load-more="loading">
			<div class="test-item" v-for="(item, key) in testData" :key="key" :style="{visibility: item.styleObj.visibility}">
				<div class="left-area" :style="{backgroundColor: item.styleObj.backgroundColor}">{{item.item}}</div>
				<div class="right-area">{{item.content}}</div>
			</div>
			<div class="no-more-content" v-if="loaded">
				<span class="no-more-dec">没有更多内容了</span>
			</div>
		</div>

		<!-- <div class="test-content" v-load-more.lazy="loadImg">
			<div class="flex-wrap" ref="flexWrap">
				<div class="img-item" v-for="item in testData" :key="item.name">
					<img class="lazy-load" src="../../static/defalut.jpg" :data-src="item.url" unload="true" alt="图片">
				</div>
				<div class="no-more-content" v-if="loaded">
					<span class="no-more-dec">没有更多内容了</span>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
import {loadMore} from '@/config/load'
import {testFn, obj} from '@/config/tools'
export default {
	name: 'Load',
	data() {
		return {
			testData: [],
			isLoading: false,
			page: 0,
			loaded: false,
			baseUrl: 'http://gank.io/api/data/福利/20/',
			domCache: []
		}
	},
	created () {
		// this.loadImg()
		this.loading()
	},
	mounted () {
		// this.loadImg()
	},
	mixins: [loadMore],
	methods: {
		loading() {
			let _this = this
			if(this.isLoading || this.loaded) {
				return;
			}
			console.log('is loading')
			this.isLoading = true
			this.page ++
			let timer = setTimeout(function() {
				let tempArr = _this.genData()
				// if(_this.page >= 3) {
				// 	let data = _this.testData.slice()
				// 	for(let i = 0; i < (_this.page - 2) * 20; i ++) {
				// 		data[i].styleObj.visibility = 'hidden'
				// 	}
				// 	_this.testData = data
				// }
				_this.testData = _this.testData.concat(tempArr)
				clearTimeout(timer)
				timer = null
				_this.isLoading = false
				if(_this.page == 8) {
					_this.loaded = true
				}
				console.log('loaded')
			}, 500)
		},
		genData() {
			let tempArr = []
			for(let i = 0; i < 20; i ++) {
				tempArr.push({
					item: '' + this.page + i,
					content: 'testcontent' + Math.random().toFixed(5),
					key: Math.random(),
					styleObj: {
						backgroundColor: '#' + ('00000' + (Math.random() * 0x1000000 << 0)).toString(16).substr(-6),
						// backgroundColor: '#eee',
						visibility: 'visible'
					}
				})
			}
			return tempArr
		},
		loadImg() {
			if(this.isloading) {
				return
			}
			this.isLoading = true
			this.page ++
			this.fetchData().then((res) => {
					this.testData = this.testData.concat(res.data.results)
					this.isLoading = false
					// this.$nextTick(function() {
					// 	this.domCache = Array.prototype.slice.call(this.$refs.flexWrap.querySelectorAll('.lazy-load'))
					// })
				})
			
		},
		fetchData() {
			return this.$axios.get(this.baseUrl + this.page)
		},
		testFn,
		demoFn(e) {
			console.log(this.$refs.fofo)
		}
	}
}
</script>

<style scoped>
	.load-wrapper {
		box-sizing: border-box;
		font-size: 2.5em;
		height: 100%;
		padding-bottom: 10vh;
		overflow: hidden;
		background-color: bisque;
		-webkit-tap-highlight-color:rgba(255,255,255,0);
	}
	.dododo {
		overflow-y: scroll;
		height: 90vh;
		margin-bottom: 10vh;
		padding-bottom: 0;
		/* -webkit-overflow-scrolling: touch; */
	}
	.test-content {
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		-webkit-tap-highlight-color:rgba(255,255,255,0);
		/* padding: .8rem .5rem 0; */
		padding: 0 .5rem;
	}
	.test-item {
		display: flex;
		align-content: space-around;
		height: 5rem;
		text-align: center;
		align-items: center;
	}
	.left-area {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		font-size: .6em;
		line-height: 4rem;
	}
	.right-area {
		flex: 1;
		font-size: 0.7em;
		margin-left: .8rem;
	}
	.no-more-content {
		height: 1.4rem;
		font-size: 1rem;
		text-align: center;
		color: #b2b2b2;
		padding-bottom: .5rem;
	}
	.no-more-dec {
		position: relative;
	}
	.no-more-dec::before,
	.no-more-dec::after {
		content: '';
		width: 5.5rem;
		height: 1px;
		display: inline-block;
		position: absolute;
		background-color: #b2b2b2
	}
	.no-more-dec::before {
		top: .6rem;
		left: -6.3rem;
	}
	.no-more-dec::after {
		top: .6rem;
		right: -6.3rem;
	}
	.flex-wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: center;
	}
	.img-item {
		float: left;
		margin-top: .8rem;
	}
	.img-item img {
		width: 40vw;
		height: 40vh;
		vertical-align: bottom;
		display: block;
	}
</style>
