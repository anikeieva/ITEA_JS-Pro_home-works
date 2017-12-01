const TelegramBot = require('node-telegram-bot-api');
const token = 'Here must be token';
const bot = new TelegramBot(token, {polling: true});

let reminders = [];

bot.onText(/\/remind (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const dateNow = new Date();
  let reminder = {
    'message_id': msg.message_id,
    'id': chatId,
    'first_name': msg.from.first_name,
    'last_name': msg.from.last_name,
    'text': match[1],
    'timeSentText': dateNow
  };

  bot.sendMessage(chatId, `Ok. I must remind you ${reminder.text}`);
  bot.sendMessage(chatId, `How long to wait?
  /days /hours or /minutes`);

  getTimeInterval(reminder, chatId);

});

function getTimeInterval(reminder, chatId) {
  bot.onText(/\/minutes/, (msg, match) => {

    function changeTohover(time) {
      return time/60;
    }

    setTimeReturnResult(reminder, chatId, 'minute(s)', changeTohover);
  });

  bot.onText(/\/hours/, (msg, match) => {

    function changeTohover(time) {
      return time;
    }

    setTimeReturnResult(reminder, chatId, 'hour(s)', changeTohover);

  });

  bot.onText(/\/days/, (msg, match) => {

    function changeTohover(time) {
      return time*24;
    }

    setTimeReturnResult(reminder, chatId, 'day(s)', changeTohover);

  });
}

function setTimeReturnResult(reminder, chatId,  units, changeTohover) {
  bot.onText(/\d+/, (msg, match) => {
    if(!reminder.timeIntervalHours) {
      let userText = msg.text;
      if(/^\d+(?:[\.,]\d+)?$/.test(userText)) {
        let time = (userText.indexOf(',') >= 0)? userText.replace(',','.') : userText;
        time = parseFloat(time);
        const timeIntervalHours = changeTohover(time);

        remindingAfterSetTime(reminder, timeIntervalHours, chatId, time, units);
      }
    }
  });
}

function remindingAfterSetTime(reminder, timeIntervalHours, chatId, time, units) {
  const timeIntervalMlSeconds = timeIntervalHours*3600*1000;
  reminder.timeIntervalHours = timeIntervalHours;

  bot.sendMessage(chatId, `Remind you about "${reminder.text}" in ${time} ${units}`);
  reminders.push(reminder);
  console.log(reminders);

  setTimeout(() => {
    bot.sendMessage(chatId, `It's time ${reminder.text}`);
  }, timeIntervalMlSeconds);
}
