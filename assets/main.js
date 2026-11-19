(() => {
  'use strict';
  const translations = {
    ru: {
      'skip':'Перейти к программам','nav.software':'Программы','nav.about':'О проекте','nav.blog':'Блог','nav.contact':'Связь','donate':'Поддержать',
      'hero.eyebrow':'ОТДЕЛ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ','hero.sub':'ПРОГРАММЫ С ХАРАКТЕРОМ','hero.more':'ЛИСТАЙТЕ НИЖЕ',
      'intro.eyebrow':'// ИДЕИ, ПРЕВРАЩЁННЫЕ В КОД','intro.title':'Немного магии<br>для ваших задач<span class="accent">.</span>','intro.text':'Здесь живут мои программы и инструменты: полезные, самостоятельные и с чуточкой настроения.',
      'product.label':'ПЕРВЫЙ В КОЛЛЕКЦИИ','product.status':'ДОСТУПЕН','product.tag':'Автокликер с котиком','product.desc':'Котик кликает за тебя: автоклик, прокрутка, перетаскивание и запись макросов в одном приложении для Windows.','product.download':'Скачать для Windows','product.website':'Сайт проекта',
      'about.eyebrow':'// ИДЕЯ ОТДЕЛА','about.title':'Полезное может быть<br><em>интересным</em>','about.note':'NomberSoftware — часть экосистемы NOMBER и место для программ, которые хочется открывать снова.',
      'value.one.title':'Сделано с идеей','value.one.text':'Каждый проект начинается с задачи, которую хочется сделать проще и приятнее.','value.two.title':'Свободно исследовать','value.two.text':'KotoClicker открыт на GitHub: можно изучать код и следить за развитием.','value.three.title':'Со своим характером','value.three.text':'Практичные инструменты, в которых есть место деталям и настроению.',
      'blog.eyebrow':'// НА СВЯЗИ С ЛАБОРАТОРИЕЙ','blog.title':'Заметки <em>разработчика</em>','blog.lede':'Новости и обновления прямо из Telegram-канала.','blog.source':'Публикации из Telegram','blog.loading':'Загружаем публикации…','blog.more':'Показать ещё','blog.all':'Все новости','blog.archive.eyebrow':'// ВСЕ ПУБЛИКАЦИИ','blog.archive.title':'Блог <em>NomberSoftware</em>','blog.archive.lede':'Все новости и записи из нашего Telegram-канала.','blog.back':'На главную','blog.empty.title':'Пока здесь тихо','blog.empty.text':'Первые записи появятся здесь автоматически после публикации в канале.','blog.empty.link':'Заглянуть в Telegram','blog.error':'Не удалось загрузить публикации.','blog.retry':'Попробовать снова','blog.open':'Открыть в Telegram','blog.updated':'Обновлено:','blog.document':'Файл',
      'support.eyebrow':'// ПОДДЕРЖАТЬ РАЗРАБОТКУ','support.title':'Нравится то, что я делаю?','support.text':'Ваша поддержка помогает новым идеям становиться настоящими проектами.',
      'footer.about':'Независимая лаборатория программ в экосистеме NOMBER.','footer.contact':'СВЯЗЬ','footer.follow':'СЛЕДИТЬ','footer.hub':'ХАБ ВСЕХ ПРОЕКТОВ','footer.hubtext':'Вся экосистема NOMBER','footer.part':'Часть экосистемы'
    },
    en: {
      'skip':'Skip to software','nav.software':'Software','nav.about':'About','nav.blog':'Blog','nav.contact':'Contact','donate':'Support',
      'hero.eyebrow':'SOFTWARE DEVELOPMENT DEPARTMENT','hero.sub':'SOFTWARE WITH CHARACTER','hero.more':'SCROLL TO EXPLORE',
      'intro.eyebrow':'// IDEAS TURNED INTO CODE','intro.title':'A little magic<br>for your tasks<span class="accent">.</span>','intro.text':'This is where my apps and tools live: useful, independent, and made with a little personality.',
      'product.label':'FIRST IN THE COLLECTION','product.status':'AVAILABLE','product.tag':'An autoclicker with a cat','product.desc':'Let the cat do the clicking: autoclicking, scrolling, drag and drop, and macro recording in one Windows app.','product.download':'Download for Windows','product.website':'Project website',
      'about.eyebrow':'// THE IDEA','about.title':'Useful can be<br><em>interesting</em>','about.note':'NomberSoftware is part of the NOMBER ecosystem and a home for software worth coming back to.',
      'value.one.title':'Built with purpose','value.one.text':'Every project begins with a task that could be simpler and a little more enjoyable.','value.two.title':'Open to explore','value.two.text':'KotoClicker is open on GitHub: explore the code and follow its development.','value.three.title':'Full of character','value.three.text':'Practical tools with room for personality and thoughtful details.',
      'blog.eyebrow':'// NEWS FROM THE LAB','blog.title':'Developer <em>notes</em>','blog.lede':'News and updates straight from the Telegram channel.','blog.source':'Posts from Telegram','blog.loading':'Loading posts…','blog.more':'Show more','blog.all':'All news','blog.archive.eyebrow':'// ALL POSTS','blog.archive.title':'NomberSoftware <em>blog</em>','blog.archive.lede':'All news and posts from our Telegram channel.','blog.back':'Home','blog.empty.title':'Quiet in here for now','blog.empty.text':'The first posts will appear here automatically after they are published in the channel.','blog.empty.link':'Visit Telegram','blog.error':'Could not load posts.','blog.retry':'Try again','blog.open':'Open in Telegram','blog.updated':'Updated:','blog.document':'File',
      'support.eyebrow':'// SUPPORT DEVELOPMENT','support.title':'Enjoy what I make?','support.text':'Your support helps new ideas become real projects.',
      'footer.about':'An independent software lab in the NOMBER ecosystem.','footer.contact':'CONTACT','footer.follow':'FOLLOW','footer.hub':'ALL PROJECTS','footer.hubtext':'The NOMBER ecosystem','footer.part':'Part of the'
    }
  };
  let language = 'ru';
  try { const saved = localStorage.getItem('nomber-software-language'); if (saved === 'en' || saved === 'ru') language = saved; } catch (_) {}
  const archivePage = document.documentElement.dataset.page === 'blog';
  let feedData = null;
  let shown = 0;
  let feedFailed = false;
  const feed = document.getElementById('feed');
  const more = document.getElementById('feed-more');
  const updated = document.getElementById('feed-updated');
  const t = key => translations[language][key] || key;
  const safeUrl = (url, relative = false) => {
    try {
      const u = new URL(String(url), location.href);
      if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
      if (relative && u.origin !== location.origin) return '';
      return u.href;
    } catch (_) { return ''; }
  };
  const sanitize = html => {
    const template = document.createElement('template');
    template.innerHTML = String(html || '');
    const allowed = new Set(['A','B','STRONG','I','EM','U','S','DEL','INS','CODE','PRE','BR','BLOCKQUOTE','SPAN']);
    const walk = parent => [...parent.childNodes].forEach(node => {
      if (node.nodeType === Node.COMMENT_NODE) { node.remove(); return; }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (['SCRIPT','STYLE','IFRAME','OBJECT','SVG','MATH'].includes(node.tagName)) { node.remove(); return; }
      if (!allowed.has(node.tagName)) { walk(node); node.replaceWith(...node.childNodes); return; }
      const href = node.tagName === 'A' ? safeUrl(node.getAttribute('href')) : '';
      [...node.attributes].forEach(attr => node.removeAttribute(attr.name));
      if (node.tagName === 'A' && href) { node.href = href; node.target = '_blank'; node.rel = 'noopener noreferrer'; }
      walk(node);
    });
    walk(template.content);
    return template.content;
  };
  const formatDate = iso => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-GB', {day:'numeric',month:'long',year:'numeric'}).format(date);
  };
  const postCard = post => {
    const article = document.createElement('article'); article.className = 'post';
    const destination = safeUrl(post.url) || 'https://t.me/NomberSoftware';
    const photos = Array.isArray(post.photos) ? post.photos : [];
    const videos = Array.isArray(post.videos) ? post.videos : [];
    const media = [...photos.map(src => ({src})), ...videos.map(v => ({src:v.thumb, video:true}))].filter(m => m.src);
    if (media.length) {
      const gallery = document.createElement('div'); gallery.className = 'post-gallery' + (media.length > 1 ? ' multiple' : '');
      media.slice(0, 4).forEach(item => {
        const src = safeUrl(item.src, true); if (!src) return;
        const link = document.createElement('a'); link.className = 'post-media'; link.href = destination; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', t('blog.open'));
        const img = document.createElement('img'); img.src = src; img.alt = ''; img.loading = 'lazy'; link.append(img);
        if (item.video) { const play = document.createElement('span'); play.className = 'post-play'; play.textContent = '▶'; link.append(play); }
        gallery.append(link);
      });
      if (gallery.childNodes.length) article.append(gallery);
    }
    const body = document.createElement('div'); body.className = 'post-body';
    if (post.text_html) { const text = document.createElement('div'); text.className = 'post-text'; text.append(sanitize(post.text_html)); body.append(text); }
    if (post.document) { const doc = document.createElement('p'); doc.className = 'post-document'; doc.textContent = `${t('blog.document')}: ${post.document}`; body.append(doc); }
    const meta = document.createElement('div'); meta.className = 'post-meta';
    const time = document.createElement('time'); time.dateTime = post.date || ''; time.textContent = formatDate(post.date); meta.append(time);
    const link = document.createElement('a'); link.href = destination; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = t('blog.open'); meta.append(link); body.append(meta); article.append(body);
    return article;
  };
  const renderFeed = () => {
    feed.replaceChildren(); if (more) more.hidden = true; updated.textContent = '';
    if (feedFailed) {
      const error = document.createElement('p'); error.className = 'feed-error'; error.textContent = t('blog.error');
      const retry = document.createElement('button'); retry.type = 'button'; retry.textContent = t('blog.retry'); retry.addEventListener('click', loadFeed); error.append(retry); feed.append(error); return;
    }
    if (!feedData) { const loading = document.createElement('p'); loading.className = 'feed-loading'; loading.textContent = t('blog.loading'); feed.append(loading); return; }
    const posts = Array.isArray(feedData.posts) ? feedData.posts : [];
    if (!posts.length) {
      const empty = document.createElement('div'); empty.className = 'feed-empty';
      empty.innerHTML = '<span class="feed-empty-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21.9 4.3 18.6 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L6 13.6l-4.9-1.5c-1.1-.3-1.1-1 .2-1.6L20.5 3c.9-.3 1.7.2 1.4 1.3z"/></svg></span>';
      const title = document.createElement('strong'); title.textContent = t('blog.empty.title');
      const text = document.createElement('p'); text.textContent = t('blog.empty.text');
      const link = document.createElement('a'); link.href = 'https://t.me/NomberSoftware'; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = t('blog.empty.link');
      empty.append(title,text,link); feed.append(empty);
    } else { posts.slice(0,shown).forEach(post => feed.append(postCard(post))); if (more) more.hidden = shown >= posts.length; }
    if (feedData.updated) updated.textContent = `${t('blog.updated')} ${formatDate(feedData.updated)}`;
  };
  const loadFeed = async () => {
    feedFailed = false; feedData = null; renderFeed();
    try { const response = await fetch('data/telegram.json', {cache:'no-cache'}); if (!response.ok) throw new Error(`HTTP ${response.status}`); feedData = await response.json(); shown = archivePage ? 6 : 3; }
    catch (error) { console.error('Telegram feed:', error); feedFailed = true; }
    renderFeed();
  };
  const applyLanguage = () => {
    document.documentElement.lang = language;
    document.title = archivePage ? (language === 'ru' ? 'Блог — NomberSoftware' : 'Blog — NomberSoftware') : (language === 'ru' ? 'NomberSoftware — программы с характером' : 'NomberSoftware — software with character');
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (translations[language][key]) el.innerHTML = t(key); });
    document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
    renderFeed();
  };
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.lang; try { localStorage.setItem('nomber-software-language', language); } catch (_) {} applyLanguage();
  }));
  more?.addEventListener('click', () => { shown += 6; renderFeed(); });
  document.getElementById('year').textContent = new Date().getFullYear();
  const nav = document.getElementById('nav'); addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), {passive:true});
  applyLanguage(); loadFeed();
})();
