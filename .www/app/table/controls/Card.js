sap.ui.define(['sap/ui/core/Control'], Control => Control.extend('cc.ase.poker.table.controls.Card', {
  metadata: {
    properties: {
      suit: {
        type: 'string'
      },
      kind: {
        type: 'string'
      }
    }
  },

  _renderRank() {
    let rank = ''
    const kind = this.getKind()
    switch (kind) {
      case 'jack':
        rank = 'J'
        break
      case 'queen':
        rank = 'Q'
        break
      case 'king':
        rank = 'K'
        break
      case 'ace':
        rank = 'A'
        break
      default:
        rank = kind
    }
    return rank
  },

  _renderSuit() {
    const suit = this.getSuit()
    return suit === 'diamonds' ? 'diams' : suit
  },

  renderer(oRM, oControl) {
    oRM.write('<div')
    oRM.writeControlData(oControl)
    oRM.writeClasses()
    oRM.write(`><div class="card rank-${oControl._renderRank().toLowerCase()} ${oControl._renderSuit()}">`)
    oRM.write(`<span class="rank">${oControl._renderRank()}</span>`)
    oRM.write(`<span class="suit">&${oControl._renderSuit()};</span>`)
    oRM.write('</div></div>')
  }
}))
