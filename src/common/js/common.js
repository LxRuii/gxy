export function RegularVerification(str, type) {
    /**
     * type = 1 : 是否是中文
     * type = 2 : 是否是手机号
     * type = 3 : 是否是身份证
     * type = 4 : 是否是4位验证码
     * type = 5 : 是否是6位验证码
     * type = 6 : 普通密码 (以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
     * type = 7 : 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
     * type = 8 : 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在 6-18 之间)
     * type = 9 : Email地址
     * type = 10 : 强密码  密码至少8位，要求必须字母、数字加英文符号（不包含空格）
     * 
     */
    let name = /^[\u4e00-\u9fa5]{0,}$/
    let phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|16[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|19[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    let id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    let CommonPassword = /^[a-zA-Z]\w{5,17}$/
    let StrongPassword1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/
    let StrongPassword2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/
    let Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    let Code4 = /^\d{4}$/
    let Code6 = /^\d{6}$/
    let StrongPassword3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/

    if (type == 1) {
        return name.test(str)
    } else if (type == 2) {
        return phone.test(str)
    } else if (type == 3) {
        return id.test(str)
    } else if (type == 4) {
        return Code4.test(str)
    } else if (type == 5) {
        return Code6.test(str)
    } else if (type == 6) {
        return CommonPassword.test(str)
    } else if (type == 7) {
        return StrongPassword1.test(str)
    } else if (type == 8) {
        return StrongPassword2.test(str)
    } else if (type == 9) {
        return Email.test(str)
    } else if (type == 10) {
        return StrongPassword3.test(str)
    }

}



//防抖
export function _debounce(fn, wait = 300, isImmediate = false) {
    var timerId = null;
    var flag = true;
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timerId)
        if (isImmediate) {
            if (flag) {
                fn.apply(context, args)
                flag = false
            }
            timerId = setTimeout(function () {
                flag = true
            }, wait)
        } else {
            timerId = setTimeout(function () {
                fn.apply(context, args)
            }, wait)
        }
    }
}

// 节流
export function _throttle(fn, wait = 300, isImmediate = false, callback) {
    var flag = true;
    return function () {
        if (flag == true) {
            var context = this
            var args = arguments
            flag = false
            isImmediate && fn.apply(context, args)
            setTimeout(() => {
                !isImmediate && fn.apply(context, args)
                flag = true
                if (callback) callback.apply(context, args);
            }, wait)
        }
    }
}

/**
 * @description 判断元素是否为空
 * @param {Object} v 传入的值
 * @return {boolean} rt ture为空，false不为空
 */
export function _empty(v) {
    let tp = typeof v,
        rt = false;
    if (tp == "number" && String(v) == "") {
        rt = true
    } else if (tp == "undefined") {
        rt = true
    } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
    } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
    } else if (tp == "function") {
        rt = false
    }
    return rt
}

/** js将数值转为万，亿，万亿并保留两位小数
 * @description 
 * @param {Number} v 传入的值
 * @return {Object} {value: '11', unit: '万亿'}
 */
export function numberFormat(value) {
    let param = {}
    let k = 10000
    let sizes = ['', '万', '亿', '万亿']
    let i
    if (value < k) {
        param.value = value
        param.unit = ''
    } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        param.value = Number(((value / Math.pow(k, i))).toFixed(2));
        param.unit = sizes[i];
    }
    return param;
}