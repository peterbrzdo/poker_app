# Poker App

This is the starting point of the application.

## Getting started

Please run `npm ci` and `npm start` to start the application.

You can then browse to <http://localhost:3000/>

## Code introduction

- `.www` folder contains the server and web application code

    There is no need to change anything in this folder.

- `lib` folder contains the code for the poker game

  - `lib/card.ts` contains the code for the `Card` class

      Can be used as it is.

  - `lib/deck.ts` contains the code for the `Standard52CardsDeck` class

      Can be used as it is.

  - `lib/player.ts` contains the code for the `Player` class

      Can be used as it is.

  - `lib/table-service.ts` contains the code for the `TableService` class

      This is the starting point for your code.

      You need to add your own code to this file to implement the full game logic.

      Look for any `// TODO: implement` comment.

      Also make sure to return the correct values and types for each method.

## Scripts

- `npm start`: builds the application and starts the application server

- `npm run start:dev`: starts the application server without pre-transpilation step

- `npm test`: runs the tests

- `npm run test:smoketest`: runs the smoke tests in `./smoketest/smoke.test.ts`

- `npm run test:coverage`: runs the tests including a coverage report

- `npm run lint`: runs static code checks

- `npm run watch`: starts and restarts the the application server on any code changes
