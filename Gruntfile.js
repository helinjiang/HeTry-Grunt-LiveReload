"use strict";

module.exports = function (grunt) {

    //project configuration
    grunt.initConfig({

        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                port: 8000, // 服务器端口号，默认为8000
                hostname: 'localhost', // 服务器地址(可以使用主机名localhost，也能使用IP)
                base: './www-root'// 站点的根目录，物理路径(默认为Gruntfile.js所在目录，即值为".")
            },
            livereload: {
                options: {
                    middleware: function (connect, options, middlewares) {
                        /**
                         * 使用connect-livereload模块，生成一个LiveReload脚本，并通过LiveReload脚本，让页面重新加载:
                         * <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
                         */
                        var lrSnippet = require('connect-livereload')({
                            port: grunt.config.get('watch').client.options.livereload
                        });
                        middlewares.unshift(lrSnippet);
                        return middlewares;
                    }
                }
            }
        },

        // 检测文件变更，用于开发环境
        watch: {
            // Gruntfile.js变更时：重新加载watch
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            // 这里的文件变化之后，自动调用LiveReload刷新浏览器
            client: {
                options: {
                    livereload: 35729 // LiveReload的端口号，默认为35729
                },
                files: ['<%=connect.options.base || "."%>/*.html']
            }
        }

    });

    //加载各种grunt插件任务
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //创建服务器且免F5实时刷新页面
    grunt.registerTask('default', ['connect', 'watch']);
};
