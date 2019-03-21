/* eslint-disable */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import nodemon from 'nodemon';
import rename from 'gulp-rename';

gulp.task('css', () =>
  gulp.src('node_modules/foundation-sites/dist/css/foundation.css')
    .pipe(rename('app.css')).pipe(gulp.dest('dist/assets/css/'))
);

//setup nodemon task to run proxy server
gulp.task('nodemon', function (cb) {
  let restarted = false;
  var callbackCalled = false;

  browserSync.create();
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 9000,
    open: false
  });

  nodemon({
    exec: 'babel-node ./init.js',
    ext: 'js hbs',
    ignore: ['dist/'],
    watch: ['./'],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function () {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
    if (restarted) {
      setTimeout(() => {
        // reload browser after nodemon has
        // finished to restart
        browserSync.reload();
      }, 4000);
    }
  }).on('restart', function () {
    restarted = true;
    console.log('>> node restart');
  }).on('crash', function () {
    console.error('\nApplication has crashed!\n');
  });
});