const iot = require('alibabacloud-iot-device-sdk');

const device1 = iot.device({
  productKey: 'a16G3uNlOYB', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'EKF9rCMLhPsxcQ7rMVDM',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: '2ecf3171d3fdf4a7e89281e4d38476cc',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device1.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device1.subscribe('/a16G3uNlOYB/EKF9rCMLhPsxcQ7rMVDM/user/get'); 
  console.log('connect successfully!');
  device1.publish('/a16G3uNlOYB/EKF9rCMLhPsxcQ7rMVDM/user/update', 'hello world!');
});

//监听message事件
device1.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});





module.exports = {
    device1: device1,

  //   CurrentTemperature: function () {
  //     return CurrentTemperature;
  // },
//   CurrentHumidity: function () {
//       return CurrentHumidity;
//   },
  //   CurrentTemperature: function(value){
  //     CurrentTemperature = value;
  // },
//     CurrentHumidity: function(status4){
//       CurrentHumidity = status4;
// }
};