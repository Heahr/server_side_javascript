//npm init 으로 json파일 생성
var express = require('express')
var app = express()
//post방식 사용할떄
var bodyParser = require('body-parser')
app.listen(3000,function() {
    console.log("Start! express server on prot 3000");
});

//요청을 반응하게 하겠다. ex>main.html안의 main.js선언
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

//비동기 동작이라 먼저나옴 아래함수는 동기적인것이라 먼저 실행되고 비동기가 마지막에 실행된다.(app.listen)
//__dirname 루트설정
//url routing
console.log('end of server conde....')

app.get('/', function(req,res) {
  res.sendFile(__dirname + "/public/main.html")
});

app.get('/main', function(req,res) {
  console.log('test');
  res.sendFile(__dirname + '/public.main.html')
});

app.post('/email_post', function(req,res) {
  //console.log(req.body.email)
  //res.send("<h1>welcome " + req.body.email + "</h1>")

  //email.ejs에다가  req.body.email값을 치환해서 email값에 보내준다.
  //render는 데이터와 html간의 결합된 값을 클라이언트에 내려줄때.
  res.render('email.ejs', {'email' : req.body.email})
});

app.post('/ajax_send_email', function(req,res) {
  console.log(req.body.email)
  var responseData = {'result' : 'ok', 'email' : req.body.email};
  res.json(responseData)
})
