define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'goods/index',
                    add_url: 'goods/add',
                    edit_url: 'goods/edit',
                    del_url: 'goods/del',
                    multi_url: 'goods/multi',
                    table: 'goods',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'name', title: __('Name')},
                        {field: 'image', title: __('Image'), formatter: Table.api.formatter.image, operate: false},
                        {
                            field: 'goods_class_id',
                            title: __('Goods_class_id'),
                            visible: false,
                            searchList: $.getJSON('goodsclass/index', {keyField: 'ddd'})
                        },
                        {field: 'goodsclass.name', title: __('Goodsclass.name'), operate: false},
                        {
                            field: 'type', title: __('Type'), formatter: function (value) {
                                if (value == 1) {
                                    return '虚拟商品'
                                } else {
                                    return '实物商品'
                                }
                            },searchList:{"1": __('虚拟商品'), "0": __('实物商品')}
                        },
                        {field: 'stock', title: __('Stock'), operate: false},
                        {field: 'stock_early_warning', title: __('Stock_early_warning'), operate: false},
                        {field: 'market_price', title: __('Market_price'), operate: 'BETWEEN', operate: false},
                        {field: 'integral_price', title: __('Integral_price'), operate: false},
                        {
                            field: 'status',
                            title: __('Status'),
                            searchList: {"1": __('上架'), "0": __('下架')},
                            formatter: function (value) {
                                if (value == 1) {
                                    return '上架';
                                } else {
                                    return '下架';
                                }
                            }
                        },
                        {
                            field: 'createtime',
                            title: __('Createtime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});