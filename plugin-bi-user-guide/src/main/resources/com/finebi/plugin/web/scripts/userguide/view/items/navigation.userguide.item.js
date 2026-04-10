!(function () {

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
})();