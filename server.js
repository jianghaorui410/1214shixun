"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


var USERS = [
    { id: '01', Name: 'asd', achievement: 'web：80；RFID：70；C++：86' },
    { id: '02', Name: 'dfg', achievement: 'web：83；RFID：71；C++：77' },
    { id: '03', Name: 'zxc', achievement: 'web：90；RFID：99；C++：93' },
    { id: '04', Name: 'cvb', achievement: 'web：69；RFID：60；C++：44' }
];

var IDS = [
    { id: '01', userName: 'asd', password: '123' },
    { id: '02', userName: 'qwe', password: '123213' },
    { id: '03', userName: 'zxc', password: '34534' },
    { id: '04', userName: 'cvb', password: '567567' }
];

const PWD = [
    { userName: 'admin', password: '123456' }
];



app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1")
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//查询学生
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//查询用户
app.get('/ids', function (req, resp) {
    resp.send(IDS);
    resp.end();
});

app.get('/ids/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let ids of IDS) {
        if (ids.id === id) {
            resp.send([ids]);
            break;
        }
    }
    resp.end();
});

//------------------------------------------------------
app.post('/pwd', function (req, resp) {    //req表示请求，resp表示应答
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
});
//------------------------------------------------------

//添加学生
app.post('/user', function (req, resp) {    //req表示请求，resp表示应答
    //url-encoded
    //form-data
    //json
    USERS.push(req.body);
    resp.send({ succ: true })
    resp.end();
});

//添加用户
app.post('/ids', function (req, resp) {    //req表示请求，resp表示应答
    //url-encoded
    //form-data
    //json
    IDS.push(req.body);
    resp.send({ succ: true })
    resp.end();
});


//修改学生
app.put('/user', function (req, resp) {    //req表示请求，resp表示应答
    //url-encoded
    //form-data
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.Name = req.body.Name;
            user.achievement = req.body.achievement;
            founded = true;
            break;
        }
    }

    if (founded) {
        USERS.push(req.body);
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没找到用户!' });
    }
    resp.end();
});

//修改用户
app.put('/ids', function (req, resp) {    //req表示请求，resp表示应答
    //url-encoded
    //form-data
    //json
    let founded = false;
    for (let ids of IDS) {
        if (ids.id === req.body.id) {
            ids.userName = req.body.userName;
            ids.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        IDS.push(req.body);
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没找到用户!' });
    }
    resp.end();
});

//删除学生
app.delete('/user/:id', function (req, resp) {    //req表示请求，resp表示应答
    //url-encoded
    //form-data
    //json
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没找到用户!' });
    }
    resp.end();
});

//删除用户
app.delete('/ids/:id', function (req, resp) {    //req表示请求，resp表示应答
    //url-encoded
    //form-data
    //json
    let founded = false;
    let index = 0;
    for (let ids of IDS) {
        if (ids.id === req.params.id) {
            IDS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没找到用户!' });
    }
    resp.end();
});

app.get('/hello', function (req, resp) {
    resp.send('hhh');
    resp.end();
});

app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});

