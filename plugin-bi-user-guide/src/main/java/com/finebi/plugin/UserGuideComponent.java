package com.finebi.plugin;

import com.fr.plugin.transform.FunctionRecorder;
import com.fr.web.struct.Component;
import com.fr.web.struct.category.ParserType;
import com.fr.web.struct.category.ScriptPath;
import com.fr.web.struct.category.StylePath;

/**
 * Created by dailer on 19/5/22.
 */
@FunctionRecorder
public class UserGuideComponent extends Component {

    public static final UserGuideComponent KEY = new UserGuideComponent();

    private UserGuideComponent() {

    }

    @Override
    public ScriptPath script() {
        return ScriptPath.build("com/finebi/plugin/web/userguide.js");
    }

    @Override
    public StylePath style() {
        return StylePath.build("com/finebi/plugin/web/userguide.css", ParserType.DYNAMIC);
    }
}