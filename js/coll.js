function checkFrame() { /*防止网页被嵌入框架的代码*/

    if (window != top) // 判断当前的window对象是否是top对象
    top.location.href = window.location.href; // 如果不是，将top对象的网址自动导向被嵌入网页的网址

}

function deepCopy(p, c) { /* 用于继承，父改变，子不改变*/
    　　　　
    var c = c || {};　　　　
    for (var i in p) {　　　　　　
        if (typeof p[i] === 'object') {　　　　　　　　
            c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
            deepCopy(p[i], c[i]);　　　　　　
        } else {　　　　　　　　　
            c[i] = p[i];　　　　　　
        }　　　　
    }　　　　
    return c;　　
}


function inherit(o) { /* 用于继承，父值改变，子也改变，子加新的值和修改继续的值，父不会增加*/
    if (o == null) throw TypeError();
    if (Object.create) return Object.create(o);
    var t = typeof o;
    if (t !== "object" && t !== "function") throw TypeError();

    function F() {}
    F.prototype = o;
    return new F();
}

function quickSort(arr) {　　
    if (arr.length <= 1) {
        return arr;
    }　　
    var pivotIndex = Math.floor(arr.length / 2);　　
    var pivot = arr.splice(pivotIndex, 1)[0];　　
    var left = [];　　
    var right = [];　　
    for (var i = 0; i < arr.length; i++) {　　　　
        if (arr[i] < pivot) {　　　　　　
            left.push(arr[i]);　　　　
        }
        else {　　　　　　
            right.push(arr[i]);　　　　
        }　　
    }　　
    return quickSort(left).concat([pivot], quickSort(right));
}

/*中文英文左右padding一致两端对齐实现*/
function textAdjust(box) {
    box.style.textAlign = "justify";
    box.style.letterSpacing = '-.15em';
    box.innerHTML = box.innerHTML.split("").join(" "); /*纯中文*/
    // box.innerHTML = box.innerHTML.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').split("").join(" ").replace(/\s{3}/g, " &nbsp; ");
}

//阻止默认事件
function preDef(evt) {
    var e = evt || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

//获取事件源
function getTarget(evt) {
    if (evt.target) {
        return evt.target;
    } else if (window.event.srcElement) {
        return window.event.srcElement;
    }
}

//绑定事件
function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + type, fn);
    } else {
        target["on" + type] = fn;
    }

}

//解绑事件
function removeEvent(obj, type, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(type, fn);
    } else if (obj.detachEvent) {
        obj.detachachEvent('on' + type, fn);
    }
}

function getCharCode(e) {
    var e = e || window.event;
    if (typeof e.charCode == 'number') {
        return e.charCode;
    } else {
        return e.keyCode;
    }
}

//获取鼠标点击键
function getWhichMouse(e) {
    if (getButton(e) == 0) {} /*left*/
    else if (getButton(e) == 1) {} /*mid*/
    else if (getButton(e) == 2) {} /*right*/
}


/*
    把p中的可枚举属性复制到o中并返回
    如果有同名属性，则覆盖
    这个函数不处理getter和setter以及复制属性
 */
function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

// extend进阶版
Object.defineProperty(Object.prototype, "extend", {
    writable: true,
    enumerable: true,
    configurable: true,
    value: function(o) {
        var names = Object.getOwnPropertyNames(o);
        for (var i = 0; i < names.length; i++) {
            if (names[i] in this) continue;
            var desc = Object.getOwnPropertyDescriptor(o, names[i]);
            Object.defineProperty(this, names[i], desc);
        }
    }
})


/*
    把p中的可枚举属性复制到o中并返回
    如果有同名属性，不做处理，o的属性不会受影响
    这个函数不处理getter和setter以及复制属性
 */
function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty[prop]) continue;
        o[prop] = p[prop];
    }
    return o;
}

/*
    如果o中的属性在p中没有同名的，删除这个属性
 */
function restrict(o,p) {
    for (prop in o) {
        if (!(prop in p)) delete o[prop];
    }
    return o;
}

/*
    如果o中的属性在p中有同名的，删除这个属性
 */
function subtract(o,p) {
    for (prop in o) {
        delete o[prop];
    }
    return o;
}

/*
    返回一个新的对象，这个对象同时有o和p的属性
    如果o个p之后有重名的属性，使用p的值
 */
function union(o, p) {
    return extend(extend({}, o), p);
}

/*
    返回一个新的对象，这个对象同时有o和p的属性
    如果o个p之后有重名的属性，p的值会忽略
 */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}


/*
    返回一个数组，包含o中可枚举的自有属性名
    ECMAScript5中也有同类型的方法
    Object.keys(o);
    Object.getOwnPropertyNames(o);返回所有自有属性名，不仅仅是可枚举的
 */
function keys(o) {
    if (typeof o !== 'object') throw TypeError();
    var result = [];
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) result.push(prop);
    }
    return result;
}

// 获取对象的类
function classof(o) {
    if (o === null) return 'Null';
    if (o === undefined) return "undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

// 数组的复制，删除引用
function cloneArray(destination, source) {

    function getType(o) {
        var _t;
        return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
    }

    for (var p in source) {
        if (getType(source[p]) == "array" || getType(source[p]) == "object") {
            destination[p] = getType(source[p]) == "array" ? [] : {};
            arguments.callee(destination[p], source[p]);
        } else {
            destination[p] = source[p];
        }
    }
}

//获取当前时间
function CurentTime()
{
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();

    var clock = year + "-";

    if (month < 10) clock += "0";

    clock += month + "-";

    if (day < 10) clock += "0";

    clock += day + " ";

    if (hh < 10) clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

// 判断两对象是否相等
 function equalObject(objA, objB) {
        if (typeof objA != typeof objB) {
            return false;
        }else if (objA instanceof Array) {
            for (var i = objA.length; i--;) {
                if (!equal(objA[i], objB[i])){
                    return false;
                }
            }
            return true;
        }else  if (objA instanceof Object) {
            var key;
            for (key in objA) {
                if (!equalObject(objA[key], objB[key])){
                    return false;
                }
            }
            return true;
        }else{
            return objA == objB;
        }
    }

//函数记忆
function memory(fn){
    var cache = {};
    return function(){
        var key = arguments.length + Array.prototype.join.call(arguments,',');
        if(key in cache){
            return cache[key];
        }
        else{
            return cache[key] = fn.apply(this,arguments);
        }
    }
}
/*
    var factorial = memory(function(n){
        return (n <= 1) ? 1 : n * factorial(n-1);
    })
*/

//判断是否数组
function isArray(arr){
    return Object.prototype.toString.call(arr) === "[object function]";
}

/*获取url中的参数*/
var getUrlParams = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}


//定义类
/*
    constructor:实例函数
    methods：实例的方法，复制到原型中
    statics：类属性，复制到构造函数
*/
function definedClass(constructor,methods,statics){
    if(methods) extend(constructor.prototype,methods);
    if(statics) extend(constructor,statics);
    return constructor;
}

//返回函数的名字，不是函数的时候返回null
Function.prototype.getName = function(){
    if('name' in this) return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
}

//判断值的类型
function type(o){
    var t, c,n;    //type,class,name

    if(o === null) {
        console.log('type:null');return 'null';
    };

    if(o !== o) {
        console.log('type:NaN');return 'NaN';
    };

    //识别出原始值的类型和函数
    if((t = typeof o) !== 'object'){
        console.log('type:'+t);
        return t;
    }

    //识别大多数的内置对象
    if((c = classof(o)) !== 'Object') {
        console.log('class:'+c);
        return c;
    }

    //如果对象构造函数名字存在的话就返回
    if(o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) {
        console.log('fn-name:'+n);
        return n;
    }

    return 'Object';
}

//如果o实现了除第一个参数之外的参数所表示的方法，return true
function quacks(o/*,....*/){
    for(var i =1; i < arguments.length; i++){                       //遍历o之后的所有参数
        var arg = arguments[i];
        switch (typeof arg){
            case 'string':
                if (typeof o[arg] !== 'function') return false;
                continue;
            case 'function':                                       //检查函数原型对象上的方法
                arg = arg.prototype;
            case 'object':                                         //检查匹配的方法
                for(var m in arg){
                    if (typeof arg[m] !== 'function') continue;    //跳过不是方法的属性
                    if (typeof o[m] !== 'function') return false;
                }
        }
    }
    return true;
}


//超类和子类
/*function Cat(foot,tail){
    this.foot = foot;
    this.tail = tail;
}
Cat.prototype = {
    constructor : Cat,
    bite : function(){
        console.log('bite');
    }
}

function Lion(foot,tail,xx){
    Cat.apply(this,arguments);
    this.xx = xx;
}
Lion.prototype = new Cat;
Lion.prototype.constructor = Lion;
var test = new Lion('11','22','33');
test.bite();*/


function parent(e,n){
    if(n === undefined) n = 1;
    while(n-- && e) e = e.parentNode;
    if(!e || e.nodeType !== 1) return null;
    return e;
}

function sibling(e,n){
    while(e && n!==0){
        if(n>0){
            if(e.nextElementSibling) e = e.nextElementSibling;
            else{
                for(e=e.nextSibling; e && e.nodeType!==1; e=e.nextSibling){}
            }
            n--;
        }
        else{
            if(e.previousElementSibling) e = e.previousElementSibling;
            else{
                for(e=e.previousSibling; e && e.nodeType!==1; e=e.previousSibling){}
            }
            n++;
        }
    }
}

//递归将节点的text转换为大写
function upcase(n){
    //如果n是text或cdata节点
    if(n.nodeType == 3 || n.nodeType == 4){
        n.data = n.data.toUpperCase();
    }
    else{
        for(var i = 0 ;i< n.childNodes.length;i++){
            upcase(n.childNodes[i]);
        }
    }
}

//计算元素的文档坐标
function getElementPosition(elt){
    var x = 0,y=0;
    for(var e = elt;e!=null;e = e.offsetParent){
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    for(var e = elt.parentNode;e!=null && e.nodeType == 1; e= e.parentNode){
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x:x,y:y};
}

//兼容ie的事件方法
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }
    else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        })
    }
}