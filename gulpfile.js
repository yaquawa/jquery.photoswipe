var gulp       = require("gulp"),
    browserify = require('browserify'),
    through2   = require('through2'),
    uglify     = require('gulp-uglify'),
    replace    = require('gulp-replace'),
    rename     = require("gulp-rename");

var browserified = function (options) {
    options = Object.assign({
        transform: []
    }, options);

    return through2.obj(function (file, enc, next) {
        var b = browserify(file.path);
        options.transform.forEach(function (transform) {
            b.transform(transform);
        });
        b.bundle(function (err, res) {
            // assumes file.contents is a Buffer
            file.contents = res;
            next(null, file);
        });
    })
};

gulp.task('default', function () {

    return gulp.src('src/jquery.photoswipe.js')
        .pipe(browserified({
            transform: ['babelify', 'browserify-shim']
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(replace(/\/\*[\s]*?<<<GLOBAL([\s\S]*?)GLOBAL;[\s]*?\*\//g, '$1'))
        .pipe(rename({
            suffix: "-global"
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', function () {
    return gulp.src('dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/min'));
});

gulp.task('watch', function () {
    return gulp.watch('src/*.js', ['default']);
});