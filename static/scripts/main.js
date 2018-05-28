let ws = null;
let WEBSOCKET_URL = 'ws://localhost:8080/chat';

const DEFAULT_AVATARS = ['T1j.DTByJT1RCvBVdK.jpg',
    'T18.YTByhT1RCvBVdK.jpg',
    'T1xodTByhT1RCvBVdK.jpg',
    'T1ykDTByxT1RCvBVdK.jpg',
    'T1Y5YTByhT1RCvBVdK.jpg',
    'T1T5YTByJT1RCvBVdK.jpg',
    'T1DkYTByxT1RCvBVdK.jpg',
    'T1d5YTByhT1RCvBVdK.jpg',
    'T15oYTByJT1RCvBVdK.jpg',
    'T1r.YTByxT1RCvBVdK.jpg',
    'T15kYTByJT1RCvBVdK.jpg',
    'T1.oYTByJT1RCvBVdK.jpg',
    'T1BkYTByJT1RCvBVdK.jpg',
    'T1bkYTByJT1RCvBVdK.jpg',
    'T1U.YTByhT1RCvBVdK.jpg',
    'T18kYTByJT1RCvBVdK.jpg',
    'T16.CTByJT1RCvBVdK.jpg',
    'T1dkYTByJT1RCvBVdK.jpg',
    'T1.kYTByJT1RCvBVdK.jpg',
    'T175YTByJT1RCvBVdK.jpg',
    'T1.5YTByJT1RCvBVdK.jpg',
    'T1a.YTByJT1RCvBVdK.jpg',
    'T1TkYTByJT1RCvBVdK.jpg',
    'T1JoYTByJT1RCvBVdK.jpg',
    'T1MkYTByxT1RCvBVdK.jpg',
    'T1voYTByJT1RCvBVdK.jpg',
    'T1uoYTByhT1RCvBVdK.jpg',
    'T1J5YTByhT1RCvBVdK.jpg',
    'T1vkYTByJT1RCvBVdK.jpg',
    'T1D5YTByJT1RCvBVdK.jpg',
    'T1IkYTByhT1RCvBVdK.jpg',
    'T1soYTByJT1RCvBVdK.jpg',
    'T1U5YTByhT1RCvBVdK.jpg',
    'T1NoYTByJT1RCvBVdK.jpg',
    'T1wkxTByZT1RCvBVdK.jpg',
    'T10.YTByJT1RCvBVdK.jpg',
    'T1GkYTByhT1RCvBVdK.jpg',
    'T1g5YTByJT1RCvBVdK.jpg',
    'T1r5YTByJT1RCvBVdK.jpg',
    'T1o.YTByJT1RCvBVdK.jpg',
    'T1jkYTByJT1RCvBVdK.jpg',
    'T1J.YTByJT1RCvBVdK.jpg',
    'T1N5YTByJT1RCvBVdK.jpg',
    'T1v.YTByJT1RCvBVdK.jpg',
    'T1a5YTByJT1RCvBVdK.jpg',
    'T19kYTByJT1RCvBVdK.jpg',
    'T1boYTByJT1RCvBVdK.jpg',
    'T1GoYTByJT1RCvBVdK.jpg',
    'T1xoYTByhT1RCvBVdK.jpg',
    'T1p.CTByJT1RCvBVdK.jpg',
    'T1f.YTByhT1RCvBVdK.jpg',
    'T13kYTByhT1RCvBVdK.jpg',
    'T1UkxTByhT1RCvBVdK.jpg',
    'T105YTByJT1RCvBVdK.jpg',
    'T1B.YTByJT1RCvBVdK.jpg',
    'T1gkYTByJT1RCvBVdK.jpg',
    'T13.YTByJT1RCvBVdK.jpg',
    'T1o5YTByJT1RCvBVdK.jpg',
    'T1QoYTByJT1RCvBVdK.jpg',
    'T1UkYTByhT1RCvBVdK.jpg',
    'T1okYTByJT1RCvBVdK.jpg',
    'T1v5YTByJT1RCvBVdK.jpg',
    'T1akYTByJT1RCvBVdK.jpg',
    'T1SoYTByhT1RCvBVdK.jpg',
    'T1b.YTByJT1RCvBVdK.jpg',
    'T1BoYTByJT1RCvBVdK.jpg',
    'T1l.YTByJT1RCvBVdK.jpg',
    'T1p5CTByJT1RCvBVdK.jpg',
    'T1V5YTByJT1RCvBVdK.jpg',
    'T11oYTByhT1RCvBVdK.jpg',
    'T1pkZTByhT1RCvBVdK.jpg',
    'T1x.YTByhT1RCvBVdK.jpg',
    'T1I.YTByJT1RCvBVdK.jpg',
    'T1ToYTByJT1RCvBVdK.jpg',
    'T135YTByhT1RCvBVdK.jpg',
    'T1fkYTByhT1RCvBVdK.jpg',
    'T1R.CTByJT1RCvBVdK.jpg',
    'T1ooYTByhT1RCvBVdK.jpg',
    'T1hoYTByhT1RCvBVdK.jpg',
    'T1QkYTByJT1RCvBVdK.jpg',
    'T10kYTByhT1RCvBVdK.jpg',
    'T1HoYTByJT1RCvBVdK.jpg',
    'T1Z.CTByJT1RCvBVdK.jpg',
    'T1SkYTByhT1RCvBVdK.jpg',
    'T14tJTBjZT1RCvBVdK.jpg',
    'T125CTByJT1RCvBVdK.jpg',
    'T1O.YTByJT1RCvBVdK.jpg',
    'T1b5YTByJT1RCvBVdK.jpg',
    'T1r.ZTByhT1RCvBVdK.jpg',
    'T1x5YTByhT1RCvBVdK.jpg',
    'T1H.YTByJT1RCvBVdK.jpg',
    'T1I5YTByhT1RCvBVdK.jpg',
    'T1joYTByJT1RCvBVdK.jpg',
    'T17yJTBjhT1RCvBVdK.jpg',
    'T1z5YTByJT1RCvBVdK.jpg',
    'T1R5CTByJT1RCvBVdK.jpg',
    'T1HkYTByJT1RCvBVdK.jpg',
    'T1f5YTByhT1RCvBVdK.jpg',
    'T1ZoCTByJT1RCvBVdK.jpg',
    'T1UoYTByhT1RCvBVdK.jpg'
];
const DEFAULT_AVATARS_LEN = DEFAULT_AVATARS.length;
const OPCODES = {
    GROUP: 1,
    COMMAND: 2
};

function onOpen() {
    app.isConnected = true;
}

function onClose() {
    app.isConnected = false;
}

function onMessage(event) {
    app.messages.push(JSON.parse(event.data));
}

function onError() {
    app.isConnected = false;
}
let app = new Vue({
    el: '#app-view',
    data: {
        isConnected: false,
        userId: 1000,
        nick: 'Evan',
        message: null,
        messages: [{
                userId: 13,
                nick: '小辉辉',
                content: '我是一条消息啊啊啊啊啊啊啊啊啊啊啊啊 啊啊啊！'
            },
            {
                userId: 12,
                nick: '小辉辉',
                content: '我是一条消息啊啊啊啊啊啊啊啊啊啊啊啊 啊啊啊！'
            },
            {
                userId: 14,
                nick: '小辉辉',
                content: '我是一条消息啊啊啊啊啊啊啊啊啊啊啊啊 啊啊啊！'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            },
            {
                userId: 1000,
                nick: 'Evan',
                content: '另外 我们的标题格式为：【拟诊标签】+主诉（处理后的）+平安好医生 拟诊标签的字数一般≤6 问题1：这种格式，百度是否认为合理？ 问题2：如果合理，刚才说的主诉长度需要再减11个字左右'
            }
        ],
    },
    methods: {
        connect: function () {
            ws = new WebSocket(`${WEBSOCKET_URL}?userId=${app.userId}&nick=${encodeURIComponent(app.nick)}`);
            ws.addEventListener('open', onOpen);
            ws.addEventListener('close', onClose);
            ws.addEventListener('message', onMessage);
            ws.addEventListener('error', onError);
            // app.isConnected = true;
        },
        disconnect: function () {
            if (ws) {
                ws.close(3001, 'logout');
            }
            // app.isConnected = false;
        },
        sendMessage: function () {
            let willSendMessage = {
                userId: app.userId,
                nick: app.nick,
                content: app.message,
                opcode: OPCODES.GROUP
            };
            app.messages.push(willSendMessage);
            app.message = null;
            ws.send(JSON.stringify(willSendMessage));
        },
        obtainAvatar: function (userId) {
            return `http://static.jk.cn/${DEFAULT_AVATARS[userId % DEFAULT_AVATARS_LEN]}`;
        }
    }
});