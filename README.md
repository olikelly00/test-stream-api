# Graph Streaming API

A streaming API for use with Graph, usually through https://stream.techmap.app

## Installation

```bash
yarn install
```

## Running

```
npm run start
```

## Endpoints

### POST /chat
A chat endpoint. Expects a JSON object containing `messages`, `personality`, and `user`.
Returns a stream of a response message to a conversation.


### POST /coach
A coaching endpoint. Expects a JSON object containing `messages`, `personality`, and `user`.
Returns a stream of a response message giving feedback on a conversation.