/**
 * Created by Administrator on 2017/5/22.
 * 路由版本的处理
 */
var config=require('./config');
var os=require("os");
var envConfig=require('./env');
var hostList=[];

module.exports=function(){
    config();
    var netWork=os.networkInterfaces();

    for(var key in netWork){
        for(var i= 0,len=netWork[key].length;i<len;i++){
            if(netWork[key][i]["family"]==="IPv4"){
                hostList.push(netWork[key][i]["address"]);
            }
        }
    }
    if(process.env.NODE_ENV==="product"){

        console.log("hostList: ",hostList);

        var host;
        for(var j= 0,length=hostList.length;j<length;j++){
            for(var k= 0,len=envConfig.onlineIP.length;k<len;k++){
                console.log("hostList ip:",hostList[j]," onlineIP:",envConfig.onlineIP[k]);
                if(hostList[j]===envConfig.onlineIP[k]){
                    process.env.NODE_ENV="product";
                    host=hostList[j];
                    return;
                }
            }
        }
        process.env.NODE_ENV="development";
    }else{
        process.env.NODE_ENV="development";
    }
    if(envConfig.testIP){

        for(var i= 0,len=hostList.length;i<len;i++){
            for(var k= 0,length=envConfig.testIP.length;k<length;k++){
                console.log("hostList ip:",hostList[i]," testIP:",envConfig.testIP[k]);
                if(hostList[i]===envConfig.testIP[k]){
                    envConfig.autoOpenBrowser=false;
                    return;
                }
            }
        }
    }
    return;
};
