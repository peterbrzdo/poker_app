sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/m/MessageBox',
  'cc/ase/poker/table/util/cookies',
  'cc/ase/poker/table/util/poker'
], (
  Controller,
  MessageBox,
  cookies,
  poker
) => {
  return Controller.extend('cc.ase.poker.table.controller.App', {
    onInit(...args) {
      Controller.prototype?.onInit?.apply(this, args)
      this._init()
    },

    async _init() {
      // get current table data
      await this._updateModel()
      // join table if not already joined
      await this._joinTable()
      // start polling for table updates
      setInterval(() => this._updateModel(), 1000)
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

    async _updateModel() {
      try {
        const player = this._getPlayer()
        const { currentPlayer, players, communityCards, playerCards } = await poker.fetchTable()
        const view = this.getView()
        const model = view.getModel()
        model.setProperty('/', Object.assign({}, model.getProperty('/'), {
          player,
          currentPlayer,
          players,
          communityCards,
          playerCards,
          enabled: currentPlayer === player.name
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
          await poker.joinTable()
        }
      } catch ({ message, stack }) {
        console.error(stack)
        MessageBox.error(message)
      }
    },

    async action(action, args) {
      try {
        await poker.performAction(action, args)
      } catch ({ message, stack }) {
        console.error(stack)
        MessageBox.error(message)
      }
    }
  })
})
