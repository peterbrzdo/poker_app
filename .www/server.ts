import { TableService } from '../src/index'
import application from './application'

const tableService = TableService.getInstance()

const { PORT = 3000 } = process.env

const app = application(tableService)

app
  .listen(PORT, () => console.info(`Server is listening on http://localhost:${PORT}`))
  .on('error', ({ message }) => console.error('Error starting server', message))
