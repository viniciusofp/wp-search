module.exports = function(grunt) {
	var css = grunt.file.read('style.css');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-replace');
	grunt.initConfig({
		concat: {
		    dist: {
		      src: ['js/jquery-2.2.4.min.js', 'js/markerclusterer.min.js', 'js/angular.min.js', 'js/angular-route.min.js', 'js/angular-resource.min.js', 'js/angular-sanitize.min.js', 'js/sidebar.js', 'app.js'],
		      dest: 'dist/scripts.js',
		    },
		},
		uglify: {
		    options: {
		      mangle: false
		    },
		    my_target: {
		      files: {
		        'dist/scripts.min.js': ['dist/scripts.js']
		      }
		    }
		},
	  	watch: {
		  scripts: {
		    files: ['app.js'],
		    tasks: ['default'],
		    options: {
		      spawn: false,
		    },
		  },
		  styles: {
		    files: ['style.scss'],
		    tasks: ['sass'],
		    options: {
		      spawn: false,
		    },
		  },
		},
		sass: {
		    dist: {
		      options: {
		        style: 'compressed'
		      },
		      files: {
		        'style.css': 'style.scss',
		      }
		    }
		},
		replace: {
		  dist: {
		    options: {
		      patterns: [{
		        match: 'mycss',
		        replacement: css
		      }]
		    },
		    files: [{
		      expand: true,
		      flatten: true,
		      src: 'index.html',
		      dest: 'dist'
		    }]
		  }
		}

	});
	grunt.registerTask('default', ['concat', 'uglify'])
};