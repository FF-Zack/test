var gulp = require("gulp");
var weex = require("gulp-weex");

gulp.task('default',function(){
    return gulp.src('./src/*.html')
            .pipe(weex({}))
            .pipe(gulp.dest('./dist'));
});