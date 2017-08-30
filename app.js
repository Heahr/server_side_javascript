var express = require('express');
var app = express();

//1.
// express모듈은 함수라서 그 함수를 실행을하면(app뒷부분) app을 리턴하고 그 엡을만들고 할수있다.
//저 두줄은 이유가 있는것이 아니라 express를 만든사람이 이렇게 하라고 약속을 정해둔것이다.
//그래서 그냥 저형식대로 쓰자.

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
