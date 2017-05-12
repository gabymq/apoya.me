'use strict';

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
			config: 		"/config",
			models: 		baseDir + "/models",
			routes: 		baseDir + "/routes",
			public: 		baseDir + "/public",
			views: 			baseDir + "/views",
			controllers: 	baseDir + "/controllers",
		};

		// Environment vars
		this.env = this.getConfig('/env.json');
	}

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

	// Config Loader
	systemTools.prototype.getConfig = function(configFile){
		const configFilePath = this.dir.config + configFile;

		return this.require( configFilePath );
	};

	// Databse Config for Environment
	systemTools.prototype.getDbConfig = function(){
		// get the database config
		const dbCfg = this.getConfig('/db');

		// return db config accordint ot env
		return dbCfg[ this.env.env ];
	};

	systemTools.prototype.fileExists = function(pathTofile){
		return ( fs.existsSync( pathTofile ) );
	};

	systemTools.prototype.fileExistsRel = function(filePath){
		return this.fileExists( this.dir.base + filePath );
	};

	systemTools.prototype.getProjectUrl = function(){
		return this.env.host + ":" + this.env.port;
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
	 *	Express for use it in app and routers
	 *	Socket.io for realtime I/O
	 */
	systemTools.prototype.path = path;
	systemTools.prototype.express = express;
	systemTools.prototype.io = SocketIo

	return systemTools;
})();

global.sys = new systemTools();
