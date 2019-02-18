define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'vue'], function ($, undefined, Backend, Table, Form, Vue) {

    var Controller = {
            config: {
                letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            },
            index: function () {
                console.log();
                // 初始化表格参数配置
                Table.api.init({
                    extend: {
                        index_url: 'questions/index',
                        add_url: 'questions/add',
                        edit_url: 'questions/edit',
                        del_url: 'questions/del',
                        multi_url: 'questions/multi',
                        table: 'questions',
                    }
                });

                var table = $("#table");
                var myDate = new Date();
                var year = parseInt(myDate.getFullYear());
                var data = {};
                for (var i = 1970; i <= year; i++) {
                    data[i] = i;
                }
                // 初始化表格
                table.bootstrapTable({
                    url: $.fn.bootstrapTable.defaults.extend.index_url,
                    pk: 'id',
                    sortName: 'id',
                    columns: [
                        [
                            {checkbox: true},
                            {field: 'title', title: __('Title'), align: 'left', operate: "LIKE"},
                            {field:'images',title:__('Images'),operate:false,formatter:Table.api.formatter.images},
                            {field: 'type_text', title: __('Type'), operate: false},
                            {
                                field: 'categoryL1|categoryL2|categoryL3',
                                title: '专业类型',
                                searchList: categorydata,
                                visible: false
                            },
                            {
                                field: 'type',
                                title: __('Type'),
                                visible: false,
                                searchList: {'1': __('单选'), '2': '多选', '3': '填空', 4: '判断题'}
                            },
                            {
                                field: 'schid',
                                title: __('Schid'),
                                visible: false,
                                searchList: $.getJSON('school/index', {select: 'select'})
                            },

                            {field: 'year', title: __('Year'), visible: false, searchList: data},
                            {field: 'year_text', title: __('Year'), operate: false},
                            {field: 'school.name', title: __('School.name'), operate: false},
                            {field: 'status', title: __('Status'), visible: false, searchList: {0: "未审", 1: '已审'}},
                            {field: 'status_text', title: __('Status'), operate: false},
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
                });

                // 为表格绑定事件
                Table.api.bindevent(table);
            },
            add: function () {
                var letter = Controller.config.letter;
                var vim = new Vue({
                    el: "#app",
                    data: {
                        letter: letter,
                        istrueList: istrueList,
                        statusList: statusList,
                        owerList: owerList,
                        typeList: typeList,
                        userList: userList,
                        schidList: schidList,
                        yearList: yearList,
                        row: {
                            type: 1,
                            title: "",
                            images: '',
                            ower: 0,
                            answer: '',
                            schid: '',
                            creator: '',
                            year: '',
                            categoryL1: '',
                            categoryL2: '',
                            categoryL3: '',
                            point: '',
                            difficultpoint: '',
                            explanation: '',
                            status: 0,
                            istrue: 0
                        },
                        typeData: [],
                        ower: 0
                    },
                    created: function () {
                        var that = this;
                        that.createType();
                        that.listenInput();
                        that.ower = 0;
                    },
                    watch: {
                        ower: function (v) {
                            var that = this;
                            that.$nextTick(function () {
                                require(['bootstrap-select', 'bootstrap-select-lang'], function () {
                                    $('.selectpicker').selectpicker();
                                });
                                that.row.ower = v;
                            })
                        }
                    },
                    methods: {
                        listenInput: function () {
                            var that = this;
                            $(document.body).on('change', '#c-images', function () {
                                var cover = $(this).val()
                                console.log(cover)
                                that.row.images = cover;
                            });
                            $(document.body).on('click', '#p-images .btn-trash', function () {
                              setTimeout(function () {
                                  var cover = $(document.body).find('#c-images').val();
                                  that.row.images = cover;
                              },500)
                            })
                        },
                        createType: function () {
                            var that = this;
                            if (Fast.api.empty(that.typeData)) {
                                var index = 0;
                            } else {
                                var index = that.typeData.length;
                            }
                            that.typeData.push({key: that.letter[index], value: '', placeholder: '选项内容'})
                            that.$nextTick(function () {
                                Controller.api.bindevent();
                            })
                        },
                        deleteType: function (index) {
                            var that = this;
                            if (that.typeData.length == 1) {
                                return false;
                            }
                            var array = [];
                            var j = 0;
                            for (var i = 0; i <= that.typeData.length; i++) {
                                if (index != i && !Fast.api.empty(that.typeData[i])) {
                                    that.typeData[i]['key'] = that.letter[j]
                                    array.push(that.typeData[i]);
                                    j++;
                                }
                            }
                            that.typeData = [];
                            that.typeData = array
                            that.$forceUpdate()
                        },
                        showData: function () {
                            var that = this;
                            that.row['choices'] = that.typeData;
                            Fast.api.ajax({
                                url: 'questions/add',
                                data: that.row,
                            }, function () {
                                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                window.parent.$(".toolbar .btn-refresh").trigger('click');
                                parent.layer.close(index); //再执行关闭
                            })
                        }

                    }
                });

            },
            edit: function () {
                var letter = Controller.config.letter;
                var vim = new Vue({
                    el: "#app",
                    data: {
                        letter: letter,
                        istrueList: istrueList,
                        statusList: statusList,
                        owerList: owerList,
                        typeList: typeList,
                        userList: userList,
                        schidList: schidList,
                        yearList: yearList,
                        row: {},
                        typeData: [],
                        ower: 0
                    },
                    created: function () {
                        var that = this;
                        that.init();
                        that.listenInput();
                    },
                    watch: {
                        ower: function (v) {
                            var that = this;
                            that.$nextTick(function () {
                                require(['bootstrap-select', 'bootstrap-select-lang'], function () {
                                    $('.selectpicker').selectpicker();

                                });
                                that.row.ower = v;
                            })
                        }
                    },
                    methods: {
                        listenInput: function () {
                            var that = this;

                            $(document.body).on('change', '#c-images', function () {
                                var cover = $(this).val()

                                that.row.images = cover;
                            });
                            $(document.body).on('click', '#p-images .btn-trash', function () {
                                setTimeout(function () {
                                    var cover = $(document.body).find('#c-images').val();
                                    that.row.images = cover;
                                },500)
                            })
                        },
                        init: function () {
                            var that = this;
                            that.row = row;
                            that.ower = row.ower;
                            if (Fast.api.empty(choices)) {
                                that.createType();
                            } else {
                                for (var key in choices) {
                                    that.typeData.push({key: key, value: choices[key], placeholder: '选项内容'})
                                }
                            }
                            that.$forceUpdate();
                        },
                        createType: function () {
                            var that = this;
                            if (Fast.api.empty(that.typeData)) {
                                var index = 0;
                            } else {
                                var index = that.typeData.length;
                            }
                            that.typeData.push({key: that.letter[index], value: '', placeholder: '选项内容'})

                        },
                        deleteType: function (index) {
                            var that = this;
                            if (that.typeData.length == 1) {
                                return false;
                            }
                            var array = [];
                            var j = 0;
                            for (var i = 0; i <= that.typeData.length; i++) {
                                if (index != i && !Fast.api.empty(that.typeData[i])) {
                                    that.typeData[i]['key'] = that.letter[j]
                                    array.push(that.typeData[i]);
                                    j++;
                                }
                            }
                            that.typeData = [];
                            that.typeData = array
                            that.$forceUpdate()
                        },
                        showData: function () {
                            var that = this;
                            that.row['choices'] = that.typeData;
                            that.row['categoryL1'] = $('#categoryL1').val();
                            that.row['categoryL2'] = $('#categoryL2').val();
                            that.row['categoryL3'] = $('#categoryL3').val();
                            delete that.row.delete_time
                            delete that.row.ower_text
                            delete that.row.status_text
                            delete that.row.istrue_text
                            delete that.row.type_text
                            delete that.row.year_text
                            delete that.row.schid_text
                            delete that.row.delete_time_text;
                            Fast.api.ajax({
                                url: 'questions/edit?ids=' + that.row.id,
                                data: that.row,
                            }, function () {
                                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                window.parent.$(".toolbar .btn-refresh").trigger('click');
                                parent.layer.close(index); //再执行关闭
                            })
                        }

                    }
                });
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