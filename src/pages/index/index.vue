<template>
	<view class="">{{ list }} </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { test } from '@/api/test'
export default defineComponent({
	setup() {
		const state = reactive({
			name: '1ddsd',
			tabArray: '',
			list: [],
		})

		onMounted(() => {
			test((res: any) => {
				console.log(res)
				state.list = res.data
			})
		})

		return {
			...toRefs(state),
		}
	},
})
</script>

<style></style>
