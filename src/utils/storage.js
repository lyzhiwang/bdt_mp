export default{
    // 过期时间，默认1年 单位秒
    age: 31536000,
    /**
     * 设置过期时间
     * @param age
     * @returns {exports}
     */
    setAge: function (age) {
        this.age = age;
        return this;
    },
    /**
     * 设置 localStorage
     * @param key
     * @param value
     */
    set: function (key, content, expires) {
        localStorage.removeItem(key);
        let _time = Math.floor(new Date().getTime()/1000);
        let _age = expires? (expires) : this.age;
        let value = {};
        value._value = content;
        
        // 加入时间
        value._time = _time;
        // 过期时间
        value._age = _time + _age;
        localStorage.setItem(key, JSON.stringify(value));
        return this;
    },
    /**
     * 判断一个 localStorage 是否过期
     * @param key
     * @returns {boolean}
     */
    isExpire: function (key) {
        
        var isExpire = true,
            value = localStorage.getItem(key),
            now = Math.floor(new Date().getTime()/1000);
        
        if (value) {
            value = JSON.parse(value);
            // 当前时间是否大于过期时间
            isExpire = now > value._age;
        } else {
            // 没有值也是过期
        }
        return isExpire;
    },
    /**
     * 获取某个 localStorage 值
     * @param key
     * @returns {*}
     */
    get: function (key) {
        let isExpire = this.isExpire(key);
        let value = null;
        if (isExpire){ //过期
            localStorage.removeItem(key);
            return value;
        }
        value = localStorage.getItem(key);
        value = JSON.parse(value);
        return value._value;
    }
}