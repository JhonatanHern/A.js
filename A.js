/*
	create a file system simulator with A.js
	Copyright (C) 2017 Jhonatan Hernández

	This program is free software; you can redistribute it and/or modify it under
	the terms of the GNU General Public License as published by the Free Software Foundation;
	either version 2 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
	or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along with this program;
	if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
	MA 02111-1307 USA
*/
document.addEventListener('DOMContentLoaded',function() {
	let app = {
		container      : document.getElementById('a-filesystem'),
		nodes          : Array.from(document.getElementsByClassName('a-node')),
		folderPointers : Array.from(document.getElementsByClassName('a-link')),
		currentNode    : document.getElementById('a-root'),
		history        : ['root'],
		backButton     : document.getElementById('a-back'),
		input          : document.getElementById('a-input'),		
		files          : Array.from(document.getElementsByClassName('a-file'))
	}
	if (!app.container) {
		console.log('app container not found')
		return
	}
	app.folderPointers.forEach(function(el) {
		el.addEventListener('click',function() {
			let newNode , target = this.getAttribute('dest')
			try{
				newNode = app.nodes.filter(function(e){
					return e.getAttribute('app-id')===target
				})[0]
				if (!newNode) {throw ""}
			}catch(e){
				alert('folder not found')
				return
			}
			app.currentNode.style.display='none'
			app.currentNode = newNode
			app.history.push(newNode.getAttribute('app-id'))
			app.currentNode.style.display='block'
		})
	})
	//console.log(app.backButton)
	app.backButton.addEventListener('click',function() {
		if (app.history.length===1) {return}
		app.currentNode.style.display='none'
		let target = app.history[app.history.length-2]
		app.currentNode = app.nodes.filter(e=> e.getAttribute('app-id')===target )[0]
		app.currentNode.style.display = 'block'
		app.history.pop()
	})
	app.files.forEach(function(e) {
		e.addEventListener('click',function() {
			 window.open(this.getAttribute('dest'), "_blank");
		})
	})
	app.input.addEventListener('keyup',function(){
		let text = this.value
		app.folderPointers.concat(app.files).forEach(function(e) {
			if (e.innerText.indexOf(text)===-1) {
				e.style.display = 'none'
			} else {
				e.style.display = 'block'
			}
		})
	})
})