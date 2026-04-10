!(function () {
    var maskerId = BI.UUID();
    _global.UserGuidePlugin = BI.extend(_global.UserGuidePlugin, {

        createDataProcessGuide: function () {
            BI.Layers.remove(maskerId);
            BI.Layers.create(maskerId, null, {
                render: {
                    type: "bi.user_guide_data",
                    dataType: 0,
                    listeners: [{
                        eventName: "EVENT_STOP",
                        action: function () {
                            // BI.Layers.hide(maskerId);
                        }
                    }, {
                        eventName: "EVENT_PAUSE",
                        action: function () {
                            BI.Layers.remove(maskerId);
                        }
                    }, {
                        eventName: "EVENT_CHANGE_GUIDE",
                        action: function () {
                            _global.UserGuidePlugin.createDataShowGuide();
                        }
                    }]
                }
            });
            BI.Layers.show(maskerId);
        },

        createDataShowGuide: function () {
            BI.Layers.remove(maskerId);
            BI.Layers.create(maskerId, null, {
                render: {
                    type: "bi.user_guide_data",
                    dataType: 1,
                    listeners: [{
                        eventName: "EVENT_STOP",
                        action: function () {
                            // BI.Layers.remove(maskerId);
                        }
                    }, {
                        eventName: "EVENT_PAUSE",
                        action: function () {
                            BI.Layers.remove(maskerId);
                        }
                    }]
                }
            });
            BI.Layers.show(maskerId);
        },

        createWelcomeGuide: function (callback) {
            BI.Layers.remove(maskerId);
            BI.Layers.create(maskerId, null, {
                render: {
                    type: "bi.center_adapt",
                    cls: "bi-plugin-user-guide-welcome bi-z-index-mask",
                    items: [{
                        type: "bi.absolute",
                        cls: "bi-card",
                        width: 450,
                        height: 268,
                        items: [{
                            el: {
                                type: "bi.vertical",
                                tgap: 10,
                                items: [{
                                    type: "bi.text",
                                    textAlign: "center",
                                    text: BI.i18nText("BI-User_Guide_Welcome_To_Use_BI"),
                                    cls: "plugin-guide-title"
                                }, {
                                    el: {
                                        type: "bi.warning_label",
                                        whiteSpace: "normal",
                                        hgap: 25,
                                        text: BI.i18nText("BI_User_Guide_Description")
                                    }
                                }, {
                                    type: "bi.text",
                                    textAlign: "center",
                                    text: BI.i18nText("BI_User_Guide_Teach_Some_Chinese_Words")
                                }, {
                                    type: "bi.horizontal_adapt",
                                    items: [{
                                        type: "bi.left_right_vertical_adapt",
                                        llgap: 60,
                                        rrgap: 60,
                                        items: {
                                            left: [createButton("data-process-tip", BI.i18nText("BI-User_Guide_Data_Processing"), _global.UserGuidePlugin.createDataProcessGuide)],
                                            right: [createButton("data-preview-tip", BI.i18nText("BI-User_Guide_Data_Preview"), _global.UserGuidePlugin.createDataShowGuide)]
                                        }
                                    }]
                                }]
                            },
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        }, {
                            el: {
                                type: "bi.icon_button",
                                cls: "close-font",
                                handler: function () {
                                    BI.Layers.remove(maskerId);
                                    callback && callback();
                                }
                            },
                            right: 10,
                            top: 10,
                            width: 16,
                            height: 16
                        }]
                    }]
                }
            });
            BI.Layers.show(maskerId);

            function createButton (background, text,  fn) {
                return {
                    type: "bi.vertical",
                    width: 130,
                    bgap: 10,
                    items: [{
                        el: {
                            type: "bi.vertical",
                            height: 86,
                            cls: "bi-background",
                            items: [{
                                type: "bi.horizontal_adapt",
                                items: [{
                                    type: "bi.center_adapt",
                                    cls: "image-tip",
                                    items: [{
                                        type: "bi.layout",
                                        cls: background,
                                        width: 24,
                                        height: 24
                                    }],
                                    width: 44,
                                    height: 44
                                }]
                            }, {
                                type: "bi.text",
                                text: text,
                                textAlign: "center"
                            }],
                            tgap: 10
                        }
                    }, {
                        type: "bi.horizontal_adapt",
                        items: [{
                            type: "bi.button",
                            text: BI.i18nText("BI-User_Guide_Go_In"),
                            width: 95,
                            level: "ignore",
                            handler: function () {
                                fn();
                            }
                        }]
                    }]
                };
            }
        }
    });
})();