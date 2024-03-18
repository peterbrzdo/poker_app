import { TableService, Standard52CardsDeck } from '../src/index'
import application from './application'

const tableService = new TableService(new Standard52CardsDeck())

const { PORT = 3000 } = process.env

const app = application(tableService)

app
  .listen(PORT, () => console.info(`Server is listening on http://localhost:${PORT}`))
  .on('error', ({ message }) => console.error('Error starting server', message))
