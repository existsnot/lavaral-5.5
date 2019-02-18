define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/chargepoint/index',
                    add_url: 'market/chargepoint/add',
                    edit_url: 'market/chargepoint/edit',
                    del_url: 'market/chargepoint/del',
                    multi_url: 'market/chargepoint/multi',
                    table: 'user',
                }
            });

            // $.ajax({
            //     url:"/admin/user/leveltype/index",
            //     success:function (res) {
            //         console.log(res);
            //     }
            // });

            console.log($.getJSON("/admin/market/chargepoint/leveltype"));

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
                        {field: 'username', title: __('Username')},
                        {field: 'nickname', title: __('Nickname')},
                        {field: 'mobile', title: __('Mobile')},
                        {field: 'level.level_name', title: __('Level'), visible:false, searchList: $.getJSON("/admin/market/chargepoint/leveltype")},
                        {field: 'level.level_name', title: __('Level'), operate:false},
                        {field: 'score', title: __('Score')},
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