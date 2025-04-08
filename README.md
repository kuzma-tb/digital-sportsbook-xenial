# Home task

To run the application, use:

```sh
npm install

npm run start
```

### 1. Fix a bug in the existing functionality

There is an issue in the application. When the user is placing bets, their balance is not updating.

Steps to reproduce:

1) Click on any SelectionButton to add a selection to Betslip
2) Input some value in the Stake field
3) Click "Place a bet"

Current result:

The user's balance remains unchanged.

Expected result:

The total stake amount is deducted from the user's balance.

### 2. Improve SelectionButton

Currently, clicking on SelectionButton adds the corresponding selection to Betslip.
And the button becomes active (selected).

Implement the following functionality:

When the user clicks on the active (selected) SelectionButton, remove the corresponding selection from Betslip,
and restore the button's initial state.

### 3. Introduce Websocket updates

Setup a WebSocket server.

Connect to the Websocket server from the client.

Broadcast a message from the server to the client within every 10 seconds.

The message to contain a set of random, each time unique values (odds).

On the client, use the received values to update the corresponding selections in the store.

Example:

```json
[
  {
    "id": 100010,
    "odds": 1.20
  },
  {
    "id": 100020,
    "odds": 2.50
  }
]
```

When the client receives the message above, it has to update the `odds` value of `100010` and `100020` selections in the store.

### 4. Optimize images (optional)

This is an optional bonus task.

Create a script to optimize the existing [images](./public/img).
You are free to choose a technology or tool for this.

## Other notes

This is not required, but if you wish to publish your what you have done on GitHub, please create a new branch for your
changes and raise a pull request for the `master` branch.

In this case, it would be also nice to have the commit history.
