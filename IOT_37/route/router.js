const express = require("express");
const deviceCtrl = require("../controller/deviceCtrl");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json()); //将数据转换成json
router.use(bodyParser.urlencoded({ extended: false })); //配置post的body模块

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//阿里云


router.put("/led", deviceCtrl.update);
router.get("/led", deviceCtrl.GETLightStatus);
//账号验证
router.post('/pwd', deviceCtrl.PWD);
//设备查询
router.get('/users', deviceCtrl.USER);
router.get('/users/:id', deviceCtrl.USERID);
//用户查询
router.get('/ids', deviceCtrl.dev);
router.get('/ids/:id', deviceCtrl.devid);
//添加
router.post('/user', deviceCtrl.userAdd);
router.post('/ids', deviceCtrl.devAdd);
//修改
router.put('/user', deviceCtrl.userUpadte);
router.put('/ids', deviceCtrl.devUpdate);
//删除
router.delete('/users/:id', deviceCtrl.userDelete);
router.delete('/ids/:id', deviceCtrl.devDelete);


//设备

router.put("/led/:id/:status", deviceCtrl.report);

router.put("/wd/:id/:value", deviceCtrl.wd);
router.put("/sd/:id/:value", deviceCtrl.sd);
//空调
router.put("/ac/:id/:status", deviceCtrl.ac);
//router.put("/ac", deviceCtrl.acupdate);
//router.get("/ac", deviceCtrl.GETPowerSwitch);
//风扇
router.put("/fs/:id/:status/:status2", deviceCtrl.fs);
// router.put("/fs", deviceCtrl.fsupdate);


module.exports = router;