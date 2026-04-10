# FineBI 插件开发工程

## 配置开发工程
1)使用IntelliJ IDEA打开bi-starter-latest项目。
2)项目根目录如果没有webroot目录需要新建一个webroot目录，如果有webroot目录则跳过这一步
3)运行根目录的build.gradle中的install任务（运行此任务将jar包拷贝到webroot目录下，从而使工程安装一部分内置的插件，如果仅需要一个完全干净的工程则跳过这一步）
4)运行idea的"同步gradle"会自动更新示例插件的依赖（依赖webroot/lib）

**注意：**该工程依赖的jar存储在私有maven服务器，地址在build.gradle的repositories中定义。

## 复制插件配置

* 将plugin.xml文件复制到webroot/WEB-INF/plugins/plugin-xyz-1.1目录下，其中xyz表示“plugin.xml”中定义的id字段，“1.1”为“plugin.xml”中定义的version字段
* 编译插件目录(插件的build.gradle文件中已经定义了插件的编译输出目录)

## 启动FineBI服务器
使用```com.finebi.start.Learner```启动FineBI服务器。


## 插件示例展示

[箱线图示例](plugin-demo/readme.md)

## 构建插件包
执行命令：```gradle zip```即可构建插件包，插件包位置位于插件目录/build/install下。

## 增加新的插件
将插件源码目录放到根目录下，同时修改settings.gradle文件，再刷新gradle配置即可。

## 修改依赖的jar版本
只需要更改build.gradle中的fineVersion和finebiVersion变量即可。

Maven仓库确认[版本jar包](https://mvn.fanruan.com/#browse/browse:fanruan-release)
fineVersion=11.0.6.2022.07.16
finebiVersion=6.0.1.2022.07.22
或者可以直接对应finebi release分支的最新版本,具体可以参考[build.gradle](/build.gradle)
fineVersion='11.0-FINAL-SNAPSHOT'
finebiVersion='7.0-RELEASE-SNAPSHOT'
## 新增插件项目

参考报表插件开发教程之[新增插件项目](https://wiki.fanruan.com/pages/viewpage.action?pageId=25756453)
