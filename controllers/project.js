'use strict';
var Models = require("../models");


var project = (function(){
	function project(){

	}

	project.prototype.create = function(project,callback){
		Models.project.create(project)
		.then(function(data){
			return callback({
				error: false,
				msg: data
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	};

	/*user.prototype.find = function(id, callback){
		var oneOrAll;
		var where;

		if(id){
			oneOrAll = "findOne";
			where = {
				where: {
					id: id
				}
			};
		} else {
			oneOrAll = "findAndCountAll";
			where = {};
		}


		Models.user[oneOrAll](where)
		.then(function(data){
			return callback({
				error: false,
				msg:data,
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	};

	user.prototype.edit = function(id, project, callback){
		Models.user.findById(id)
		.then(function(data){
			return data;
		})
		.then(function(oldData){

			if(user.email){
				oldData.email = user.email;
			}
			if(user.password){
				oldData.password = user.password;
			}
			if(user.role){
				oldData.role = user.role;
			}
			if(user.rank){
				oldData.rank = user.rank;
			}
			if(user.info){
				oldData.info = user.info;
			}
			if(user.page){
				oldData.page = user.page;
			}
			if(user.image){
				oldData.image = user.image;
			}

			return oldData.save()
		})
		.then(function(newData){
			return callback({
				error: false,
				msg: newData,
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	};

	user.prototype.delete = function(id,callback){
		Models.user.findById(id)
		.then(function(data){
			return data.destroy();
		})
		.then(function(){
			return callback({
				error: false,
				msg: "object deleted",
			});
		})
		.catch(function(err){
			return callback({
				error: true,
				msg: err,
			});
		});
	}*/

	return project;
})();


//module.exports = project;

var some = new project();

some.create({
	name: "Proyecto de Prueba",
	category: "cat1",
	approved: false,
	start_date: Date.now(),
	due_date: Date.now(),
	html: "no hay html",
	user_id: '21e58962-f85a-4a77-9806-1c23a7920d5d',
},
function(data){
	console.log(data.error);
});
