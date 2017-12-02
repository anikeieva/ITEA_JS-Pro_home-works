const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.onText(/\/start/, (msg, match) => {
  let chatId = msg.chat.id;
  bot.sendMessage(chatId,
`Hello, ${msg.from.first_name}! I'm your reminding bot.
If you have a reminding for me, use /remind before your text.

e.g.
/remind to call mother

after it I will offer you how long I must wait to receive you reminding,
and you must choose (click on)  "/days /hours or /minutes" (only one)
and after it to write time (only fractional or integer number)
and wait for remind

all comands:

/remind - create reminding after it (only one row)
/minutes - after click on it you must write time for waiting for reminder in minutes (only fractional or integer number)
/hours - after click on it you must write time for waiting for reminder in hours (only fractional or integer number)
/days - after click on it you must write time for waiting for reminder in days (only fractional or integer number)`);
});

let reminders = [];

bot.onText(/\/remind (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let dateNow = new Date();
  let reminder = {
    'message_id': msg.message_id,
    'id': chatId,
    'first_name': msg.from.first_name,
    'last_name': msg.from.last_name,
    'text': match[1],
    'timeSentText': dateNow
  };

  bot.sendMessage(chatId, `Ok, ${reminder.first_name}. I must remind you ${reminder.text}`);

  setUnits(reminder, chatId);

});

function setUnits(reminder, chatId) {
  bot.sendMessage(chatId, `How long to wait?
  /days /hours or /minutes`);

  getTimeInterval(reminder, chatId);
}

function getTimeInterval(reminder, chatId) {
  bot.onText(/\/minutes/, (msg, match) => {

    function changeTohover(time) {
      return time/60;
    }

    setTimeReturnResult(reminder, chatId, 'minute', changeTohover);
  });

  bot.onText(/\/hours/, (msg, match) => {

    function changeTohover(time) {
      return time;
    }

    setTimeReturnResult(reminder, chatId, 'hour', changeTohover);

  });

  bot.onText(/\/days/, (msg, match) => {

    function changeTohover(time) {
      return time*24;
    }

    setTimeReturnResult(reminder, chatId, 'day', changeTohover);

  });
}

function setTimeReturnResult(reminder, chatId,  units, changeTohover) {
  bot.onText(/\d+/, (msg, match) => {
    if(!reminder.timeIntervalHours) {
      let userText = msg.text;
      if(/^\d+(?:[\.,]\d+)?$/.test(userText)) {
        let time = (userText.indexOf(',') >= 0)? userText.replace(',','.') : userText;
        time = parseFloat(time);
        let timeIntervalHours = changeTohover(time);
        reminder.timeIntervalHours = timeIntervalHours;

        remindingAfterSetTime(reminder, timeIntervalHours, chatId, time, units);
      }
    }
  });
}

function remindingAfterSetTime(reminder, timeIntervalHours, chatId, time, units) {
  let timeIntervalMlSeconds = reminder.timeIntervalHours*3600*1000;

  if(time > 1) {
    units = units + 's';
  }

  bot.sendMessage(chatId, `${reminder.first_name}, I will remind you ${reminder.text} in ${time} ${units}`);
  reminders.push(reminder);
  console.log(reminders);

  setTimeout(() => {
    bot.sendMessage(chatId, `It's time ${reminder.text}!`);
    // bot.sendMessage(chatId, `/ok or /delay?`);
    //
    // bot.onText(/\ok/, (msg, match) => {
    //   if(!reminder.delay) bot.sendMessage(chatId, `Good luck!`);
    // });
    //
    // bot.onText(/\/delay/, (msg, match) => {
    //   // if(!reminder.delay) {
    //     // reminder.delay  = true;
    //     setUnits(reminder, chatId);
    //     reminder.delay = true;
    //
    //   // }
    // });
  }, timeIntervalMlSeconds);
}
