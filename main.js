let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let command = inputArr[0];
let types = {
	media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}
switch (command) {
	case "tree":
		treefn(inputArr[1])
		break;
	case "organize":
		organizefn(inputArr[1])
		break;
	case "help":
		helpfn();
		break;
	default:
		console.log("Please enter right command!");
}

function treefn(dirPath) {
	console.log("Tree command implemented", dirPath);
}

function organizefn(dirPath) {
	let destPath;
	if (dirPath == undefined) {
		console.log("Kindly enter the path");
		return;
	} else {
		let doesExist = fs.existsSync(dirPath);
		if(doesExist){
			destPath = path.join(dirPath, "Organized_Files");
			if(fs.existsSync(destPath) == false){
				fs.mkdirSync(destPath);
			}
		}else{
			console.log("Kindly enter the correct path");
			return;
		}
	}
	organiseHelper(dirPath, destPath);
}

function organiseHelper(src, dest) {
	let childNames =  fs.readdirSync(src);
	// console.log(childNames);
	for(let i = 0; i<childNames.length; i++){
		let childPath = path.join(src, childNames[i]);
		let isFile = fs.lstatSync(childPath).isFile();
		if(isFile){
			// console.log(childNames[i]);
			let category = getCategory(childNames[i]);
			// console.log(category);
			sendFiles(childPath, dest, category);
		}
	}

}

function sendFiles(srcFilePath, dest, category){
	let categoryPath = path.join(dest, category);
	if(fs.existsSync(categoryPath) == false){
		fs.mkdirSync(categoryPath);
	}
	let fileName = path.basename(srcFilePath);
	// console.log(fileName);
	let destFilePath = path.join(categoryPath, fileName);
	fs.copyFileSync(srcFilePath, destFilePath);
	fs.unlinkSync(srcFilePath);
}

function getCategory(name){
	let ext = path.extname(name).slice(1);
	// console.log(ext);
	for(let type in types){
		let cTypeArray = types[type];
		for(let i = 0; i<cTypeArray.length; i++){
			if(ext == cTypeArray[i]){
				return type;
			}
		}
	}
	return "others";
}

function helpfn() {
	console.log(`
	List of All the commands:
			node main.js tree "directoryPath"
			node main.js organize "directoryPath"
			node main.js help
				`);
}

