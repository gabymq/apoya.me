'use strict';
var express = require('express');
var router = express.Router();
var projCtrlr = require("../../controllers/project");

router
.get("/:id",function(req,res,next){
	var ctrl = new projCtrlr();
	var id = req.params.id;

	ctrl.findOne(id,function(response){
		var status = response.error ? 500 : 200;

		return res.status(status).json(response.msg);
	});
})
.post("/",function(req,res,next){
	var ctrl = new projCtrlr();
	var project = req.body;

	ctrl.create(project,function(response){
		var status = response.error ? 500 : 201;

		return res.status(status).json(response.msg);
	});
})
.put("/:id",function(req, res, next){
	var ctrl = new projCtrlr();
	var id = req.params.id;
	var project = req.body;

	ctrl.edit(id,project,function(response){
		var status = response.error ? 500 : 200;


		return res.status(status).json(response.msg);
	});
})
.delete("/:id",function (req,res,next) {
	var ctrl = new projCtrlr();
	var id = req.params.id;

	ctrl.delete(id,function(response){
		var status = response.error ? 500 : 200;

		return res.status(status).json(response.msg);
	});

});

module.exports = router;
