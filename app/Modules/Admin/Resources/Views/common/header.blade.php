<!-- Logo -->
<a href="javascript:;" class="logo">
    <!-- 迷你模式下Logo的大小为50X50 -->
    <span class="logo-mini">{$site.name|mb_substr=0,4,'utf-8'|mb_strtoupper='utf-8'}</span>
    <!-- 普通模式下Logo -->
    <span class="logo-lg"><b>{$site.name|mb_substr=0,4,'utf-8'}</b>{$site.name|mb_substr=4,null,'utf-8'}</span>
</a>

<!-- 顶部通栏样式 -->
<nav class="navbar navbar-static-top">

    <!--第一级菜单-->
    <div id="firstnav">
        <!-- 边栏切换按钮-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">{:__('Toggle navigation')}</span>
        </a>

        <!--如果不想在顶部显示角标,则给ul加上disable-top-badge类即可-->
        <ul class="nav nav-tabs nav-addtabs disable-top-badge hidden-xs" role="tablist">
            {$navlist}
        </ul>

        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

                <li>
                    <a href="__PUBLIC__" target="_blank"><i class="fa fa-home" style="font-size:14px;"></i></a>
                </li>

                <li class="dropdown notifications-menu hidden-xs">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-warning"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="header">{:__('Latest news')}</li>
                        <li>
                            <!-- FastAdmin最新更新信息,你可以替换成你自己站点的信息,请注意修改public/assets/js/backend/index.js文件 -->
                            <ul class="menu">

                            </ul>
                        </li>
                        <li class="footer"><a href="#" target="_blank">{:__('View more')}</a></li>
                    </ul>
                </li>

                <!-- 账号信息下拉框 -->
                <!--<li class="hidden-xs">-->
                <!--<a href="javascript:;" data-toggle="checkupdate" title="{:__('Check for updates')}">-->
                <!--<i class="fa fa-refresh"></i>-->
                <!--</a>-->
                <!--</li>-->

                <!-- 清除缓存 -->
                <li>
                    <a href="javascript:;" data-toggle="dropdown" title="{:__('Wipe cache')}">
                        <i class="fa fa-trash"></i>
                    </a>
                    <ul class="dropdown-menu wipecache">
                        <li><a href="javascript:;" data-type="all"><i class="fa fa-trash"></i> {:__('Wipe all cache')}</a></li>
                        <li class="divider"></li>
                        <li><a href="javascript:;" data-type="content"><i class="fa fa-file-text"></i> {:__('Wipe content cache')}</a></li>
                        <li><a href="javascript:;" data-type="template"><i class="fa fa-file-image-o"></i> {:__('Wipe template cache')}</a></li>
                        <li><a href="javascript:;" data-type="addons"><i class="fa fa-rocket"></i> {:__('Wipe addons cache')}</a></li>
                    </ul>
                </li>

                <!-- 多语言列表 -->
                {if $Think.config.lang_switch_on}
                <li class="hidden-xs">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-language"></i></a>
                    <ul class="dropdown-menu">
                        <li class="{$config['language']=='zh-cn'?'active':''}">
                            <a href="?ref=addtabs&lang=zh-cn">简体中文</a>
                        </li>
                        <li class="{$config['language']=='en'?'active':''}">
                            <a href="?ref=addtabs&lang=en">English</a>
                        </li>
                    </ul>
                </li>
                {/if}

                <!-- 全屏按钮 -->
                <li class="hidden-xs">
                    <a href="#" data-toggle="fullscreen"><i class="fa fa-arrows-alt"></i></a>
                </li>

                <!-- 账号信息下拉框 -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="{$admin.avatar|cdnurl}" class="user-image" alt="{$admin.nickname}">
                        <span class="hidden-xs">{$admin.nickname}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <img src="{$admin.avatar|cdnurl}" class="img-circle" alt="">

                            <p>
                                {$admin.nickname}
                                <small>{$admin.logintime|date="Y-m-d H:i:s",###}</small>
                            </p>
                        </li>
                        <!-- Menu Body -->
                        <li class="user-body">
                            <div class="row">
                                <div class="col-xs-4 text-center">
                                    <a href="#" target="_blank">{:__('五分钟设计课')}</a>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <a href="#" target="_blank">{:__('Forum')}</a>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <a href="https://doc.fastadmin.net" target="_blank">{:__('Docs')}</a>
                                </div>
                            </div>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="general/profile" class="btn btn-primary addtabsit"><i class="fa fa-user"></i>
                                    {:__('Profile')}</a>
                            </div>
                            <div class="pull-right">
                                <a href="{:url('index/logout')}" class="btn btn-danger"><i class="fa fa-sign-out"></i>
                                    {:__('Logout')}</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- 控制栏切换按钮 -->
                <li class="hidden-xs">
                    <a href="javascript:;" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                </li>
            </ul>
        </div>
    </div>

    {if $config.fastadmin.multiplenav}
    <!--第二级菜单,只有在multiplenav开启时才显示-->
    <div id="secondnav">
        <ul class="nav nav-tabs nav-addtabs disable-top-badge" role="tablist">
            {if $fixedmenu}
            <li role="presentation" id="tab_{$fixedmenu.id}" class="{:$referermenu?'':'active'}"><a href="#con_{$fixedmenu.id}" node-id="{$fixedmenu.id}" aria-controls="{$fixedmenu.id}" role="tab" data-toggle="tab"><i class="fa fa-dashboard fa-fw"></i> <span>{$fixedmenu.title}</span> <span class="pull-right-container"> </span></a></li>
            {/if}
            {if $referermenu}
            <li role="presentation" id="tab_{$referermenu.id}" class="active"><a href="#con_{$referermenu.id}" node-id="{$referermenu.id}" aria-controls="{$referermenu.id}" role="tab" data-toggle="tab"><i class="fa fa-list fa-fw"></i> <span>{$referermenu.title}</span> <span class="pull-right-container"> </span></a> <i class="close-tab fa fa-remove"></i></li>
            {/if}
        </ul>
    </div>
    {/if}
</nav>