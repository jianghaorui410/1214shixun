const container = require('rhea'); 
const crypto = require('crypto');
var dt =new Date;
//建立连接。 
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。
    'host': '1804468617559784.iot-amqp.cn-shanghai.aliyuncs.com',
    'port': 5671,
    'transport':'tls',
    'reconnect':true,
    'idle_time_out':60000,
    //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId， 购买的实例请填写实例ID，公共实例请填空字符串""。
    'username':'clientId|iotInstanceId=${iotInstanceId},authMode=aksign,signMethod=hmacsha1,consumerGroupId=DEFAULT_GROUP,authId=LTAI4FpyssHAB2AcdwaCJNBn,timestamp=1573489088171|',
    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。
    'password': hmacSha1('mxSph1vCvjPQ1fJZdPBM4LX666A0pj',
    'authId=LTAI4FpyssHAB2AcdwaCJNBn&timestamp=1573489088171'),
    
});
console.log("keyi");
//创建Receiver连接。
var receiver = connection.open_receiver();
//接收云端推送消息的回调函数。
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var content = Buffer.from(msg.body.content).toString();

    if(topic === '/a1t94oBCpWO  /LED713/thing/event/property/post'){
        // 针对msg.body.content进行简单的处理
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept();
});

//计算password签名。
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1',key).update(context).digest())
    .toString('base64');
}
