var fs         = require("fs"),
    gulp       = require("gulp"),
    browserify = require("browserify"),
    uglify     = require('gulp-uglify');


gulp.task('default', function () {
    return browserify("./src/jquery.photoswipe.js")
        .transform("babelify")
        .transform("browserify-shim")
        .bundle()
        .pipe(fs.createWriteStream("./dist/jquery.photoswipe.js"));
});

gulp.task('uglify', function () {
    return gulp.src('dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    return gulp.watch('src/*.js', ['default']);
});