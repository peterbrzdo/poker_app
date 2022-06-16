// Thrown when e.g. starting game with less than 2 players
export class InsufficientPlayersError extends Error {}

// Thrown when e.g. trying to check when it is not allowed
export class IllegalActionError extends Error {}

// Thrown when e.g. bet exceeds remaining cash
export class IllegalAmountError extends Error {}
