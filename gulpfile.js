const gulp = require('gulp');   //gulp mainly esliye use hota hai kuki css js images file ko chota krne ke liye taki running jldi ho jaye
//so basically gulp ke andr ar libraries hai bahat sare alg alg chizo ko minify krne ke liye example - js , css , images sabke ke liye alg libraries  
//gulp teen steps m download hua ..image in ss

const sass = require('gulp-sass');  //sass m rhta hai na phle code to //it converts sass file intocss file 
const cssnano = require('gulp-cssnano');  //now this minimizes the file into one line
const rev = require('gulp-rev'); //this file rename the file with a -cdfbg along with it , so that whenever it is sent to a browser it gets a new name wale file which is accepted be the browser  
const uglify = require('gulp-uglify-es').default; //js minify krne ke liye
const imagemin = require('gulp-imagemin'); //image minify krne ke liye
const del = require('del');//delete krne ke liye 



gulp.task('css', function(done){
    console.log('minifying css...');  //kuki aagejs and images file ke liye bhi karenge to esliye console kra
    gulp.src('./assets/sass/**/*.scss')  //so double star means any file and every file inside the folder and single star means any files with extension .sass
    //src m uska path diya jisko compress krna hai 
    //also .pipe is calling all the sub middlewares
    .pipe(sass())  //calling gulp sass file converting sass to css

    .pipe(cssnano()) //compressing the sass
    .pipe(gulp.dest('./assets.css'));   //destination file , but for production mode naye file banana better hai so public file banaye hai iske liye
    gulp.src('./assets/**/*.css') //jo result file aye the uper last line m usko uthaya
    .pipe(rev()) //usko remane kra by rev
    .pipe(gulp.dest('./public/assets')) //usko destionation pr rakha ie in public file
    .pipe(rev.manifest({   //creating a manifest - ie ye bhi jsonfile jesa hota hai {abc.css - abc-dsf.css ....}so jb bhi koi file mange jate css m to vo uske samne vale public vale se send kr deta hai 
                cwd: 'public',  //public  file se attach hai //about manifest - agr manifest create nhi kra to automatic create ho jayega ye
        merge: true  //if the name already exists ..then it will not make new one it will merge with the existing file
    }))
    .pipe(gulp.dest('./public/assets'));  //ye vps rakhna zaruri hai 
    done();
})

//last m gulp css likhkr termial pr chalaya 



//similarly images and js ke liye minification 
gulp.task('js', function(done){
    console.log('minifying js...'); //minifying js
     gulp.src('./assets/**/*.js') 
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){  //jb bhi server vps se chlta se fir yha se sare files delete one ka function and nye cycle chlte rhte hai 
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){ //ye jo likha hai ye regular expression m likha hai 
    console.log('Building assets');
    done();
});

//js m do files json m bante hai apne aap jisme ek m jb currently data enter hua ..and ek m abhi tk KA JITNA BHI Hua