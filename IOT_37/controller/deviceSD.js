const iot = require('alibabacloud-iot-device-sdk');

const device2 = iot.device({
    productKey: 'a1WQWdAoRqh', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'humd',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: '2c817e2225cf37728bc4d73716fe436c',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device2.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device2.subscribe('/a1WQWdAoRqh/humd/user/get'); 
  console.log('connect successfully!');
  device2.publish('/a1WQWdAoRqh/humd/user/update', 'hello world!');
});

//监听message事件
device2.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});





module.exports = {
    device2: device2,

//     CurrentTemperature: function () {
//       return CurrentTemperature;
//   },
//   CurrentHumidity: function () {
//       return CurrentHumidity;
//   },
//     CurrentTemperature: function(status3){
//       CurrentTemperature = status3;
//   },
//     CurrentHumidity: function(status4){
//       CurrentHumidity = status4;
// }
};