/*
入口文件职责：
	1.创建服务器
	2.做一些服务器相关配置
		模版引擎
		body-parser 解析表单post请求体
		提供静态资源服务
	3.挂载路由
	4.启动端口监听服务

*/





var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')

var app = express()

//开放资源
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

//引入express-art-template
app.engine('html', require('express-art-template'))

//配置body-parser，用于解析post请求的数据主体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/*配置body-parser和模版引擎一定要在app.use(router)挂载路由之前*/

//把路由容器挂载到app服务中
app.use(router)



app.listen(3000,function(){
	console.log('App server is running at port 3000...')
})