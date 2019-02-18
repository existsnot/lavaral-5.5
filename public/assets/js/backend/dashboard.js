define(['jquery', 'bootstrap', 'backend', 'addtabs', 'table', 'echarts', 'echarts-theme', 'template', 'vue'], function ($, undefined, Backend, Datatable, Table, Echarts, undefined, Template, Vue) {

    var Controller = {
        index: function () {
            var vim = new Vue({
                el: '#app',
                data: {
                    info: {},
                    Orderdata:{
                        column:[],
                        paydata:[],
                        createdata:[]
                    }
                },
                created: function () {

                },
                mounted: function () {
                    var that = this;
                    that.getInfo();

                },
                methods: {
                    getInfo: function () {
                        var that = this;
                        //loading层
                        var index = layer.load(1, {
                            shade: [0.1,'#fff'] //0.1透明度的白色背景
                        });
                        $.ajax({
                            dataType: 'JSON',
                            success: function (res) {
                                that.info = res;
                                for(var key in res.paylist){
                                    that.Orderdata.column.push(key);
                                    that.Orderdata.paydata.push(res.paylist[key]);
                                    that.Orderdata.createdata.push(res.createlist[key]);
                                }
                                that.$nextTick(function () {
                                    layer.close(index);
                                    that.echarts();
                                })
                            }
                        })
                    },
                    echarts: function () {
                        // 基于准备好的dom，初始化echarts实例
                        var that=this;
                        var myChart = Echarts.init(document.getElementById('echart'), 'walden');

                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: '',
                                subtext: ''
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: [__('Sales'), __('Orders')]
                            },
                            toolbox: {
                                show: false,
                                feature: {
                                    magicType: {show: true, type: ['stack', 'tiled']},
                                    saveAsImage: {show: true}
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: that.Orderdata.column
                            },
                            yAxis: {},
                            grid: [{
                                left: 'left',
                                top: 'top',
                                right: '10',
                                bottom: 30
                            }],
                            series: [{
                                name: __('Sales'),
                                type: 'line',
                                smooth: true,
                                areaStyle: {
                                    normal: {}
                                },
                                lineStyle: {
                                    normal: {
                                        width: 1.5
                                    }
                                },
                                data: that.Orderdata.paydata
                            },
                                {
                                    name: __('Orders'),
                                    type: 'line',
                                    smooth: true,
                                    areaStyle: {
                                        normal: {}
                                    },
                                    lineStyle: {
                                        normal: {
                                            width: 1.5
                                        }
                                    },
                                    data: that.Orderdata.createdata
                                }]
                        };

                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);

                        //动态添加数据，可以通过Ajax获取数据然后填充
                        setInterval(function () {
                            $.ajax({
                                url:"dashboard/getOrderInfo",
                                dataType: "JSON",
                                success:function (res) {
                                    for(var Key in res.paylist){
                                        that.Orderdata.column.push(Key);
                                        that.Orderdata.createdata.push(res.createlist[Key]);
                                        that.Orderdata.paydata.push(res.paylist[Key]);
                                    }
                                    //按自己需求可以取消这个限制
                                    if (that.Orderdata.column.length >= 20) {
                                        //移除最开始的一条数据
                                        that.Orderdata.column.shift();
                                        that.Orderdata.paydata.shift();
                                        that.Orderdata.createdata.shift();
                                    }
                                    myChart.setOption({
                                        xAxis: {
                                            data: that.Orderdata.column
                                        },
                                        series: [{
                                            name: __('Sales'),
                                            data: that.Orderdata.paydata
                                        },
                                            {
                                                name: __('Orders'),
                                                data: that.Orderdata.createdata
                                            }]
                                    });
                                    if ($("#echart").width() != $("#echart canvas").width() && $("#echart canvas").width() < $("#echart").width()) {
                                        myChart.resize();
                                    }
                                }
                            })


                        }, 2000);
                        $(window).resize(function () {
                            myChart.resize();
                        });
                    }
                }
            });

        }
    };

    return Controller;
});