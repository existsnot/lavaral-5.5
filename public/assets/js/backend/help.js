define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'help/index',
                    add_url: 'help/add',
                    edit_url: 'help/edit',
                    del_url: 'help/del',
                    multi_url: 'help/multi',
                    table: 'help',
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
                        {field: 'title', title: __('Title')},
                        {field: 'excerpt', title: __('Excerpt'),operate:false},
                        {field: 'type_id', title: __('Type_id'),visible:false,searchList: $.getJSON( $.fn.bootstrapTable.defaults.extend.index_url,{'select':'select'})},
                        {field: 'helptype.name', title: __('Helptype.name'),operate:false},
                        {field: 'status', title: __('Status'), visible:false, searchList: {"0":__('禁用'),"1":__('启用')}},
                        {field: 'status_text', title: __('Status'), operate:false},
                        {field: 'sort', title: __('Sort'),operate:false},
                        {field: 'admin.username', title: __('Admin.username'),operate:false},
                        {field: 'cratetime', title: __('Cratetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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