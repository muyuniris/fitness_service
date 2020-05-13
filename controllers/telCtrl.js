const AV = require('leancloud-storage');

// AV 初始化
AV.init({
  appId: "1zBlck68kuG0o8MQor7csFhD-gzGzoHsz",
  appKey: "FlswRu8e1Kh3gMufhjBNYW5i",
  serverURL: "https://1zblck68.lc-cn-n1-shared.com"
});

module.exports = {
  getCode: (req, res) => {
    console.log("收到手机号码:", req.body.tel);

    // 发送短信，使用预设的模板和签名
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: req.body.tel,  // 目标手机号
      sign:'沐昀工作室'                // 控制台预设的短信签名
    }).then(function(){
      //调用成功
      res.json({
        msg: "获取成功",
        code: 200
      })
    }, function(err){
      //调用失败
      res.json({
        msg: "获取失败",
        code: 0
      })
    });
  },

  confirm: (req,res) => {
    console.log("收到手机号码及验证码:", req.body);
    AV.Cloud.verifySmsCode(req.body.code, req.body.tel).then(function(){
      //验证成功
      res.json({
        msg: "验证成功",
        code:200
      })
    }, function(err){
        //验证失败
        res.json({
          msg: "验证失败",
          code: 0
        });
    });
  }
}