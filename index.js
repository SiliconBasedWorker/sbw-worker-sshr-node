const sbw_finger_ssh = require("./sbw-finger-ssh");
const sbw_finger_wol = require("./sbw-finger-wol");

const io = require("socket.io-client");

const config = require("./config.json");

const socket = io(config.aspherAddr);

socket.on("connect", () => {
  console.log("connected");
  socket.emit("register", {
    deviceName: config.deviceName,
    token: config.token,
    authPass: config.authPass,
    deviceType: config.deviceType || "server",
    character: config.character || "worker",
    on: [sbw_finger_ssh.dataStruct, sbw_finger_wol.dataStruct],
  });
  sbw_finger_ssh.setupSSHSocketIO(socket);
  sbw_finger_wol.setupWOLSocketIO(socket);
});
