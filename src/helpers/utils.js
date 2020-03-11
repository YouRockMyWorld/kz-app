Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份
       "d+" : this.getDate(),                    //日
       "H+" : this.getHours(),                   //小时
       "m+" : this.getMinutes(),                 //分
       "s+" : this.getSeconds(),                 //秒
       "q+" : Math.floor((this.getMonth()+3)/3), //季度
       "S"  : this.getMilliseconds()             //毫秒
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

function getBreadcrumbPath(searchList, currentResult, outList){
    for(let i =0 ; i< searchList.length; ++i){
        let result = currentResult.slice();
        result.push(searchList[i].name);
        outList.push({
            path: searchList[i].path,
            names: result
        });
        if(searchList[i].children.length > 0){
            getBreadcrumbPath(searchList[i].children, result, outList)
        }
    }
}

export { getBreadcrumbPath }