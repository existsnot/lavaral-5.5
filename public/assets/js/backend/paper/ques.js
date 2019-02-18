define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
    var paper_id = Fast.api.query('paper_id');
    var param = 'paper_id=' + paper_id;

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'paper/ques/index?' + param,
                    edit_url: 'paper/ques/edit?' + param,
                    del_url: 'paper/ques/del?' + param,
                    random_url: 'paper/ques/add_random?' + param,
                    question_select_url: 'paper/ques/question_select?' + param,
                    table: 'paper_ques',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search:false,
                showToggle: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        // {field: 'paper_id', title: __('Paper_id')},
                        // {field: 'qes_id', title: __('Qes_id')},
                        {field: 'questions.title', title: __('Questions.title'), operate: 'LIKE'},
                        {field: 'questions.type', title: __('Questions.type'), searchList: {'1':'单选', '2':'多选', '3':'填空', '4':'判断'}, visible: false},
                        {field: 'questions.type_text', title: __('Questions.type'), operate: false},
                        {field: 'score', title: __('Score')},
                        // {field: 'creator', title: __('Creator')},
                        {field: 'admin.username', title: __('Admin.username')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            $(document).find('.btn-add_random').click(function () {
                Fast.api.open($.fn.bootstrapTable.defaults.extend.random_url, __('Add_random'), {
                    end: function () {
                        $('.btn-refresh').click();
                    }
                });
            });
            $(document).find('.btn-question_select').click(function () {
                Fast.api.open($.fn.bootstrapTable.defaults.extend.question_select_url, __('Add_select'), {
                    end: function () {
                        $('.btn-refresh').click();
                    }
                });
            });
        },
        edit: function () {
            Controller.api.bindevent();
        },
        add_random: function () {
            Controller.api.bindevent();

            // 绑定试题类型选择事件
            var input_name = 'input[name="row[type][]"]';
            var changeShow = function(arr){
                $('.type_box').each(function (i) {
                    var index = $(this).data('value');
                    if(arr.indexOf(index + '') >= 0){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });
            };
            var checkShow = function () {
                var vals = [];
                $(input_name + ':checked').each(function () {
                    vals.push($(this).val());
                });
                changeShow(vals);
            };
            checkShow();
            $(document).find(input_name).change(function () {
                checkShow();
            });
        },
        question_select: function () {
            // 获得当前各题分值数组
            var getQuestionsTypeScore = function(){
                var vals = {};
                $('.questions_type').each(function () {
                    var key = $(this).data('index');
                    var value = $(this).val();
                    vals[key] = value;
                });
                return vals;
            };


            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'paper/ques/question_select?' + param,
                    add_select_url: 'paper/ques/add_select?' + param,
                    table: 'questions',
                }
            });

            var table = $("#table");

            // 生成1970至今的年份数组
            var year = parseInt(new Date().getFullYear());
            var data = {};
            for (var i = 1970; i <= year; i++) {
                data[i] = i;
            }

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search:false,
                showToggle: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Questions.Title'), align: 'left'},
                        {field: 'type_text', title: __('Questions.Type'), operate: false},
                        {
                            field: 'type',
                            title: __('Questions.Type'),
                            visible: false,
                            searchList: {'1': __('单选题'), '2': '多选题', '3': '填空题', 4: '判断题'}
                        },
                        {
                            field: 'schid',
                            title: __('Questions.Schid'),
                            visible: false,
                            searchList: $.getJSON('school/index', {select: 'select'})
                        },
                        {field: 'year', title: __('Questions.Year'), visible: false, searchList: data},
                        {field: 'year_text', title: __('Questions.Year'), operate: false},
                        {field: 'school.name', title: __('Questions.School.name'), operate: false},
                        {
                            field: 'createtime',
                            title: __('Questions.Createtime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {field: 'operate', title: __('Operate'),   table: table, events: {
                                'click .btn-select': function (e, value, row, index) {
                                    var questions_type_score = getQuestionsTypeScore();
                                    Fast.api.ajax({
                                        url: $.fn.bootstrapTable.defaults.extend.add_select_url,
                                        data: {
                                            qes_ids: row.id,
                                            questions_type_score: questions_type_score
                                        }
                                    });
                                }
                            }, formatter: Table.api.formatter.buttons, buttons: [
                                {
                                    name: 'select',
                                    text: '选择',
                                    title: '选择',
                                    classname: 'btn btn-xs btn-success btn-select'
                                }
                            ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            $(document).find('.btn-add_select').click(function () {
                var ids = Table.api.selectedids(table);
                var questions_type_score = getQuestionsTypeScore();
                Fast.api.ajax({
                    url: $.fn.bootstrapTable.defaults.extend.add_select_url,
                    data: {
                        qes_ids: ids.join(','),
                        questions_type_score: questions_type_score
                    }
                });
                return false;
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