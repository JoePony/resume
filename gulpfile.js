var gulp = require('gulp');
// var fs = require('fs');
// var path = require('path');
// var merge = require('merge-stream');
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss= require('gulp-minify-css');
// var watch = require('gulp-watch');

// var scriptsPath = 'javascript';

// function getFolders(dir) {
//     return fs.readdirSync(dir)
//       .filter(function(file) {
//         return fs.statSync(path.join(dir, file)).isDirectory();
//       });
// }

// gulp.task('js', function() {
//    var folders = getFolders(scriptsPath);
//    var tasks = folders.map(function(folder) {
//       // 拼接成 foldername.js
//       // 写入输出
//       // 压缩
//       // 重命名为 folder.min.js
//       // 再一次写入输出
//       return gulp.src(path.join(scriptsPath, folder, '/*.js'))
//         .pipe(concat(folder + '.js'))
//         .pipe(gulp.dest(scriptsPath))
//         .pipe(uglify())
//         .pipe(rename(folder + '.min.js'))
//         .pipe(gulp.dest(scriptsPath));
//    });

//    return merge(tasks);
// });
var srcCSS='source/css/*.css',
    destCss='css/';
gulp.task('css', function() {    //处理scss文件
  // return sass(srcCss, { style: 'expanded' })
  return gulp.src(srcCSS)
    // .pipe(autoprefixer('last 2 version', 'safari 2', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) //加前缀
    // .pipe(rename({suffix: '.min'}))            //加.min
    .pipe(minifycss())                         //压缩css
    .pipe(gulp.dest(destCss));                 //指定目标路径
});
 
var srcJS1=['source/js/plugins/*.js','!js/script/*.min.js'], 
    destJS1='js/plugins/';
gulp.task('js1', function() {
    return gulp.src(srcJS1)       //源文件路径
    // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(uglify({
        mangle: false//类型：Boolean 默认：true 是否修改变量名
        // ,compress: true//类型：Boolean 默认：true 是否完全压缩
        // ,preserveComments: 'all' //保留所有注释
    }))    //压缩
    .pipe(gulp.dest(destJS1));  //输出到压缩后路径
    // .pipe(concat('main.js'))    //合并所有js到main.js
    // .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
});

var srcJS2=['source/js/*.js','!js/script/*.min.js'], 
    destJS2='js/';
gulp.task('js2', function() {
    return gulp.src(srcJS2)       //源文件路径
    // .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(uglify({
        mangle: false//类型：Boolean 默认：true 是否修改变量名
        // ,compress: true//类型：Boolean 默认：true 是否完全压缩
        // ,preserveComments: 'all' //保留所有注释
    }))    //压缩
    .pipe(gulp.dest(destJS2));  //输出到压缩后路径
    // .pipe(concat('main.js'))    //合并所有js到main.js
    // .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
});


gulp.task('watch',function(){
    gulp.watch(srcJS1,['js']);
    gulp.watch(srcJS2,['js']);
    gulp.watch(srcCSS,['css']);
});

gulp.task('default',['css','js1','js2']);