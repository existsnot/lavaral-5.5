define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            $(function () {
                Table.api.init({
                    extend: {
                        index_url: 'goodsclass/index',
                        add_url: 'goodsclass/add',
                        edit_url: 'goodsclass/edit',
                        del_url: 'goodsclass/del',
                        multi_url: 'goodsclass/multi',
                        table: 'goods_class',
                    }
                },{align: 'left',});

                var table = $("#table");
                // 初始化表格
                table.bootstrapTable({
                    url: $.fn.bootstrapTable.defaults.extend.index_url,
                    pk: 'id',
                    idField: 'id',
                    sortName: 'sort',
                    columns: [
                        [
                            {checkbox: true},
                            {
                                field: 'name', title: __('Name'),class:"text-left", formatter: function (value, row, index) {
                                 return Table.api.htmlDecode(value);
                                }
                            },

                            {field: 'admin.username', title: __('Admin.username')},

                            {
                                field: 'sort',
                                title: __('Sort'),

                            },
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
                            },
                        ]
                    ],
                    //最主要的就是下面  定义哪一列作为展开项  定义父级标志 这里是pid
                    //定义的列一定是要在表格中展现的  换言之就是上方有这个列 不然报错


                });

                // 为表格绑定事件
                Table.api.bindevent(table);
                Table.api.treeGrid(table,{treePid:'parent_id'});

            })
//解码



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