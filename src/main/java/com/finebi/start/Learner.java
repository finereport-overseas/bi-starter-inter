package com.finebi.start;

import com.fr.log.FineLoggerFactory;
import com.fr.stable.ProductConstants;
import com.fr.startup.FineWebApplicationInitializer;
import com.fr.third.springframework.web.SpringServletContainerInitializer;
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleState;
import org.apache.catalina.loader.WebappLoader;
import org.apache.catalina.startup.Tomcat;

import java.awt.*;
import java.net.URI;
import java.util.HashSet;
import java.util.Set;

/**
 * @author richie
 * @version 10.0
 * Created by richie on 2019/10/18
 * FineBI Starter
 */
public class Learner {

    private static final String APP_NAME = "webroot";

    public static void main(String... args) throws Exception {

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8080);

        String docBase = System.getProperty("user.dir") + "/" + APP_NAME;
        ProductConstants.setWebAppName(ProductConstants.getAppFolderName());
        String appName = "/" + APP_NAME;
        tomcat.getServer().addLifecycleListener(lifecycleEvent -> {
            if (LifecycleState.STARTED.equals(lifecycleEvent.getLifecycle().getState())) {
                try {
                    Desktop.getDesktop().browse(new URI("http://localhost:8080/webroot/decision"));
                } catch (Exception e) {
                    FineLoggerFactory.getLogger().error(e.getMessage(), e);
                }
            }
        });

        Context context = tomcat.addContext(appName, docBase);
        Tomcat.initWebappDefaults(context);

        context.setLoader(new TomcatLoader());

        SpringServletContainerInitializer initializer = new SpringServletContainerInitializer();
        Set<Class<?>> classes = new HashSet<>();
        classes.add(FineWebApplicationInitializer.class);
        context.addServletContainerInitializer(initializer, classes);
        tomcat.start();
    }

    private static class TomcatLoader extends WebappLoader {

        @Override
        public ClassLoader getClassLoader() {

            return this.getClass().getClassLoader();
        }
    }
}
