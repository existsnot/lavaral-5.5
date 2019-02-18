define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'fans/index',
                    add_url: 'fans/add',
                    edit_url: 'fans/edit',
                    del_url: 'fans/del',
                    multi_url: 'fans/multi',
                    table: 'wechat_fans',
                }
            });

            var table = $("#table");
            var sex = {0: '未知', 1: "男", 2: '女'};
            var subscribe={0:'未订阅',1:"已订阅"};
            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'nickname', title: __('Nickname'), operate: false},
                        {field: 'nickname_decode', title: __('Nickname'), visible: false},
                        {field: 'headimgurl', title: __('Headimgurl'), formatter: Table.api.formatter.image,operate: false},
                        {
                            field: 'sex',
                            title: __('Sex'),
                            searchList: sex,
                            formatter: function (value) {
                                return sex[value];
                            }
                        },
                        {field: 'openid', title: __('openid')},
                        {field: 'unionid', title: __('unionid')},
                        {field: 'language', title: __('Language'),operate:false},
                        {field: 'country', title: __('Country')},
                        {field: 'province', title: __('Province'),operate:false},
                        {field: 'city', title: __('City'),operate:false},
                        {field: 'subscribe', title: __('Subscribe') ,searchList: subscribe,
                            formatter: function (value) {
                                return subscribe[value];
                            }},
                        {field: 'remark', title: __('Remark'),operate:false},
                        {field: 'subscribe_time', title: __('Subscribe_time'),formatter:Table.api.formatter.datetime,operate:false,},
                        {field: 'updatetime', title: __('Updatetime'),formatter:Table.api.formatter.datetime,operate:false,}
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