/**
 * Router类
 */
const url = require('url')

const Route = require('./route')
const Layer = require('./layer')
class Router{
  constructor(){
    //保存一层 里面有 layer实例
    this.stack = []
  }
  route(path){
    const route = new Route()
    //Layer保存着路径和 route中的dispatch方法
    const layer = new Layer(path,route.dispatch.bind(route))
    layer.route = route
    //将一层保存到stack中
    this.stack.push(layer)
    return route
  }
  get(path,...handle){
    const route = this.route(path)
    //把handle交给route处理
    route.get(...handle)
  }
  handle(req,res,out){
    let inx = 0
    const pathname = url.parse(req.url).pathname
    const stack = this.stack
    const next = ()=>{
      if(inx >= stack.length) return out(req,res)
      let layer = stack[inx++]
      if(layer.match(pathname)){
        layer.handle_request(req,res,next)
      }else{
        next()
      }   
    }
    next()
  }
}

module.exports = Router