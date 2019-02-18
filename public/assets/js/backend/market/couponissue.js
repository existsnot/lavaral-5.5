define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {



    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'market/couponissue/index',
                    add_url: 'market/couponissue/add',
                    // edit_url: 'market/couponissue/edit',
                    // del_url: 'market/couponissue/del',
                    multi_url: 'market/couponissue/multi',
                    table: 'user',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                searchFormVisible: true,
                sortName: 'user.id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'), sortable: true},
                        {field: 'group_id', title: __('Group'), visible:false, searchList:{0:__('未认证'),1:__('学生用户组'),2:__('老师用户组')}},
                        {field: 'group.name', title: __('Group'),operate: false},
                        {field: 'username', title: __('Username'), operate: 'LIKE'},
                        {field: 'nickname', title: __('Nickname'), operate: 'LIKE'},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'avatar', title: __('Avatar'), formatter: Table.api.formatter.image, operate: false},
                        {field: 'level', title: __('Level'),visible:false, searchList: $.getJSON("/admin/market/chargepoint/leveltype")},
                        {field: 'level.level_name', title: __('Level'),operate:false},
                        {field: 'gender', title: __('Gender'),searchList: {1: __('Male'), 0: __('Female')},formatter: function(value){
                            if(value == 1 ){
                                return "男";
                            }else if(value == 0){
                                return "女";
                            }
                         }},

                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons: [
                                {
                                    name: 'award',
                                    text: '发放优惠券',
                                    classname: 'btn btn-info btn-xs btn-dialog',
                                    url: 'market/couponissue/edit?ids={ids}'
                                }
                            ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            $(document).find('.btn-test').click(function () {
                ids = Table.api.selectedids(table);
                Fast.api.open("market/couponissue/del2?ids=" + ids, "批量发放优惠券", {});
            });

        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();

            var this_name = '#c-mode_type';
            var change = function(val){
                var this_val = $(this_name).val();
                console.log(this_val);
                $.ajax({
                   url:"market/couponissue/getCouponMaximum?id=" + this_val,
                    success:function (res) {
                        $("#count").html("优惠券还剩最大发放数量" + res + "张");
                    },error:function(){
                       console.log("err");
                    }
                });
            }
            change();
            $(this_name).change(function (){
                change($(this_name).val());
            });
        },
        del2: function () {
            Controller.api.bindevent();

            var this_name = '#c-mode_type';
            var change = function(val){
                var this_val = $(this_name).val();
                console.log(this_val);
                $.ajax({
                   url:"market/couponissue/getCouponMaximum?id=" + this_val,
                    success:function (res) {
                        $("#count").html("优惠券还剩最大发放数量" + res + "张");
                    },error:function(){
                       console.log("err");
                    }
                });
            }
            change();
            $(this_name).change(function (){
                change($(this_name).val());
            });
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});