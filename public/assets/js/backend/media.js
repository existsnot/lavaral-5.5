define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'vue'], function ($, undefined, Backend, Table, Form, Vue) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init();
            //绑定事件
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var panel = $($(this).attr("href"));
                if (panel.size() > 0) {
                    Controller.table[panel.attr("id")].call(this);
                    $(this).on('click', function (e) {
                        $($(this).attr("href")).find(".btn-refresh").trigger("click");
                    });
                }
                //移除绑定的事件
                $(this).unbind('shown.bs.tab');
            });

            //必须默认触发shown.bs.tab事件
            $('ul.nav-tabs li.active a[data-toggle="tab"]').trigger("shown.bs.tab");
        },
        table: {
            first: function () {
                // 表格1
                var table1 = $("#table1");
                table1.bootstrapTable({
                    url: 'media/index?type=1',
                    toolbar: '#toolbar1',
                    sortName: 'id',
                    search: false,
                    extend: {
                        index_url: '',
                        add_url: 'media/add?type=1',
                        edit_url: 'media/edit?type=1',
                        del_url: 'media/del',
                        multi_url: '',
                        table: 'wechat_media',
                    },
                    columns: [
                        [
                            {field: 'id', title: 'ID'},
                            {
                                field: 'title', title: __('Title'), formatter: function (v) {
                                    return Fast.api.HTMLDecode(v)
                                }
                            },
                            {
                                field: 'type', title: __('Type'), operate: false, formatter: function (value) {
                                    return '文本';
                                }
                            },
                            {field: 'eventkey', title: '事件标识'},
                            {
                                field: 'createtime',
                                title: __('Createtime'),
                                operate: 'RAND',
                                addclass: 'datetimerange',
                                formatter: Table.api.formatter.datetime
                            },
                            {
                                field: 'operate',
                                title: __('Operate'),
                                table: table1,
                                events: Table.api.events.operate,
                                formatter: Table.api.formatter.operate
                            }
                        ]
                    ]
                });

                // 为表格1绑定事件
                Table.api.bindevent(table1);
            },
            second: function () {
                // 表格2
                var table2 = $("#table2");
                table2.bootstrapTable({
                    url: 'media/index?type=2',
                    extend: {
                        index_url: '',
                        add_url: 'media/add?type=2',
                        edit_url: 'media/edit?type=2',
                        del_url: 'media/del',
                        multi_url: '',
                        table: 'wechat_media',
                    },
                    toolbar: '#toolbar2',
                    sortName: 'id',
                    search: false,
                    columns: [
                        {field: 'id', title: 'ID'},
                        {
                            field: 'type', title: __('Type'), operate: false, formatter: function (value) {
                                return '单图文';
                            }
                        },
                        {field: 'eventkey', title: '事件标识'},
                        {
                            field: 'createtime',
                            title: __('Createtime'),
                            operate: 'RAND',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table2,
                            events: Table.api.events.operate,
                            formatter: Table.api.formatter.operate
                        }
                    ]
                });

                // 为表格2绑定事件
                Table.api.bindevent(table2);
            },
            three: function () {
                // 表格2
                var table3 = $("#table3");
                table3.bootstrapTable({
                    url: 'media/index?type=3',
                    extend: {
                        index_url: '',
                        add_url: 'media/add?type=3',
                        edit_url: 'media/edit?type=3',
                        del_url: 'media/del',
                        multi_url: '',
                        table: 'wechat_media',
                    },
                    toolbar: '#toolbar3',
                    sortName: 'id',
                    search: false,
                    columns: [
                        [
                            {field: 'id', title: 'ID'},
                            {
                                field: 'type', title: __('Type'), operate: false, formatter: function (value) {
                                    return '多图文';
                                }
                            },
                            {field: 'eventkey', title: '事件标识'},
                            {
                                field: 'createtime',
                                title: __('Createtime'),
                                operate: 'RAND',
                                addclass: 'datetimerange',
                                formatter: Table.api.formatter.datetime
                            },
                            {
                                field: 'operate',
                                title: __('Operate'),
                                table: table3,
                                events: Table.api.events.operate,
                                formatter: Table.api.formatter.operate
                            }
                        ]
                    ]
                });
                // 为表格2绑定事件
                Table.api.bindevent(table3);
            }
        },
        add: function () {
            var vim = new Vue({
                el: '#app',
                data: {
                    type: type,
                    cover: '',
                    title: '',
                    author: '',
                    summary: '',
                    content: '',
                    content_source_url: '',
                    index: 0,
                    text_title: '',
                    media_id: 0,
                    data: [{
                        id: 0,
                        media_id: 0,
                        title: '',
                        author: '',
                        cover: '',
                        summary: '',
                        content: '',
                        content_source_url: ''
                    }]
                },
                created: function () {
                    var that = this;
                    this.$nextTick(function () {
                        that.setTimeOut();
                        that.resize();
                        Controller.api.bindevent();
                    })
                },
                mounted: function () {
                },
                watch: {
                    index: function (v) {
                        var that = this;
                        that.title = that.data[that.index].title;
                        that.author = that.data[that.index].author;
                        that.cover = that.data[that.index].cover;
                        that.changeCover();
                        that.summary = that.data[that.index].summary;
                        that.content = that.data[that.index].content;
                        that.changeEditor();
                        that.content_source_url = that.data[that.index].content_source_url;
                        Controller.api.bindevent();
                    },
                    cover: function (v) {
                        var that = this;
                        if (that.data[that.index].cover != v) {
                            that.data[that.index].cover = v
                        }
                    },
                    title: function (v) {
                        var that = this;
                        if (that.data[that.index].title != v) {
                            that.data[that.index].title = v
                        }
                    },
                    author: function (v) {
                        var that = this;
                        if (that.data[that.index].author != v) {
                            that.data[that.index].author = v
                        }
                    },
                    summary: function (v) {
                        var that = this;
                        if (that.data[that.index].summary != v) {
                            that.data[that.index].summary = v
                        }
                    },

                    content: function (v) {
                        var that = this;
                        if (that.data[that.index].content != v) {
                            that.data[that.index].content = v
                        }
                    },
                    content_source_url: function (v) {
                        var that = this;
                        if (that.data[that.index].content_source_url != v) {
                            that.data[that.index].content_source_url = v
                        }
                    }
                },
                methods: {
                    setTimeOut: function () {
                        var that = this;
                        $(document.body).on('change', '#c-cover', function () {
                            var cover = $(this).val()
                            that.data[that.index].cover = cover;
                        });
                        $(document.body).on('change', '#c-content', function () {
                            var content = $(this).val();
                            that.data[that.index].content = content;
                        })
                    },
                    add: function () {
                        var that = this;
                        var length = that.data.length;
                        if (length >= 8) {
                            Toastr.error('图文消息最多添加8条');
                            return false;
                        }
                        var Array = [];
                        for (var i = 0; i <= length; i++) {
                            if (!Fast.api.empty(that.data[i])) {
                                Array.push(that.data[i]);
                            }
                        }
                        Array.push({
                            id: 0,
                            media_id: 0,
                            title: '',
                            author: '',
                            cover: '',
                            content: '',
                            content_source_url: ''
                        });
                        that.data = Array;

                        that.$forceUpdate();
                        that.$nextTick(function () {
                            that.resize();
                        })
                    },
                    del: function (index) {
                        var that = this;
                        var length = that.data.length;
                        if (length <= 1) {
                            Toastr.error('图文消息最少为一条');
                            return false;
                        }
                        var Array = [];
                        for (var i = 0; i <= length; i++) {
                            if (!Fast.api.empty(that.data[i]) && i != index) {
                                Array.push(that.data[i]);
                            }
                        }
                        that.data = Array;
                        that.index = 0;
                        that.$forceUpdate();
                    },
                    change: function (index) {
                        var that = this;
                        that.index = index;
                        that.$nextTick(function () {
                            that.resize();
                        })
                    },
                    changeEditor: function () {
                        var that = this;
                        var content = $('#c-content').closest('.form-group').remove();
                        $('#c-content_source_url').closest('.form-group').before('' +
                            '             <div class="form-group">\n' +
                            '                        <label for="c-content" class="control-label col-xs-12 col-sm-2">正文:</label>\n' +
                            '                        <div class="col-xs-12 col-sm-8">\n' +
                            '                            <textarea id="c-content" class="form-control editor" rows="5" name="row[content]"\n' +
                            '                                      cols="50">' + that.content + '</textarea>\n' +
                            '                        </div>\n' +
                            '                    </div>')
                    },
                    changeCover: function () {
                        var that = this;
                        $('#c-cover').closest('.form-group').remove();
                        var html = '                    <div class="form-group">\n' +
                            '                        <label for="c-cover"\n' +
                            '                               class="control-label col-xs-12 col-sm-2">封面:</label>\n' +
                            '                        <div class="col-xs-12 col-sm-8">\n' +
                            '                            <div class="input-group">\n' +
                            '                                <input id="c-cover" readonly class="form-control" size="50" name="row[cover]"\n' +
                            '                                        value="' + that.cover + '" \n' +
                            '                                       type="text">\n' +
                            '                                <div class="input-group-addon no-border no-padding">\n' +
                            '                        <span><button type="button" id="plupload-image" class="btn btn-danger plupload"\n' +
                            '                                      data-input-id="c-cover"\n' +
                            '                                      data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp"\n' +
                            '                                      data-multiple="false" data-preview-id="p-image"><i class="fa fa-upload"></i>上传</button></span>\n' +
                            '                                    <span><button type="button" id="fachoose-image" class="btn btn-primary fachoose"\n' +
                            '                                                  data-input-id="c-cover" data-mimetype="image/*" data-multiple="false"><i\n' +
                            '                                            class="fa fa-list"></i>选择</button></span>\n' +
                            '                                </div>\n' +
                            '                                <span class="msg-box n-right" for="c-cover"></span>\n' +
                            '                            </div>\n' +
                            '                            <ul class="row list-inline plupload-preview" id="p-image"></ul>\n' +
                            '                        </div>\n' +
                            '                    </div>'
                        $('#c-summary').closest('.form-group').before(html)
                    },
                    resize: function () {
                        var that = this;
                        that.css();
                        $(window).resize(function () {
                            that.css();
                        })
                    },
                    css: function () {
                        var that = this;
                        if (this.type == 1) {
                            $(document).on('click', ".btn-insertlink", function () {
                                var textarea = $("textarea[name='row[content][content]']");
                                var cursorPos = textarea.prop('selectionStart');
                                var v = textarea.val();
                                var textBefore = v.substring(0, cursorPos);
                                var textAfter = v.substring(cursorPos, v.length);
                                Layer.prompt({title: '请输入显示的文字', formType: 3}, function (text, index) {
                                    Layer.close(index);
                                    Layer.prompt({title: '请输入跳转的链接URL(包含http)', formType: 3}, function (link, index) {
                                        text = text == '' ? link : text;
                                        that.text_title = textBefore + '<a href="' + link + '">' + text + '</a>' + textAfter;
                                        Layer.close(index);
                                    });
                                });
                            });
                            return false;
                        }
                        var width = $('.media-top').width();
                        var topHeight = parseFloat(width) / 1.93;
                        var Height = parseFloat(width) / 4.8
                        $('.media-top').css('height', topHeight + 'px');
                        $('.media-fit-top').css('height', Height + 'px');
                        $('.media-fit-top p').css('line-height', (Height / 2 - 3) + 'px');
                        $('.media-add').css('line-height', (Height) + 'px');
                        $('.media-add').css('font-size', (Height / 3) + 'px');
                        $('.media-add').css('color', '#18bc9c');
                        $('.shade2').css('height', Height + 'px');
                        $('.shade1').css('height', topHeight + 'px');
                        $('.shade2').css('line-height', Height + 'px');
                        $('.shade1').css('line-height', topHeight + 'px');
                    },
                    action: function () {
                        var that = this;
                        $.ajax({
                            url: "media/action",
                            type: "post",
                            dataType: 'JSON',
                            data: {
                                type: that.type,
                                title: that.text_title,
                                media_id: that.media_id,
                                data: that.data
                            },
                            success: function (res) {
                                if (res.code == 1) {
                                    Toastr.success(res.msg);
                                    setTimeout(function () {
                                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                        window.parent.$("#toolbar" + that.type + " .btn-refresh").trigger('click');
                                        parent.layer.close(index); //再执行关闭
                                    }, 2000);
                                } else {
                                    Toastr.error(res.msg);
                                }
                            }
                        })

                    }
                }
            });

        },
        edit: function () {
            var vim = new Vue({
                el: '#app',
                data: {
                    type: type,
                    cover: '',
                    title: '',
                    author: '',
                    summary: '',
                    content: '',
                    content_source_url: '',
                    index: -1,
                    text_title: '',
                    media_id: 0,
                    data: list
                },
                created: function () {
                    var that = this;
                    that.text_title = info.title;
                    that.media_id = info.id;
                    that.$forceUpdate();
                    if (that.type > 1) {
                        this.index = 0;
                    }
                    this.$nextTick(function () {
                        that.setTimeOut();
                        that.resize();
                        Controller.api.bindevent();
                    })
                },
                mounted: function () {


                },
                watch: {
                    index: function (v) {
                        var that = this;
                        that.title = that.data[that.index].title;
                        that.author = that.data[that.index].author;
                        that.cover = that.data[that.index].cover;
                        that.changeCover();
                        that.summary = that.data[that.index].summary;
                        that.content = that.data[that.index].content;
                        that.changeEditor();
                        that.content_source_url = that.data[that.index].content_source_url;
                        Controller.api.bindevent();
                    },
                    cover: function (v) {
                        var that = this;
                        if (that.data[that.index].cover != v) {
                            that.data[that.index].cover = v
                        }
                    },
                    title: function (v) {
                        var that = this;
                        if (that.data[that.index].title != v) {
                            that.data[that.index].title = v
                        }
                    },
                    author: function (v) {
                        var that = this;
                        if (that.data[that.index].author != v) {
                            that.data[that.index].author = v
                        }
                    },
                    summary: function (v) {
                        var that = this;
                        if (that.data[that.index].summary != v) {
                            that.data[that.index].summary = v
                        }
                    },

                    content: function (v) {
                        var that = this;
                        if (that.data[that.index].content != v) {
                            that.data[that.index].content = v
                        }
                    },
                    content_source_url: function (v) {
                        var that = this;
                        if (that.data[that.index].content_source_url != v) {
                            that.data[that.index].content_source_url = v
                        }
                    }
                },
                methods: {
                    setTimeOut: function () {
                        var that = this;
                        $(document.body).on('change', '#c-cover', function () {
                            var cover = $(this).val()
                            that.data[that.index].cover = cover;
                        });
                        $(document.body).on('change', '#c-content', function () {
                            var content = $(this).val();
                            that.data[that.index].content = content;
                        })
                    },
                    add: function () {
                        var that = this;
                        var length = that.data.length;
                        if (length >= 8) {
                            Toastr.error('图文消息最多添加8条');
                            return false;
                        }
                        var Array = [];
                        for (var i = 0; i <= length; i++) {
                            if (!Fast.api.empty(that.data[i])) {
                                Array.push(that.data[i]);
                            }
                        }
                        Array.push({
                            id: 0,
                            media_id: that.media_id,
                            title: '',
                            author: '',
                            cover: '',
                            content: '',
                            content_source_url: ''
                        });
                        that.data = Array;

                        that.$forceUpdate();
                        that.$nextTick(function () {
                            that.resize();
                        })
                    },
                    del: function (index) {
                        var that = this;
                        var length = that.data.length;
                        if (length <= 1) {
                            Toastr.error('图文消息最少为一条');
                            return false;
                        }
                        var Array = [];
                        for (var i = 0; i <= length; i++) {
                            if (!Fast.api.empty(that.data[i]) && i != index) {
                                Array.push(that.data[i]);
                            }
                        }
                        that.data = Array;
                        that.index = 0;
                        that.$forceUpdate();
                    },
                    change: function (index) {
                        var that = this;
                        that.index = index;
                        that.$nextTick(function () {
                            that.resize();
                        })
                    },
                    changeEditor: function () {
                        var that = this;
                        var content = $('#c-content').closest('.form-group').remove();
                        $('#c-content_source_url').closest('.form-group').before('' +
                            '             <div class="form-group">\n' +
                            '                        <label for="c-content" class="control-label col-xs-12 col-sm-2">正文:</label>\n' +
                            '                        <div class="col-xs-12 col-sm-8">\n' +
                            '                            <textarea id="c-content" class="form-control editor" rows="5" name="row[content]"\n' +
                            '                                      cols="50">' + that.content + '</textarea>\n' +
                            '                        </div>\n' +
                            '                    </div>')
                    },
                    changeCover: function () {
                        var that = this;
                        $('#c-cover').closest('.form-group').remove();
                        var html = '                    <div class="form-group">\n' +
                            '                        <label for="c-cover"\n' +
                            '                               class="control-label col-xs-12 col-sm-2">封面:</label>\n' +
                            '                        <div class="col-xs-12 col-sm-8">\n' +
                            '                            <div class="input-group">\n' +
                            '                                <input id="c-cover" readonly class="form-control" size="50" name="row[cover]"\n' +
                            '                                        value="' + that.cover + '" \n' +
                            '                                       type="text">\n' +
                            '                                <div class="input-group-addon no-border no-padding">\n' +
                            '                        <span><button type="button" id="plupload-image" class="btn btn-danger plupload"\n' +
                            '                                      data-input-id="c-cover"\n' +
                            '                                      data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp"\n' +
                            '                                      data-multiple="false" data-preview-id="p-image"><i class="fa fa-upload"></i>上传</button></span>\n' +
                            '                                    <span><button type="button" id="fachoose-image" class="btn btn-primary fachoose"\n' +
                            '                                                  data-input-id="c-cover" data-mimetype="image/*" data-multiple="false"><i\n' +
                            '                                            class="fa fa-list"></i>选择</button></span>\n' +
                            '                                </div>\n' +
                            '                                <span class="msg-box n-right" for="c-cover"></span>\n' +
                            '                            </div>\n' +
                            '                            <ul class="row list-inline plupload-preview" id="p-image"></ul>\n' +
                            '                        </div>\n' +
                            '                    </div>'
                        $('#c-summary').closest('.form-group').before(html)
                    },
                    resize: function () {
                        var that = this;
                        that.css();
                        $(window).resize(function () {
                            that.css();
                        })
                    },
                    css: function () {
                        var that = this;
                        if (this.type == 1) {
                            $(document).on('click', ".btn-insertlink", function () {
                                var textarea = $("textarea[name='row[content][content]']");
                                var cursorPos = textarea.prop('selectionStart');
                                var v = textarea.val();
                                var textBefore = v.substring(0, cursorPos);
                                var textAfter = v.substring(cursorPos, v.length);
                                Layer.prompt({title: '请输入显示的文字', formType: 3}, function (text, index) {
                                    Layer.close(index);
                                    Layer.prompt({title: '请输入跳转的链接URL(包含http)', formType: 3}, function (link, index) {
                                        text = text == '' ? link : text;
                                        that.text_title = textBefore + '<a href="' + link + '">' + text + '</a>' + textAfter;
                                        Layer.close(index);
                                    });
                                });
                            });
                            return false;
                        }
                        var width = $('.media-top').width();
                        var topHeight = parseFloat(width) / 1.93;
                        var Height = parseFloat(width) / 4.8
                        $('.media-top').css('height', topHeight + 'px');
                        $('.media-fit-top').css('height', Height + 'px');
                        $('.media-fit-top p').css('line-height', (Height / 2 - 3) + 'px');
                        $('.media-add').css('line-height', (Height) + 'px');
                        $('.media-add').css('font-size', (Height / 3) + 'px');
                        $('.media-add').css('color', '#18bc9c');
                        $('.shade2').css('height', Height + 'px');
                        $('.shade1').css('height', topHeight + 'px');
                        $('.shade2').css('line-height', Height + 'px');
                        $('.shade1').css('line-height', topHeight + 'px');
                    },
                    action: function () {
                        var that = this;
                        $.ajax({
                            url: "media/action",
                            type: "post",
                            dataType: 'JSON',
                            data: {
                                type: that.type,
                                title: that.text_title,
                                media_id: that.media_id,
                                data: that.data
                            },
                            success: function (res) {
                                if (res.code == 1) {
                                    Toastr.success(res.msg);
                                    setTimeout(function () {
                                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                        window.parent.$("#toolbar" + that.type + " .btn-refresh").trigger('click');
                                        parent.layer.close(index); //再执行关闭
                                    }, 2000);
                                } else {
                                    Toastr.error(res.msg);
                                }
                            }
                        })

                    }
                }
            });
        },
        select: function () {
            // 初始化表格参数配置
            Table.api.init();
            //绑定事件
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var panel = $($(this).attr("href"));
                if (panel.size() > 0) {
                    Controller.selectTable[panel.attr("id")].call(this);
                    $(this).on('click', function (e) {
                        $($(this).attr("href")).find(".btn-refresh").trigger("click");
                    });
                }
                //移除绑定的事件
                $(this).unbind('shown.bs.tab');
            });

            //必须默认触发shown.bs.tab事件
            $('ul.nav-tabs li.active a[data-toggle="tab"]').trigger("shown.bs.tab");
        },
        selectTable: {
            first: function () {
                // 表格1
                var table1 = $("#table1");
                table1.bootstrapTable({
                    url: 'media/index?type=1',
                    toolbar: '#toolbar1',
                    sortName: 'id',
                    search: false,
                    extend: {
                        table: 'wechat_media',
                    },
                    columns: [
                        [
                            {field: 'id', title: 'ID'},
                            {
                                field: 'title', title: __('Title'), formatter: function (v) {
                                    return Fast.api.HTMLDecode(v)
                                }
                            },
                            {
                                field: 'type', title: __('Type'), operate: false, formatter: function (value) {
                                    return '文本';
                                }
                            },
                            {field: 'eventkey', title: '事件标识'},
                            {
                                field: 'createtime',
                                title: __('Createtime'),
                                operate: 'RAND',
                                addclass: 'datetimerange',
                                formatter: Table.api.formatter.datetime
                            },
                            {
                                field: 'operate', title: __('Operate'), events: {
                                    'click .btn-chooseone': function (e, value, row, index) {
                                        Fast.api.close(row);
                                    },
                                }, formatter: function () {
                                    return '<a href="javascript:;" class="btn btn-danger btn-chooseone btn-xs"><i class="fa fa-check"></i> ' + __('Choose') + '</a>';
                                }
                            }
                        ]
                    ]
                });

                // 为表格1绑定事件
                Table.api.bindevent(table1);
            },
            second: function () {
                // 表格2
                var table2 = $("#table2");
                table2.bootstrapTable({
                    url: 'media/index?type=2',
                    extend: {
                        table: 'wechat_media',
                    },
                    toolbar: '#toolbar2',
                    sortName: 'id',
                    search: false,
                    columns: [
                        {field: 'id', title: 'ID'},
                        {
                            field: 'type', title: __('Type'), operate: false, formatter: function (value) {
                                return '单图文';
                            }
                        },
                        {field: 'eventkey', title: '事件标识'},

                        {
                            field: 'createtime',
                            title: __('Createtime'),
                            operate: 'RAND',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate', title: __('Operate'), events: {
                                'click .btn-chooseone': function (e, value, row, index) {
                                    Fast.api.close(row);
                                },
                            }, formatter: function () {
                                return '<a href="javascript:;" class="btn btn-danger btn-chooseone btn-xs"><i class="fa fa-check"></i> ' + __('Choose') + '</a>';
                            }
                        }
                    ]
                });

                // 为表格2绑定事件
                Table.api.bindevent(table2);
            },
            three: function () {
                // 表格2
                var table3 = $("#table3");
                table3.bootstrapTable({
                    url: 'media/index?type=3',
                    extend: {

                        table: 'wechat_media',
                    },
                    toolbar: '#toolbar3',
                    sortName: 'id',
                    search: false,
                    columns: [
                        [
                            {field: 'id', title: 'ID'},
                            {
                                field: 'type', title: __('Type'), operate: false, formatter: function (value) {
                                    return '多图文';
                                }
                            },
                            {field: 'eventkey', title: '事件标识'},
                            {
                                field: 'createtime',
                                title: __('Createtime'),
                                operate: 'RAND',
                                addclass: 'datetimerange',
                                formatter: Table.api.formatter.datetime
                            },
                            {
                                field: 'operate', title: __('Operate'), events: {
                                    'click .btn-chooseone': function (e, value, row, index) {
                                        Fast.api.close(row);
                                    },
                                }, formatter: function () {
                                    return '<a href="javascript:;" class="btn btn-danger btn-chooseone btn-xs"><i class="fa fa-check"></i> ' + __('Choose') + '</a>';
                                }
                            }
                        ]
                    ]
                });
                // 为表格2绑定事件
                Table.api.bindevent(table3);
            }
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});