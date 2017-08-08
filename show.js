var fs = require('fs')

var home = 'C:\\Users\\SEROFCA 1\\Desktop\\DESCARGAS'

var endText = ''

var htmlOfFolder = function (dir,nom) {
	data = fs.readdirSync(dir,'utf-8')
	if (!data) {
		return ''
	}
	let folders = '', files = ''
	data.forEach(function(e) {
		if (fs.lstatSync(dir+'\\'+e).isDirectory()) {
			folders += `\t<div class="a-link" dest="${e}">\n\t\t<i class="fa fa-folder"></i>\n\t\t<span>${e}</span>\n\t</div>\n`
		} else {
			files += `\t<div class="a-file" dest="${e}">\n\t\t<i class="fa fa-file-pdf-o"></i>\n\t\t<span>${e}</span>\n\t</div>\n`
		}
	})
	if (nom==='root') {
		return `<section id="a-root" class="a-node" app-id="${nom}">\n`+folders+files+"</section>\n"
	}
	return `<section class="a-node" app-id="${nom}">\n`+folders+files+"</section>\n"
}

var recursiveCrawling = function(folderDir,first) {
	let data = fs.readdirSync(folderDir,'utf-8')
	if (!data) {
		console.log('unknown error')
		return
	}
	if (!first) {
		let split = folderDir.split('\\')
		endText += htmlOfFolder(folderDir,split[split.length-1])
	}else{
		endText += htmlOfFolder(home,'root')
	}
	data.forEach(function(e){
		if (fs.lstatSync(folderDir+'\\'+e).isDirectory()) {
			recursiveCrawling(folderDir+'\\'+e)
		}
	})
	if (first) {
		fs.writeFile('result.txt',endText,function(err) {
			if (err) {
				throw err
			}
			console.log('GOOD!')
		})
	}
}
recursiveCrawling(home,true)