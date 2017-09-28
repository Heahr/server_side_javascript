var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views','./views_orientdb');
//이 디렉토리에 템블릿 파일을 넣겠다. 라고 알려주는 것.
app.set('view engine', 'jade');
//express에게 jade를 쓰겠다고 언급함.
var OrientDB = require('orientjs');

var server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'qw940205'
});
var db = server.use('o2');

app.get('/topic/add', function(req,res){
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(results){

  //fs.readdir('data',function(err,files){
    if(results.length === 0){
      console.log('there is no topic record.');
      res.status(500).send('Internal Server Error');
    }
    res.render('add',{topics:results});
    //localhost:3000/topic/new 생성
  });
});


app.post('/topic/add',function(req,res){
  var title = req.body.title;
  var discription = req.body.discription;
  var auther = req.body.auther;
  var sql = 'iNSERT INTO topic (title, discription, auther) VALUES(:title, :desc, :auther)';
  db.query(sql,{
    params:{
      title:title,
      desc:discription,
      auther:auther
    }
  }).then(function(results){
    res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
  });
});
//post로 들어올것에 반응한다.


app.get(['/topic','/topic/:id'],function(req,res){
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(results){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT FROM topic WHERE @rid=:rid';
      db.query(sql, {params:{rid:id}}).then(function(topic){
        res.render('view', {topics:results, topic:topic[0]});
      });
    }else{
      res.render('view', {topics:results});
    }
  });

//render 만들어서 뿌려준다?.
//view.jade안의 li값이 바뀌었는데 topcis.@rid로 값을 받아오지만 #이라고 하는 중요한 값이 있기 때문에
//.@rid 대신에 ['@rid']를 사용해 줄 수 있다. 그리고 그값으로 topci.title을 가져온다.
//li아래 특수문자를 그냥 문자로 사용해줄 수 있는 이스케이핑 이라는 것이 필요하다.(orientdb가 불편한점이다.)
// ' - ' 는 자바스크립트 에서 제공하고,
// ' encodeURIComponent '는 #을url에서 사용할수 있는 특수 기호로 바꿔서 return해준다. ex) #18:0 -> %2318%3A0
// %2318%3A0로 들어온다면 'topic/:id'로 걸려 function이 실행된다.
//행렬값으로 가져와 보여줘야


  /*
  //사용자가 topic으로 들어왔을때 data라고하는 디렉토리에 있는
  //파일들의 목록을 가져와서 그파일들의 이름으로
  //data에있는 리스트를 프로그래밍적으로 생성해주는 것이 fs에서 readdir이다.
  fs.readdir('data',function(err,files){
    //files는 파일들의 목록을 가져온다.
    //안에는 데이터라는 디렉토리안에 포함되어있는 각각의 파일들의 이름이 배열로 담겨있다.
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      fs.readFile('data/'+id, 'utf8', function(err,data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    } else {
      res.render('view',{topics:files, title:'Welcome', description:'Hello, Javascript'});
      //1.render(함수)는 템블릿 파일의 이름
      //2.템블릿 파일안으로 주입하고자 하는 데이터를 객체안에 담아서 주입하면된다.
      //즉,topics로 files를 전달한다.
      //궁극적으로, 위에서 views에 정의한 views_file을 실행시키기 때문에
      //그안에있는 view를 실행시키는 것이다.
      //두번째 인자,{'':''}즉 topics라는 속성으로 files를 전달한다.
      //view에서 topics를 사용하면 files를 만약 {topics:'Hi'}라고 했다면
      //view에 topics를 사용하면 Hi라고 출력되는 것이다.
    }
  })
  */
});
//post방식은 url로 직접치고 들어가면 반응하지 않는다.

app.listen(3000, function(){
  console.log('Connected, 3000port!');
});
//어떻게 라우터와 연결할것인가? 가 첫번째이다.
  //each topic in topics 즉 topic(변수를 따로 선언된거다.)안에
  //topics(files는 파일의 배열이 정의되어있다.)를 실행시킨다.
  //topic은 파일 이름이다.


//  app.get('/topic/:id',function(req,res){
//    var id = req.params.id;
//    //id값을 알아냈으니 id값의 해당하는 파일을 읽어서 가져오자!
//    fs.readdir('data',function(err,files){
//      //files안에는 data라는 디렉토리 안에 각각의 파일의 이름이 배열로 담겨있다.
//      if(err){
//        console.log(err);
//        res.status(500).send('Internal Server Error');
//      }
//      fs.readFile('data/'+id, 'utf8', function(err,data){
//        if(err){
//          console.log(err);
//          res.status(500).send('Internal Server Error');
//        }
//        res.render('view', {topics:files, title:id, description:data});
//        //id에서 data로 변경됫는데 이것은 파일안의 내용을 가져온것이다.
//        //files는 파일들의 이름이다.
//      })
//    })
//  //1.사용자가 topic/+id로 접속을 시도하면
//readdir을 통해서 data의 files를 가져옵니다.
//readFile을 통해서 data+id에 있는 값을 가져온다.
