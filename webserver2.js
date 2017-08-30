const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// var server = http.createServer(); //서버라는 객체를 이용할수있다. 아래에 더 나와야 한다.
// server.listen(); // listen 과 같다.
//포트는 여러 서버들중에 어떤것을 사용할것인가에 대한 식별자 이다.
//웹서버를 만들어서 어디 포트에서 사용하게 할것인가??
//그래서 listen을 이용해서 리슨 안의 port 객체를 이용하여 넣고(listen(port,hostname))
//어떤 ip를 타고오는 사용자를 수용할것인가는 hostname을 이용해서 넣어준다.
//var server = http:createServer(function(req,res){
//
//});
//server.listen(port, hostname, function(){
//  console.log('Server running at http://${hostname}:${port}/');
//});
//이와 같은 함수이고, 축약된것들이 많기때문이다.
//res 는 응답하겠다 라는 뜻이다. 즉
