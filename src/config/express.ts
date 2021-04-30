import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Socket } from 'socket.io'

dotenv.config()

class App {
  public app: express.Application
  public io: Socket
  public port: number | string

  constructor() {
    this.app = express()
    this.io = require('socket.io')()
    this.port = process.env.PORT || 9000

    this.corsInit()
  }

  public corsInit() {
    const whitelist = process.env.FRONT_ORIGIN?.split(',')
    const corsOptions = (request: any, callback: Function) => {
      let corsOptions;

      if (whitelist && whitelist.indexOf(request.header('Origin')) !== -1) {
        corsOptions = { origin: true, credentials: true, }
      } else {
        corsOptions = { origin: false }
      }

      callback(null, corsOptions)
    }

    this.app.use(cors(corsOptions))
  }
}

export default App