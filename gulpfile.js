var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('styles', function() {
  return gulp.src('_scss/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('./css'));
});

gulp.task('cssmin', function () {
	return gulp.src(['./css/*.css', '!.css/style.min.css'])
		.pipe(cssmin())
		.pipe(concat('./style.min.css'))
		.pipe(gulp.dest('./css'));
});

gulp.task('uglify', function () {
	return gulp.src(['./js/jquery.js','./js/routely.js',
		'./js/main.js', '!.js/main.min.js'])
		.pipe(uglify())
		.pipe(concat('./main.min.js'))
		.pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
  gulp.watch('_scss/*.scss', ['styles']);
	});
	gulp.task('default', ['express', 'watch'], function() {
});

gulp.task('default', ['styles', 'watch', 'cssmin', 'uglify']);