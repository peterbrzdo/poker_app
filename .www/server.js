import { Deck, Table } from '../index.js'
import application from './application.js'

const deck = new Deck()
const table = new Table(deck)

const { PORT = 3000 } = process.env

const app = application({ table })

app
  .listen(PORT, () => console.info(`Server is listening on http://localhost:${PORT}`))
  .on('error', ({ message }) => console.error('Error starting server', message))
