!(function () {

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
})();