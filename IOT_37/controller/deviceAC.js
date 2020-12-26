const iot = require('alibabacloud-iot-device-sdk');

// 云服务器想要确定的设备状态 
var PowerSwitch = 0;
//创建iot.device对象将会发起到阿里云IoT的连接
const device4 = iot.device({
    productKey: 'a1hVZDiuLSN', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'air-con',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'c136d998b9642daecdf607b3f1b4da6e',//将<deviceSecret>修改为实际设备的DeviceSecret
  });
    
  
  //监听connect事件
  device4.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device4.subscribe('/a1hVZDiuLSN/air-con/user/get'); //subscribe表示从阿里云上接收信息
    console.log('connect successfully!'); 

    device4.publish('/a1hVZDiuLSN/air-con/user/update', 'hello world!'); //publish表示向阿里云发送消息
  });

  
  
  //监听message事件
  device4.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
   
  });
  // 上报设备属性 
 device4.postProps({ PowerSwitch: 1}, (res) => { console.log(res); });
 

 device4.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    // 监听云端设置属性服务消息，示例代码为一个灯
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('空调的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            PowerSwitch = cmd.params.PowerSwitch;
            if ( PowerSwitch == 0) {
                console.log('空调关闭')
            }
            else {
                console.log('空调打开')
            }
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            PowerSwitch = Number(cmd.params.PowerSwitch);
            device4.postProps({ 'PowerSwitch': PowerSwitch });
        }
    
    }
    });
    


    module.exports = {
        device4: device4,
        getPowerSwitch: function(){
            return PowerSwitch;
        },
        setPowerSwitch: function(status){
            PowerSwitch = status;
        }
    };