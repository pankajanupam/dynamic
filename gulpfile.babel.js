/* eslint-disable */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import nodemon from 'nodemon';

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
      console.error('\nApplication has crashed!\n')
      // console.error('Restarting in 2 seconds...\n')
      // setTimeout(function () {
      //   stream.emit('restart')
      // }, 2000)
    });
  });