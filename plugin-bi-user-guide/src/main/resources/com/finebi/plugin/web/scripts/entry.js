!(function () {

    if (!window.UserGuidePlugin) {
        window.UserGuidePlugin = {};
    }


    var _comboInstance = null;

    var UserGuideCombo = BI.inherit(BI.Widget, {

        created: function () {
            _comboInstance = this;
        },


        render: function () {
            var self = this;

            this.trigger = BI.createWidget({
                type: "bi.icon_button",
                cls: "user-guide-font header-icon dec-frame-icon",
                title: BI.i18nText("BI_User_Guide_Tip"),
                height: 30
            });

            var guideCombo = {
                type: "bi.down_list_combo",
                cls: "user-guide-combo",
                chooseType: BI.Selection.None,
                el: this.trigger,
                trigger: "click-hover",
                height: 30,
                width: 30,
                items: [
                    [{
                        el: {
                            text: BI.i18nText("BI-User_Guide_User_Guide"),
                            iconCls1: "dot-e-font",
                            value: "start"
                        },
                        children: [{
                            type: "bi.text_item",
                            height: 24,
                            textAlign: "center",
                            text: BI.i18nText("BI-User_Guide_Data_Process"),
                            value: "process",
                            cls: "dot-e-font"
                        }, {
                            type: "bi.text_item",
                            height: 24,
                            textAlign: "center",
                            text: BI.i18nText("BI-User_Guide_Data_Preview"),
                            value: "show",
                            cls: "dot-e-font"
                        }]
                    }, {
                        text: BI.i18nText("BI-User_Guide_Helping_Center"),
                        iconCls1: "dot-e-font",
                        value: 11
                    }]
                ],
                listeners: [
                    {
                        eventName: "EVENT_CHANGE",
                        action: function () {
                            window.open("http://bbs.fanruan.com/moremenus", "_blank");
                        }
                    }, {
                        eventName: "EVENT_SON_VALUE_CHANGE",
                        action: function (value) {
                            switch (value) {
                                case "show":
                                    UserGuidePlugin.createDataShowGuide();
                                    break;
                                case "process":
                                    UserGuidePlugin.createDataProcessGuide();
                                    break;
                                default:
                                    UserGuidePlugin.createDataProcessGuide();
                            }
                        }
                    }
                ]
            };

            var tipBubble = {
                type: "bi.bubble_combo",
                ref: function (_ref) {
                    self.tipBubble = _ref;
                },
                trigger: "",
                el: this.trigger,
                popup: {
                    el: {
                        type: "bi.bubble_popup_view",
                        el: {
                            type: "bi.vtape",
                            height: 90,
                            hgap: 15,
                            items: [
                                {
                                    type: "bi.label",
                                    text: BI.i18nText("BI-User_Guide_Entry_Tip"),
                                    whiteSpace: "normal"
                                }, {
                                    type: "bi.right_vertical_adapt",
                                    lgap: 10,
                                    height: 30,
                                    items: [
                                        {
                                            type: "bi.text_button",
                                            cls: "bi-high-light bi-high-light-border-bottom",
                                            text: BI.i18nText("BI-User_Guide_I_Got_It"),
                                            handler: function () {
                                                self.hideView();
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            };

            return [
                guideCombo, tipBubble
            ];
        },

        showView: function () {
            this.tipBubble.showView();
        },

        hideView: function () {
            this.tipBubble.hideView();
        }
    });

    BI.shortcut("bi.plugin.user_guide", UserGuideCombo);

    window.Dec && Dec.Configs && Dec.Configs.pushConfig(function () {
        var status = JSON.parse(BI.Cache.getItem("bi_user_guide_status")) || {};
        var biDesigner = BI.Services.getService("dec.service.bi.user").isBiDesigner();
        if (biDesigner && !status[Dec.personal.username]) {
            BI.delay(function () {
                UserGuidePlugin.createWelcomeGuide && UserGuidePlugin.createWelcomeGuide(function () {
                    _comboInstance.showView();
                });
            }, 2000);
            status[Dec.personal.username] = true;
            BI.Cache.setItem("bi_user_guide_status", JSON.stringify(status));
        }
    });

    BI.config("dec.constant.header.items", function (items) {
        return [{
            type: "bi.plugin.user_guide"
        }].concat(items);
    });

    UserGuidePlugin && (UserGuidePlugin.showGuideEntryTip = function () {
        _comboInstance.showView();
    });
}());