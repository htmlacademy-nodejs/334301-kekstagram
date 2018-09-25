const ESCAPE_CODE_SUCCESS = 0;
const ESCAPE_CODE_FAILURE = 1;
const command = {
  HELP: `--help`,
  VERSION: `--version`
};

const exitProcess = (message, escapeCode) => {
  !escapeCode ? console.log(message) : console.error(message);
  process.exit(escapeCode);
}

const userCommand = process.argv[2];

if (!userCommand) {
  exitProcess(`Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм».\nАвтор: Василий Шубин.`, ESCAPE_CODE_FAILURE);
} else if (userCommand === command.HELP) {
  exitProcess(`Доступные команды:\n--version\n--help`, ESCAPE_CODE_SUCCESS);
} else if (userCommand === command.VERSION) {
  exitProcess(`v0.0.1`, ESCAPE_CODE_SUCCESS);
} else {
  exitProcess(`Неизвестная команда: ${userCommand}\nЧтобы прочитать правила использования приложения, наберите --help`, ESCAPE_CODE_FAILURE);
}
