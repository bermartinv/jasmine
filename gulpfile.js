var gulp = require('gulp');                             // instalar gulp
var sass = require('gulp-sass');                        // convertir de sass a css
var autoprefixer = require('gulp-autoprefixer');        // autoprefixer para nuestro codigo css
var browserSync = require('browser-sync').create();     // conectamos a servidor
var htmlmin = require('gulp-htmlmin');                  // comprime el html
var imagemin = require('gulp-imagemin');                // comprime imagenes
var uglify = require('gulp-uglify');                    // comprime el js
var babel = require('gulp-babel');                      // transpile js
var sourcemaps = require('gulp-sourcemaps');            // sourcemaps para js y css, el navegador hace referencia a su linea aunque estén comprimidos
// var jasmine = require('gulp-jasmine-phantom');

gulp.task('default',['esential'],function(){
    /* Conectamos servidor para poder ver nuestro cambion en tiempo real */
    browserSync.init({
        server: "./app"					
        });
    /* Si cambiamos nuestro sass ejecuta esential */
    gulp.watch('sass/**/*.scss',['esential']);
    /* Si cambiamos nuestro html actualizamos con browser-sync */
    gulp.watch("app/*.html").on('change', browserSync.reload);
    /* Si cambiamos nuestro js actualizamos con browser-sync */
    gulp.watch('app/js/*.js',['javascript']).on('change', browserSync.reload);
    // tarea minificar htmlmin 
    gulp.watch('./*.html',['html']);
});

/* Comprime html, css, js */
gulp.task('comprimir', function(){
    /* hml */
    gulp.src('app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('app'));
    /* js */
    gulp.src('app/js/**/*.js')
        .pipe(sourcemaps.init())                        // sourcemap
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js/'));
    /* comprimimos el css desde sass */
    gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('app/css'));
});


/* Transpile ES6 to js */
gulp.task('transpile', function(){
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js/*.js'));
})

gulp.task('html',function(){
    return gulp.src('./*.html')
        .pipe(gulp.dest('app'));
});

gulp.task('javascript',function(){
    return gulp.src('./js/**/*.js')
        .pipe(gulp.dest('app/js'));
});

/* Para comprimir nuestras imagenes, creamos una tarea aparte porque solo hace falta una vez,
    si no quisieramos comprimir y solo pasar las fotos al folder podriamos hacer:
        gulp.src('./images/*')
            .pipe(gulp.dest('app/images'))
*/

gulp.task('imagemin', () =>
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/images'))
);



gulp.task('esential',function(){
    /* mandamos nuestro sass a css y con autoprefixer */
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        /* alfinal de nuestro css pondremos : /*#sourceMappingURL = style.css.map */    
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
})
