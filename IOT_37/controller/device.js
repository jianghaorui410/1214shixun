const iot = require('alibabacloud-iot-device-sdk');

// 云服务器想要确定的设备状态 
var lightStatus = 0;
//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: 'a1t94oBCpWO', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'LED713',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '0ee113ce53ab802ebc02e8d480113cb8',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a1t94oBCpWO/LED713/user/get'); //subscribe表示从阿里云上接收信息
    device.publish('/a1t94oBCpWO/LED713/user/update', 'hello world!'); //publish表示向阿里云发送消息
});

//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

// 上报设备属性 
device.postProps({ LightStatus: 1}, (res) => { console.log(res); });

device.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息 
    for (var key in cmd.params) {
        if (key == 'LightStatus') {
            //判断是否设置的是LightSwitch属性 
            console.log('灯的状态:', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭 
            lightStatus = Number(cmd.params.LightStatus);
            if (lightStatus === 0) {
                console.log('灯从云端关闭');
            } else {
                console.log('灯从云端打开');
            } //本地设置完毕之后，将更新后的状态报告给云端。 
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报 
            device.postProps({ 'LightStatus': lightStatus });
        }
    }
});


module.exports = {
    device: device,
    getLightStatus: function () {
        return lightStatus;
    },
    setLightStatus: function (status) {
        lightStatus = status;
    }
};