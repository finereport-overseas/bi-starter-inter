/**
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
})();