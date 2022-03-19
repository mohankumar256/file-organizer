let fs = require("fs");
let path = require("path");
function organizefn(dirPath) {
	let destPath;
	if (dirPath == undefined) {
		dirPath = process.cwd();
	} else {
		let doesExist = fs.existsSync(dirPath);
		if (doesExist) {
			destPath = path.join(dirPath, "Organized_Files");
			if (fs.existsSync(destPath) == false) {
				fs.mkdirSync(destPath);
			}
		} else {
			console.log("Kindly enter the correct path");
			return;
		}
	}
	organiseHelper(dirPath, destPath);
}

function organiseHelper(src, dest) {
	let childNames = fs.readdirSync(src);
	// console.log(childNames);
	for (let i = 0; i < childNames.length; i++) {
		let childPath = path.join(src, childNames[i]);
		let isFile = fs.lstatSync(childPath).isFile();
		if (isFile) {
			// console.log(childNames[i]);
			let category = getCategory(childNames[i]);
			// console.log(category);
			sendFiles(childPath, dest, category);
		}
	}

}

function sendFiles(srcFilePath, dest, category) {
	let categoryPath = path.join(dest, category);
	if (fs.existsSync(categoryPath) == false) {
		fs.mkdirSync(categoryPath);
	}
	let fileName = path.basename(srcFilePath);
	// console.log(fileName);
	let destFilePath = path.join(categoryPath, fileName);
	fs.copyFileSync(srcFilePath, destFilePath);
	fs.unlinkSync(srcFilePath);
}

function getCategory(name) {
	let ext = path.extname(name).slice(1);
	// console.log(ext);
	for (let type in types) {
		let cTypeArray = types[type];
		for (let i = 0; i < cTypeArray.length; i++) {
			if (ext == cTypeArray[i]) {
				return type;
			}
		}
	}
	return "others";
}

module.exports = {
	organize:organizefn
}