var fs = require('fs')
var Student = require('./student.js')



//express专门提供了一种用来包装路由的方法
var express = require('express')

//1.创建一个路由容器
var router = express.Router()


//2.把路由都挂载到router路由容器中

router.get('/students',function(req,res){
	//第二个参数是可选参数，传入“utf8”表示将读取的字符串转换为可读的文字
	//也可通过data.toString()来实现
	// fs.readFile('./db.json','utf8',function(err,data){
	// 	if(err){
	// 		return res.status(500).send('Server error!')
	// 	}

	// 	//从文件读取到的数据是字符串，一定要手动转换成对象
	// 	var students = JSON.parse(data).students

	// 	res.render('index.html',{
	// 		fruits:[
	// 		'苹果',
	// 		'香蕉',
	// 		'蜜桃',
	// 		'西瓜'
	// 		],
	// 		students:  students

	// 	})
	// })


	Student.find(function(err,students){
		if(err){
			return res.status(500).send('Server error!')
		}

		res.render('index.html',{
			fruits:[
			'苹果',
			'香蕉',
			'蜜桃',
			'西瓜'
			],
			students:  students

		})
	})

})

router.get('/students/new',function(req,res){

	res.render('new.html')

})

router.post('/students/new',function(req,res){
	//1.接收数据
	//2.处理
	//	将数据保存到db.json文件中用以持久化
	//3.响应
	// console.log(req.body)
	new Student(req.body).save(function(err){
		if(err){
			return res.status(500).send('Server error!')
		}

		res.redirect('/students')
	})
	// Student.save(req.body,function(err){
	// 	if(err){
	// 		return res.status(500).send('Server error!')
	// 	}

	// 	res.redirect('/students')
	// })
})

router.get('/students/edit',function(req,res){
	//1.在客户端的列表页中处理编辑问题（需要有id参数）
	//2.获取要编辑的学生id
	//3.渲染编辑页面
	//	根据学生id把信息查出来
	//	使用模版引擎渲染页面

	Student.findById(req.query.id.replace(/"/g, ''),function(err,data){
		if(err){
			return res.status(500).send('Server error!')
		}

		res.render('edit.html',{
			student: data
		})
	})
})

router.post('/students/edit',function(req,res){

	var id = req.body.id.replace(/"/g, '')
	Student.findByIdAndUpdate(id, req.body, function(err){
		if(err){
			return res.status(500).send('Server error!')
		}

		res.redirect('/students/')
	})
})

router.get('/students/delete',function(req,res){
	//1.获取要删除的id
	//2.根据id执行删除操作
	//3.根据操作结果发送响应数据
	
	var id = req.query.id.replace(/"/g, '')
	Student.findByIdAndRemove(id,function(err){
		if(err){
			return res.status(500).send('Server error!')
		}

		res.redirect('/students/')
	})
})


//3.把router导出
module.exports = router






