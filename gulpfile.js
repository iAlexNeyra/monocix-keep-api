const gulp = require('gulp');
const gulpts = require('gulp-typescript');
const gulpnodemon = require('gulp-nodemon');
const gulpdocs = require('gulp-jsdoc3');

const ts = gulpts.createProject('tsconfig.json');
gulp.task('ts', ()=>{
    return gulp.src('./src/**/*.ts')
      .pipe(ts())
      .pipe(gulp.dest('./dist'))
});

gulp.task('watch', ()=>{
  gulp.watch('./src/**/*.ts', ['ts']);
});

gulp.task('nodemon', ()=>{
    return gulpnodemon({
      script: './dist/index.js',
      watch: './dist'
    });
});

gulp.task('docs', ['ts'], (cb)=>{
  gulp.src(['README.md', './dist/**/*.js'], {read: false})
    .pipe(gulpdocs(cb));
});

gulp.task('start', ['ts','watch', 'nodemon']);
