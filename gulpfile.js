const { watch, series, src, dest } = require("gulp");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");

// Task for compiling our CSS files using PostCSS
function cssTask(cb) {
	return src("./src/*.css") // read .css files from ./src/ folder
		.pipe(postcss()) // compile using postcss
		.pipe(dest("./assets/css")) // paste them in ./assets/css folder
		.pipe(browserSync.stream());
	cb();
}

// Task for minifying images
function imageminTask(cb) {
	return src("./assets/images/*")
		.pipe(imagemin())
		.pipe(dest("./assets/images"));
	cb();
}

function browsersyncServe(cb) {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	cb();
}

function browsersyncReload(cb) {
	browserSync.reload();
	cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
	watch("./**/*.html", browsersyncReload);
	watch(["./src/*.css"], series(cssTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(cssTask, browsersyncServe, watchTask);
exports.css = cssTask;
exports.images = imageminTask;
