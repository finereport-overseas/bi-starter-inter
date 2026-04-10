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
                title: BI.i18nText("BI_User_Guide_Tip"),
                cls: "user-guide-font header-icon dec-frame-icon",
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
}());BICst = _global.BICst || {};
BICst.DATA_PROCESS_CONFIG = [{
    type: "click",
    position: {
        left: 0,
        top: 270,
        width: 70,
        height: 90
    },
    url: "dp1-1.png",
    order: 0,
    title: BI.i18nText("BI-User_Guide_Go_To_Data_List")
}, {
    type: "click",
    position: {
        left: 70,
        top: 180,
        width: 240,
        height: 30
    },
    url: "dp1-2.png",
    order: 0,
    title: BI.i18nText("BI-User_Guide_Go_To_Data_List")
}, {
    type: "click",
    position: {
        left: 214,
        top: 110,
        width: 80,
        height: 24
    },
    url: "dp2-1.png",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Excel")
}, {
    type: "click",
    position: {
        left: 215,
        top: 140,
        width: 120,
        height: 24
    },
    url: "dp2-2.png",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Excel")
}, {
    type: "click",
    position: {
        left: 240,
        top: 125,
        width: 80,
        height: 24
    },
    url: "dp2-3.png",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Excel")
}, {
    type: "click",
    position: {
        left: 236,
        top: 43,
        width: 190,
        height: 24
    },
    url: "dp2-4.png",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Excel")
}, {
    type: "click",
    position: {
        left: 800,
        top: 457,
        width: 70,
        height: 20
    },
    url: "dp2-5.png",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Excel")
}, {
    type: "click",
    position: {
        left: 870,
        top: 80,
        width: 80,
        height: 24
    },
    url: "dp2-6.png",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Excel")
}, {
    type: "click",
    position: {
        left: 240,
        top: 120,
        width: 80,
        height: 24
    },
    url: "dp3-1.png",
    order: 2,
    title: BI.i18nText("BI-User_Guide_Create_Analysis_Table")
}, {
    type: "click",
    position: {
        left: 215,
        top: 165,
        width: 120,
        height: 24
    },
    url: "dp3-2.png",
    order: 2,
    title: BI.i18nText("BI-User_Guide_Create_Analysis_Table")
}, {
    type: "click",
    position: {
        left: 372,
        top: 175,
        width: 240,
        height: 30
    },
    url: "dp4-1.png",
    order: 3,
    title: BI.i18nText("BI-User_Guide_Select_Data")
}, {
    type: "click",
    position: {
        left: 0,
        top: 180,
        width: 105,
        height: 24
    },
    url: "dp5-1.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Base_Data_Do_Add_Column")
}, {
    type: "click",
    position: {
        left: 10,
        top: 260,
        width: 110,
        height: 24
    },
    url: "dp5-2.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Base_Data_Do_Add_Column")
}, {
    type: "click",
    position: {
        left: 190,
        top: 200,
        width: 170,
        height: 24
    },
    url: "dp5-3.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Base_Data_Do_Add_Column")
}, {
    type: "click",
    position: {
        left: 395,
        top: 90,
        width: 24,
        height: 24
    },
    url: "dp5-4.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Base_Data_Do_Add_Column")
}, {
    type: "click",
    position: {
        left: 186,
        top: 151,
        width: 170,
        height: 24
    },
    url: "dp5-5.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Base_Data_Do_Add_Column")
}, {
    type: "click",
    position: {
        left: 830,
        top: 484,
        width: 80,
        height: 24
    },
    url: "dp5-6.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Base_Data_Do_Add_Column")
}, {
    type: "click",
    position: {
        left: 730,
        top: 64,
        width: 94,
        height: 30
    },
    url: "dp6-1.png",
    order: 5,
    title: BI.i18nText("BI-User_Guide_Save_And_Go_Back")
}, {
    type: "click",
    position: {
        left: 220,
        top: 30,
        width: 30,
        height: 30
    },
    url: "dp6-2.png",
    order: 5,
    title: BI.i18nText("BI-User_Guide_Go_To_Data_List")
}, {
    type: "none",
    url: "dp7-1.png",
    order: 6
}];

BICst.DATA_VIEW_CONFIG = [{
    type: "click",
    position: {
        left: 865,
        top: 104,
        width: 80,
        height: 24
    },
    url: "dv1-1.png",
    order: 0,
    title: BI.i18nText("BI-User_Guide_Create_Show_Widget")
}, {
    type: "click",
    position: {
        left: 766,
        top: 180,
        width: 80,
        height: 24
    },
    url: "dv1-2.png",
    order: 0,
    title: BI.i18nText("BI-User_Guide_Create_Show_Widget")
}, {
    type: "drag",
    startPosition: {
        left: 35,
        top: 120,
        width: 130,
        height: 20
    },
    stopPosition: {
        left: 514,
        top: 54,
        width: 380,
        height: 35
    },
    url: "dv2-1.gif",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Dimension_To_Region")
}, {
    type: "drag",
    startPosition: {
        left: 35,
        top: 220,
        width: 130,
        height: 20
    },
    stopPosition: {
        left: 514,
        top: 100,
        width: 380,
        height: 35
    },
    url: "dv2-2.gif",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Dimension_To_Region")
}, {
    type: "drag",
    startPosition: {
        left: 35,
        top: 396,
        width: 130,
        height: 20
    },
    stopPosition: {
        left: 514,
        top: 100,
        width: 380,
        height: 35
    },
    url: "dv2-3.gif",
    order: 1,
    title: BI.i18nText("BI-User_Guide_Add_Dimension_To_Region")
}, {
    type: "click",
    position: {
        left: 195,
        top: 320,
        width: 190,
        height: 24
    },
    url: "dv3-1.png",
    order: 2,
    title: BI.i18nText("BI-User_Guide_Adjust_Widget_Properties")
}, {
    type: "click",
    position: {
        left: 195,
        top: 154,
        width: 186,
        height: 26
    },
    url: "dv3-2.png",
    order: 2,
    title: BI.i18nText("BI-User_Guide_Adjust_Widget_Properties")
}, {
    type: "click",
    position: {
        left: 607,
        top: 62,
        width: 24,
        height: 20
    },
    url: "dv3-3.png",
    order: 2,
    title: BI.i18nText("BI-User_Guide_Adjust_Widget_Properties")
}, {
    type: "click",
    position: {
        left: 614,
        top: 194,
        width: 205,
        height: 24
    },
    url: "dv3-4.png",
    order: 2,
    title: BI.i18nText("BI-User_Guide_Adjust_Widget_Properties")
}, {
    type: "drag",
    startPosition: {
        left: 35,
        top: 220,
        width: 130,
        height: 20
    },
    stopPosition: {
        left: 195,
        top: 354,
        width: 190,
        height: 36
    },
    url: "dv4-1.gif",
    order: 3,
    title: BI.i18nText("BI-User_Guide_Add_Field_To_Color_Region")
}, {
    type: "click",
    position: {
        left: 870,
        top: 0,
        width: 80,
        height: 24
    },
    url: "dv5-1.png",
    order: 4,
    title: BI.i18nText("BI-User_Guide_Back_To_Dashboard")
}, {
    type: "click",
    position: {
        left: 65,
        top: 35,
        width: 404,
        height: 264
    },
    url: "dv6-1.png",
    order: 5,
    title: BI.i18nText("BI-User_Guide_Re_Come_In_Edit_Region")
}, {
    type: "click",
    position: {
        left: 470,
        top: 36,
        width: 24,
        height: 24
    },
    url: "dv6-2.png",
    order: 5,
    title: BI.i18nText("BI-User_Guide_Re_Come_In_Edit_Region")
}, {
    type: "none",
    url: "dv7-1.png",
    order: 6
}];!(function () {
    var popoverName = BI.UUID();
    var maskerName = BI.UUID();
    var DataProcess = BI.inherit(BI.Widget, {

        props: {
            baseCls: "bi-user-guide-data bi-user-select-disable",
            dataType: 0
        },

        render: function () {
            var self = this, o = this.options;
            this.urls = BI.map(this._getConfig(), "url");
            return {
                type: "bi.center_adapt",
                scrollable: true,
                cls: "bi-z-index-mask",
                items: [{
                    type: "bi.default",
                    ref: function (_ref) {
                        self.wrapper = _ref;
                    },
                    items: [{
                        type: "bi.img",
                        width: 960,
                        height: 540,
                        ref: function (_ref) {
                            self.image = _ref;
                        }
                    }]
                }]
            };
        },

        mounted: function () {
            this.run();
        },

        _getCompleteUrl: function (name) {
            var version = BI.isIE9Below && BI.isIE9Below() ? "1x/" : "2x/";
            return Dec.fineServletURL + "/resources?path=/com/finebi/plugin/web/images/" + version + name;
        },

        _getConfig: function () {
            var self = this;
            return BI.map(this.options.dataType === 0 ? BICst.DATA_PROCESS_CONFIG : BICst.DATA_VIEW_CONFIG, function (idx, step) {
                return BI.extend({}, step, {
                    beforeNext: BI.bind(self._changeBackground, self)
                });
            });
        },

        _changeBackground: function (index) {
            index < this.urls.length - 1 && this.image.setSrc(this._getCompleteUrl(this.urls[index + 1]));
        },

        _pauseGuide: function (complete) {
            this._createPausePopover(complete ? BI.i18nText("BI-User_Guide_Need_Go_Into_User_Guide_Again") : BI.i18nText("BI-User_Guide_Sure_To_Exit"),
                complete ? BI.i18nText("BI-User_Guide_Or_Get_Other_Help") : BI.i18nText("BI-User_Guide_Re_Come_In"), complete);
        },

        _stopGuide: function () {
            var self = this, o = this.options;
            this.fireEvent("EVENT_STOP");
            BI.Layers.create(maskerName, null, {
                render: {
                    type: "bi.center_adapt",
                    cls: "bi-z-index-mask",
                    items: [{
                        type: "bi.vertical",
                        cls: "bi-card",
                        width: 450,
                        height: 250,
                        items: BI.concat([{
                            el: {
                                type: "bi.icon_label",
                                cls: "user-guide-complete-guide-tip",
                                iconHeight: 86,
                                iconWidth: 86
                            },
                            tgap: o.dataType === 0 ? 35 : 48
                        }, {
                            el: {
                                type: "bi.text",
                                cls: "user-guide-complete-tip",
                                textAlign: "center",
                                text: o.dataType === 0 ? BI.i18nText("BI-User_Guide_Data_Process_Complete") : BI.i18nText("BI-User_Guide_Data_Show_Complete")
                            },
                            tgap: 15
                        }], o.dataType === 0 ? [{
                            el: {
                                type: "bi.text_button",
                                cls: "bi-high-light-border-bottom user-guide-database-text",
                                text: BI.i18nText("BI-User_Guide_Know_How_To_Connect_DataBase"),
                                handler: function () {
                                    window.open("https://help.finebi.com/doc-view-94.html");
                                },
                                width: 168,
                                height: 16
                            },
                            tgap: 10,
                            lgap: 141
                        }, {
                            el: {
                                type: "bi.left_right_vertical_adapt",
                                height: 24,
                                llgap: 122,
                                rrgap: 122,
                                items: {
                                    left: [{
                                        type: "bi.button",
                                        text: BI.i18nText("BI-User_Guide_Exit"),
                                        level: "ignore",
                                        listeners: [{
                                            eventName: "EVENT_CHANGE",
                                            action: function () {
                                                BI.Layers.remove(maskerName);
                                                self._pauseGuide(true);
                                            }
                                        }]
                                    }],
                                    right: [{
                                        type: "bi.button",
                                        text: BI.i18nText("BI-User_Guide_Start_Data_Show"),
                                        listeners: [{
                                            eventName: "EVENT_CHANGE",
                                            action: function () {
                                                BI.Layers.remove(maskerName);
                                                self.fireEvent("EVENT_CHANGE_GUIDE", 1);
                                            }
                                        }]
                                    }]
                                }
                            },
                            tgap: 20
                        }] : [{
                            el: {
                                type: "bi.center_adapt",
                                items: [{
                                    type: "bi.button",
                                    level: "ignore",
                                    text: BI.i18nText("BI-User_Guide_Exit"),
                                    handler: function () {
                                        BI.Layers.remove(maskerName);
                                        self._pauseGuide(true);
                                    }
                                }]
                            },
                            tgap: 20
                        }])
                    }]
                }
            });
            BI.Layers.show(maskerName);
        },

        _createPausePopover: function (title, text, complete) {
            var self = this;
            BI.Popovers.create(popoverName, {
                type: "bi.bar_popover",
                width: 450,
                height: 300,
                header: BI.i18nText("BI-User_Guide_Exit_Tip"),
                body: {
                    type: "bi.vertical_adapt",
                    items: [{
                        type: "bi.vertical",
                        width: 170,
                        bgap: 10,
                        items: BI.createItems([{
                            cls: "user-guide-warning-title bi-font-bold",
                            text: title
                        }, {
                            text: text
                        }], {
                            type: "bi.text",
                            lineHeight: 24,
                            whiteSpace: "normal",
                            textAlign: "left"
                        })
                    }, {
                        type: "bi.layout",
                        lgap: 20,
                        cls: "user-guide-exit-guide-tip",
                        width: 220,
                        height: 206
                    }]
                },
                listeners: [{
                    eventName: BI.Popover.EVENT_CLOSE,
                    action: function () {
                        BI.Popovers.remove(popoverName);
                        complete && self.fireEvent("EVENT_PAUSE");
                    }
                }, {
                    eventName: BI.Popover.EVENT_CONFIRM,
                    action: function () {
                        BI.UserGuide.stop(true);
                        BI.Popovers.remove(popoverName);
                        self.fireEvent("EVENT_PAUSE");
                    }
                }]
            }).open(popoverName);
        },

        run: function () {
            this.image.setSrc(this._getCompleteUrl(this.urls[0]));
            BI.UserGuide.setContainer(this.wrapper.element);
            BI.UserGuide.setSteps(this._getConfig());
            BI.UserGuide.start({
                onPause: BI.bind(this._pauseGuide, this),
                onStop: BI.bind(this._stopGuide, this)
            });
        }

    });

    BI.shortcut("bi.user_guide_data", DataProcess);
})();!(function () {
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
})();/**
 * 点击引导步骤
 */
!(function () {
    BI.UserGuideClickItem = BI.inherit(BI.OB, {

        _init: function () {
            BI.UserGuideClickItem.superclass._init.apply(this, arguments);
        },

        show: function () {
            var self = this, o = this.options;
            var step = this.options.step;
            var position = step.position;
            var beforeNext = o.beforeNext || BI.emptyFn;
            this.layer = BI.createWidget({
                type: "bi.absolute",
                element: this.options.container || "body",
                items: [{
                    el: {
                        type: "bi.user_guide_widget",
                        ref: function (_ref) {
                            self.layerItem = _ref;
                        },
                        listeners: [{
                            eventName: "EVENT_CHANGE",
                            action: function () {
                                beforeNext(self.getIndex());
                                o.next();
                            }
                        }]
                    },
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height
                }]
            });
        },

        hide: function () {
            this.layerItem.destroy();
            this.layer = null;
        },

        getNode: function () {
            return this.layerItem.element[0];
        },

        getType: function () {
            return this.options.step.type;
        },

        getTitle: function () {
            return this.options.step.title;
        },

        getOrder: function () {
            return this.options.step.order;
        },

        getIndex: function () {
            return this.options.index;
        }

    });

    BI.shortcut("bi.user_guide_click_item", BI.UserGuideClickItem);
})();/**
 * 拖拽引导步骤
 */
!(function () {
    BI.UserGuideDragItem = BI.inherit(BI.OB, {

        _init: function () {
            BI.UserGuideDragItem.superclass._init.apply(this, arguments);
        },

        _bind: function () {
            BI.Widget._renderEngine.createElement(document).unbind("mouseup.userguide").bind("mouseup.userguide", BI.bind(this._mouseUp, this));
        },

        _unbind: function () {
            BI.Widget._renderEngine.createElement(document).unbind("mouseup.userguide");
        },

        _mouseUp: function (e) {
            var o = this.options;
            var beforeNext = o.beforeNext || BI.emptyFn;
            e.stopPropagation();
            var clickGuideElement = this.getDropNode();
            if(BI.isNotNull(clickGuideElement) && this.getType() === "drag" && this.isDragging()) {
                if(clickGuideElement === e.target) {
                    beforeNext(this.getIndex());
                    o.next();
                }
            }
            this.getType() === "drag" && this.setDragging(false);
        },

        show: function () {
            var self = this, o = this.options;
            var step = this.options.step;
            var dragPosition = step.startPosition;
            var dropPosition = step.stopPosition;
            this.dragLayer = BI.createWidget({
                type: "bi.absolute",
                element: this.options.container || "body",
                items: [{
                    el: {
                        type: "bi.user_guide_widget",
                        showTip: false,
                        trigger: "mousedown",
                        disableSelected: true,
                        ref: function (_ref) {
                            self.dragLayerItem = _ref;
                        },
                        listeners: [{
                            eventName: "EVENT_CHANGE",
                            action: function () {
                                self.setDragging(true);
                            }
                        }]
                    },
                    top: dragPosition.top,
                    left: dragPosition.left,
                    width: dragPosition.width,
                    height: dragPosition.height
                }]
            });
            this.dropLayer = BI.createWidget({
                type: "bi.absolute",
                element: this.options.container || "body",
                items: [{
                    el: {
                        type: "bi.user_guide_widget",
                        showTip: false,
                        ref: function (_ref) {
                            self.dropLayerItem = _ref;
                        }
                    },
                    top: dropPosition.top,
                    left: dropPosition.left,
                    width: dropPosition.width,
                    height: dropPosition.height
                }]
            });
            this._bind();
        },

        getDropNode: function () {
            return this.dropLayerItem.element[0];
        },

        getType: function () {
            return this.options.step.type;
        },

        getTitle: function () {
            return this.options.step.title;
        },

        getOrder: function () {
            return this.options.step.order;
        },

        setDragging: function (v) {
            this.dragging = v;
        },

        isDragging: function () {
            return this.dragging;
        },

        hide: function () {
            this._unbind();
            this.dragLayerItem.destroy();
            this.dropLayerItem.destroy();
            this.dragLayer = null;
            this.dropLayer = null;
        },

        getIndex: function () {
            return this.options.index;
        }

    });

    BI.shortcut("bi.user_guide_drag_item", BI.UserGuideDragItem);
})();/**
 * 引导步骤最后一步
 */
!(function () {
    BI.UserGuideEndItem = BI.inherit(BI.OB, {

        _init: function () {
            BI.UserGuideEndItem.superclass._init.apply(this, arguments);
        },

        show: function () {

        },

        hide: function () {

        },

        getNode: function () {

        },

        getType: function () {
            return this.options.step.type;
        },

        getTitle: function () {
            return "";
        },

        getOrder: function () {
            return this.options.step.order;
        },

        getIndex: function () {
            return this.options.index;
        }

    });

    BI.shortcut("bi.user_guide_end_item", BI.UserGuideEndItem);
})();/**
 * 新手引导
 *
 * */
!(function () {
    BI.UserGuideController = BI.inherit(BI.Controller, {
        props: {},

        _init: function () {
            BI.UserGuideController.superclass._init.apply(this, arguments);
            this.steps = [];
            this.currentStep = 0;
        },

        _next: function () {
            var step = this.steps[this.currentStep + 1];
            var oldStep = this.steps[this.currentStep];
            oldStep.hide();
            if(BI.isNull(step) || step.getType() === "none") {
                this.stop();
                return;
            }
            step.show();
            this.currentStep++;
            this.navigation.setValue(step.getOrder());
        },

        _getItemFromStep: function (step, idx) {
            switch (step.type) {
                case "drag":
                    return new BI.UserGuideDragItem({
                        step: step,
                        index: idx,
                        beforeNext: step.beforeNext,
                        next: BI.bind(this._next, this),
                        container: this.container
                    });
                case "none":
                    return new BI.UserGuideEndItem({
                        step: step,
                        index: idx
                    });
                case "click":
                default:
                    return new BI.UserGuideClickItem({
                        step: step,
                        index: idx,
                        beforeNext: step.beforeNext,
                        next: BI.bind(this._next, this),
                        container: this.container
                    });
            }
        },

        _createSteps: function () {
            var steps = [];
            var curOrder = -1;
            BI.each(this.steps.slice(0, this.steps.length - 1), function (idx, step) {
                var order = step.getOrder();
                if(order !== curOrder) {
                    curOrder++;
                    steps.push({
                        title: step.getTitle()
                    });
                }
            });
            return steps;
        },

        /**
         * 设置引导步骤
         */
        setSteps: function (steps) {
            var self = this;
            this.steps = [];
            BI.each(steps, function (idx, step) {
                var element = self._getItemFromStep(step, idx);
                if(BI.isNotNull(element)) {
                    self.steps.push(element);
                }
            });
        },

        /**
         * 设置引导依赖容器
         */
        setContainer: function (container) {
            this.container = container;
        },

        /**
         * 开始引导
         */
        start: function (options) {
            var self = this;
            this.guideOptions = options || {};
            if(this.steps.length === 0) {
                return;
            }
            this.steps[0].show();
            BI.createWidget({
                type: "bi.absolute",
                element: this.container || "body",
                items: [{
                    el: {
                        type: "bi.user_guide_navigation",
                        ref: function (_ref) {
                            self.navigation = _ref;
                        },
                        order: 0,
                        steps: this._createSteps(),
                        listeners: [{
                            eventName: "EVENT_CHANGE",
                            action: function () {
                                self.guideOptions.onPause && self.guideOptions.onPause();
                            }
                        }]
                    },
                    right: 20,
                    top: 155
                }]
            });
        },

        /**
         * 停止引导
         */
        stop: function (notDoCallback) {
            BI.each(this.steps, function (idx, step) {
                step.destroy();
            });
            this.navigation && this.navigation.destroy();
            this.steps = [];
            this.currentStep = 0;
            !notDoCallback && this.guideOptions.onStop && this.guideOptions.onStop();
        }
    });

    BI.UserGuide = new BI.UserGuideController();
})();!(function () {

    BI.UserGuideNavigationItem = BI.inherit(BI.Single, {

        props: {
            baseCls: "bi-user-guide-navigation-item",
            height: 14,
            width: 14
        },

        render: function () {
            return {
                type: "bi.layout"
            };
        }
    });

    BI.shortcut("bi.user_guide_navigation_item", BI.UserGuideNavigationItem);
})();!(function () {

    BI.UserGuideWidget = BI.inherit(BI.BasicButton, {

        props: {
            baseCls: "bi-user-guide-layer",
            showTip: true
        },

        render: function () {
            var o = this.options;
            return o.showTip ? {
                type: "bi.absolute",
                items: [{
                    el: {
                        type: "bi.layout",
                        cls: "warning-animation outer"
                    },
                    height: 40,
                    width: 40,
                    right: -15,
                    bottom: -15
                }, {
                    el: {
                        type: "bi.layout",
                        cls: "warning-animation inner"
                    },
                    height: 40,
                    width: 40,
                    right: -15,
                    bottom: -15
                }]
            } : {
                type: "bi.layout"
            };
        },

        doClick: function () {
            BI.UserGuideWidget.superclass.doClick.apply(this, arguments);
            if (this.isValid()) {
                this.fireEvent("EVENT_CHANGE", this);
            }
        }
    });

    BI.shortcut("bi.user_guide_widget", BI.UserGuideWidget);
})();!(function () {

    BI.UserGuideNavigation = BI.inherit(BI.Widget, {

        props: {
            baseCls: "bi-user-guide-navigation",
            steps: [],
            width: 30
        },

        render: function () {
            var self = this, o = this.options;
            return {
                type: "bi.center_adapt",
                ref: function (_ref) {
                    self.wrap = _ref;
                },
                items: [{
                    type: "bi.vertical",
                    bgap: 10,
                    items: [{
                        type: "bi.button_group",
                        items: this._createItems(o.steps),
                        layouts: [{
                            type: "bi.vertical",
                            vgap: 10,
                            hgap: 8
                        }],
                        ref: function (_ref) {
                            self.group = _ref;
                        }
                    }, {
                        type: "bi.icon_button",
                        cls: "close-button",
                        title: BI.i18nText("BI-User_Guide_Exit"),
                        width: 30,
                        height: 30,
                        listeners: [{
                            eventName: BI.IconButton.EVENT_CHANGE,
                            action: function () {
                                self.fireEvent("EVENT_CHANGE");
                            }
                        }]
                    }]
                }]
            };
        },

        _createItems: function (items) {
            var o = this.options;
            return BI.map(items, function (idx, item) {
                return {
                    type: "bi.user_guide_navigation_item",
                    tipType: "success",
                    title: item.title,
                    height: idx === o.order ? 50 : 14
                };
            });
        },

        setValue: function (v) {
            var o = this.options;
            if(o.order !== v) {
                o.order = v;
                this.group.populate(this._createItems(o.steps));
            }
        }
    });

    BI.shortcut("bi.user_guide_navigation", BI.UserGuideNavigation);
})();