import { State, Suit, Rank, Action, Deck, PlayerState, ActionType } from './types'
import Player from './player'
import Card from './card'
import Standard52CardsDeck from './deck'
import { IllegalActionError, IllegalAmountError, NotEnoughPlayers } from './errors'


export default class TableService {
  private _state: State;
  private _players: Player[] = [];
  private _cards: Card[] = [];
  private _standard52CardsDeck : Standard52CardsDeck;
  private _current_player: number = 0;

  constructor(private deck: Deck) {
    this._state = State.OPEN
    this._standard52CardsDeck = new Standard52CardsDeck();
    this._cards = this._standard52CardsDeck.cards;
    this._current_player = 0;
  }

  get state(): State {
    // TODO: implement
    //return State.ENDED
    return this._state;
  }

  get players(): Player[] {
    // TODO: implement
    // no players yet
    // return []
    //return [
    //  new Player('al-capone', 'Al Capone', 95),
    //  new Player('pat-garret', 'Pat Garret', 95),
    //  new Player('wyatt-earp', 'Wyatt Earp', 95)
    //]
    return this._players;
  }

  getPlayerCards(playerId: string): Card[] {
    // TODO: implement
    // no player cards yet
    //return []
    // return [
    //   new Card(Suit.Spades, Rank.Ace),
    //   new Card(Suit.Hearts, Rank.Ace)
    // ]
    this._players.forEach( player => {
      if ( player.id == playerId ) {
        return player.cards;
      }

    });
    return [];
  }

  get communityCards(): Card[] {
    // TODO: implement
    // no community cards yet
    // return []
    if (this._state == State.PRE_FLOP)
      return [];
    else return [
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Clubs, Rank.King)
    ]
  }

  get currentPlayer(): Player {
    // TODO: implement
    // no current player yet
    // return null
    //return new Player('al-capone', 'Al Capone', 100)
    if (this._current_player == this._players.length) {
      this._current_player = 0;
    }
    console.log(this._players[this._current_player]);
    return this._players[this._current_player];
  }

  get bets(): Map<string, number> {
    // TODO: implement
    // no bets yet
    // return new Map()
    // return new Map([
    //   ['al-capone', 10],
    //   ['pat-garret', 20],
    //   ['wyatt-earp', 5]
    // ])
    const map = new Map<string, number>();
    this._players.forEach(player => {
      map.set(player.id, player.cash);
    });
    return map;
  }

  get pot(): number {
    // TODO: implement
    return 0
  }

  get winner(): Player | null {
    // TODO: implement
    // no winner yet
    // return null
    //return new Player('al-capone', 'Al Capone', 95)
    return null;
  }

  get winnerHand(): Card[] {
    // TODO: implement
    // no winner hand yet
    // return []
    return [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King)
    ]
  }

  start() {
    // TODO: implement
    let counter = 0;
    this._state = State.PRE_FLOP
    if ( this._players.length < 1 ) {
      //console.log(this._players.length);
      throw new NotEnoughPlayers;
    }
    else {
      this._players.forEach( player => {
        player.state = PlayerState.Active;
        player.addCard(this._cards[counter]);
        counter++;
      });
    }
  }

  addPlayer({ id, name }: { id: string, name: string }) {
    // TODO: implement
    this._players.push(new Player( id, name, 100))
    return {id: id, name: name}
  }

  performAction(action: Action) {
    // TODO: implement
    switch(action.type){
      case ActionType.CHECK:
        console.log('performAction CHECK..');
        this._current_player++;
        break;
      case ActionType.FOLD:
        console.log('performAction FOLD..');
        this._current_player++;
        break;
      case ActionType.CALL:
        console.log('performAction CALL..');
        this._current_player++;
        break;

    }
  }
}

