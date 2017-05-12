"use strict";
const imgCtrlr = sys.require("/controllers/image");

/* Image Router Class */
const routerImage = (function(){
	function routerImage(){
		// the router itself to export
		this.router = sys.express.Router();

		return this.constructor();
	}

	routerImage.prototype.constructor = function(){
		this.router.get("/:id",this.getImage);
		this.router.post("/",this.postImage);
		this.router.put("/:id",this.putImage);
		this.router.delete("/:id",this.deleteImage);
	};

	routerImage.prototype.getImage = function(req,res,next){
		let ctrl = new imgCtrlr();
		let id = req.params.id;

		return ctrl.createAction(id)
		.then((response)=>{
			return res.status(200).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};

	routerImage.prototype.postImage = function(req,res,next){
		let ctrl = new imgCtrlr();
		let image = req.body;

		return ctrl.findOneAction(image)
		.then((response)=>{
			return res.status(201).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};

	routerImage.prototype.putImage = function(req,res,next){
		let ctrl = new imgCtrlr();
		let id = req.params.id;
		let image = req.body;

		return ctrl.editAction(id,image)
		.then((response)=>{
			return res.status(200).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};

	routerImage.prototype.deleteImage = function(req,res,next){
		let ctrl = new imgCtrlr();
		let id = req.params.id;

		return ctrl.deleteAction(id)
		.then((response)=>{
			return res.status(200).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};

	return routerImage;
})();


module.exports = new routerImage().router;
