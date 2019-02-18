define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'fast/index',
                    add_url: 'fast/add',
                    edit_url: 'fast/edit',
                    del_url: 'fast/del',
                    multi_url: 'fast/multi',
                    import_url: 'fast/import',
                    table: 'fast',
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
                        {field: 'imglist', title: __('imglist'), formatter: Table.api.formatter.images},
                        {field: 'Description', title: __('Description')},
                        {field: 'school.name', title: __('School.name'), operate:'like'},
                        {field: 'year', title: __('Year')},
                        {field: 'status', title: __('Status'), visible:false, searchList: {"0":__('未审核'),"1":__('已审核')}},
                        {field: 'status_text', title: __('Status'), operate:false},
                        {field: 'admin.nickname', title: __('Creator')},
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