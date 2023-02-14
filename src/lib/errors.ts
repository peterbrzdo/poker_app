// Thrown when e.g. trying to check when it is not allowed
export class IllegalActionError extends Error { }

// Thrown when e.g. bet exceeds remaining cash
export class IllegalAmountError extends Error { }

// Thrown when not enough players have joined the table
export class NotEnoughPlayers extends Error { }
