package com.finebi.plugin;

import com.fr.decision.fun.impl.AbstractWebResourceProvider;
import com.fr.decision.web.MainComponent;
import com.fr.intelli.record.Focus;
import com.fr.intelli.record.Original;
import com.fr.record.analyzer.EnableMetrics;
import com.fr.web.struct.Atom;

/**
 * Created by dailer on 19/5/22.
 */
public class UserGuideProcess extends AbstractWebResourceProvider {


    @Override
    public Atom attach() {
        return MainComponent.KEY;
    }

    @Override
    public Atom client() {
        return UserGuideComponent.KEY;
    }
}