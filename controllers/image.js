"use strict";
const Models = sys.require("/models");

/* Image Controller Class */
const controllerImage = (function(){
	function controllerImage(plain){
		// for plain behavior os sequelize response
		this.plain = (plain);
	}

	controllerImage.prototype.createAction = function(image){
		return new Promise((Res,Rej)=>{

			image.plain = this.plain;
			return Models.image.create(image)
			.then((data)=>{
				return Res({
					error: false,
					msg: data
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerImage.prototype.findOneAction = function(id){
		return new Promise((Res,Rej)=>{

			return Models.image.findById(id)
			.then((data)=>{
				return Res({
					error: false,
					msg:data,
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerImage.prototype.editAction = function(id, image){
		return new Promise((Res,Rej)=>{
			return Models.image.findById(id)
			.then((data)=>{
				return data;
			})
			.then((oldData)=>{

				if( image.file_name ){
					oldData.file_name = image.file_name;
				}
				if( image.title ){
					oldData.title = image.title;
				}
				if( image.description ){
					oldData.description = image.description;
				}

				oldData.plain = this.plain;
				return oldData.save()
			})
			.then((newData)=>{
				return Res({
					error: false,
					msg: newData,
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	};

	controllerImage.prototype.deleteAction = function(id){
		return new Promise((Res,Rej)=>{

			return Models.image.findById(id)
			.then((data)=>{

				data.plain = this.plain;
				return data.destroy();
			})
			.then(()=>{
				return Res({
					error: false,
					msg: "object deleted",
				});
			})
			.catch((err)=>{
				return Rej({
					error: true,
					msg: err,
				});
			});
		});
	}


	return controllerImage;
})();


module.exports = controllerImage;
