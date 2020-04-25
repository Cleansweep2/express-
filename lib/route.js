/**
 * Route类
 */
const Layer = require('./layer')
class Route{
  constructor(){
    //保存着函数的layer
    this.stack = []
  }
  get(...handle){
    for(let i=0;i<handle.length;i++){
      const layer = new Layer('/',handle[i])
      this.stack.push(layer)
    }
  }
  dispatch(req,res,out){
    let inx = 0
    const stack = this.stack
    const method = req.method.toLowerCase()
    const next = ()=>{
      if(inx >= stack.length) return out()
      let layer = stack[inx++]
      if(method === 'get'){
        layer.handle(req,res,next)
      }
    }
    next()
  }
}

module.exports = Route