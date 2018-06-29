var koa = require('koa')
var app = new koa()

var asyncIO = function(){
  return new Promise((resolve)=>{
    setTimeout(function(){
      resolve()
    }, 500)
  })
}
var mid = function(){
  return function *(next){
    this.body = 'mark'
    yield next
    this.body += ' done'
  }
}
app.use(mid())
app.use(function *(next){
  yield asyncIO()
  this.body += ' saved'
  yield next
})
console.log('service start port:3000')
app.listen(3000)