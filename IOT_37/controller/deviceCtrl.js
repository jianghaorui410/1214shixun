"use strict";
const device = require('../controller/device');
const device1 = require('../controller/deviceWD');
const  device2  = require('../controller/deviceSD');
const  device4  = require('../controller/deviceAC');
const  device5  = require('../controller/deviceFAN');
// const date = require("silly-datetime");
const mysqlModule = require('mysql');
const bodyParser = require('body-parser');
var deasync = require('deasync');
const PWD = [
    { userName: 'admin', password: '123456' }
];

module.exports = {
//灯泡
    report(req, resp) {
        // 获取PT上报的id和状态 
        const id = req.params['id'];
        const status = req.params['status'];

        // 上报设备属性
        device.device.postProps({
            LightStatus: Number(status)
        }, (res) => {
            console.log(res);
        });

        // 打印id和状态 
        console.log(id);
        console.log(status);


        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功  
            status: device.getLightStatus()
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },

    update(req, resp) {
        const result = {
            succ: true,
            msg: '',
            data: {

            }
        };
        result.data = { status: req.body.status };
        device.setLightStatus(req.body.status);

        resp.end(JSON.stringify(result));
    },

    GETLightStatus(req, resp) {
        const status = device.getLightStatus();
        console.log(status);
        resp.end(JSON.stringify(status));
    },
////////////////////////////////////////////////////////////////////////////////////////////////////
//温度


wd(req, resp) {
    const id = req.params['id'];
    const value = req.params['value'];

    // 上报设备属性
    device1.device1.postProps({
       Temperature: Number(value),
    }, (res) => {
        console.log(res);
    });

    // 打印id和状态 
    console.log(id);
    console.log(value);

//     // 上报设备属性
//     let time= date.format(new Date(),'YYYY-MM-DD'); 
//     let db = mysqlModule.createConnection({
//         host: "localhost",
//         port: "3306",
//         user: "root",
//         password: "123456",
//         database: "yy"
//     });
//     //2.打开数据库   
//     db.connect();
//     //3.数据库操作
//     db.query('insert into wd(time,value) values(?,?)', [time,value], function (err, result) {
//     if (err)
//     {
//        throw err;
//     } 
//    });

    // 创建应答对象 
    const obj = {
        id: id,
        success: true,
        // 是否成功 
        value: value
        // 将云服务器的设备状态放入status字段里 
    };
    // 发送给PT 
    resp.write(JSON.stringify(obj));
    // 结束应答 
    resp.end();
},

sd(req, resp) {
    const id = req.params['id'];
    const value = req.params['value'];

     // 上报设备属性
     device2.device2.postProps({
        CurrentHumidity: Number(value),
    }, (res) => {
        console.log(res);
    });

    // 打印id和状态 
    console.log(id);
    console.log(value);

//     let time= date.format(new Date(),'YYYY-MM-DD'); 
//     console.log(value);
//     let db = mysqlModule.createConnection({
//         host: "localhost",
//         port: "3306",
//         user: "root",
//         password: "123456",
//         database: "yy"
//     });
//     //2.打开数据库   
//     db.connect();
//     //3.数据库操作
//     db.query('insert into sd(time,value) values(?,?)', [time,value], function (err, result) {
//     if (err)
//     {
//        throw err;
//     } 
//    });
    // 创建应答对象 
    const obj = {
        id: id,
        success: true,
        // 是否成功 
        value: value
        // 将云服务器的设备状态放入status字段里 
    };
    // 发送给PT 
    resp.write(JSON.stringify(obj));
    // 结束应答 
    resp.end();
},

// device1(req, resp) {
//     const status = device1.CurrentTemperature();
//     const status = device1.CurrentHumidity();
//     console.log(status);
//     resp.end(JSON.stringify(status));
    
// },
    // ws(req,resp){
    //     const id = req.params['id'];
    //     const temp=req.params['temp'];
    //     const humd=req.params['humd'];
    //     // const value = req.params['value'];
    //     //mysql记录
    //     // var connection = mysql.createConnection({
    //     //     host: 'localhost',
    //     //     user: 'root',
    //     //     password: '123456',
    //     //     port: 3306,
    //     //     database: 'user'
    //     // })
    //     // connection.connect();
    //     // connection.query('insert into event(name,value) values(?,?)', [id,value], function (err, result) {
    //     //     if (err) {
    //     //         throw err;
    //     //     } else {
    //     //         var data = {
    //     //             code: '200',
    //     //             code_decoration: '添加成功'
    //     //         }
    //     //         res.send({value:data, succ: true });
    //     //         console.log('----------------------');
    //     //         console.log(result);
    //     //         console.log('----------------------');
    //     //         console.log(data);
    //     //     }
    //     // });
    //     // connection.end();
    //     // 获取PT上报的id和状态 
    
    //     // 上报设备属性
    //     device1.device1.postProps({
    //         CurrentTemperature: Number(temp),
    //         CurrentHumidity:Number(humd)
    //     }, (res) => {
    //         console.log(res);
    //     });
    
    //     // 打印id和状态 
    //     console.log("id:"+id);
    //     console.log("temp:"+temp);
    //     console.log("humd:"+humd);
    
    
    //     // 创建应答对象 
    //     const obj = {
    //         id: id,
    //         success: true,
    //         // 是否成功 
    //         temp:temp,
    //         humd:humd
    //         // 将云服务器的设备状态放入status字段里 
    //     };
    //     // 发送给PT 
    //     resp.write(JSON.stringify(obj));
    //     // 结束应答 
    //     resp.end();
    
    //     },




    //验证用户名密码
    PWD(req, resp) {    //req表示请求，resp表示应答
        //url-encoded
        //form-data
        //json
        let founded = false;
        for (let user of PWD) {
            if (user.userName === req.body.userName && user.password === req.body.password) {
                resp.send({ succ: true });
                founded = true;
            }
        }
        if (founded == false) {
            resp.send({ succ: false });
        }
        resp.end();
    },

    //查询设备
    USER(req, resp) {
        var aa = [];
        var l = [];
        console.log("aaa")

        function selectl() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM dev", function (err, data) {
                if (err) console.log("err")
                for (let aa of data) {
                    // console.log(aa);
                    l.push({
                        'id': aa.id,
                        'name': aa.name,
                        'info': aa.info
                    });
                    sync1 = false;
                };
                // console.log(l);
            });
            while (sync1) { deasync.sleep(400); }
            return l;
        }//获取亮度表数据
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        l = selectl();
        let sz = [];
        for (let aa of l) {

            sz.push({
                'id': aa.id,
                'name': aa.name,
                'info': aa.info
            });
        }
        console.log(sz);
        resp.send(sz);
        // connect.end();
        resp.end();
        db.end();
    },

    USERID(req, resp) {
        var aa = [];
        var l = [];
        var querystring = require('querystring');

        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let id = result.id;
        let name = result.name;
        console.log(id, name);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectid() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM dev WHERE id = ? AND name = ? ", [id, name], function (err, data) {
                if (data.length > 0) {
                    for (let aa of data) {
                        l.push({
                            'id': aa.id,
                            'name': aa.name,
                            'info': aa.info
                        });
                        sync1 = false;
                    }
                } else {
                    resp.send("查询失败");
                    resp.end();
                }
            });
            while (sync1) { deasync.sleep(10); }
            return l;
        }
        l = selectid();
        let sz = [];
        for (let aa of l) {
            sz.push({
                'id': aa.id,
                'name': aa.name,
                'info': aa.info
            });
        }
        resp.send(sz);
        // connect.end();
        db.end();
        resp.end();

    },

    //查询用户
    dev(req, resp) {
        var aa = [];
        var l = [];

        function selectl() {
            var sync1 = true;
            l.splice(0, l.length);
            // let connect = mysql.createConnection(db_config);

            db.query("SELECT * FROM name", function (err, data) {
                if (err) console.log(err)
                for (let aa of data) {
                    // console.log(aa);
                    l.push({
                        'sid': aa.sid,
                        'sname': aa.sname,
                        'spwd': aa.spwd
                    });
                    sync1 = false;
                };
                // console.log(l);
            });
            // connect.end();
            while (sync1) { deasync.sleep(10); }
            return l;
        }//获取亮度表数据
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        l = selectl();
        let sz = [];
        // console.log(l);
        for (let aa of l) {
            // console.log('aaa');

            sz.push({
                'sid': aa.sid,
                'sname': aa.sname,
                'spwd': aa.spwd
            });
        }
        console.log(sz);
        resp.send(sz);
        // connect.end();
        resp.end();
        db.end();
    },

    devid(req, resp) {
        var aa = [];
        var l = [];
        var querystring = require('querystring');

        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let sid = result.id;
        let sname = result.userName;
        console.log(sid, sname);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectid1() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM name WHERE sid = ? AND sname = ? ", [sid, sname], function (err, data) {
                if (data.length > 0) {
                    for (let aa of data) {
                        l.push({
                            'sid': aa.sid,
                            'sname': aa.sname,
                            'spwd': aa.spwd
                        });
                        sync1 = false;
                    }
                } else {
                    resp.send("查询失败");
                    resp.end();
                }

            });
            while (sync1) { deasync.sleep(10); }
            return l;
        }
        l = selectid1();
        let sz = [];
        // console.log(l);
        for (let aa of l) {
            // console.log('aaa');
            sz.push({
                'sid': aa.sid,
                'sname': aa.sname,
                'spwd': aa.spwd
            });
        }
        console.log(sz);
        resp.send(sz);
        // connect.end();
        resp.end();
        db.end();
    },

    //添加设备
    userAdd(req, resp) {    //req表示请求，resp表示应答

        let id = req.body.id;
        let name = req.body.name;
        let pay = req.body.info;
        console.log(id, name, pay);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作   
        db.query("INSERT INTO dev(id,name,info) VALUES(?,?,?)", [id, name, pay], function (err, data) {

        });
        resp.send({ succ: true });
        db.end();
    },

    //添加用户
    devAdd(req, resp) {
        let sid = req.body.sid;
        let sname = req.body.sname;
        let spwd = req.body.spwd;
        console.log(sid, sname, spwd);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作   
        db.query("INSERT INTO name(sid,sname,spwd) VALUES(?,?,?)", [sid, sname, spwd], function (err, data) {

        });
        resp.send({ succ: true });
        db.end();

    },


    //修改设备
    userUpadte(req, resp) {    //req表示请求，resp表示应答
        let id = req.body.id;
        let name = req.body.name;
        let pay = req.body.info;
        console.log(id, name, pay);
        console.log('修改');
        //mysql操作
        //1.创建数据库链接
        function select() {
            var sync1 = true;
            db.query("UPDATE dev SET info = ? WHERE name = ? AND id = ?", [pay, name, id], function (err, data) {
                console.log('------------------------------');
                console.log('修改后的数据');
                console.log(data);
                console.log('------------------------------');
                sync1 = false;
                //resp.send(data);
            });
            while (sync1) { deasync.sleep(10); }
            return;
        }
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        select();
        console.log('修改完成');
        resp.send({ succ: true });
        db.end();
        resp.end();



    },

    //修改用户
    devUpdate(req, resp) {    //req表示请求，resp表示应答
        var aa = [];
        var l = [];
        var querystring = require('querystring');
        var result = req.body;
        let sid = result.id;
        let sname = result.userName;
        let spwd = result.password;
        console.log(sid);
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectup1() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("UPDATE name SET spwd = ? WHERE sid = ? AND sname = ?", [spwd, sid, sname], function (err, data) {
                if (err) console.log(err)
                // for (let aa of data) {
                l.push({
                    'sid': sid,
                    'sname': sname,
                    'spwd': spwd
                });
                sync1 = false;
                // }
            });
            while (sync1) { deasync.sleep(10); }
            return;
        }
        selectup1();
        resp.send({ succ: true });
        db.end();
        resp.end();
    },


    //设备删除
    userDelete(req, resp) {    //req表示请求，resp表示应答
        var querystring = require('querystring');
        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let id = result.id;
        console.log(id);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        db.connect()
        db.query("delete from dev where id = ?", [id], function (err, data) {



        });
        console.log("删除成功")
        resp.send({ succ: true });

        db.end()
    },

    //用户删除
    devDelete(req, resp) {    //req表示请求，resp表示应答
        var querystring = require('querystring');
        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let sid = result.id;
        console.log(sid);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "yy"
        });
        db.connect()
        db.query("delete from name where sid = ? ", [sid], function (err, data) {
        });
        console.log("删除成功")
        resp.send({ succ: true });
        db.end()
    },
    /*********************************设备**************************************** */
    
    //空调控制

    device4(req, resp) {
        const status = device4.getPowerSwitch();
        console.log(status);
        resp.end(JSON.stringify(status));
        
    },
    ac(req, resp) {
        // 获取PT上报的id和状态 
        const id = req.params['id'];
        const status = req.params['status'];

        // 上报设备属性
        device4.device4.postProps({
            PowerSwitch: Number(status)
        }, (res) => {
            //console.log(res);
        });

        // 打印id和状态 
        console.log(id);
        console.log(status);


        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功  
            status:device4.getPowerSwitch()
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },

    update(req, resp) {
        const result = {
            succ: true,
            msg: '',
            data: {

            }
        };
        result.data = { status: req.body.status };
        device4.setPowerSwitch(req.body.status);
       
        resp.end(JSON.stringify(result));
    },

    
    /////////////////////////////////////////////////////////////////////////////////
    //风扇
    device5(req, resp) {
        const status = device5.getWindSpeed();
        const status2 = device5.getPowerSwitch();
        console.log(status);
        resp.end(JSON.stringify(status));
        resp.end(JSON.stringify(status2));
    },

    

    fs(req, resp) {
        const id = req.params['id'];
        const status = req.params['status'];
        const status2 = req.params['status2'];


        // 上报设备属性
        device5.device5.postProps({
            WindSpeed: Number(status),
            PowerSwitch: Number(status2)
        }, (res) => {
            console.log(res);
        });

        // 打印id和状态 
        console.log(id);
        console.log(status);
        console.log(status2);

        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功 
            
            status: device5.getWindSpeed(),
            status2: device5.getPowerSwitch()
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
    update(req, resp) {
        const result = {
            succ: true,
            msg: '',
            data: {

            }
        };
        result.data = { status: req.body.status };
        device5.setWindSpeed(req.body.status);
        device5.setPowerSwitch(req.body.status);



        resp.end(JSON.stringify(result));
    },

}
