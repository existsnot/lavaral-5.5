define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    // 格式化数值类型
    var type_list = ['银行卡','微信'];
    var formatter_type = function (val, row) {
        switch (parseInt(val)) {
            case 0:
                return '银行卡';
            case 1:
                return '微信';
        }
    };
    // 格式化数值类型
    var status_list = ['未审核','审核通过','审核不通过'];
    var formatter_status = function (val, row) {
        switch (parseInt(val)) {
            case 0:
                return '<span class="btn btn-xs btn-primary">未审核</span>';
            case 1:
                return '<span class="btn btn-xs btn-success">审核通过</span>';
            case 2:
                return '<span class="btn btn-xs btn-danger">审核不通过</span>';
        }
    };

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/pointwithdraw/index',
                    table: 'point_withdraw',
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
                        {field: 'type', title: __('Type'), searchList: type_list, formatter: formatter_type},
                        {field: 'value', title: __('Value'), operate:'BETWEEN'},
                        {field: 'poundage', title: __('Poundage'), operate:'BETWEEN'},
                        {field: 'real_value', title: __('Real_value'), operate:'BETWEEN'},
                        // {field: 'creator', title: __('Creator')},
                        {field: 'user.username', title: __('User.username')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'user.weixin_account', title: __('User.weixin_account')},
                        {field: 'user.bank_account', title: __('User.bank_account')},
                        {field: 'status', title: __('Status'), searchList: status_list, formatter: formatter_status},
                        {field: 'operate', title: __('Operate'), table: table, events: {
                                'click .btn-auditing': function (e, value, row, index) {
                                    var url = $.fn.bootstrapTable.defaults.extend.auditing_url + '?ids=' + row.id;
                                    Layer.confirm('请选择是否审核通过', {
                                        btn: ['审核通过', '审核不通过']
                                    }, function (index) {
                                        Fast.api.ajax({
                                            url: url,
                                            data: {
                                                status: 1
                                            }
                                        }, function () {
                                            $('.btn-refresh').click();
                                        });
                                        Layer.close(index);
                                    }, function () {
                                        Fast.api.ajax({
                                            url: url,
                                            data: {
                                                status: 2
                                            }
                                        }, function () {
                                            $('.btn-refresh').click();
                                        });
                                    });
                                }
                            }, formatter: Table.api.formatter.buttons, buttons: [
                                {
                                    name: 'auditing',
                                    text: '审核',
                                    title: '审核',
                                    classname: 'btn btn-xs btn-success btn-auditing',
                                    visible: function (row) {
                                        if(row.status > 0){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }
                                },
                                {
                                    name: 'point_in',
                                    text: '积分获取明细',
                                    title: '积分获取明细',
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    url: 'market/pointwithdraw/point_in?user_id={creator}'
                                },
                                {
                                    name: 'point_out',
                                    text: '积分支出明细',
                                    title: '积分支出明细',
                                    classname: 'btn btn-xs btn-warning btn-dialog',
                                    url: 'market/pointwithdraw/point_out?user_id={creator}'
                                }
                            ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        point_in: function () {
            var user_id = Fast.api.query('user_id');
            var param = 'user_id=' + user_id;

            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/pointwithdraw/point_in?' + param,
                    table: 'point_in',
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
                        {field: 'id', title: __('Id')},
                        {field: 'receipt_rule', title: __('In.Receipt_rule'), operate: false},
                        {field: 'number', title: __('In.Number'), operate:'RANGE'},
                        {field: 'createtime', title: __('In.Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        point_out: function () {
            var user_id = Fast.api.query('user_id');
            var param = 'user_id=' + user_id;

            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/pointwithdraw/point_out?' + param,
                    table: 'point_in',
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
                        {field: 'id', title: __('Id')},
                        {field: 'receipt_rule', title: __('In.Receipt_rule'), operate: false},
                        {field: 'number', title: __('In.Number'), operate:'RANGE'},
                        {field: 'createtime', title: __('In.Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});