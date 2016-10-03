# Writeboard

A collaborative real-time whiteboard and chatroom web-app. Navigate to https://writeboard-app.herokuapp.com/ to demo.

#### To run locally:

Open <b>scripts/init.js</b> and comment out:

```var socket = io(location.origin);```

Then, uncomment:

```var socket = io('http://localhost:3000');```

Navigate to the project root and spin up the local node server with `node app.js`,
then start up a local instance of the client with `gulp serve`.
