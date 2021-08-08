const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();
const features = require("./features/features");

http.createServer(function (req, res) {
  if (req.method == 'POST') {
    var data = "";
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      if (!data) {
        res.end("No post data");
        return;
      }
      var dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if (dataObject.type == "wake") {
        console.log("Woke up in post");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Discord Bot is active now\n');
  }
}).listen(3000);

client.on('ready', message => {
  console.log('Bot準備完了～');
  client.user.setPresence({ activity: { name: 'げーむ' } });
});

client.on('message', message => {
  // 自分自身か他のbotのメッセージはスルー
  if (message.author.id == client.user.id || message.author.bot) {
    return;
  }

  // 自分宛メンションの場合
  if (message.isMemberMentioned(client.user)) {
    // @everyone @here なら反応しない
    if (message.mentions.everyone) {
      return;
    }

    // 全functionsの正規表現と比較して当てはまる機能を実行する
    let didSomeFeatureMatch = false;
    features.forEach((feature) => {
      if (message.content.match(feature.pattern)) {
        // ひとまず run メソッドに message オブジェクトを食わせる設計とする
        // ひとまず sendReply は生き残して run は string を返させる設計とする
        sendReply(message, feature.run(message));
        didSomeFeatureMatch = true;
      }
    });

    // いずれの条件にも当てはまらない場合
    if (!didSomeFeatureMatch) {
      sendReply(message, "呼びましたか？");
    }

    return;
  }

  // メンションでないメッセージへの反応
  // 「にゃ～ん」「にゃーん」が含まれている場合
  if (message.content.match(/にゃ～ん|にゃーん/)) {
    let text = "にゃ～ん";
    sendMsg(message.channel.id, text);
    return;
  }
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log('DISCORD_BOT_TOKENが設定されていません。');
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

function sendReply(message, text) {
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option = {}) {
  client.channels.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
