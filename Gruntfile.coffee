module.exports = (grunt) ->
  grunt.initConfig
    babel:
      compile:
        expand: true
        options:
          sourceMap: true
          presets: ['babel-preset-es2015']
        cwd: "#{__dirname}/src/"
        src: ['**/*.js', '!*.test.js']
        dest: 'lib/'
        ext: '.js'
      tests:
        expand: true
        options:
          sourceMap: true
          presets: ['babel-preset-es2015']
        flatten: false
        cwd: "#{__dirname}/tests/"
        src: ['*.js']
        dest: 'test/'
        ext: '.js'

  grunt.loadNpmTasks 'grunt-babel'
  grunt.registerTask 'build', ['babel']
  grunt.registerTask 'default', ['babel']
