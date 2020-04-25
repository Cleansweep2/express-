/**
 * Layer类
 */

 class Layer{
   constructor(path,handle){
    this.path = path
    this.handle = handle
   }
   match(pathname){
    if(pathname == this.path){
      return true
    }else{
      return false
    }
   }
   handle_request(req,res,out){
     this.handle(req,res,out)
   }
 }


 module.exports = Layer