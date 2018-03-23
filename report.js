(function(win, doc){
	// 后端控制台收集接口
    var host = '/js.php';

    // json组装
    function json_encode(obj) {
        // 支持JSON
        if ("undefined" != typeof JSON) {
            return JSON.stringify(obj);
        }
        // 数组 处理
        if (obj instanceof Array) {
            for (var t = [], r = 0; r < obj.length; r++) {
                t.push(json_encode(obj[r]));
            }
            return "[" + t.join(",") + "]";
        }
        // 对象处理
        var n = [];
        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                var i = '"' + a + '":', o = obj[a];
                o && ("object" == typeof o ? i += json_encode(o) : "number" == typeof o ? i += o : i = i + '"' + o.replace(/\n/g, "\\n") + '"', n.push(i));
            }
        }
        return "{" + n.join(",") + "}";
    }

    // 注册js错误函数
    win.addEventListener('error', function(e) {
        var msg = {
            version: '0.0.1',
            userAgent: win.navigator.userAgent,
            locale: win.navigator.language || win.navigator.userLanguage,
            title: doc.title,
            url: win.location.href,
            appKey: 'APP标示，标识项目',
            error: {
                type: e.type,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                message: e.message,
                stacktrace: e.error.stack
            },
            time: (new Date).getTime()
        };
        if (win.XMLHttpRequest && win.atob) {
            var a = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP");	// lt IE6 ActiveXObject("Microsoft.XMLHTTP");
            a.open("POST", host), a.setRequestHeader("Content-Type", "application/json"), a.send(json_encode(msg));
        } else {
            (new Image).src = host + "?event=" + encodeURIComponent(json_encode(msg));
        }
        console.log(msg);
    });
}(window, document));
