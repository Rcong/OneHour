;
(function() {

    //格式化参数
    function formatParams(paramObj) {
        let arr = [];
        for (let name in paramObj) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(paramObj[name]));
        }
        return arr.join('&');
    }

    function ajax(options) {

        let opt = Object.assign({}, {
            type: 'GET',
            success: function(res) {},
            error: function(res) {}
        }, options);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.stringify(xhr.responseText);
                opt.success(json);
            }
            if (xhr.readyState === 4 && xhr.status === 404) {
                opt.error(xhr.status);
            }
        }

        if (opt.type.toLowerCase() === 'get') {
            xhr.open(opt.type, opt.url + '?' + formatParams(opt.data), true);
            xhr.send();
        }
        if (opt.type.toLowerCase() === 'post') {
            xhr.open(opt.type, opt.url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"  );
            xhr.send(dataStr);
        }

    }

    function jsonp(options) {

        let opt = Object.assign({}, {
            callback: 'callback',
            success: function(res) {},
            error: function(res) {}
        }, options);

        // formatParams
        let script = document.createElement('script'),
            paramStr = '';
        if (opt.data) {
            opt.data.callback = opt.callback;
            paramStr += formatParams(opt.data);
        } else {
            paramStr = 'callback=' + opt.callback;
        }
        window[opt.callback] = function(res) {
            opt.success(res);
        }
        script.src = opt.url + '?' + paramStr;
        document.head.appendChild(script);
        document.head.removeChild(script);

    }

    window.$.ajax = ajax;
    window.$.jsonp = jsonp;

})();

$.jsonp({
    url: 'http://api.jirengu.com/fm/getChannels.php',
    callback: 'getChannel',
    success: function(res) {
        console.log(res)
    },
    error: function(res) {
        console.log(res)
    }
});