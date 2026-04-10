!(function () {

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