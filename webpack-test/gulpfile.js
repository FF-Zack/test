var gulp = require('gulp'),                                         //gulp
    webpack = require('gulp-webpack'),                              //webpack
    less = require('gulp-sass'),                                    //less
    concat = require('gulp-concat'),                                //合并JS
    uglify = require('gulp-uglify'),                                //压缩JS 
    rev = require('gulp-rev-append'),                               //引用文件版本号
    cssmin = require('gulp-minify-css'),                            //压缩CSS
    cssver = require('gulp-make-css-url-version'),                  //CSS引用文件MD5
    imagemin = require('gulp-imagemin'),                            //压缩图片
    autoprefixer = require('gulp-autoprefixer'),                    //自动补齐前缀
    watch = require('gulp-watch'),                                  //监听任务
    clean = require('gulp-clean');                                  //清除文件
var webpackConfig = require('./webpack.config.js');

/**
 *webpack处理
 */
gulp.task('webpack', function () {
    var myConfig = Object.create(webpackConfig);
    return gulp.src('./')
                .pipe(webpack(myConfig))
                .pipe(gulp.dest('./src/js'));
});

 /**
  * sass 处理
  */
gulp.task('sass', function () {
    return gulp.src('src/css/sass/*.sass')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

/**
 * 压缩css
 */
gulp.task('cssmin', ['sass'] , function () {   //执行完less再执行cssmin
    return gulp.src('src/css/*.css')
        //CSS引用文件MD5
        .pipe(cssver())
        //压缩CSS    
        .pipe(cssmin({
            advanced: false,   //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: '*',//类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true   //类型：Boolean 默认：false [是否保留换行]
        }))
        //自动补齐前缀
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],                       //last 2 versions 主流浏览器的最新2个版本
            cascade: true,                                       //是否美化属性值 默认：true
            remove:true                                          //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});


/**
 * 压缩js
 */
gulp.task('uglify',function () {
    return gulp.src(['src/js/*.js'])    //'!src/static/js/main/*js' 不压缩
        .pipe(uglify({
            mangle: true,                         //类型：Boolean 默认：true 是否修改变量名
            compress: true                        //类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('dist/js'));
});


/**
 * 合并js
 */
gulp.task('concatJs', ['uglify'],function() {
    gulp.src(['dist/js/*.js','!dist/js/jquery.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

/**
 * 合并css
 */
gulp.task('concat', ['cssmin'],function() {
    gulp.src(['dist/css/*.css','!dist/css/main.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
});

/**
 * 图片处理
 */
gulp.task('imagemin', function () {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))   
        .pipe(gulp.dest('dist/img'));
});


/**
 * 添加版本号
 */
gulp.task('rev', function () {
    return gulp.src('src/*.html')
        .pipe(rev())                             //引用文件版本号
        .pipe(gulp.dest('dist/'));
});


/**
 * 清空图片、样式、js
 */
gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});


/**
 * 默认任务 运行语句 gulp
 */
gulp.task('default', ['clean'], function(){
    gulp.start('webpack');
    return gulp.start('sass','cssmin','uglify','rev','imagemin','concat');
});

/**
 * 监听任务 运行语句 gulp watch
 */
gulp.task('watch',function(){

    // 监听html
    gulp.watch('src/*.html', function(){
        gulp.run('rev');
    });

    // 监听less
    gulp.watch('src/css/sass/*.sass', function(){
        gulp.run('sass');
    });

    // 监听css
    gulp.watch('src/css/*.css', function(){
        gulp.run('cssmin');
    });

    // 监听images
    gulp.watch('src/images/*.{png,jpg,gif,ico}', function(){
        gulp.run('imagemin');
    });

    // 监听js
    gulp.watch('src/script/*.js', function(){
        gulp.run('uglify','concatJs','webpack');
    });
});