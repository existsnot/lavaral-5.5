define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/courecelog/index',
                    add_url: 'market/courecelog/add',
                    edit_url: 'market/courecelog/edit',
                    del_url: 'market/courecelog/del',
                    multi_url: 'market/courecelog/multi',
                    table: 'coupon_receipt_log',
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
                        {field: 'id', title: __('Id')},
                        {field: 'coupon_id', title: __('Coupon_id')},
                        {field: 'user_id', title: __('User_id')},
                        {field: 'issue_rule', title: __('Issue_rule')},
                        {field: 'number', title: __('Number')},
                        {field: 'creator', title: __('Creator')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'coupon.name', title: __('Coupon.name')},
                        {field: 'coupon.desc', title: __('Coupon.desc')},
                        {field: 'user.username', title: __('User.username')},
                        {field: 'user.nickname', title: __('User.nickname')},
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