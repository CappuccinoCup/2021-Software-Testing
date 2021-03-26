## BTSplus——创建一个使用Vuetify框架的Vue项目
> 从零开始

### 新建Vue CLI项目
> 什么是[Vue CLI](https://cli.vuejs.org/zh/guide/)？

#### 安装Vue CLI
- [安装方法](https://cli.vuejs.org/zh/guide/installation.html)
#### 创建一个新项目
- 进入放置项目的文件夹中
- 使用`vue create cc-project`命令创建一个名为*cc-project*的Vue CLI项目
- 根据提示选取需要的特性，确定后耐心等待项目下载完成
- **注**：这里选择的特性如下

  ```cmd
  Vue CLI v4.3.1
  ? Please pick a preset: Manually select features
  ? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter
  ? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
  ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
  ? Pick a linter / formatter config: Basic
  ? Pick additional lint features: Lint on save
  ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
  ? Save this as a preset for future projects? No
  ```

  

- **注**：也可以使用`vue ui`的图形界面方式进行项目的创建
#### 修改部分配置
- **添加一个 *.editorconfig* 文件**，其目的是统一不同编辑器下的代码风格。可以参考[EditorConfig官网](https://editorconfig.org/)。示例如下：
``` editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = crlf
insert_final_newline = true
trim_trailing_whitespace = true

```
- **注**：笔者的开发环境是 *Windows* ，故使用了 *crlf* 的换行格式。相应地，如果在项目中使用了 *Git* ，需要配置 *Git* 的换行符检查功能，方式为`git config core.autocrlf true`
- **注**：打开编辑器时记得使用 *EditorConfig* 。例如：在 *Intellij IDEA* 中，需要在 Settings-Editor-Code Style 下方选中 Enable EditorConfig support 
- **添加一个 *vue.config.js* 文件**，其目的是对项目进行配置。*Vue CLI3* 已经帮我们完成了大部分的配置，但是有些配置是需要我们自己写的，比如跨域问题的配置。示例代码如下：
``` javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: 'localhost',
    port: 80,
    // 以下代码会使项目运行成功后自动打开浏览器
    // open: true
  },
};
```
- **注**：以上代码将前端发出的请求中以`/api`开头的地址都转发到 `http://localhost:8080'`，并把`/api`去掉。要让HTTP请求有`/api`前缀，可以对 *axios* 进行配置。至于为什么要这么做，是为了区分前端向后端发出的请求和浏览器向后端对静态资源的请求。这段代码也将前端运行的端口设置为80
- **修改前端项目的网页名和图标**
- 用自己喜欢的图标文件替换 `public/favicon.ico`，并在`public/index.html`中为自己的网页取名吧
- 之后，为了让最初的模板有一个统一的代码风格，添加各个文件中 javascript 代码语句末尾的分号，以及使用编辑器里的 reformat 功能等
- 完成以上的配置，接下来就是安装有用的插件了。不妨使用 [*Git* 打标签]([https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE](https://git-scm.com/book/zh/v2/Git-基础-打标签))将以上工作结束后的项目标注为`v0.1`

### 安装并配置 *axios* 插件
> 为 Vue CLI 项目安装插件可以有两种方法：使用 `vue add [plugin name]`命令直接安装或者使用 `vue ui` 命令进入图形化页面搜索和安装插件

- 在Vue CLI 中安装插件非常方便，而且在安装的同时会在代码中自动添加一些配置，基本可以做到即装即用
- 在图形化页面中搜索 *axios* ，选择第一个并安装。安装完成后查看项目源代码，会发现有三处改动：
	1. 新增文件 `src/plugins/axios.js` ，里面已经有了最基本的配置。
	2. 在 `src/main.js` 中引入了 *axios*
	3. 在 `package.json` 中新增了 *axios* 开发依赖与插件
- 接下来进入 `src/plugins/axios.js` 文件中就能够对 *axios* 进行配置了。这里只做了一些最简单的配置，设置如下：
``` javascript
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";
```
- 这里的 第一行代码也就使前端用 *axios* 发出的HTTP请求的 url 前都加上了 `'/api'`
- 更多 *axios* 配置请根据自己的项目进行设置，如HTTP请求拦截器、HTTP响应拦截器等

### 安装并配置 *Vuetify* 框架
> [Vuetify](https://vuetifyjs.com/zh-Hans/getting-started/quick-start/)

- 使用之前提到的安装插件的方式对 *Vuetify* 进行安装
- 在进行配置的时候，笔者没有直接选择默认预设（preset），而是打开 Configure ，额外地将 Use custom properties 和 Use fonts as a dependency 选中了
- 完成安装
- 可以发现项目代码有比较多的改变，这是因为 *Vuetify* 进行了一些配置以及更换了欢迎页面
- 现在开始使用 *Vuetify* 进行前端页面的编写吧

### 编写一个简单页面
- 每周动画推荐！（有缘人才能看到的哦）

### 编写简单的单元测试和e2e测试

> 如果不需要自动化测试则可以跳过

- *jest* 单元测试
- *night watch e2e* 测试

### 结束
- 做完这些工作，一个初具雏形的前端项目已经诞生了。使用 *Git* 打标签，将其命名为 `v1.0`
