/**
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
})();