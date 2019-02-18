define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'feedback/ques/index',
                    edit_url: 'feedback/ques/edit',
                    del_url: 'feedback/ques/del',
                    multi_url: 'feedback/ques/multi',
                    table: 'feedback_ques',
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
                        {field: 'feedbackquestype.name', title: __('Feedbackquestype.name')},
                        // {field: 'questions.title', title: __('Questions.title')},
                        // {field: 'content', title: __('Content')},
                        {field: 'user.username', title: __('User.username')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {'0':'未审核', '1':'已采纳', '2':'不予采纳'},
                            formatter: function (val) {
                                switch (parseInt(val)) {
                                    case 0:
                                        return '<span class="btn btn-xs btn-primary">未审核</span>';
                                    case 1:
                                        return '<span class="btn btn-xs btn-success">已采纳</span>';
                                    case 2:
                                        return '<span class="btn btn-xs btn-danger">不予采纳</span>';
                                }
                            }},
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