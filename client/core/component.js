/*  */
let fs = require('fs');
let path = require('path');

/* Component */
const component = {
	_components: {},

	/* Component search */
	search: function() {
		let components = this._files("./components");
		for(let i = 0; i < components.length; i++) {
			content = require("."+components[i]);
			this.use(content.name, content());
		}
	},

	/* Create component */
	use: function(name, content) {
		this._components[name] = content;
	},

	/* Get component */
	get: function(name) {
		return this._components[name];
	},

	/* Search files */
	_files: function(dir, files_) {
		files_ = files_ || [];
		let files = fs.readdirSync(dir);
		for (let i in files){
			let name = dir + '/' + files[i];
			if (fs.statSync(name).isDirectory()){
				getFiles(name, files_);
			} else {
				files_.push(name);
			}
		}
		return files_;
	},

};

/* Export */
module.exports = component;