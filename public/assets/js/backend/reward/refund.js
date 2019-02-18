define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    // 格式化数值类型
    var formatter_mode = function (val, row) {
        switch (parseInt(val)) {
            case 0:
                return '现金';
            case 1:
                return '积分';
        }
    };
    // 格式化数值类型
    var formatter_value = function (val, row) {
        switch (parseInt(row.mode)) {
            case 0:
                return '¥ ' + val;
            case 1:
                return parseInt(val);
        }
    };
    // 格式化数值类型
    var formatter_status = function (val, row) {
        switch (parseInt(val)) {
            case 0:
                return '<span class="btn btn-xs btn-primary">未审核</span>';
            case 1:
                return '<span class="btn btn-xs btn-success">通过</span>';
            case 2:
                return '<span class="btn btn-xs btn-danger">不通过</span>';
        }
    };

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'reward/refund/index',
                    auditing_url: 'reward/refund/auditing',
                    table: 'reward_refund',
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
                        // {checkbox: true},
                        {field: 'id', title: __('Id')},
                        // {field: 'problem_id', title: __('Problem_id')},
                        {field: 'problem.describe', title: __('Problem.describe')},
                        // {field: 'reward_payment_id', title: __('Reward_payment_id')},
                        {field: 'mode', title: __('Mode'), searchList: {"0":"现金", "1":"积分"},
                            formatter: function (val, row) {
                                return formatter_mode(val, row);
                            }},
                        {field: 'value', title: __('Value'), operate:'BETWEEN',
                            formatter: function (val, row) {
                                return formatter_value(val, row);
                            }},
                        {field: 'poundage', title: __('Poundage'), operate:'BETWEEN',
                            formatter: function (val, row) {
                                return formatter_value(val, row);
                            }},
                        {field: 'real_value', title: __('Real_value'), operate:'BETWEEN',
                            formatter: function (val, row) {
                                return formatter_value(val, row);
                            }},
                        // {field: 'payment_id', title: __('Payment_id')},
                        // {field: 'creator', title: __('Creator')},
                        {field: 'user.username', title: __('User.username')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {"0":"未审核", "1":"通过", "2":"不通过"},
                            formatter: function (val, row) {
                                return formatter_status(val, row);
                            }}
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