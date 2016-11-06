var gulp = require('gulp');
var typescript = require('gulp-typescript');
var del = require('del');
var zip = require('gulp-zip');
var lambda = require('gulp-lambda-deploy');

let params = {
    name: 'comsLambda',
    role: 'arn:aws:iam::722850008576:role/lambda-gateway-execution-role-test'
};
 
let options = {
    profile: 'default',
    region: 'us-east-1'
};

var paths = {
    src: ['src/**/*.ts'],
    out: ['out/**', '!out', '!out/package.json', '!out/node_modules', '!out/node_modules/**'],
    zip: ['out/**']
};

gulp.task('default', ['build']);

gulp.task('build', function () {
    return gulp.src(paths.src)
        .pipe(typescript({}))
        .js
        .pipe(gulp.dest('./out/'));
});

gulp.task('clean', function () {
    return del(paths.out);
});

gulp.task('zip', function () {
    return gulp.src(paths.zip)
        .pipe(zip('lambda.zip'))
        .pipe(gulp.dest('./'));
});
 
gulp.task('upload', function() {
    return gulp.src('./lambda.zip')
        .pipe(lambda(params, options));
});

gulp.task('deploy', ['clean', 'build', 'zip', 'upload'], function() {});

gulp.task('watch', function () {
    gulp.watch(paths.src, ['build']);
});