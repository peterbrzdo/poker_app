sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageBox',
  'cc/ase/poker/table/util/cookies',
  'cc/ase/poker/table/util/table'
], (
  Controller,
  MessageBox,
  cookies,
  table
) => {
  return Controller.extend('cc.ase.poker.table.controller.App', {
    onInit(...args) {
      Controller.prototype?.onInit?.apply(this, args)
      this._init()
    },

    async _init() {
      let payload = await table.fetch()
      this._updateModel(payload)

      // join table if not already joined
      await this._joinTable()

      this._subscribeServerEvent()
    },

    _subscribeServerEvent() {
      if (!this.events) {
        this.events = new EventSource('/api/v1/events')

        this.events.onmessage = (event) => {
          const payload = JSON.parse(event.data)
          this._updateModel(payload)
        }

        this.events.onopen = () => {
          console.log('Opened event stream')
        }
      }
    },

    _getPlayer() {
      let player = null
      try {
        const jwt = cookies.get('jwt')
        const { user_id, user_name } = JSON.parse(atob(jwt.split('.')[1]))
        player = { id: user_id, name: user_name }
      } catch ({ stack }) {
        console.error(stack)
      }
      return player
    },

    _updateModel(payload) {
      try {
        const player = this._getPlayer()
        const { state, currentPlayer, players, bets, pot, communityCards, playerCards, winner, winnerHand } = payload
        const view = this.getView()
        const model = view.getModel()
        model.setProperty('/', Object.assign({}, model.getProperty('/'), {
          state,
          player,
          currentPlayer,
          players,
          bets: bets ? bets.map(([id, bet]) => {
            const name = players.find(p => p.id === id)?.name
            return { name, bet }
          }) : [],
          pot,
          communityCards,
          playerCards,
          winner,
          winnerHand,
          start: {
            visible: player.id === players?.[0]?.id,
            enabled: (state === 0 || state === 5) && (players.length > 1)
          },
          actions: {
            enabled: currentPlayer?.id === player.id
          }
        }))
      } catch ({ message, stack }) {
        console.error(stack)
        MessageBox.error(message)
      }
    },

    async _joinTable() {
      try {
        const view = this.getView()
        const model = view.getModel()
        const { player, players } = model.getProperty('/')
        if (!players.find(({ name }) => name === player.name)) {
          await table.join()
          const payload = await table.fetch()
          this._updateModel(payload)
        }
      } catch ({ message, stack }) {
        console.error(stack)
        MessageBox.error(message)
      }
    },

    async start() {
      try {
        await table.start()
      } catch ({ message, stack }) {
        console.error(stack)
        MessageBox.error(message)
      }
    },

    async action(type, amount) {
      try {
        const action = {
          type
        }
        if (type === 'RAISE') {
          action.amount = amount
        }
        await table.action(action)
      } catch ({ message, stack }) {
        console.error(stack)
        MessageBox.error(message)
      }
    }
  })
})
