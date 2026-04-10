(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}(function () { 'use strict';

    var config = {
        type: "boxplot",
        text: "BoxPlot",
        cls: "chart-type-boxplot-column-icon",
        disabledCls: "chart-type-boxplot-column-disabled-icon",
        resultType: BICst.DESIGN.WIDGET.DETAIL,
        providers: {
            chartProvider: {
                // Plugin registered provider
                type: "bi.provider.share.chart"
            }
            // chartEditProvider: {
            //     type: "bi.provider.design.chart.edit"
            // }
        },
        expanders: [{
            type: "bi.provider.share.expander",
            text: "customAttr",
            value: "customAttr"
        }],
        required: [
            {
                dimension: ">=1",
                measure: ">=1"
            }
        ]
    };

    function expanderProvider() {
        this.render = function () {
            var self = this;
            return {
                type: "bi.vertical",
                items: [{
                    type: "bi.multi_select_item",
                    selected: BI.bind(getAttr, this)("showLine"),
                    value: "显示折线图",
                    height: 16,
                    handler: function () {
                        BI.bind(setAttr, self)("showLine", this.isSelected());
                    }
                },{
                    type: "bi.multi_select_item",
                    selected: BI.bind(getAttr, this)("showDirectData"),
                    value: "直接展示分位数据",
                    height: 16,
                    handler: function () {
                        BI.bind(setAttr, self)("showDirectData", this.isSelected());
                    }
                },{
                    type: "bi.multi_select_item",
                    selected: BI.bind(getAttr, this)("showMedianLabel"),
                    value: "显示中位数标签",
                    height: 16,
                    handler: function () {
                        BI.bind(setAttr, self)("showMedianLabel", this.isSelected());
                    }
                },{
                    type: "bi.multi_select_item",
                    selected: BI.bind(getAttr, this)("showDarkTheme"),
                    value: "使用深色配色",
                    height: 16,
                    handler: function () {
                        BI.bind(setAttr, self)("showDarkTheme", this.isSelected());
                    }
                }],
                vgap: 10,
                hgap: 15
            }
        };

        function getAttr(attrType) {
            var attr = this.getInjectAttr();
            return attr[attrType];
        }

        function setAttr(attrType,value) {
            this.setInjectAttr(attrType, value);
        }
    }

    function chartDisplayProvider() {


        /**
         * -----------------------------------------------------------------------
         * ------------------------这里是原来的FormatData方法---------------------
         */
        function formatDataOriginal(data) {
            var header = data.header;
            var items = data.items;
            var dataGroup = {},
                dimId,
                seriesName,
                targetId;
            var countMap = {};
            var maxMap = {};
            var minMap = {};
            BI.each(header, function(i, header) {
                if (!dimId && data.widgetHelper.isDimDimensionById(header.dId)) {
                    dimId = header.dId;
                    seriesName = header.text;
                }
                if (!targetId && data.widgetHelper.isTargetById(header.dId)) {
                    targetId = header.dId;
                }
            });
            BI.each(items, function(i, row) {
                var key, value;
                BI.each(row, function(idx, cell) {
                    if (cell.dId === dimId) {
                        key = cell.value;
                    }
                    if (cell.dId === targetId) {
                        value = cell.value;
                    }
                });
                key = key || "0";
                dataGroup[key] = dataGroup[key] || [];
                dataGroup[key].push(BI.parseFloat(value));
            });
            // 这里处理一下总数的数据
            BI.each(dataGroup, function(key, arr) {
                countMap[key] = arr.length;
                maxMap[key] = findMax(arr);
                minMap[key] = findMin(arr);
            });
            return {
                dataGroup: dataGroup,
                seriesName: seriesName,
                id: dimId,
                countMap: countMap,
                maxMap: maxMap,
                minMap: minMap
            };
        }

        function findMax(arr) {
            var max = arr[0];
            var len = arr.length;
            for(var i = 1; i < len; i++){
                if(arr[i] > max){
                    max = arr[i];
                }
            }
            return max;
        }

        function findMin(arr) {
            var min = arr[0];
            var len = arr.length;
            for(var i = 1; i < len; i++){
                if(arr[i] < min){
                    min = arr[i];
                }
            }
            return min;
        }


        /**
         * -----------------------------------------------------------------------
         * ------------------------这里再实现一套FormatData方法---------------------
         */

        function formatDataDirect(data) {

            var header = data.header;
            var items = data.items;
            var nameIdMap = new Map();
            var seriesName = "";
            var dimId = {};
            var dataGroup = {};

            BI.each(header, function(i, header) {
                if (data.widgetHelper.isDimDimensionById(header.dId)) {
                    dimId = header.dId;
                    seriesName = header.text;
                }
                nameIdMap.set(header.dId, header.text);
            });

            BI.each(items, function(i, row) {
                var key;
                BI.each(row, function(idx, cell) {
                    if (cell.dId === dimId) {
                        key = cell.value;
                    } else {
                        dataGroup[key] = dataGroup[key] || new Array(8);

                        switch (nameIdMap.get(cell.dId)) {
                            case "下边缘":
                                dataGroup[key][0] = BI.parseFloat(cell.value);
                                break;
                            case "下四分位":
                                dataGroup[key][1] = BI.parseFloat(cell.value);
                                break;
                            case "中位数":
                                dataGroup[key][2] = BI.parseFloat(cell.value);
                                break;
                            case "上四分位":
                                dataGroup[key][3] = BI.parseFloat(cell.value);
                                break;
                            case "上边缘":
                                dataGroup[key][4] = BI.parseFloat(cell.value);
                                break;
                            case "数据总量":
                                dataGroup[key][5] = BI.parseFloat(cell.value);
                                break;
                            case "最大值":
                                dataGroup[key][6] = BI.parseFloat(cell.value);
                                break;
                            case "最小值":
                                dataGroup[key][7] = BI.parseFloat(cell.value);
                                break;
                            default:
                                break;
                        }
                    }
                });
            });

            return {
                seriesName: seriesName,
                dataGroup: dataGroup,
                axisData: BI.keys(dataGroup)
            };
        }

        /**
         * --------------------------------------------------------------------------
         * ---------------------------数据点声明--------------------------------------
         */

        this.render = function(el, d) {
            var self = this;
            // 获取WID
            var configObj = d.widgetHelper.getInjection();
            console.log(d);
            console.log(configObj);
            var series;
            var axisData;
            // 在这里读取配置项
            if (configObj.showDirectData == false || configObj.showDirectData == undefined) {
                // 原始数据的情况
                var result = formatDataOriginal(d),
                    series = [];
                var data = BI.map(result.dataGroup, function(i, item) {
                    return item;
                });
                axisData = BI.keys(result.dataGroup);
                var preData = echarts.dataTool.prepareBoxplotData(data);
                var boxData = [];
                var lineData = [];
                var markPointData = [];
                var markPointDataObj = {};
                BI.each(preData.boxData, function(i, item) {
                    boxData.push({
                        name: axisData[i],
                        value: item
                    });
                    lineData.push(item[2]);

                    // 在这里处理MarkPoint所需数据
                    markPointDataObj = new Object();
                    markPointDataObj.value = item[2];
                    markPointDataObj.coord = [];
                    markPointDataObj.coord.push(i);
                    markPointDataObj.coord.push(item[2]);
                    markPointData.push(markPointDataObj);
                });

                var boxPlotSeries = {
                    name: result.seriesName,
                    id: result.id,
                    type: "boxplot",
                    data: boxData,
                    tooltip: {
                        formatter: function(param) {
                            return [
                                "分类名: " + param.name,
                                "数据总量:" + result.countMap[param.name],
                                "最大值：" +  result.maxMap[param.name],
                                "上边缘: " + param.value[5],
                                "上四分位: " + param.value[4],
                                "中位数: " + param.value[3],
                                "下四分位: " + param.value[2],
                                "下边缘: " + param.value[1],
                                "最小值：" +  result.minMap[param.name]
                            ].join("<br/>");
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)"
                        }
                    },
                    itemStyle: {
                        color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)",
                        borderWidth: 2
                    }
                };

                var boxPlotSeriesWithMarkPoint = {
                    name: result.seriesName,
                    id: result.id,
                    type: "boxplot",
                    data: boxData,
                    tooltip: {
                        formatter: function(param) {
                            return [
                                "分类名: " + param.name,
                                "数据总量:" + result.countMap[param.name],
                                "最大值：" +  result.maxMap[param.name],
                                "上边缘: " + param.value[5],
                                "上四分位: " + param.value[4],
                                "中位数: " + param.value[3],
                                "下四分位: " + param.value[2],
                                "下边缘: " + param.value[1],
                                "最小值：" +  result.minMap[param.name]
                            ].join("<br/>");
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)"
                        }
                    },
                    markPoint: {
                        data: markPointData,
                        symbol:"circle",
                        symbolSize:1,
                        label: {
                            position:"top",
                            fontSize:12,
                            fontWeight:"normal",
                            color:"black"
                        }
                    },
                    itemStyle: {
                        color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)",
                        borderWidth: 2
                    }
                };

                var lineSeries = {
                    type: "line",
                    data: lineData,
                    zlevel: 1,
                    itemStyle: {
                        color: "rgb(224, 178, 60)"
                    },
                    lineStyle: {
                        width: 3
                    }
                };

                var lineSeriesWithMarkPoint = {
                    type: "line",
                    data: lineData,
                    zlevel: 1,
                    itemStyle: {
                        color: "rgb(224, 178, 60)"
                    },
                    markPoint: {
                        data: markPointData,
                        symbol:"circle",
                        symbolSize:1,
                        label: {
                            position:"top",
                            fontSize:12,
                            fontWeight:"normal",
                            color:"black"
                        }
                    },
                    lineStyle: {
                        width: 3
                    }
                };
                if (configObj.showLine == true && configObj.showMedianLabel == true) {
                    series = [boxPlotSeries, lineSeriesWithMarkPoint];
                } else if (configObj.showLine == true && (configObj.showMedianLabel == false || configObj.showMedianLabel == undefined)) {
                    series = [boxPlotSeries, lineSeries];
                } else if ((configObj.showLine == false || configObj.showLine == undefined) && configObj.showMedianLabel == true){
                    series = [boxPlotSeriesWithMarkPoint];
                } else {
                    series = [boxPlotSeries];
                }

            } else if (configObj.showDirectData == true) {
                // 直接展示统计好的数据的情况
                var result = formatDataDirect(d);
                var boxData = [];
                var lineData = [];
                var markPointData = [];
                var markPointDataObj = {};
                var index = 0;
                axisData = result.axisData;
                // 生成BOXDATA
                // TODO 这里的FOREACH要重新做！！不能遍历result了
                BI.each(result.dataGroup, function(name, arr) {
                    boxData.push({
                        name: name,
                        value: arr
                    });
                    lineData.push(arr[2]);
                    // 在这里处理MarkPoint所需数据
                    markPointDataObj = new Object();
                    markPointDataObj.value = arr[2];
                    markPointDataObj.coord = [];
                    markPointDataObj.coord.push(index);
                    markPointDataObj.coord.push(arr[2]);
                    markPointData.push(markPointDataObj);
                    index++;
                });

                var boxPlotSeries = {
                    name: result.seriesName,
                    id: result.id,
                    type: "boxplot",
                    data: boxData,
                    tooltip: {
                        formatter: function(param) {
                            console.log("param:" + param);
                            return [
                                "分类名: " + param.name,
                                "数据总量:" + result.dataGroup[param.name][5],
                                "最大值：" +  result.dataGroup[param.name][6],
                                "上边缘: " + result.dataGroup[param.name][4],
                                "上四分位: " + result.dataGroup[param.name][3],
                                "中位数: " + result.dataGroup[param.name][2],
                                "下四分位: " + result.dataGroup[param.name][1],
                                "下边缘: " + result.dataGroup[param.name][0],
                                "最小值：" +  result.dataGroup[param.name][7]
                            ].join("<br/>");
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)"
                        }
                    },
                    itemStyle: {
                        color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)",
                        borderWidth: 2
                    }
                };

                var boxPlotSeriesWithMarkPoint = {
                    name: result.seriesName,
                    id: result.id,
                    type: "boxplot",
                    data: boxData,
                    tooltip: {
                        formatter: function(param) {
                            console.log("param:" + param);
                            return [
                                "分类名: " + param.name,
                                "数据总量:" + result.dataGroup[param.name][5],
                                "最大值：" +  result.dataGroup[param.name][6],
                                "上边缘: " + result.dataGroup[param.name][4],
                                "上四分位: " + result.dataGroup[param.name][3],
                                "中位数: " + result.dataGroup[param.name][2],
                                "下四分位: " + result.dataGroup[param.name][1],
                                "下边缘: " + result.dataGroup[param.name][0],
                                "最小值：" +  result.dataGroup[param.name][7]
                            ].join("<br/>");
                        }
                    },
                    markPoint: {
                        data: markPointData,
                        symbol:"circle",
                        symbolSize:1,
                        label: {
                            position:"top",
                            fontSize:12,
                            fontWeight:"normal",
                            color:"black"
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)"
                        }
                    },
                    itemStyle: {
                        color: configObj.showDarkTheme == true ? "rgba(132, 185, 203, 1)" : "rgba(134, 180, 230, 1)",
                        borderWidth: 2
                    }
                };

                var lineSeries = {
                    type: "line",
                    data: lineData,
                    zlevel: 1,
                    itemStyle: {
                        color: "rgb(224, 178, 60)"
                    },
                    lineStyle: {
                        width: 3
                    }
                };

                var lineSeriesWithMarkPoint = {
                    type: "line",
                    data: lineData,
                    zlevel: 1,
                    itemStyle: {
                        color: "rgb(224, 178, 60)"
                    },
                    markPoint: {
                        data: markPointData,
                        symbol:"circle",
                        symbolSize:1,
                        label: {
                            position:"top",
                            fontSize:12,
                            fontWeight:"normal",
                            color:"black"
                        }
                    },
                    lineStyle: {
                        width: 3
                    }
                };
                if (configObj.showLine == true && configObj.showMedianLabel == true) {
                    series = [boxPlotSeries, lineSeriesWithMarkPoint];
                } else if (configObj.showLine == true && (configObj.showMedianLabel == false || configObj.showMedianLabel == undefined)) {
                    series = [boxPlotSeries, lineSeries];
                } else if ((configObj.showLine == false || configObj.showLine == undefined) && configObj.showMedianLabel == true){
                    series = [boxPlotSeriesWithMarkPoint];
                } else {
                    series = [boxPlotSeries];
                }
            }

            // 切换图表的时候 创建过的实例不会创建，先dispose
            echarts.dispose(el);
            this.chart = echarts.init(el);

            var options = {
                color: ["#61a0a8"],
                backgroundColor: configObj.showDarkTheme == true ? "#4D4D4D" : "#FFFFFF",
                title: [
                    {
                        text: "upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR",
                        borderColor: configObj.showDarkTheme == true ? "#FFFFFF" : "#999999",
                        borderWidth: 1,
                        textStyle: {
                            fontSize: 14,
                            color: configObj.showDarkTheme == true ? "#FFFFFF" : "#000000"
                        },
                        left: "10%",
                        top: "90%"
                    }
                ],
                tooltip: {
                    trigger: "item",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: "10%",
                    right: "10%",
                    bottom: "15%"
                },
                xAxis: {
                    type: "category",
                    data: axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        formatter: "{value}",
                        textStyle: {
                            color: configObj.showDarkTheme == true ? "#FFFFFF" : "#000000"
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: configObj.showDarkTheme == true ? "#FFFFFF" : "#000000"
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    name: "",
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: configObj.showDarkTheme == true ? "#FFFFFF" : "#000000"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: configObj.showDarkTheme == true ? "#FFFFFF" : "#000000"
                        }
                    }
                },
                series: series
            };
            this.chart.setOption(options);

            // var pointPara = {
            //     row: {
            //         "点击的点的维度id": "维度值",
            //         "点击的点的维度1id": "维度值",
            //         "点击的点的指标id": "指标值",
            //         "点击的点的指标2id": "指标值"
            //     },
            //     metaData: [{id: "维度字段id"}, {id: "指标字段id"}],
            //     pos: {x: 12, y:24} // 相对位置
            // };

            // var dimensionPara = {
            //     dId: "String",
            //     value: [{dId: string, text: ""}]
            // };
            // 触发联动 钻取
            // this.pointTrigger();
            // 触发维度联动
            // this.dimensionTrigger(dimensionPara);
            this.chart.on("click", function(para) {
                self.dimensionTrigger({
                    dId: para.seriesId,
                    value: [{dId: para.seriesId, text: para.name}]
                });
            });

            // echarts找到 横轴上维度点击的事件，但箱线图横轴维度点击不了，如果可以应该按如下写法
            // this.chart.on("dimensionClick", function () {
            //  var dimensionPara = {
            //     dId: "String",
            //     value: [{dId: string, text: ""}]
            //  };
            // self.dimensionTrigger(dimensionPara);
            // })
        };

        this.resize = function(width, height) {
            this.chart &&
            this.chart.resize({
                width: width,
                height: height
            });
        };
    }

    BI.provider("bi.provider.share.chart", chartDisplayProvider);
    // BI.provider("bi.provider.design.chart.edit", chartChangeProvider);
    BI.provider("bi.provider.share.expander", expanderProvider);

    BI.config("bi.provider.chart", function(provider) {
        provider.inject(config);
    });

}));