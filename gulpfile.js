const { watch, series, src, dest } = require("gulp");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");

function cssTask(cb) {
	return src("./src/*.css")
		.pipe(postcss())
		.pipe(dest("./assets/css"))
		.pipe(browserSync.stream());
	cb();
}

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

// Watch Task
function watchTask() {
	watch("./**/*.html", browsersyncReload);
	watch(["./src/*.css"], series(cssTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(cssTask, browsersyncServe, watchTask);
exports.css = cssTask;
exports.images = imageminTask;
