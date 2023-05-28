# Termux

## Удаление из списка программ для открытия

Регистрирует себя как обработчик для любых типов файлов, не очень удобно.

Нужна свежая версия Termux (из GitHub Actions, а не релизов на гитхабе или Google Play/F-Droid), и дописать в файл ~/.termux/termux.properties строки:
```
disable-file-share-receiver=true
disable-file-view-receiver=true
```
После этого выполнить `termux-reload-settings` или перезапустить приложение.

Источник: [коммит в github.com/reisxd/termux-app](https://github.com/reisxd/termux-app/commit/23d0224b5ba8bb7b27113b6f603c680a9dbb7d3b).
