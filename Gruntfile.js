module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
         * WATCH
         */
        watch: {
            css: {
                files: ['assets/sass/*.scss', 'assets/sass/*/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify']
            }
        },

        /*
         * CSS
         */
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: {
                    'assets/build/css/style.css': 'assets/sass/style.scss',
                    'assets/build/css/print.css': 'assets/sass/print.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'assets/css/dev/style.css',
                dest: 'assets/css/dev/'
            }
        },

        /*
         * JS
         */
        concat: {
            dist: {
                src: ['assets/js/angular/*.js', 'assets/js/libs/*.js', 'assets/js/*.js'],
                dest: 'assets/build/js/script.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'assets/build/js/script.min.js': 'assets/build/js/script.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['css:dev', 'js:dev', 'watch']);
    grunt.registerTask('build', ['css:dev', 'js:dev']);

    grunt.registerTask('css:dev', ['sass', 'autoprefixer']);
    grunt.registerTask('js:dev', ['concat', 'uglify']);
};
