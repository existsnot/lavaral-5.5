define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/coupon/index',
                    add_url: 'market/coupon/add',
                    edit_url: 'market/coupon/edit',
                    del_url: 'market/coupon/del',
                    multi_url: 'market/coupon/multi',
                    table: 'coupon',
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
                        {field: 'name', title: __('Name')},
                        {field: 'desc', title: __('Desc')},
                        {field: 'mode', title: __('Mode'), visible:false, searchList: {"1":__('现金抵用券'),"2":__('折扣券')}},
                        {field: 'mode_text', title: __('Mode'), operate:false},
                        {field: 'quota', title: __('Quota')},
                        {field: 'maxcount', title: __('Maxcount')},
                        {field: 'validity_type', title: __('Validity_type'), visible:false, searchList: {"0":__('固定有效期'),"1":__('滚动有效期')}},
                        {field: 'validity_type_text', title: __('Validity_type'), operate:false},
                        {field: 'validity_start', title: __('Validity_start')},
                        {field: 'validity_end', title: __('Validity_end')},
                        {field: 'validity_day', title: __('Validity_day')},
                        {field: 'start_time', title: __('Start_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'end_time', title: __('End_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'admin.nickname', title: __('Creator')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), visible:false, searchList: {"1) unsigned zerofil":__('1) unsigned zerofil')}},
                        {field: 'status_text', title: __('Status'), operate:false},
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