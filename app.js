var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//1.
// express모듈은 함수라서 그 함수를 실행을하면(app뒷부분) app을 리턴하고 그 엡을만들고 할수있다.
//저 두줄은 이유가 있는것이 아니라 express를 만든사람이 이렇게 하라고 약속을 정해둔것이다.
//그래서 그냥 저형식대로 쓰자.

app.locals.pretty = true;
//9.
//temp.jade파일이 보기 좋아진다.
//검색 종류는 jade express code pretty

app.set('view engine', 'jade');
//6.
//express 엔진에게 적용시킨다 탬블릿을.
//jade라는 탬블릿 엔진을
//정해져있다.

app.set('views','./views');
//7.
//템블릿이 있는 디렉토리를 가르켜 주는 것.

app.get('/template', function(req,res){
  res.render('temp', {time:Date(), _title:'jade'});
})
//8.
//render는 send와 비슷한 표현.
//render는 사전적뜻으로 만들다 라는 뜻이 있다.
//render에 의해서 두번째 인자로 객체('',{}<-이부분)를 전달하는데 그 객체의 이름은 time이다.
//_title 이라는것도 _title이라는 변수에 접근한다는 것이다. 그래서 title안의 _title에 jade가 표현되는것을 볼수있다.

app.use(express.static('public'));
//4.
//정적인 파일이 위치할 디랙토리를 지정하는 기능.(통체로 이해하자.)
//public이라는 디렉토리를 정적인 파일이 위치하는 디렉토리로 하겠다.
//정적인 파일(이미지,문서등)을 쓸 수 있다.
//즉, 한번만들어지면 계속 같은 모습이다.
//정적인 파일들은 서버를 껏다 킬필요없다.

app.get('/form',function(req,res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
})
//13.
//form.jade의 안에있는 form에 값에 method에 값을 주지 않으면 기본 method값에
//get방식이 들어가게 된다.
//하지만 method방식에 method='post'로 하고 form_receiver를 생성하면
//찾을수 없다고 나오지만 데이터 전송은 재대로 되고 있다.
//post방식이면 url을 이용하여 데이터를 전송하지 않고, 우리가 눈으로 보이지 않는 방식으로
//데이터를 전송한다.

app.use(bodyParser.urlencoded({extended: false}))
//14.
//bodyParser를 연결하는데 이것은 post방식의 데이터가 있다면 req객체가 가지고 있지 않았던 body를
//이것이 추가해준다.
//넣어서 추가해준다.
app.post('/form_receiver',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
})
//15.
//같은 홈페이지를 보여주고싶다면 get방식, 아이디와 비밀번호 입력시 다른사람에게 보안적인 부분에서
//안전하게 하고싶다면 post방식을 사용해야한다.
//get방식에서 보내는 데이터가 많으면 url이 길어져 자동적으로 버리기 때문에 post방식이 적당하다.
//get방식은 쿼리스트링의 장점이고,post는 불필요하게 정보가 노출되지않고 용량이 큰 데이터를 보내는데 장점이있다.
//get방식은 익스프레스가 기본적 제공하고,post방식은 bodyParser라는 미들웨어를 로드해서 사용해야 한다.

app.get('/topic/:id',function(req,res){
  var topics = [
    'Javascript is....',
    'Nodejs is....',
    'Express is....'
  ];
  var output = `
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
  `
  res.send(output);
})
//10. 쿼리 스트링
//localhost:3000/topic?id=''로 가게 된다.
//지금부터 더욱더 많은 것들이 나오기 때문에 패턴보다는 규칙을 알아야한다(즉 문서를 보자.express명령어 사전)
//일단, 사용자가 /topic으로 들어왔을때 express는 get의 두번째 인자로 전달된 인자를 express가 호출하고
//express는 저 function을 호출하고 첫번째 인자의 값으로 req라는 객체를 전달하겠다고 정해져 있는 것이다.
//만약 2개의 값을 얻어 오려면
//res.send(req+query.id)+','+(req+query.name); 이다.
//결과 값은 localhost:3000/topic?id=''&name='' 이다.
//11.
//topics와 output은 나중에 데이터 베이스나 파일로 교체해서 사용하면 우리가 사용하는 홈페이지와 유사해 지는걸 볼수있다.
//12. 시멘틱(의미론적인)URL
//기본 /topic?id=''로 나왔다면 /topic/1로 하게 해준다.즉 pass방식으로 바꿔준다.
//기존 get에 '/topic'에 추가로 /:id를 추가하고
//send의 값에 있는 ${topics[req.query.id]}를 ${topics[req.params.id]}로 변경해주면 된다.

app.get('/topic/:id/:mode',function(req,res){
  res.send(req.params.id+','+req.params.mode)
})

app.get('/dynamic',function(req,res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>
  `
  res.send(output);
});
//5.
//동적으로 파일을 실행할경우, node를 껏다 켜야 한다.
//변수라는 것을 알려주기 위해서 ${}를 사용한다.

app.get('/route',function(req,res){
  res.send('Hello Router, <img src="/Heah.JPG">')
});

app.get('/',function(req, res){
  res.send('Hello home page');
});

//3.
//사용자가 접속할때 get방식이나 host방식으로 사용한다.
///hello라고 하면 home/hello라고 하는 홈페이지이다.
//function으로 인해 홈으로 접속하면 function을 실행시킨다.
//get의 함수의 인자로들어오는 함수(function)은 설명서에 형태가 정해져있다.
//첫번째 매게변수는 req, 두번째는 res가 들어온다.
//req는 사용자가 요청한것과 관련된 정보를 전달하는 것이고,
//res는 사용자가 요청한 정보에 대해서 응답을 할수있는 방법을 담고있는 응답에대한 객체를 담고있는
// 객체를 가져온다.
//send(); 도 설명서에 정해져있다.
//get이라고 하는 매소드를 라우터(길을찾는다.) 라고 부른다. 하는일을 라우팅이라고 한다.
//사용자(/)->get.('/');->send('----');
//사용자(/login)->get.('/login')->send('login please');
//html도 가능하다.

app.get('/login',function(req,res){
  res.send('<h1>login please</h1>');
});

app.listen(3000,function(){
  console.log('Connected 3000 port!');
});

//2.
//3000번 포트를 바라본다. funtion을 이용해 제대로 연결되었는지 확인할 수 있다.
