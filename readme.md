# FineBI plugin development project

## Configure development project
1) Use IntelliJ IDEA to open the bi-starter-latest project.
2) If there is no webroot directory in the project root directory, you need to create a new webroot directory. If there is a webroot directory, skip this step.
3) Run the `install` task in build.gradle in the root directory
4) Run `Sync All Gradle Projects` in IntelliJ IDEA will automatically update the dependencies of the example plugins (depending on webroot/lib).
   **Note:** The jars that this project depends on are stored in a private maven server, and the address is defined in the repositories of build.gradle.

## Copy plugin.xml

* Copy the plugin.xml file to the "webroot/WEB-INF/plugins/plugin-xyz-1.1" directory, where xyz represents the id field defined in "plugin.xml", and "1.1" is the id field defined in "plugin.xml" version field
* Compile the plugin directory (the plugin's compilation output directory has been defined in the plugin's build.gradle file)

## Start FineBI server
Use ```com.finebi.start.Learner``` to start the FineBI server.


## Plugin example

[Box plot example](plugin-demo/readme.md)

## Build plugin
Execute the command: ```gradle zip``` to build the plugin. The location of the plugin package is under the plugin directory/build/install.

## Modify the dependent jar version
Just change the fineVersion and finebiVersion variables in build.gradle.

Maven repository confirmation [jar](https://mvn.fanruan.com/#browse/browse:fanruan-release)
fineVersion='11.0.6.2022.07.16'
finebiVersion='6.0.1.2022.07.22'
Alternatively, you can directly refer to the latest version of the `finebi` release branch. See `[build.gradle](/build.gradle)` for details.
fineVersion='11.0-FINAL-SNAPSHOT'
finebiVersion='7.0-RELEASE-SNAPSHOT'

## Add new plugin

Refer to the report plugin development tutorial [New plugin project] (https://wiki.fanruan.com/pages/viewpage.action?pageId=25756453)
