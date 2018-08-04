var querystring = require("querystring");


function start(response,postData ,jsonData) {
  console.log("Request handler 'start' was called.");
  keys=[]
  jsonLength = jsonData.entry.length
  for(i=0;i<jsonLength;i++){
  keys[i]=jsonData.entry[i].Attributes.国籍
  }

  // var body = '<html>'+
  //   '<head>'+
  //   '<meta http-equiv="Content-Type" content="text/html; '+
  //       'charset=UTF-8" />'+
  //       '</head>'+
  //       '<body>'+
  //       '<form action="/upload" method="post">'+
  //       '<textarea name="text" rows="20" cols="60"></textarea>'+
  //       '<input type="submit" value="Submit text" />'+
  //       '</form>'+
  //       '</body>'+
  //       '</html>';
  
      response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
      response.write(JSON.stringify(keys,undefined,1));
      response.end();
}

function upload(response,postData ,jsonData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
  response.write(//"You've sent the text: "+
    JSON.stringify(jsonData.entry[1].Attributes.人口,undefined,1));
  response.end();
}

exports.start = start;
exports.upload = upload;
