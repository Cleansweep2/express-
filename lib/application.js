/**
 * 第二版 Es6版本
 * Application类
 */
const http = require('http')

const Router = require('./router')
class Application{
  constructor(){
    this.router()
  }
  router(){ //创建路由实例的方法
    this._router = new Router()
  }
  get(path,...handle){
    //调用router的get方法
    this._router.get(path,...handle)
  }
  listen(){ 
    //里面解决不了的交给外部的done解决
    const done = (req,res)=>{
      res.end(`${req.url}Not Fond`)
    }
    const server = http.createServer((req,res)=>{
      return this._router.handle(req,res,done)
    })
    return server.listen.call(server,...arguments)
  }
}

module.exports = Application