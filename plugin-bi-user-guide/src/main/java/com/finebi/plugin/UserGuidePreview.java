package com.finebi.plugin;

import com.finebi.foundation.api.web.component.AssembleComponentFactory;
import com.fr.decision.fun.impl.AbstractWebResourceProvider;
import com.fr.web.struct.Atom;

/**
 * Created by dailer on 19/5/22.
 */
public class UserGuidePreview extends AbstractWebResourceProvider {


    @Override
    public Atom attach() {
        return AssembleComponentFactory.getReportComponent();
    }

    @Override
    public Atom client() {
        return UserGuideComponent.KEY;
    }
}