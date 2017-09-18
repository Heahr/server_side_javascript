//서버는 정보를 제공하는쪽 클라이언트는 정보를 요청하는쪽
//db는 데이터베이스 서버이다. 우리 app은 데이터베이스서버에 접속해서 정보를 요청하고
//db가 정보를 주게 된다.

var OrientDB = require('orientjs');

var server = OrientDB({
  host: 'localhost',
  //프로퍼티(변수)
  //이 코드가 동작하는 nodejs와 db서버가 같은 컴퓨터에 있다 라고 하는것이 localhost이다.
  //만약 opentutorials.org에 있다 라고하면 그것으로 바꿔주면 된다.
  port: 2424,
  username: 'root',
  password: 'qw940205'
});
var db = server.use('o2');
/*
db.record.get('#19:0').then(function (record){
  console.log('Loaded record:', record.title);
});
*/
//레코드는 하나의 행을 의미한다.
//레코드를 가져온다. #19:0(이것은 orientDB에서 주어진값으로 특별하게 레코드를 구분할 수 있는 값이다.)

//CREATE
/*
var sql = 'select from topic';
db.query(sql).then(function(results){
  console.log(results);
});
*/

/*
//하나의 행만 나옴.
var sql = 'select from topic where @rid=:id';
var param = {
//규칙이기 때문에 params로 해줘야 한다.
  params:{
    id:'#19:0'
  }
};
db.query(sql, param).then(function(results){
  //param이라는 위에있는 객체(var params)를 전달한다
  console.log(results);
});
*/

/*
//INSERT
var sql = "insert into topic (title, discription) values(:title, :desc)";
db.query(sql, {
  params:{
    title:'Express',
    desc:'Express is framework for web'
  }
}).then(function(results){
  console.log(results);
});
*/

/*
//UPDATE
var sql = "update topic set title=:title where @rid=:id";
db.query(sql,{params:{title:'Expressjs', id:'#20:0'}}).then(function(results){
  console.log(results);
});
//results값이 행이 얼마나 수정됫는지 보여준다.
*/

/*
//DELETE
var sql = "delete from topic where @rid=:id";
db.query(sql, {params:{id:'#20:0'}}).then(function(results){
  console.log(results);
});
*/

//READ

//CRUD
