/**
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
})();