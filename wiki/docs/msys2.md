# MSYS2

## Объединение $HOME с директорией профиля Windows

По умолчанию после установки MSYS2 имеет отдельную домашнюю директорию для пользователя внутри MSYS2. При использовании одинаковых инструментов внутри MSYS2 и снаружи (в Windows), неудобно настраивать конфиги в двух местах &ndash; например, ssh-ключи, .gitconfig, .netrc.

Чтобы вместо этого MSYS2 использовал директорию профиля Windows в качестве домашней, и все файлы команды брал из неё, нужно изменить файл $MSYS2_DIR/etc/nsswitch.conf:
```
# Begin /etc/nsswitch.conf

passwd: files db
group: files db

db_enum: cache builtin

db_home: windows desc     # было: cygwin desc
db_shell: windows desc    # было: cygwin desc
db_gecos: windows desc    # было: cygwin desc

# End /etc/nsswitch.conf
```

Идею взял из: [QMK MSYS](https://github.com/qmk/qmk_distro_msys/blob/main/src/etc/nsswitch.conf).
