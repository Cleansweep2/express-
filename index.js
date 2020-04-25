const express = require('./lib/express')

const app = express()

app.get('/',(req,res,next)=>{
  console.log('1111111')
  next()
},(req,res,next)=>{
  console.log('2222222')
  next()
})

app.get('/',(req,res)=>{
  res.end('33333333')
})

app.listen(3000,()=>{
  console.log('进入了')
})
