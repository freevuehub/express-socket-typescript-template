import { Request, Response } from 'express'
import App from './config/express'

const { app, io, port } = new App()

app.get('/init', () => {
  io.on('connection', () => {
    console.log('a user connected')
  })
})
app.get('/', (_: Request , response: Response) =>{
  response.send({ 'message': 'Server Start!' })
})

app.listen(port, () => {
  console.log(`http://localhost:${port} Start!`)
})
