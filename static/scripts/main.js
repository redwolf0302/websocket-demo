const worker = new Worker("./scripts/webworker.js");
worker.addEventListener("error", e => {
  console.error(e);
});
worker.addEventListener("messageerror", e => {
  console.error(e);
});
worker.addEventListener("message", ({ data }) => {
  switch (data.command) {
    case 4:
      app.isConnected = true;
      app.loadUsers();
      app.addUser(app.userId, app.nick);
      break;
    case 5:
    case 6:
      app.isConnected = false;
      app.removeUser(app.userId);
      break;
    case 7:
      let message = data.data;
      switch (message.opcode) {
        case OPCODES.GROUP:
          app.messages.push(message.payload);
          break;
        case OPCODES.WHOAMI:
          app.addUser(message.payload.userId, message.payload.nick);
          break;
        case OPCODES.CLIENT_LEFT:
          app.removeUser(message.payload.userId);
          break;
        case OPCODES.COMMAND:
          app.messages.push(message.payload);
          break;
      }
      break;
  }
});
const DEFAULT_AVATARS = [
  "T1j.DTByJT1RCvBVdK.jpg",
  "T18.YTByhT1RCvBVdK.jpg",
  "T1xodTByhT1RCvBVdK.jpg",
  "T1ykDTByxT1RCvBVdK.jpg",
  "T1Y5YTByhT1RCvBVdK.jpg",
  "T1T5YTByJT1RCvBVdK.jpg",
  "T1DkYTByxT1RCvBVdK.jpg",
  "T1d5YTByhT1RCvBVdK.jpg",
  "T15oYTByJT1RCvBVdK.jpg",
  "T1r.YTByxT1RCvBVdK.jpg",
  "T15kYTByJT1RCvBVdK.jpg",
  "T1.oYTByJT1RCvBVdK.jpg",
  "T1BkYTByJT1RCvBVdK.jpg",
  "T1bkYTByJT1RCvBVdK.jpg",
  "T1U.YTByhT1RCvBVdK.jpg",
  "T18kYTByJT1RCvBVdK.jpg",
  "T16.CTByJT1RCvBVdK.jpg",
  "T1dkYTByJT1RCvBVdK.jpg",
  "T1.kYTByJT1RCvBVdK.jpg",
  "T175YTByJT1RCvBVdK.jpg",
  "T1.5YTByJT1RCvBVdK.jpg",
  "T1a.YTByJT1RCvBVdK.jpg",
  "T1TkYTByJT1RCvBVdK.jpg",
  "T1JoYTByJT1RCvBVdK.jpg",
  "T1MkYTByxT1RCvBVdK.jpg",
  "T1voYTByJT1RCvBVdK.jpg",
  "T1uoYTByhT1RCvBVdK.jpg",
  "T1J5YTByhT1RCvBVdK.jpg",
  "T1vkYTByJT1RCvBVdK.jpg",
  "T1D5YTByJT1RCvBVdK.jpg",
  "T1IkYTByhT1RCvBVdK.jpg",
  "T1soYTByJT1RCvBVdK.jpg",
  "T1U5YTByhT1RCvBVdK.jpg",
  "T1NoYTByJT1RCvBVdK.jpg",
  "T1wkxTByZT1RCvBVdK.jpg",
  "T10.YTByJT1RCvBVdK.jpg",
  "T1GkYTByhT1RCvBVdK.jpg",
  "T1g5YTByJT1RCvBVdK.jpg",
  "T1r5YTByJT1RCvBVdK.jpg",
  "T1o.YTByJT1RCvBVdK.jpg",
  "T1jkYTByJT1RCvBVdK.jpg",
  "T1J.YTByJT1RCvBVdK.jpg",
  "T1N5YTByJT1RCvBVdK.jpg",
  "T1v.YTByJT1RCvBVdK.jpg",
  "T1a5YTByJT1RCvBVdK.jpg",
  "T19kYTByJT1RCvBVdK.jpg",
  "T1boYTByJT1RCvBVdK.jpg",
  "T1GoYTByJT1RCvBVdK.jpg",
  "T1xoYTByhT1RCvBVdK.jpg",
  "T1p.CTByJT1RCvBVdK.jpg",
  "T1f.YTByhT1RCvBVdK.jpg",
  "T13kYTByhT1RCvBVdK.jpg",
  "T1UkxTByhT1RCvBVdK.jpg",
  "T105YTByJT1RCvBVdK.jpg",
  "T1B.YTByJT1RCvBVdK.jpg",
  "T1gkYTByJT1RCvBVdK.jpg",
  "T13.YTByJT1RCvBVdK.jpg",
  "T1o5YTByJT1RCvBVdK.jpg",
  "T1QoYTByJT1RCvBVdK.jpg",
  "T1UkYTByhT1RCvBVdK.jpg",
  "T1okYTByJT1RCvBVdK.jpg",
  "T1v5YTByJT1RCvBVdK.jpg",
  "T1akYTByJT1RCvBVdK.jpg",
  "T1SoYTByhT1RCvBVdK.jpg",
  "T1b.YTByJT1RCvBVdK.jpg",
  "T1BoYTByJT1RCvBVdK.jpg",
  "T1l.YTByJT1RCvBVdK.jpg",
  "T1p5CTByJT1RCvBVdK.jpg",
  "T1V5YTByJT1RCvBVdK.jpg",
  "T11oYTByhT1RCvBVdK.jpg",
  "T1pkZTByhT1RCvBVdK.jpg",
  "T1x.YTByhT1RCvBVdK.jpg",
  "T1I.YTByJT1RCvBVdK.jpg",
  "T1ToYTByJT1RCvBVdK.jpg",
  "T135YTByhT1RCvBVdK.jpg",
  "T1fkYTByhT1RCvBVdK.jpg",
  "T1R.CTByJT1RCvBVdK.jpg",
  "T1ooYTByhT1RCvBVdK.jpg",
  "T1hoYTByhT1RCvBVdK.jpg",
  "T1QkYTByJT1RCvBVdK.jpg",
  "T10kYTByhT1RCvBVdK.jpg",
  "T1HoYTByJT1RCvBVdK.jpg",
  "T1Z.CTByJT1RCvBVdK.jpg",
  "T1SkYTByhT1RCvBVdK.jpg",
  "T14tJTBjZT1RCvBVdK.jpg",
  "T125CTByJT1RCvBVdK.jpg",
  "T1O.YTByJT1RCvBVdK.jpg",
  "T1b5YTByJT1RCvBVdK.jpg",
  "T1r.ZTByhT1RCvBVdK.jpg",
  "T1x5YTByhT1RCvBVdK.jpg",
  "T1H.YTByJT1RCvBVdK.jpg",
  "T1I5YTByhT1RCvBVdK.jpg",
  "T1joYTByJT1RCvBVdK.jpg",
  "T17yJTBjhT1RCvBVdK.jpg",
  "T1z5YTByJT1RCvBVdK.jpg",
  "T1R5CTByJT1RCvBVdK.jpg",
  "T1HkYTByJT1RCvBVdK.jpg",
  "T1f5YTByhT1RCvBVdK.jpg",
  "T1ZoCTByJT1RCvBVdK.jpg",
  "T1UoYTByhT1RCvBVdK.jpg"
];
const DEFAULT_AVATARS_LEN = DEFAULT_AVATARS.length;
const OPCODES = {
  GROUP: 1,
  COMMAND: 2,
  WHOAMI: 3,
  CLIENT_LEFT: 4
};
const COMMANDS = {
  TESTING: 1
};
let testingInterval = 0;
let app = new Vue({
  el: "#app-view",
  data: {
    isConnected: false,
    testing: false,
    userId: null,
    nick: null,
    message: null,
    messages: [],
    users: []
  },
  methods: {
    connect: function() {
      axios
        .post("/api/login", null, {
          withCredentials: true
        })
        .then(() => {
          worker.postMessage({
            command: 1,
            data: { userId: app.userId, nick: app.nick }
          });
        });
    },
    disconnect: function() {
      worker.postMessage({ command: 2 });
    },
    loadUsers: function() {
      axios
        .get("/api/users", {
          withCredentials: true
        })
        .then(res => {
          this.users = res.data;
        });
    },
    addUser: function(userId, nick) {
      this.users.push({
        userId: userId,
        nick: nick
      });
    },
    removeUser: function(userId) {
      let pos = this.users.findIndex(u => u.userId === userId);
      if (pos !== -1) {
        this.users.splice(pos, 1);
      }
    },
    /**
     * 发送消息
     */
    sendMessage: function() {
      let willSendMessage = {
        payload: {
          userId: app.userId,
          nick: app.nick,
          content: app.message
        },
        opcode: OPCODES.GROUP
      };
      this.messages.push(willSendMessage.payload);
      this.message = null;
      worker.postMessage({ command: 3, data: willSendMessage });
    },
    /**
     * 获取用户头像
     */
    obtainAvatar: function(userId) {
      return `//static.jk.cn/${
        DEFAULT_AVATARS[userId % DEFAULT_AVATARS_LEN]
      }`;
    },
    /**
     * 启动压测
     */
    startTesting: function() {
      if (testingInterval) {
        clearInterval(testingInterval);
      }
      testingInterval = setInterval(() => {
        let willSendMessage = {
          payload: {
            userId: app.userId,
            nick: app.nick,
            content: new Date().toUTCString() + "压测"
          },
          command: COMMANDS.TESTING,
          opcode: OPCODES.COMMAND
        };
        worker.postMessage({ command: 3, data: willSendMessage });
      }, 50);
      app.testing = true;
    },
    /**
     * 停止压测
     */
    stopTesting: function() {
      if (testingInterval) {
        clearInterval(testingInterval);
      }
      app.testing = false;
    }
  }
});
