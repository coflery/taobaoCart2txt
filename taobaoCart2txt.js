var loadJS = function(url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    var done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            callback();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
};
(function(console){
console.save = function(data, filename){
    if(!data) {
        console.error('没有数据。')
        return;
    }
    if(!filename) filename = 'console.json'
    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}
})(console);
loadJS('https://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.3.min.js', function() {
    if (typeof jQuery == 'undefined') {
        console.log('出错了亲，重试几次代码吧');
    } else {
        console.log('jQuery版本: ' + jQuery().jquery);
    }
    mjQuery = jQuery.noConflict();
        var host = window.location.host;
        var output = {};
        var outputstr = '';
        var total = 0;
        var total_price = 0;
        var nickname = mjQuery('div.site-nav-user a:first').html();
        mjQuery('div.J_ItemBody:not(".item-invalid")').each(function(i){
                var temp = mjQuery(this).find('div.item-info a.J_MakePoint');
                var unit_price = mjQuery(this).find('div.price-content em.J_Price').text().substr(1);
                var quantity = mjQuery(this).find('input.J_ItemAmount').attr('data-now');
                var good_price = mjQuery(this).find('div.td-inner em.number').text().substr(1);
                var note = mjQuery(this).find('p.sku-line').text();
                var href_name = temp.text();
                var href = temp.attr('href');
                
                total++;
                total_price += parseFloat(good_price);
                
                if(total==1)
					outputstr +=nickname+"的购物车\r\n序号	名称	网址	备注	单价	数量	金额\r\n\r\n";
                
                output[i] = [href_name, href];
                outputstr += total			+'	';
                outputstr += href_name		+'	';
                outputstr += "https:"+href	+'	';
                outputstr += note			+'	';
                outputstr += unit_price		+'	';
                outputstr += quantity		+'	';
                outputstr += good_price		+'	';
                outputstr += "\r\n";
                
                console.log("第"+total+"个商品");
                console.log("名称:"+href_name);
                console.log("网址:https:"+href);
                console.log("备注:"+note);
                console.log("单价:"+unit_price);
                console.log("数量:"+quantity);
                console.log("金额:"+good_price);
                console.log(" ");
        });
        
        outputstr += "\r\n总共" +total+ "种商品 总计" +total_price+ "元";
        
        console.group('%c'+nickname + '的购物车中共' + total + '种商品总计'+total_price+ '元,已导出下载文件','font-size:50px;color:red;');
        console.save(outputstr, nickname + '的购物车.txt');
        console.groupEnd();
});
