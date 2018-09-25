const ESCAPE_CODE_SUCCESS = 0;
const ESCAPE_CODE_FAILURE = 1;
const command = {
  HELP: `--help`,
  VERSION: `--version`
};

const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const closeInterface = (message, escapeCode) => {
  rl.close();
  process.on(`exit`, () => {
    if (!escapeCode) {
      console.log(message);
    } else {
      console.error(message);
    }
  });
  process.exit(escapeCode);
}

rl.question(`Введите команду для выполнения\n`, (currentCommand) => {
  if (!currentCommand) {
    closeInterface(`Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм».\nАвтор: Василий Шубин.`, ESCAPE_CODE_FAILURE);
  } else if (currentCommand === command.HELP) {
    closeInterface(`Доступные команды:\n--version\n--help`, ESCAPE_CODE_SUCCESS);
  } else if (currentCommand === command.VERSION) {
    closeInterface(`v0.0.1`, ESCAPE_CODE_SUCCESS);
  } else {
    closeInterface(`Неизвестная команда: ${currentCommand}\nЧтобы прочитать правила использования приложения, наберите "--help`, ESCAPE_CODE_FAILURE);
  }
});
