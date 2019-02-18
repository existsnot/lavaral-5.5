define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'layer', 'gallery', 'vue'], function ($, undefined, Backend, Table, Form, Layer, undefined, Vue) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'pronlem/index',
                    add_url: 'pronlem/add',
                    // edit_url: 'pronlem/edit',
                    del_url: 'pronlem/del',
                    multi_url: 'pronlem/multi',
                    table: 'problem',
                    select: 'user/user/index?select=select&table=user',
                    open_url: 'pronlem/add?id={ids}'
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
                            field: 'user_id',
                            title: __('User_id'),
                            visible: false,
                            searchList: $.getJSON($.fn.bootstrapTable.defaults.extend.select)
                        },
                        {field: 'user.nickname', title: __('User_id'), operate: false},
                        {field: 'describe', title: __('Describe')},

                        {field: 'price', title: __('Price'), operate: false},
                        {field: 'deduction_point', title: __('Deduction_point'), operate: 'BETWEEN'},
                        {
                            field: 'releasetime',
                            title: __('Releasetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'status',
                            title: __('Status'),
                            searchList: {0: "未发布", 1: '已发布'},
                            formatter: function (val) {
                                if (val == 0) {
                                    return '<span class="btn btn-xs btn-primary">未发布</span>';
                                } else if (val == 1) {
                                    return '<span class="btn btn-xs btn-success">已发布</span>';
                                } else if (val == 2) {
                                    return '<span class="btn btn-xs btn-danger">未通过</span>';
                                }
                            }
                        },
                        {
                            field: 'examine',
                            title: __('Examine'),
                            searchList: {0: "未审核", 1: '已审核', 2: '未通过'},
                            formatter: function (val) {
                                if (val == 0) {
                                    return '<span class="btn btn-xs btn-primary">未审核</span>';
                                } else if (val == 1) {
                                    return '<span class="btn btn-xs btn-success">已审核</span>';
                                } else if (val == 2) {
                                    return '<span class="btn btn-xs btn-danger">未通过</span>';
                                }
                            }
                        },
                        {
                            field: 'admin.username',
                            title: __('Admin.username'),
                            operate: false,
                            formatter: function (value) {
                                if (Fast.api.empty(value)) {
                                    return '暂无';
                                } else {
                                    return value;
                                }
                            }
                        },
                        {
                            field: 'createtime',
                            title: __('Createtime'),
                            operate: false,
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table,
                            buttons: [
                                {
                                    url: $.fn.bootstrapTable.defaults.extend.open_url,
                                    name: 'see',
                                    text: "查看详情",
                                    title: __('查看详情'),
                                    extend: {
                                        title: false,
                                        type: 2,
                                        skin: 'layer-mobile', //样式类名
                                        closeBtn: 0, //不显示关闭按钮
                                        anim: 2,
                                        shadeClose: true, //开启遮罩关闭
                                        content: $.fn.bootstrapTable.defaults.extend.open_url
                                    },
                                    classname: 'btn btn-xs btn-danger btn-pop-up',

                                },
                            ],
                            events: Table.api.events.operate,
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            // //自定页
            // layer.open({
            //     title: false,
            //     type: 2,
            //     skin: 'layer-mobile', //样式类名
            //     closeBtn: 0, //不显示关闭按钮
            //     anim: 2,
            //     shadeClose: true, //开启遮罩关闭
            //     content: 'pronlem/add',
            // });
        },
        add: function () {
            var vm = new Vue({
                el: "#app"
                , data: {
                    getInfoList: {},
                    info: {},
                    getInfoUrl: "pronlem/getInfo",
                    getListUrl: "pronlem/getList",
                    delProblemUrl: 'pronlem/del',
                    delProblemCommentUrl: 'Problemcomment/del',
                    examineUrl: "pronlem/examine",
                    checkIndex: 0,
                    taskbook_images: '',
                    quickgraph_images: '',
                    page_index: 1,
                    list: [],
                    html: "",
                    flag: 0,
                    png: '/assets/img/v2_pjauwj.png',
                    gif: '/assets/img/pjauwj.gif',
                    src: '',
                    music: null
                }

                , created: function () {
                    let music = new Audio();
                    this.music = music;
                }
                , mounted: function () {
                    var that = this;
                    that.getInfo();
                    that.getList();
                    window.onscroll = function () {
                        var marginBot = 0;
                        if (document.documentElement.scrollTop) {
                            var X = document.documentElement.scrollHeight;
                            var Y = document.documentElement.scrollTop + document.body.scrollTop;
                            var Z = document.documentElement.clientHeight;
                            marginBot = X - Y - Z;
                        } else {
                            var J = document.body.scrollHeight;
                            var I = document.body.scrollTop;
                            var K = document.body.clientHeight;
                            marginBot = J - I - K;
                        }
                        if (marginBot <= 0) {
                            that.getList();
                        }
                    }
                }
                , methods: {
                    getInfo: function () {
                        var that = this;
                        $.ajax({
                            url: that.getInfoUrl,
                            data: {
                                id: Fast.api.query('id')
                            },
                            success: function (res) {
                                if (Fast.api.empty(res)) {
                                    Toastr.error('问题不存在');
                                    return false;
                                }
                                that.info = res.info;
                                if (Fast.api.empty(that.info.taskbook_images)) {
                                    that.taskbook_images = that.info.taskbook_images[0];
                                }
                                if (Fast.api.empty(that.info.quickgraph_images)) {
                                    that.quickgraph_images = that.info.quickgraph_images[0];
                                }
                                that.getInfoList = res.list;
                                that.$nextTick(function () {
                                    that.init();
                                })
                            }
                        });
                    },
                    getList: function () {
                        var that = this;
                        $.ajax({
                            url: that.getListUrl,

                            data: {
                                id: Fast.api.query('id'),
                                page_index: that.page_index
                            },
                            success: function (res) {
                                if (!Fast.api.empty(res.list)) {
                                    if (that.page_index == 1) {
                                        that.page_index = that.page_index * 1 + 1 * 1;
                                        that.list = res.list;
                                    } else if (that.page_index > 1) {
                                        for (var i = 0; i <= res.list.length; i++) {
                                            if (!Fast.api.empty(res.list[i])) {
                                                that.list.push(res.list[i]);
                                            }
                                        }
                                        that.page_index = that.page_index * 1 + 1 * 1;
                                    }
                                } else {

                                }
                            }
                        });
                    },
                    init: function () {
                        var that = this;
                        $('#DB_gallery').DB_gallery({
                            thumWidth: 110,
                            thumGap: 8,
                            thumMoveStep: 4,
                            moveSpeed: 300,
                            fadeSpeed: 500
                        });
                        $('#DB_gallery2').DB_gallery({
                            thumWidth: 110,
                            thumGap: 8,
                            thumMoveStep: 4,
                            moveSpeed: 300,
                            fadeSpeed: 500
                        });
                        Fast.api.mousemove(null, function (e, res, flag) {
                            var scrollTop = parseFloat($(document).scrollTop());
                            if (!flag) {
                                if (0 > res[0]) {
                                    return false;
                                }
                                scrollTop += parseFloat(res[0])
                            } else if (flag) {
                                if (0 > res[1]) {
                                    return false;
                                }
                                scrollTop -= parseFloat(res[1]);
                            }
                            if (scrollTop < -1) {
                                return false;
                            }
                            $(document).scrollTop(scrollTop)
                        });
                        Fast.api.mousedown(function (res) {
                            if (res != 3) {
                                return false;
                            }
                            if (that.info.examine != 0) {
                                return false;
                            }
                            var confirm_index = layer.confirm('是否通过审核?', {
                                btn: ['通过', '不通过'] //按钮
                            }, function () {
                                layer.close(confirm_index)
                                $.ajax({
                                    url: that.examineUrl,
                                    type: "POST",
                                    dataType: "json",
                                    data: {
                                        ids: Fast.api.query('id'),
                                        examine: '1'
                                    }, success: function (res) {;
                                    res=parseJSON(res);
                                        if (res.code == 1) {
                                            layer.msg('操作成功!', {icon: 1}, function () {
                                                that.info.examine = 1;
                                                window.parent.$(".toolbar .btn-refresh").trigger('click');
                                            });
                                        } else {
                                            layer.msg('操作失败!', {icon:2});
                                        }

                                        return false;
                                    }
                                })
                            }, function () {
                                layer.close(confirm_index)
                                $.ajax({
                                    url: that.examineUrl,
                                    type: "POST",
                                    dataType: "json",
                                    data: {
                                        ids: Fast.api.query('id'),
                                        examine: '2'
                                    }, success: function (res) {
                                        if (res.code == 1) {
                                            layer.msg('操作成功!', {icon: 1}, function () {
                                                that.info.examine = 2;
                                                window.parent.$(".toolbar .btn-refresh").trigger('click');
                                            });
                                        } else {
                                            layer.msg('操作失败!', {icon: 2});
                                        }

                                        return false;
                                    }
                                })
                            });
                        });
                    },

                    empty: function (d) {
                        return Fast.api.empty(d)
                    },
                    delProblem: function (id) {
                        var that = this;
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        var confirm_index = layer.confirm('是否删除？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            layer.close(confirm_index)
                            $.ajax({
                                url: that.delProblemUrl,
                                type: "POST",
                                dataType: "json",
                                data: {
                                    ids: Fast.api.query('id')
                                }, success: function (res) {
                                    if (res.code == 1) {
                                        layer.msg('删除成功', {icon: 1}, function () {
                                            window.parent.$(".toolbar .btn-refresh").trigger('click');
                                            parent.layer.close(index); //再执行关闭
                                        });
                                    } else {
                                        layer.msg('删除失败', {icon: 2});
                                    }

                                    return false;
                                }
                            })
                        }, function () {

                        });

                    },
                    delProblemComment: function (index, children_index) {
                        var that = this;
                        if (Fast.api.empty(children_index)) {
                            var id = that.list[index].id;
                        } else {
                            var id = that.list[index].children[children_index].id;
                        }
                        var confirm_index = layer.confirm('是否删除？', {
                            btn: ['确定', '取消'] //按钮
                        }, function () {
                            layer.close(confirm_index)
                            $.ajax({
                                url: that.delProblemCommentUrl,
                                type: "POST",
                                dataType: "json",
                                data: {
                                    ids: id
                                }, success: function (res) {
                                    if (res.code == 1) {
                                        layer.msg('删除成功', {icon: 1}, function () {
                                            var array = [];
                                            if (Fast.api.empty(children_index)) {
                                                for (var i = 0; i <= that.list.length; i++) {
                                                    if (i != index && !Fast.api.empty(that.list[i])) {
                                                        array.push(that.list[i]);
                                                    }
                                                }
                                                that.list = [];
                                                that.list = array;
                                            } else {
                                                for (var i = 0; i <= that.list[index].children.length; i++) {
                                                    if (i != children_index && !Fast.api.empty(that.list[index].children[i])) {
                                                        array.push(that.list[index].children[i]);
                                                    }
                                                }
                                                that.list[index].children = [];
                                                that.list[index].children = array;
                                            }
                                            that.$forceUpdate();

                                        });
                                    } else {
                                        layer.msg('删除失败', {icon: 2});
                                    }

                                    return false;
                                }
                            })
                        }, function () {

                        });

                    },
                    play: function (path, flag) {
                        var that = this;
                        var music = document.getElementById('music2');
                        music.onended = function () {
                            $('.video').attr('src', that.png)
                        };
                        if (flag) {
                            that.src = path;
                            music.play();
                        } else {
                            music.pause();
                            $('.video').attr('src', that.png)
                        }


                    },
                    video: function (e) {
                        var that = this;
                        var el = e.currentTarget;
                        var images = $(el).find('img')
                        var dataType = images.attr('data-type');
                        var src = images.attr('src');
                        var dataVideo = images.attr('data-video');
                        if (dataType == 0) {
                            return false;
                        }
                        $('.video').attr('src', that.png);
                        if (src == that.png) {
                            var flag = true;
                        } else {

                            var flag = false;
                        }

                        that.music.onended = function () {
                            images.attr('src', that.png)
                        };
                        if (flag) {
                            that.music.src = dataVideo;

                            that.music.play();
                            images.attr('src', that.gif)
                        } else {
                            that.music.pause();
                            images.attr('src', that.png)
                        }

                    }
                }

            });
            $(document).find('body').append('<style>' +
                '    body::-webkit-scrollbar {/*滚动条整体样式*/\n' +
                '        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/\n' +
                '        height: 1px;\n' +
                '    }\n' +
                '    body::-webkit-scrollbar-thumb {/*滚动条里面小方块*/\n' +
                '        border-radius: 5px;\n' +
                '        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);\n' +
                '        background: #535353;\n' +
                '    }\n' +
                '    body::-webkit-scrollbar-track {/*滚动条里面轨道*/\n' +
                '        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);\n' +
                '        border-radius: 5px;\n' +
                '        background: #EDEDED;\n' +
                '    }' +
                '</style>');
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