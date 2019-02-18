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

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'reward/payment/index',
                    add_url: 'reward/payment/add',
                    edit_url: 'reward/payment/edit',
                    del_url: 'reward/payment/del',
                    multi_url: 'reward/payment/multi',
                    table: 'reward_payment',
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
                        {field: 'mode', title: __('Mode'), searchList: {"0":"现金", "1":"积分"},
                            formatter: function (val, row) {
                                return formatter_mode(val, row);
                            }
                        },
                        {field: 'value', title: __('Value'), operate:'BETWEEN'},
                        // {field: 'payment_id', title: __('Payment_id')},
                        // {field: 'creator', title: __('Creator')},
                        {field: 'user.username', title: __('User.username')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        // {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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