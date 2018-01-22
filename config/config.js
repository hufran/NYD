/**
 * Created by Administrator on 2017/5/22.
 */
/*
*处理版本配置项
*/
module.exports=function(versionNumber){
    var version=process.argv;
    if(version[2]){
        var arr=version[2].split('=');
        process.env.NODE_ENV=arr[1];

    }else{
        process.env.NODE_ENV="development";
    }
    console.log("env:",process.env.NODE_ENV);
    if(versionNumber){
        global.versionValue=versionNumber.toString();
    }else{
        global.versionValue="1.0.0";
    }
    console.log("versionNumber:",global.versionValue);
};
