#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
let helpObj = require("./commands/help");
const help = require("./commands/help");
let types = {
	media: ["mp4", "mkv", "mp3"],
	archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
	documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
	app: ['exe', 'dmg', 'pkg', "deb"],
	images: ['png', 'jpg', 'jpeg']
}
switch (command) {
	case "tree":
		treeObj.tree(inputArr[1]);
		break;
	case "organize":
		organizeObj.organize(inputArr[1]);
		break;
	case "help":
		helpObj.help();
		break;
	default:
		console.log("Please enter right command!");
}