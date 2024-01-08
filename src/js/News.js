import NewsAPI from "./NewsAPI";
import Message from "./Message";

export default class News {
  constructor(element) {
    this.element = element;
    this.api = new NewsAPI('https://workers-backend-s6nq.onrender.com/news')
  }

  bindToDOM() {
    this.list = this.element.querySelector('.news__list');
    this.refreshBtn = this.element.querySelector('.news__refresh');
  }

  init() {
    this.bindToDOM();
    this.preloader();
    this.refreshBtn.addEventListener('click', () => this.refresh());

    this.renderNews();
  }

  async renderNews() {
    const data = await this.api.getNews();

    if (data) {
      this.data = data.messages;
      this.list.innerHTML = '';
      for (const item of this.data) {
        const newMessage = new Message(this.list, item);
        newMessage.render();
      }
    } else {
      this.element.querySelector('.news__preloader').remove();
      this.shorError();
    }
  }

  shorError() {
    const errorWrapper = document.createElement('div');
    errorWrapper.classList.add('news__error-wrapper');

    const error = document.createElement('p');
    error.classList.add('news__error');
    error.innerHTML = 'Не удалось загрузить данные \n Проверьте подключение и обновите страницу';

    this.element.append(errorWrapper);
    errorWrapper.append(error);
  }

  refresh() {
    this.list.innerHTML = '';

    this.preloader();
    this.renderNews();
  }

  preloaderHTML() {
    return `
      <div class="news__preloader-date"></div>
      <div class="news__preloader-img-text">
        <div class="news__preloader-img"></div>
        <div class="news__preloader-text">
          <div class="news__preloader-text-one"></div>
          <div class="news__preloader-text-two"></div>
        </div>
      </div>
      `
  }

  preloader() {
    for (let i = 0; i < 3; i++) {
      const li = document.createElement('li');
      li.classList.add('news__preloader-item');
      li.innerHTML = this.preloaderHTML();
      this.list.append(li);
    }

    const preloader = document.createElement('div');
    preloader.classList.add('news__preloader');
    this.list.append(preloader);
  }
}
