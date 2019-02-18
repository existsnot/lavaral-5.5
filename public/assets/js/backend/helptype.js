define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
            index: function () {
                // 初始化表格参数配置
                Table.api.init({
                    extend: {
                        index_url: 'helptype/index',
                        add_url: 'helptype/add',
                        edit_url: 'helptype/edit',
                        del_url: 'helptype/del',
                        multi_url: 'helptype/multi',
                        table: 'help_type',
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
                                {
                                    field: 'name', title: __('Name'), formatter: function (value) {
                                        return Fast.api.HTMLDecode(value);
                                    }
                                },

                                {
                                    field: 'status',
                                    title: __('Status'),
                                    visible: false,
                                    searchList: {"0": __('禁用'), "1": __('启用')}
                                },
                                {field: 'status_text', title: __('Status'), operate: false},

                                {
                                    field: 'weigh',
                                    title: __('Weigh'),
                                    operate: false

                                },
                                {field: 'admin.username', title: __('Admin.username'), operate: false},
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
                    }
                );

// 为表格绑定事件
                Table.api.bindevent(table);
            },
            add: function () {
                Controller.api.bindevent();
            }
            ,
            edit: function () {
                Controller.api.bindevent();
            }
            ,
            api: {
                bindevent: function () {
                    Form.api.bindevent($("form[role=form]"));
                }
            }
        }
    ;
    return Controller;
})
;