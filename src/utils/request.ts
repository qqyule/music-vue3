const baseUrl = process.env.VUE_APP_BASE_URL

interface Irequest {
	url: string,
	method: 'OPTIONS' | 'GET' | 'POST' | undefined,
	data?: string
}
const request = (obj: Irequest, callback: Function) => {
	const { url, method, data } = obj

	uni.showLoading({
		title: '加载中'
	});

	uni.request({
		url: baseUrl + url,
		method,
		data,
		success: (res) => {
			uni.hideLoading();
			callback(res.data);
		},
		fail: (error: any) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function () {
				uni.hideLoading();
			}, 250);
		}
	});
}
interface Ierror {
	status: number,
	config?: any,
	msg: string
}
const showError = (error: Ierror) => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}
}

export default request