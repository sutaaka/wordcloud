var querystring = require("querystring");
const pug = require("pug");
// const jsonData = require("./person_train.json");

function getWordList({ entry }) {
  const contry = entry.reduce((accumulator, currentValue) => {
    const name = currentValue.Attributes["国籍"][0];
    const weight = (accumulator.get(name) || 0) + 1;
    if (name) {
      accumulator.set(name, weight);
    }
    return accumulator;
  }, new Map());

  return Array.from(contry.entries()).map(([text, weight], index) => {
    return { text, weight, link: `http://localhost:8888?word=${text}` };
  });
}

function start(response, postData, jsonData) {
  console.log("Request handler 'start' was called.");

  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.write(
    pug.renderFile("index.pug", {
      pageTitle: "wordcloud",
      word_list: JSON.stringify(getWordList(jsonData)),
      wh: JSON.stringify({
        classPattern: null,
        colors: [
          "#800026",
          "#bd0026",
          "#e31a1c",
          "#fc4e2a",
          "#fd8d3c",
          "#feb24c",
          "#fed976",
          "#ffeda0",
          "#ffffcc"
        ],
        width: 2000,
        height: 1000,
        autoResize: true,
        fontSize: { from: 0.1, to: 0.02 }
      })
    })
  );

  response.end();
}

function upload(response, postData, jsonData) {
  console.log(JSON.stringify(wh));
  response.end();
}

exports.start = start;
exports.upload = upload;
