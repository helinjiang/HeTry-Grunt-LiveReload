# LiveReload
苦B的前端每次在制作和修改页面时，都有一个特定的三部曲：coding-save-F5。很多时候都希望自己一改东西，页面就能立刻显示，免F5手动刷新，而本项目就是为了解决这个问题。

本项目是“**自动监测文件变化且免F5刷新页面**”的Grunt解决方案。

## 使用
下载完成之后，首先安装模块：

``npm install``

然后再运行：

``grunt``

浏览器访问： `http://localhost:8000/`

接下来见证奇迹的时候来了！

随意修改www-root目录中的index.html文件内容，然后看看页面，是否发现神奇的事情已经发生了呢？

## 代码说明
各插件的使用请参考其官方文档的说明。

在本示例中，我们设置了web服务器的根目录为`./www-root`，并且设置了这个目录下的html文件（不包括子目录的html文件）一旦发生了变化，就会自动重载页面。


## 如何做到的
### 难点一：如何知道文件发生了变化
Grunt团队官方提供了一个插件：grunt-contrib-watch，它可用于监听文件或文件夹新增、修改和删除变化。

### 难点二：如何免F5刷新
使用[http://livereload.com/](http://livereload.com/ "http://livereload.com/")提供的方案，在需要自动重刷的页面加入以下代码，然后安装浏览器插件，具体可参考官网文档。

`<script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>`


当然，这比较麻烦，不可能每个页面都手动加入那陀代码，然后还要安装个浏览器插件的，有这么麻烦还不如手动F5得了。因此我们会引入一个中间件，也是grunt插件：connect-livereload来帮我们处理这些事情。它做的事情就是配合grunt-contrib-connect创建的web服务器，在返回页面之前，自动帮我们加上上面的那陀代码，并且不用再安装浏览器插件，它就会自动重新加载了。

### 难点三：如何创建本地web服务器
Grunt团队官方提供了一个插件：grunt-contrib-connect，它创建一个本地web服务器。


## 所需插件

### grunt
推荐0.4.1版本及以上

### grunt-contrib-watch
用于监听文件或文件夹新增、修改和删除变化。

Run predefined tasks whenever watched file patterns are added, changed or deleted.

- 插件官网地址：[https://www.npmjs.com/package/grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)
- github地址：[https://github.com/gruntjs/grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

### grunt-contrib-connect
用于创建一个本地web服务器。

Start a connect web server

- 插件官网地址：[https://www.npmjs.com/package/grunt-contrib-connect](https://www.npmjs.com/package/grunt-contrib-connect)
- github地址：[https://github.com/gruntjs/grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)

### connect-livereload
一个中间件，用于在浏览器请求的响应中增加livereload脚本代码。

connect middleware for adding the livereload script to the response. no browser plugin is needed. if you are happy with a browser plugin, then you don't need this middleware.

- 插件官网地址：[https://www.npmjs.com/package/connect-livereload](https://www.npmjs.com/package/connect-livereload)
- github地址：[https://github.com/intesso/connect-livereload](https://github.com/intesso/connect-livereload)
