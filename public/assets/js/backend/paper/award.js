define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
    var paper_id = Fast.api.query('paper_id');
    var param = 'paper_id=' + paper_id;

    /* 验证操作 */
    var validator = function() {
        var obj = {
            rules: {

            },
            fields: {
                'row[title]': 'required',
                'row[anum]': 'required;integer(+)',
                'row[sort]': 'required;integer(+)',
            }
        };
        $('#add-form').validator(obj);
        $('#edit-form').validator(obj);
    };

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'paper/award/index?' + param,
                    add_goods_url: 'paper/award/goods?' + param,
                    add_coupon_url: 'paper/award/coupon?' + param,
                    add_point_url: 'paper/award/add_point?' + param,
                    edit_url: 'paper/award/edit?' + param,
                    del_url: 'paper/award/del?' + param,
                    multi_url: 'paper/award/multi?' + param,
                    table: 'paper_award',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search:false,
                showToggle: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title')},
                        {field: 'type', title: __('Type'), visible:false, searchList: {"0":'实物', "1":'优惠券', "2":'积分'}},
                        {field: 'type_text', title: __('Type'), operate:false},
                        // {field: 'objid', title: __('Objid')},
                        {field: 'objtitle', title: __('Objtitle'), operate:false, formatter: function (value, row, index) {
                                switch (parseInt(row.type)) {
                                    case 0:
                                        return row.leescoregoods.name;
                                    case 1:
                                        return row.coupon.name;
                                    case 2:
                                        return row.objid + '积分';
                                }
                            }},
                        {field: 'anum', title: __('Anum')},
                        {field: 'sort', title: __('Sort')},
                        // {field: 'creator', title: __('Creator')},
                        {field: 'admin.username', title: __('Admin.username')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'coupon.name', title: __('Coupon.name'), visible: false},
                        {field: 'coupon.mode', title: __('Coupon.mode'), visible: false, searchList: {"1":'现金抵用卷', "2":'折扣券'}},
                        {field: 'leescoregoods.name', title: __('Leescoregoods.name'), visible: false},
                        {field: 'objid', title: __('Point.num'), visible: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            $(document).find('.btn-add_goods').click(function () {
                Fast.api.open($.fn.bootstrapTable.defaults.extend.add_goods_url, __('Add_goods'), {
                    end: function () {
                        $('.btn-refresh').click();
                    }
                });
            });
            $(document).find('.btn-add_coupon').click(function () {
                Fast.api.open($.fn.bootstrapTable.defaults.extend.add_coupon_url, __('Add_coupon'), {
                    end: function () {
                        $('.btn-refresh').click();
                    }
                });
            });
            $(document).find('.btn-add_point').click(function () {
                Fast.api.open($.fn.bootstrapTable.defaults.extend.add_point_url, __('Add_point'), {
                    end: function () {
                        $('.btn-refresh').click();
                    }
                });
            });
        },
        goods: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'paper/award/goods?' + param,
                    select_url: 'paper/award/add_goods?' + param,
                    table: 'leescore_goods',
                }
            });

            var table = $("#table");
            var json = $.getJSON('leescore/leescoregoods/getOptions');
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                search:false,
                showToggle: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'category_id', title: __('Goods.Category name'), operate: '=', searchList: json,visible: false},
                        {field: 'thumb', title: __('Goods.Thumb'), operate: false, addclass: 'img-responsive', formatter: Table.api.formatter.image},
                        {field: 'name', title: __('Goods.Name')},
                        {field: 'status', title: __('Goods.Status'), visible:false, searchList: {"1":__('上架'),"2":__('下架')},
                                formatter: function (value) {
                                    switch (parseInt(value)) {
                                        case 1:
                                            return '上架';
                                        case 2:
                                            return '下架';
                                    }
                                }},
                        {field: 'stock', title: __('Goods.Stock'), operate: 'BETWEEN'},
                        {field: 'money', title: __('Goods.Money'), operate:'BETWEEN'},
                        {field: 'operate', title: __('Operate'),   table: table, events: Table.api.events.operate, formatter: Table.api.formatter.buttons, buttons: [
                                {
                                    name: 'select',
                                    text: '选择',
                                    title: '选择',
                                    url: $.fn.bootstrapTable.defaults.extend.select_url + '&goods_ids={ids}',
                                    classname: 'btn btn-xs btn-success btn-ajax'
                                }
                            ]}
                    ]
                ],
                commonSearch: true,
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            $(document).find('.btn-add_goods').click(function () {
                var ids = Table.api.selectedids(table);
                Fast.api.ajax({
                    url: $.fn.bootstrapTable.defaults.extend.select_url,
                    data: {
                        goods_ids: ids.join(',')
                    }
                });
                return false;
            });
        },
        coupon: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'paper/award/coupon?' + param,
                    select_url: 'paper/award/add_coupon?' + param,
                    table: 'coupon',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search:false,
                showToggle: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Coupon.Name')},
                        {field: 'mode', title: __('Coupon.Mode'), visible:false, searchList: {"1":__('现金抵用券'),"2":__('折扣券')}},
                        {field: 'mode_text', title: __('Coupon.Mode'), operate:false},
                        {field: 'quota', title: __('Coupon.Quota')},
                        {field: 'validity_type', title: __('Coupon.Validity_type'), visible:false, searchList: {"0":__('固定有效期'),"1":__('滚动有效期')}},
                        {field: 'validity_type_text', title: __('Coupon.Validity_type'), operate:false},
                        {field: 'createtime', title: __('Coupon.Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'),   table: table, events: Table.api.events.operate, formatter: Table.api.formatter.buttons, buttons: [
                                {
                                    name: 'select',
                                    text: '选择',
                                    title: '选择',
                                    url: $.fn.bootstrapTable.defaults.extend.select_url + '&coupon_ids={ids}',
                                    classname: 'btn btn-xs btn-success btn-ajax'
                                }
                            ]}
                    ]
                ]
            });


            // 为表格绑定事件
            Table.api.bindevent(table);
            $(document).find('.btn-add_coupon').click(function () {
                var ids = Table.api.selectedids(table);
                Fast.api.ajax({
                    url: $.fn.bootstrapTable.defaults.extend.select_url,
                    data: {
                        coupon_ids: ids.join(',')
                    }
                });
                return false;
            });
        },
        add_point: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
            validator();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});