
var gulp = require('gulp');

var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

var sass = require('gulp-sass');
var sync = require('browser-sync')
var babel = require('gulp-babel')
var babelify = require('babelify')
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var reload = sync.reload;
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')
var colors = require('gulp-colors')
var wiredep = require('wiredep').stream;

require('colors');

var path = {
	main: 'index.html'
}
gulp.task('bower', function() {
	return gulp.src(path.main)
	.pipe(wiredep({directory: 'bower_components'}))
	.pipe(gulp.dest('.'))
})

gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
	.pipe(plumber({
        errorHandler: function(err) {
        }
    }))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('dist/css'))
	.pipe(reload({stream: true}))
})

gulp.task('es6', function() {
	return gulp.src('src/scripts/*.js')
	.pipe(babel({presets: 'es2015'}))
	.pipe(gulp.dest('dist/js'))
	.on('end',reload)
})

// gulp.task('jshint', function() {
// 	return gulp.src('src/scripts/*.js')
// 	.pipe(jshint())
// 	.pipe(jshint.reporter('default'))
// })

// gulp.task('colors', function() {
// 	return gulp.src('css/style.css')
// 	.pipe(colors())
// 	.pipe(gulp.dest('css'))
// })

gulp.task('pack', function() { 
	browserify({
		entries: './src/scripts/main.js'
	})
	.transform(babelify)
	.bundle()
	.on("error", function (err) { console.log("Error : " + err.message); })
	.pipe(source('all.js'))
	.pipe(buffer())
	// .pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.on('end',reload)
})

gulp.task('serve', function() {
	sync.init({
		server: {	
			baseDir: '.'
		},
		open: true
	})

	watch('src/scss/*.scss', function() {
		gulp.start('sass')
	});
	watch('src/scripts/*.js', function() {
		gulp.start('pack')
	})
	// watch('scripts/*.js', function() {
	// 	gulp.start('es6')
	// })

	gulp.watch(['app.js'], reload);
	gulp.watch(['index.html'], reload);

	watch('src/views/*.html', function() {
		reload();
	})

	gulp.run("sass")
	gulp.run("pack")
	// gulp.watch('js/all.js', reload);
})