/**
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
})();