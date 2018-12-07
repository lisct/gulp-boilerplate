(function () {

    'use strict';

    /*
        DESCRIPTION FILE

        I created a workflow that's able to compile Sass into CSS while watching HTML and JS files for changes at the same time. We can run this task with the gulp command in the command line.

        Also I built a second task, build, that creates a dist folder for the production website. I compiled Sass into CSS, optimized all our assets, and copied the necessary folders into the dist folder. To run this task, we just have to type gulp build into the command line.

        Lastly, I have a clean task that clears away from the generated dist folder any image caches that are created, allowing us to remove any old files that were inadvertently kept in dist.
        
        Structure of the webapp folder:
        
          |- app/
              |- css/
              |- fonts/
              |- images/ 
              |- index.html
              |- js/ 
              |- scss/
          |- dist/
          |- gulpfile.js
          |- node_modules/
          |- package.json
          
        How it works:
            1 - open the terminal in the content folder $ cd this/folder
            2 -  $ npm install
            3 -  $ gulp
            4 -  when you are ready to deploy call $ gulp cache:clear
            5 -  call $ gulp build 

    */


    // plugins required
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        browserSync = require('browser-sync').create(),
        useref = require('gulp-useref'),
        uglify = require('gulp-uglify'),
        gulpIf = require('gulp-if'),
        cssnano = require('gulp-cssnano'),
        imagemin = require('gulp-imagemin'),
        cache = require('gulp-cache'),
        del = require('del'),
        runSequence = require('run-sequence');




    //task to compile scss to css (sass)
    gulp.task('compileSass', function(){

        return gulp.src('app/scss/**/*.scss') //Gets all files ending with .scss in app/scss
            .pipe(sass()) // using gulp-sass plugin
            .pipe(gulp.dest('app/css')) // destination folder for the scss compiled
            .pipe(browserSync.reload({
                  stream: true
                  }))

    });

    //task to reload the browser when we save .scss file (browserSync)
    gulp.task('reloadBrowser', function(){

        browserSync.init({
            server: {
                baseDir: 'app'
            },
        })

    });


    //task to minify files (useref)
    gulp.task('minify', function(){

        return gulp.src('app/*.html')
            .pipe(useref())
            .pipe(gulpIf('*.js', uglify())) // Minifies only if it's a JavaScript file
            .pipe(gulpIf('*.css', cssnano())) // Minifies only if it's a CSS file
            .pipe(gulp.dest('dist'))

    });

    //task to optimize images (imagemin)
    gulp.task('images', function(){

        return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
            .pipe(cache(imagemin()))
            .pipe(gulp.dest('dist/images'))

    });

    //task to move fonts to dist
    gulp.task('fonts', function() {

        return gulp.src('app/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'))

    });

    //task to clean file no longer used
    gulp.task('clean:dist', function() {

        return del.sync('dist');

    });
    
    
    
    
    
    /*
    ============================================================
      need to be called by task name (for production purposed)
    ============================================================
    */
    
    //task that clears away from the generated dist folder any image caches that are created, allowing us to remove any old files that were inadvertently kept in dist.
    gulp.task('cache:clear', function (callback) {

        return cache.clearAll(callback)

    });

    //task to create the productions files for the website ( that ensure that cleans get completed before the rest of the tasks)
    gulp.task('build', function(callback) {

        runSequence('clean:dist', 
            ['compileSass', 'minify', 'images', 'fonts'],
            callback
        )

    });

    /*
    ============================================================
      end
    ============================================================
    */
    
    
    
    
    
    //Gulp watch syntax - (function for multiple watch)
    gulp.task('watch',['reloadBrowser', 'compileSass'], function(){

        gulp.watch('app/scss/**/*.scss', ['compileSass']); // folder and task to watch

        // Reloads the browser whenever HTML or JS files change
        gulp.watch('app/*.html', browserSync.reload); // HTML
        gulp.watch('app/js/**/*.js', browserSync.reload); // JS


        //other watchers here

    });
    
    //gulp default you can run it simply by typing the gulp command
    gulp.task('default', function (callback) {

        runSequence(['compileSass','reloadBrowser', 'watch'],
            callback
        )

    });


    // example for a file with the rename 
    
    // var gulp = require('gulp'),
    // uglify = require('gulp-uglify'),
    // pump = require('pump'),
    // rename = require('gulp-rename');
    
     
    // gulp.task('default', function (cb) {
    //   pump([
    //         gulp.src('app/*.js'),
    //         uglify(),
    //         rename({ suffix: '.min' }),
    //         gulp.dest('dist')
    //     ],
    //     cb
    //   );
    // });


}());
