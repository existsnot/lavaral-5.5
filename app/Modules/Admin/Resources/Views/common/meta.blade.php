<meta charset="utf-8">
<title>{{$title='Fast'}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">

<link rel="shortcut icon" href="{{$CDN}}/img/favicon.ico" />
<!-- Loading Bootstrap -->
<link href="{{$CDN}}/css/backend{{$site['debug']?'':'.min'}}.css?v={{$site['version']}}" rel="stylesheet">

<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
<script src="/js/html5shiv.js"></script>
<script src="{{$CDN}}/assets/js/respond.min.js"></script>
<![endif]-->
<input type="text">
<script type="text/javascript">

    var require = {
        config:{{showMsg($config)}}
    };
    console.log({{json_encode($config)}})
</script>