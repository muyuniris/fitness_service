const AlipaySdk = require('alipay-sdk').default;;
const fs = require("fs");
const AlipayFormData = require("alipay-sdk/lib/form").default;

const alipaySdk = new AlipaySdk({
  appId: '2016101700711673',
  privateKey: fs.readFileSync('./config/pem/app_private_key.pem', 'ascii'),
  gateway: 'https://openapi.alipaydev.com/gateway.do',
  alipayPublicKey: fs.readFileSync('./config/pem/alipay_public_key.pem', 'ascii'),
  signType: 'RSA2'
});

module.exports = {
  pay: async (req, res) => {
    console.log(req.body);
    var no=new Date().getTime();
    var time = encodeURIComponent(req.body.time);
    var money = req.body.money?req.body.money:0;
    const formData = new AlipayFormData();
    formData.addField('notifyUrl', 'http://localhost:8080/alipay/notify');
    formData.addField('returnUrl', 'http://192.168.3.26:8080/home/notify');
    formData.addField('quitUrl', 'http://192.168.3.26:8080/home/cancel');
    formData.addField('bizContent', {
    outTradeNo: req.body.time+'_'+no+"_"+money,
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: req.body.price+'.00',
    subject: req.body.subject,
    passbackParams:time,
    body: '商品详情',
    });

const result = await alipaySdk.exec(
  'alipay.trade.wap.pay',
  {},
  { formData: formData },
);

// result 为 form 表单
console.log(result);

    // result 为 form 表单
    // console.log(result);
    res.send(result)
  },

  get:(req,res)=>{
    console.log("收到请求")
    // res.send("success");
  },

}
