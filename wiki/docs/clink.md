# Clink

Расширение для командной строки Windows.

Устанавливать нужно доработанный [форк](https://chrisant996.github.io/clink/clink.html).

## Базовая конфигурация

Убрать автообновление, надписи при запуске, раскрашивание ввода, автоответ на вопрос "Завершить выполнение пакетного файла? Y/n":

```
clink set clink.autoupdate false
clink set clink.logo none
clink set cmd.auto_answer answer_yes
clink set clink.colorize_input false
clink set color.input default
```

## Настройка приглашения и очистка при запуске

Приглашение ввода похожее на MSYS2. При запуске командной строки окно очищается, чтобы убрать надписи с версией Windows и оставить только приглашение. Код позаимствован частично из Cmder.

```lua
local my_prompt = clink.promptfilter(0)

function my_prompt:filter(prompt)
    local old_prompt = prompt

    local uah = os.getenv("USERNAME") .. "@" .. os.getenv("COMPUTERNAME")

    local cwd = old_prompt:match(".*(.:[^>]*)>")
    if cwd == nil then cwd = os.getcwd() end
    if string.find(cwd, os.getenv("HOME")) then
        cwd = string.gsub(cwd, os.getenv("HOME"), "~")
    end

    local env = old_prompt:match(".*%(([^%)]+)%).+:")
    if env == nil then env = old_prompt:match(".*%[([^%]]+)%].+:") end
    if env ~= nil then env = "("..env..")" else env = "" end

    local adm = os.isuseradmin()

    return table.concat {
        "\x1b[32m", uah, " ",
        "\x1b[36m", "CMD ",
        "\x1b[33m", cwd,
        "\x1b[0m\n",
        env ~= "" and env or "",
        adm and "#" or "$", " "
    }
end

clink.oninject(function () clink.print("\x1bc") end)
```
