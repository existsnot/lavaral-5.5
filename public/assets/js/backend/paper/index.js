define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    /* 验证操作 */
    var validator = function() {
        var obj = {
            rules: {

            },
            fields: {
                'row[title]': 'required',
                'row[type_id]': 'required',
                'row[begintime]': 'required',
                'row[endtime]': 'required;match(gte, row[begintime], datetime)',
                'row[score]': 'required',
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
                    index_url: 'paper/index/index',
                    add_url: 'paper/index/add',
                    edit_url: 'paper/index/edit',
                    del_url: 'paper/index/del',
                    multi_url: 'paper/index/multi',
                    table: 'paper',
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
                        {field: 'title', title: __('Title')},
                        // {field: 'type_id', title: __('Type_id')},
                        {field: 'papertype.name', title: __('Papertype.name')},
                        {field: 'pic', title: __('Pic'), formatter: Table.api.formatter.image},
                        {field: 'begintime', title: __('Begintime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'endtime', title: __('Endtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'duration', title: __('Duration')},
                        {field: 'score', title: __('Score')},
                        {field: 'admin.username', title: __('Admin.username')},
                        // {field: 'creator', title: __('Creator')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), searchList: {'0':'未审核', '1':'已审核'},
                            formatter: function (val) {
                                switch (parseInt(val)) {
                                    case 0:
                                        return '<span class="btn btn-xs btn-primary">未审核</span>';
                                    case 1:
                                        return '<span class="btn btn-xs btn-success">已审核</span>';
                                }
                            }},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons: [
                                {
                                    name: 'join',
                                    text: '参与名单',
                                    classname: 'btn btn-info btn-xs btn-dialog',
                                    url: 'paper/join/index?paper_id={ids}',
                                    visible: function (row) {
                                        if(1 == row.status){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    }
                                },
                                {
                                    name: 'award',
                                    text: '设置奖励',
                                    classname: 'btn btn-info btn-xs btn-dialog',
                                    url: 'paper/award/index?paper_id={ids}'
                                },
                                {
                                    name: 'ques',
                                    text: '题库',
                                    classname: 'btn btn-info btn-xs btn-dialog',
                                    url: 'paper/ques/index?paper_id={ids}'
                                },
                                {
                                    name: 'changestatus',
                                    text: '审核',
                                    classname: 'btn btn-warning btn-xs btn-ajax',
                                    url: 'paper/index/changeStatus',
                                    confirm: '审核后将无法修改题库，确认审核吗？',
                                    success: function (data, ret) {
                                        $('.fa.fa-refresh').click();
                                    },
                                    visible: function (row) {
                                        if(0 == row.status){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    }
                                }
                            ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            validator();
            Controller.api.bindevent();
        },
        edit: function () {
            validator();
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