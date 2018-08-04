const Koa = require('koa');
const app = new Koa();
const jsonData = require('./person_train.json')


// response
app.use(ctx => {
  ctx.body = JSON.stringify(jsonData,undefined,1);
});

app.listen(3000);
