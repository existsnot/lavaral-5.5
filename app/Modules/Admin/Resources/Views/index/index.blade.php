<!doctype html>
<html lang="en">
@extends("admin::common.meta")
<body class="hold-transition skin-green sidebar-mini fixed {if $config.fastadmin.multiplenav}multiplenav{/if}"
      id="tabs">
<div class="wrapper">

    <!-- 头部区域 -->
    <header id="header" class="main-header">

        @extends("admin::common.header")
    </header>

    <!-- 左侧菜单栏 -->
    <aside class="main-sidebar">
        @extends("admin::common.menu")

    </aside>

    <!-- 主体内容区域 -->
    <div class="content-wrapper tab-content tab-addtabs">
        {if $fixedmenu}
        <div role="tabpanel" class="tab-pane {:$referermenu?'':'active'}" id="con_{$fixedmenu.id}">
            <iframe src="{$fixedmenu.url}?addtabs=1" width="100%" height="100%" frameborder="no" border="0"
                    marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto"
                    allowtransparency="yes"></iframe>
        </div>
        {/if}
        {if $referermenu}
        <div role="tabpanel" class="tab-pane active" id="con_{$referermenu.id}">
            <iframe src="{$referermenu.url}?addtabs=1" width="100%" height="100%" frameborder="no" border="0"
                    marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto"
                    allowtransparency="yes"></iframe>
        </div>
        {/if}
    </div>

    <!-- 底部链接,默认隐藏 -->
    <footer class="main-footer hide">
        <div class="pull-right hidden-xs">
        </div>
        <strong>Copyright &copy; 2017-2018 <a href="#">五分钟设计课</a>.</strong> All rights reserved.
    </footer>

    <!-- 右侧控制栏 -->
    <div class="control-sidebar-bg"></div>
    @extends("admin::common.control")
</div>
<!-- 加载JS脚本 -->
@extends("admin::common.script")
</body>
</html>