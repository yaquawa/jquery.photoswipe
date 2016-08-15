var gulp       = require("gulp"),
    browserify = require('browserify'),
    through2   = require('through2'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify'),
    replace    = require('gulp-replace'),
    rename     = require("gulp-rename");


gulp.task('default', function () {

    // set up the browserify instance on a task basis
    var b = browserify({
        entries: 'src/jquery.photoswipe.js',
        // debug: true,
        // defining transforms here will avoid crashing your stream
        // transform: ['babelify','aliasify']
    });


    return b.bundle()
        .pipe(source('jquery.photoswipe.js'))
        .pipe(buffer())
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