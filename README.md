# NomberSoftware

Портфолио программ NOMBER: [nombersoftware.github.io](https://nombersoftware.github.io/).

Сайт статический и публикуется через GitHub Pages из ветки `main`. Карточка KotoClicker находится в `index.html`; тексты на русском и английском — в `assets/main.js`.

## Telegram-блог

Раздел «Заметки разработчика» отображает публичные записи канала [@NomberSoftware](https://t.me/NomberSoftware). GitHub Actions запускает `scripts/fetch_telegram.py` каждые 30 минут и при ручном запуске workflow **Telegram feed**. Скрипт сохраняет посты и изображения в `data/`, а изменения автоматически публикуются через GitHub Pages. При временной недоступности Telegram сохраняется последняя успешная версия ленты.

Для ручного обновления локально:

```sh
python3 scripts/fetch_telegram.py
```

Для сжатия изображений можно дополнительно установить Pillow. Опубликованные в канале записи отображаются на языке оригинала.
