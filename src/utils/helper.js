
// 手机号中间加密
export function transPhone(phone) {
    const tel = String(phone)
    return tel.substr(0,3) + "****" + tel.substr(7)
}

// 数字过滤器：20.12万 向下取整
export function numFormat(num){
    const val = Number(num)
    if (val >= 10000) {
        const v  = val / 10000
        num = Math.floor(v * 100) / 100
        return num + "万"
        // return parseFloat((val / 10000).toFixed(2)) + "万";
    } else {
        return val;
    }
}

//字符串转换为时间戳
export function getDateTimeStamp (dateStr) {
    return Date.parse(dateStr.replace(/-/gi,"/"));
}
// 时间过滤器：1天前 2小时前 3分钟前 4秒前 刚刚发表
export function getDateDiff (dateStr) {
    var publishTime = getDateTimeStamp(dateStr)/1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime()/1000),
        d,
        date = new Date(publishTime*1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    d = timeNow - publishTime;
    d_days = parseInt(d/86400);
    d_hours = parseInt(d/3600);
    d_minutes = parseInt(d/60);
    d_seconds = parseInt(d);
    if(d_days > 0 && d_days < 3){
        return d_days + '天前';
    }else if(d_days <= 0 && d_hours > 0){
        return d_hours + '小时前';
    }else if(d_hours <= 0 && d_minutes > 0){
        return d_minutes + '分钟前';
    }else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return '刚刚发表';
        }else {
            return d_seconds + '秒前';
        }
    }else if (d_days >= 3 && d_days < 30){
        return M + '-' + D + ' ' + H + ':' + m;
    }else if (d_days >= 30) {
        return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
    }
}

// 获取某个时间的时间戳
export function getTimeTemp(timeStr){
    return new Date(timeStr.replace(/-/g,'/')).getTime()
}

// 获取Url内携带的参数
export function getUrlParams(url, key){
	// \w+ 表示匹配至少一个(数字、字母及下划线), [\u4e00-\u9fa5]+ 表示匹配至少一个中文字符
	let pattern = /(\w+|[\u4e00-\u9fa5]+)=(\w+|[\u4e00-\u9fa5]+)/ig;
	let result = {};
	url.replace(pattern, ($, $1, $2)=>{
		result[$1] = $2;
	})
	return result[key]
}