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
        console.error('û�����ݡ�')
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
        console.log('�������ף����Լ��δ����');
    } else {
        console.log('jQuery�汾: ' + jQuery().jquery);
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
                var unit_price = mjQuery(this).find('div.price-content em.J_Price').text();
                var quantity = mjQuery(this).find('input.J_ItemAmount').attr('data-now');
                var good_price = mjQuery(this).find('div.td-inner em.number').text();
                var href_name = temp.text();
                var href = temp.attr('href');
                
                total++;
                total_price += parseFloat(good_price.substr(1));
                if(total==1)
					outputstr +=nickname+"�Ĺ��ﳵ\r\n\r\n";
                
                output[i] = [href_name, href];
                outputstr += total +'	'+ href_name +'	'+ "https:"+href +'	'+ unit_price +'	'+ quantity+"\r\n";
                
                console.log("��"+total+"����Ʒ");
                console.log("����:"+href_name);
                console.log("����:"+unit_price);
                console.log("����:"+quantity);
                console.log("��ַ:https:"+href);
                
                console.log("���:"+good_price);
                console.log(" ");
                
                
        });
        
        outputstr += "\r\n�ܹ�" +total+ "����Ʒ ����" +total_price+ "Ԫ";
        
        console.group('%c'+nickname + ' �Ĺ��ﳵ�й� ' + total + '����Ʒ���ѵ��������ļ�','font-size:50px;color:red;');
        console.save(outputstr, nickname +  '�Ĺ��ﳵ.txt');
        console.groupEnd();
});