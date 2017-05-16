'use strict';

const os 		= require('os');
const path 		= require('path');
const express 	= require('express');
const fs 		= require('fs');
const SocketIo	= require('socket.io');

const systemTools = (function(){
	function systemTools(){
		// declare parent directory as basePath
		process.chdir( path.join( __dirname , '../' ) );

		const baseDir = process.cwd();

		//project directories list
		this.dir = {
			base: 			baseDir,
			config: 		baseDir + "/config",
			model: 			baseDir + "/models",
			route: 			baseDir + "/routes",
			public: 		baseDir + "/public",
			view: 			baseDir + "/views",
			controller: 	baseDir + "/controllers",
		};

		// Environment vars
		this.env = this.getConfig('env');
	}

	/*
	 * System Info
	 */
	systemTools.prototype.getlocalIp = function(){
		let interfaces = os.networkInterfaces();
		let localAddresses = [];

		for (let k in interfaces) {
			for (let k2 in interfaces[k]) {
				let address = interfaces[k][k2];

				if (address.family === 'IPv4' && !address.internal) {
					localAddresses.push( address.address );
				}
			}
		}

		return localAddresses;
	};

	systemTools.prototype.getProjectUrls = function(){
		let localIPs = this.getlocalIp();
		let RES = [];

		localIPs.forEach((v,k)=>{
			RES.push( v + ":" + this.env.port );
		});

		RES.push( this.env.host + ":" + this.env.port );

		return RES
	};

	/*
	 * System Loaders
	 */
	systemTools.prototype.require = function(Module){
		if( Module && typeof Module === 'string' ){
			let	modOrOPack		= ( Module.charAt(0) === "/" );
			let	requireString	= modOrOPack ? this.path.join( this.dir.base , Module ) : Module;

			return require( requireString );

		} else {
			console.error('error trying to load module, module must be a STRING and you used:');
			this.dd( Module );
		}
	};

	systemTools.prototype.getSysModule = function(layer,module){
		// handle for all modules except models
		if( layer && typeof layer == 'string' && layer != 'model' && layer in this.dir ){
			// handle for subfolders
			let LayerPath	= this.dir[ layer ];
			let RES			= {};
			let isSubFolder = ( module.indexOf('/') > -1 );
			let filePathArr = ( isSubFolder ) ? module.split("/") : module;
			module 			= ( isSubFolder ) ? filePathArr.pop() : module;
			LayerPath		+= ( isSubFolder ) ? filePathArr.join("/") : "";
			LayerPath		= this.path.resolve( LayerPath );


			// if( layer ){
			// 	// handle for subfolders
			// 	let isSubFolder = ( module.indexOf('/') > -1 );
			// 	let filePathArr = ( isSubFolder ) ? module.split("/") : module;
			// 	let Module 		= ( isSubFolder ) ? filePathArr.pop() : module;
			// 	let LayerPath	= this.dir[ layer ];
			// 	LayerPath		+= ( isSubFolder ) ? filePathArr.join("/") : "";
			// 	LayerPath		= this.path.resolve( LayerPath );

			// 	this.dump( layer, module, isSubFolder, filePathArr, Module, LayerPath );
			// }

			fs
			.readdirSync( LayerPath )
			.filter((file)=>{
				// If the module was requested only include that module whether it was requested with extension or not
				if( module && typeof module == 'string' ){
					// fullpath module
					// module js
					// module json
					return ( module === file || module+'.js' === file || module+'.json' === file || module+'.pug' === file ) ? file : null;
				} else {
					// include all js and json files
					return ( file.split('.').pop() === 'js' || file.split('.').pop() === 'json' ) ? file : null;
				}
			})
			.forEach((file)=>{
				const attributeName		= file.split('.').shift();
				const modulePath		= this.path.resolve( this.path.join( LayerPath,file ) );

				RES[ attributeName ] 	= require( modulePath );
			});

			// return requested file(s)
			return RES;
		}

		// Handle for modules
		else if( layer && typeof layer == 'string' && layer == 'model' && layer in this.dir ){
			let		RES				= {};
			const	layerPath		= this.path.resolve( this.dir[ layer ] );
			const	Models 			= require( layerPath );

			// handle for return all nodels
			if( !module ){
				RES = Models;
			}

			// handle for return an speficic model
			else if( module && typeof module == 'string' && module in Models ){
				RES[module] = Models[module];
			}

			// return requested model(s)
			return RES;
		}

		// Handle for invalid arguments
		else {
			console.error('error trying to load module, with provides parameters:');
			this.dd( arguments );
		}
	};

	systemTools.prototype.getBase = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "base" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	systemTools.prototype.getConfig = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "config" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	systemTools.prototype.getModel = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "model" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	systemTools.prototype.getRoute = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "route" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	systemTools.prototype.getPublic = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "public" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	systemTools.prototype.getViews = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "views" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	systemTools.prototype.getController = function(mod){
		mod = (mod && typeof mod === 'string') ? mod : false;
		let Module = this.getSysModule.call( this, "controller" , mod );
		let returnKey = ( mod && mod.indexOf('/') > -1  ) ? mod.split('/').pop() : mod;

		return ( mod ) ? Module[returnKey] : Module;
	};

	// Databse Config for Environment
	systemTools.prototype.getDbConfig = function(){
		// get the database config
		const dbCfg = this.getConfig('db');

		// return db config accordint ot env
		return dbCfg[ this.env.env ];
	};

	systemTools.prototype.fileExists = function(pathTofile){
		return ( fs.existsSync( pathTofile ) );
	};

	systemTools.prototype.fileExistsRel = function(filePath){
		return this.fileExists( this.dir.base + filePath );
	};



	systemTools.prototype.dump = function(){
		console.log("\n//*------- start Data dumping...\n");
		for ( var arg in arguments ){
		    // Notify about which arg are dumping
		    console.info('\n\n\t...for argument:{'+arg+"}\n");
		    //print type
		    console.log( 'Type: ', typeof arguments[arg] );
		    // print length if exists
		    if( arguments[arg] && arguments[arg].length ){
		        console.log( 'Legth: ', arguments[arg].length );
		    }
		    // print Value
		    if( typeof arguments[arg] === "string" || /^\d+$/.test( arguments[arg] ) ){
		        console.log( 'Value: ', arguments[ arg ] );
		    } else {
		        console.log( 'Value: ');
		        console.dir( arguments[ arg ] );
		    }
		}
		console.log("\n\t\tData dump done! -------*//\n");
	};

	systemTools.prototype.die = function(){
		console.trace();
		console.info("\n\n\nnow Process will die\n\n");
		process.exit();
	};

	systemTools.prototype.dd = function(){
		this.dump.apply( this, arguments );
		this.die();
	};

	/**
	 *	Additional systemTools to prevent require Inception
	 * 	path for directory tasks
	 * 	fs for file tasks
	 *	Express for use it in app and routers
	 *	Socket.io for realtime I/O
	 */
	systemTools.prototype.path = path;
	systemTools.prototype.fs = fs;
	systemTools.prototype.express = express;
	systemTools.prototype.io = SocketIo

	return systemTools;
})();

global.sys = new systemTools();
