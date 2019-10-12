/*
*student.js
*数据操作文件模块
*操作文件中的数据，只处理数据，不关心业务
*/

var fs = require('fs')

var dbPath = './db.json'

/*
*获取所有学生列表
*return []
*/

//要想获取异步执行函数的结果，必须采用回调函数的方式获取结果
//此处的callback函数有2个参数，即为callback(err,data)，第一个参数用于接收错误对象，第二个参数用于接收数据
//当读取文件成功时，err为null，data为数据

exports.find = function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){

		if(err){//当文件读取失败时，err为错误对象，data为undedined
			return callback(err)//第二个参数未传入，默认为undedined
		}

		callback(null,JSON.parse(data).students)//当读取文件成功时，err为null，data为数据
	})
}

exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){

		if(err){//当文件读取失败时，err为错误对象，data为undedined
			return callback(err)//第二个参数未传入，默认为undedined
		}

		var students = JSON.parse(data).students

		var result = students.find(function(item){
			return item.id === parseInt(id)
		})

		callback(null,result)//当读取文件成功时，err为null，data为数据
	})
}

/*
*添加保存学生
*/
exports.save = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){

		if(err){
			return callback(err)
		}

		var students = JSON.parse(data).students

		//为新增学生添加id，id为已有学生的最后一名的id加1
		student.id = students[students.length - 1].id + 1

		students.unshift(student)

		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//如果发生错误，就把错误对象传给回调函数
				callback(err)
			}

			//如果没错，错误对象就是null
			callback(null)
		})

		
	})
}

/*
*更新学生
*/
exports.updateById = function(student, callback){
	fs.readFile(dbPath,'utf8',function(err,data){

		if(err){
			return callback(err)
		}

		var students = JSON.parse(data).students

		//注意：要把id统一转换为数字类型
		student.id = parseInt(student.id)

		//ES6的数组方法：find()
		var stu = students.find(function(item){
			return item.id === student.id
		})

		//循环参数的属性，修改数据文件里相应的对象属性
		for( var key in student){
			stu[key] = student[key]
		}

		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//如果发生错误，就把错误对象传给回调函数
				callback(err)
			}

			//如果没错，错误对象就是null
			callback(null)
		})

		
	})
}

/*
*删除学生
*/
exports.deleteById = function(id,callback){

	fs.readFile(dbPath,'utf8',function(err,data){

		if(err){//当文件读取失败时，err为错误对象，data为undedined
			return callback(err)//第二个参数未传入，默认为undedined
		}

		var students = JSON.parse(data).students

		//findIndex专门用来根据条件查找数组元素的下标
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})

		//根据下标从数组中删除对应的学生对象
		students.splice(deleteId,1)

		//将数组重新写入文件
		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//如果发生错误，就把错误对象传给回调函数
				callback(err)
			}

			//如果没错，错误对象就是null
			callback(null)
		})
	})
}

