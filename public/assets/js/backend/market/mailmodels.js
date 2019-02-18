define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/mailmodels/index',
                    add_url: 'market/mailmodels/add',
                    edit_url: 'market/mailmodels/edit',
                    del_url: 'market/mailmodels/del',
                    multi_url: 'market/mailmodels/multi',
                    table: 'mail_models',
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
                        {field: 'created', title: __('Created')},
                        {field: 'send_title', title: __('Send_title')},
                        {field: 'send_content', title: __('Send_content')},
                        {field: 'is_use', title: __('Is_use'),operate:'=',searchList: {"0": __('未使用'), "1": __('已使用')}, formatter: Table.api.formatter.label},
                        {field: 'admin.nickname', title: __('Admin.nickname')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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