import axios from 'axios'
var newAxios = axios.create({
    //baseURL: 'https://api.example.com',
		timeout:20000
});

const https = function (obj) {
	createLoad();
	if (obj.type == 'get') {
		newAxios.get(obj.url,obj.param).then(res=>{
			console.log('返回结果======' + JSON.stringify(res))
			removeLoad();
			if (typeof obj.callBack == 'function') {
				obj.callBack(res);
			}
		}).catch(erro=>{
			removeLoad();
			console.log(erro)
		})
	} else if (obj.type == 'post') {
		newAxios.post(obj.url,obj.param).then(res=>{
			console.log('返回结果======' + JSON.stringify(res))
			removeLoad();
			if (typeof obj.callBack == 'function') {
				obj.callBack(res);
			}
		}).catch(erro=>{
			removeLoad();
			console.log(erro)
		})
	} else if (obj.type == 'delete') {
		newAxios.delete(obj.url,obj.param).then(res=>{
			console.log('返回结果======' + JSON.stringify(res))
			removeLoad();
			if (typeof obj.callBack == 'function') {
				obj.callBack(res);
			}
		}).catch(erro=>{
			removeLoad();
			console.log(erro)
		})
	}
}
const createLoad = function () {
	var div = document.createElement("div");
	var img = document.createElement("img");
	var p = document.createElement("p");
	div.id = 'loadingDiv';
	img.src = require('../assets/img/loading.gif');
	p.innerHTML = '加载中';
	div.appendChild(img);
	div.appendChild(p);
	document.body.appendChild(div);
}
const removeLoad = function () {
	document.getElementById('loadingDiv').remove();
}

export default https