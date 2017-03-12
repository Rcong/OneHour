function ajax(options) {

    let opt = Object.assign({}, options, {
        type: 'GET',
        success: function(res) {},
        error: function(res) {}
    });

    let dataStr = '';
    for (let key in opt.data) {
        dataStr += key + '=' + opt.data[key] + '&';
    }
    dataStr = dataStr.slice(0, dataStr.length - 1);

    if (opt.type.toLowerCase() === 'jsonp') {

        let script = document.createElement('script');
        let success = function(res) {
            opt.success(res);
        }
        script.src = opt.url + '?' + 'callback = success';
        document.head.appendChild(script);
        document.head.removeChild(script);

    } else {

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.stringify(xhr.responseText());
                opt.success(json);
            }
            if (xhr.readyState === 4 && xhr.status === 404) {
                opt.error();
            }
        }

        if (opt.type.toLowerCase() === 'get') {
            xhr.open(opt.type, opt.url + '?' + dataStr, true);
            xhr.send();
        }
        if (opt.type.toLowerCase() === 'post') {
            xhr.open(opt.type, opt.url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"  );
            xhr.send(dataStr);
        }

    }


}