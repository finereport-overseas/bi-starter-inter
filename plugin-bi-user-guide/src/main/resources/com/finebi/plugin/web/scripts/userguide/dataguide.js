!(function () {
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
})();