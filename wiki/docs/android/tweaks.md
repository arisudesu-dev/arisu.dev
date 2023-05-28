# Твики

## Удаление любых приложений

Можно через adb удалить любое приложение, даже те, которые нельзя удалить через раздел приложений в настройках. Файлы приложения при этом не удаляются насовсем, а доступны для повторной переустановки. Работает на стоковой прошивке (проверял на своем Xiaomi).

Можно не удалять, а отключить приложение. Удалять или отключать всё подряд нежелательно, можно удалить что-то лишнее и попасть в бутлуп с последующей перепрошивкой.

Удаление:
```
adb shell pm uninstall --user 0 [id-приложения]
```

Переустановка:
```
adb shell cmd package install-existing --user 0 [id-приложения]
```

Отключение:
```
adb shell pm disable-user --user 0 [id-приложения]
```

Включение:
```
adb shell pm enable --user 0 [id-приложения]
```

Например, так я удалил со своего телефона всё гугловское, что нельзя было удалить через меню:
```
adb shell pm uninstall --user 0 com.google.android.googlequicksearchbox
adb shell pm uninstall --user 0 com.google.android.gm
adb shell pm uninstall --user 0 com.google.android.apps.maps
adb shell pm uninstall --user 0 com.google.android.youtube
adb shell pm uninstall --user 0 com.google.android.calendar
adb shell pm uninstall --user 0 com.google.android.apps.subscriptions.red
adb shell pm uninstall --user 0 com.google.android.apps.walletnfcrel
adb shell pm uninstall --user 0 com.google.android.apps.googleassistant
adb shell pm uninstall --user 0 com.android.chrome
adb shell pm uninstall --user 0 com.android.hotwordenrollment.xgoogle
adb shell pm uninstall --user 0 com.android.hotwordenrollment.okgoogle
adb shell pm uninstall --user 0 com.google.android.apps.wellbeing
adb shell pm uninstall --user 0 com.google.android.projection.gearhead
adb shell pm uninstall --user 0 com.google.android.tts
adb shell pm uninstall --user 0 com.google.android.inputmethod.latin
adb shell pm uninstall --user 0 com.google.android.marvin.talkback
adb shell pm uninstall --user 0 com.google.android.feedback
adb shell pm uninstall --user 0 com.google.android.apps.restore
adb shell pm uninstall --user 0 com.android.providers.partnerbookmarks
```

## Убрать всплывающие уведомления

Лично меня они раздражают тем, что перекрывают активное приложение сверху. Однако, в настройках в MIUI 13 нельзя отключить их полностью, только снять галочки для отдельных приложений. При установке новых приложений нужно снимать галочки и для них, что делать каждый раз несподручно.

Но можно отключить их через скрытую настройку через adb:
```
adb shell settings put global heads_up_notifications_enabled 0
```

После этого не будет всплывающих уведомлений даже с галочками на приложениях в списке.

Подсмотрел здесь: [stackoverflow](https://android.stackexchange.com/questions/230455/).
