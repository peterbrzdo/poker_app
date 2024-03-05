import type { ErrorRequestHandler } from "express"
import { TableService } from '../src/index'
import express from 'express'
import auth from './routes/auth'
import table from './routes/table'

export default (tableService: TableService) => {
  const app = express()

  app.use('/login', express.static('.www/app/login'))

  app.use(auth())

  app.use('/', express.static('.www/app/table'))

  app.use('/api/v1', table(tableService))

  const errorHandler: ErrorRequestHandler = ({ stack, message, code = 500 }, req, res, next) => {
    console.error(stack)
    res
      .status(code)
      .set('Content-Type', 'text/plain')
      .send(message)
  }
  app.use(errorHandler)

  return app
}
