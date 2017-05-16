"use strict";
const projCtrlr = sys.getController("project");

/* Project Router Class */
const projectRouter = (function(){
	function projectRouter() {
		// the router itself to export
		this.router = sys.express.Router();

		return this.constructor();
	}

	projectRouter.prototype.constructor = function(){
		this.router.get("/:id",this.getProject);
		this.router.post("/",this.postProject);
		this.router.put("/:id",this.putProject);
		this.router.delete("/:id",this.deleteProject);
	};

	projectRouter.prototype.getProject = function(req,res,next){
		let ctrl = new projCtrlr();
		let id = req.params.id;

		return ctrl.findOneAction(id)
		.then((response)=>{
			return res.status(200).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};
	projectRouter.prototype.postProject = function(req,res,next){
		let ctrl = new projCtrlr();
		let project = req.body;

		return ctrl.createAction(project)
		.then((response)=>{
			return res.status(201).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};
	projectRouter.prototype.putProject = function(req,res,next){
		let ctrl = new projCtrlr();
		let id = req.params.id;
		let project = req.body;

		return ctrl.editAction(id,project)
		.then((response)=>{
			return res.status(200).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};
	projectRouter.prototype.deleteProject = function(req,res,next){
		let ctrl = new projCtrlr();
		let id = req.params.id;

		return ctrl.deleteAction(id)
		.then((response)=>{
			return res.status(200).json(response.msg);
		})
		.catch((err)=>{
			return res.status(500).json(err.msg);
		});
	};


	return projectRouter;
})();


module.exports = new projectRouter().router;
