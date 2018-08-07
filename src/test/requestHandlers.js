var querystring = require("querystring");
const pug = require('pug')


function start(response,postData ,jsonData) {
  console.log("Request handler 'start' was called.");
  var keys = []
  var jsonLength = jsonData.entry.length
  var weight = []
  for(i=0;i<jsonLength;i++){
    weight[i] = 0
  }
  var  l = 0
  var  k = 1
  keys[0] = jsonData.entry[0].Attributes.国籍[0]
    for(i=0;i<jsonLength;i++){ 
     for(j=0;j<k;j++){
       if(jsonData.entry[i].Attributes.国籍[0] === keys[j] && jsonData.entry[i].Attributes.国籍 !== undefined){
//        console.log(j + "もと" + jsonData.entry[i].Attributes.国籍[0] + "keys" + keys[j])
         weight[j]=weight[j]+1
        l++
       }
    }
    if(l === 0 && jsonData.entry[i].Attributes.国籍[0] !== undefined){
    keys[k] = jsonData.entry[i].Attributes.国籍[0]
    k++
    }
    l = 0
    }
    
  for(i=0;i<k;i++){
    weight[i] = weight[i] + 1
  }

  const word_list = [
  { text: 'クラウド', weight: 19 }
  ,{ text: 'IBM Bluemix', weight: 14, link: 'http://bluemix.net/' }
  ,{ text: 'マンホール', weight: 12, link: 'http://manholemap.juge.me/' }
  ,{ text: 'ねっぴ', weight: 9, link: 'http://neppi.co/' }
  ,{ text: 'ツイートマッパー', weight: 9, link: 'http://tweetsmapper.juge.me/' }
  ]

  const wh = {width: 500, height: 200}
  // var body = '<html>'+
  //   '<head>'+
  //   '<meta http-equiv="Content-Type" content="text/html; '+
  //       'charset=UTF-8" />'+
  //       '</head>'+
  //       '<body>'+
  //       '<form action="/upload" method="post">'+
  //       '<textarea name="text" rows="20" cols="60"></textarea>'+
  //       '<input type="submit" value="Submit text" />'+
  //       '</form>'                            +
  //       '</body>'+
  //       '</html>';
      console.log(JSON.stringify(wh))
      response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
      response.write(pug.renderFile("index.pug",{
        pageTitle: "wordcloud",
        word_list: JSON.stringify(word_list) ,
        wh :JSON.stringify(wh)
      }));
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
