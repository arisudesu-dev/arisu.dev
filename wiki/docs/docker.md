# Docker

## Очистка виртуального диска
Имеет свойство раздуваться виртуальный диск Docker Desktop на Windows, происходит это потому что выделенный объем диска только увеличивается до заданного лимита, но при освобождении изнутри обратно уже не сжимается.

Особенно актуально после выполнения docker system prune.

Можно сжать через PowerShell команду Optimize-VHD, но это работает только в Windows 10 Pro. Или через diskpart на любой редакции Windows 10.

Сначала нужно остановить WSL:
```
> wsl --shutdown
```
Затем выполнить в diskpart:
```
> diskpart
select  vdisk file="C:\Users\user\AppData\Local\Docker\wsl\data\ext4.vhdx"
attach  vdisk readonly
compact vdisk
detach  vdisk
exit
```
Место будет освобождено.
