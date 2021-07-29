var gulp = require('gulp');
// npm install gulp-clean-css --save-dev
var cleanCSS = require('gulp-clean-css');
// npm install gulp-sass --save-dev
var sass = require('gulp-sass');
// npm install gulp-uglify --save-dev
var uglify = require('gulp-uglify');
// npm install gulp-concat --save-dev
var concat = require('gulp-concat');

// gulp.task('default', function() {
// 	console.log('Gulp js is running');
// });

gulp.task('css', function() {
	return gulp.src(['assets/css/font-awesome.css','assets/css/bootstrap.min.css',
					'assets/css/style.css'])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(concat('webapp.min.css'))
		.pipe(gulp.dest('assets/dist'));
});

gulp.task('sass', function() {
   	return gulp.src('assets/sass/style.scss')
		.pipe(sass())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
    return gulp.src(['assets/js/jquery.min.js','assets/js/popper.min.js',
    				'assets/js/bootstrap.min.js'])
		.pipe(uglify())
		.pipe(concat('webapp.min.js'))
		.pipe(gulp.dest('assets/dist'));
});

gulp.task('watch', function() {
	gulp.watch('assets/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('assets/css/*.css', gulp.series('css'));
});

gulp.task('build', function() {
   gulp.watch('assets/css/*.css', gulp.series('css'));
   gulp.watch('assets/js/*.js', gulp.series('js'));
});
