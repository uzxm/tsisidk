
const RPC = require("discord-rpc");
const express = require("express");
const client = new RPC.Client({ transport: "ipc" });

const clientId = "YOUR_DISCORD_APP_CLIENT_ID"; // Replace this with your app's client ID
let currentTrack = "Nothing playing";

client.on("ready", () => {
  console.log("Connected to Discord");
  setActivity();
  setInterval(setActivity, 15e3);
});

function setActivity() {
  client.setActivity({
    details: `Listening to ${currentTrack}`,
    largeImageKey: "music",
    largeImageText: "Personal Spotify",
    instance: false,
  });
}

client.login({ clientId });

const app = express();
app.use(express.json());
app.post("/update", (req, res) => {
  const { track } = req.body;
  if (track) currentTrack = track;
  res.sendStatus(200);
});

app.listen(3020, () => {
  console.log("Listening on http://localhost:3020");
});
