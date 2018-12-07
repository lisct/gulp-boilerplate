# Gulp Boilerplate

## Description

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
    

## How it's works

```bash

1 -  open the terminal in the content folder $ cd this/folder
2 -  npm install or yarn install
3 -  gulp 

```

Running local

```bash
http://localhost:3000
```

## Production

Run Build (Compile Public folder)

```bash
when you're ready to deploy call $ gulp cache:clear gulp build 
```

##  Dependencies

* "browser-sync": "^2.18.12",
* "del": "^2.2.2",
* "gulp": "^3.9.1",
* "gulp-cache": "^0.4.6",
* "gulp-cssnano": "^2.1.2",
* "gulp-imagemin": "^3.3.0",
* "gulp-sass": "^3.1.0",
* "gulp-uglify": "^3.0.0",
* "gulp-useref": "^3.1.2",
* "run-sequence": "^1.2.2"


