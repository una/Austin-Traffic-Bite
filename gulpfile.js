var gulp = require('gulp')
var cssmin = require('gulp-cssmin')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

gulp.task('cssmin', function () {
	return gulp.src(['./css/*.css', '!.css/main.min.css'])
		.pipe(cssmin())
		.pipe(concat('./main.min.css'))
		.pipe(gulp.dest('./css'));
});

gulp.task('uglify', function () {
	return gulp.src(['./js/jquery.js','./js/routely.js',
		'./js/main.js', '!.js/main.min.js'])
		.pipe(uglify())
		.pipe(concat('./main.min.js'))
		.pipe(gulp.dest('./js'));
});

gulp.task('default', ['cssmin', 'uglify']);