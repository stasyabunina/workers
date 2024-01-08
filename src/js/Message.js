export default class Message {
  constructor(list, data) {
    this.list = list;
    this.data = data;
  }

  render() {
    const li = document.createElement('li');
    li.classList.add('news__item');

    const date = document.createElement('span');
    date.classList.add('news__date');
    const newDate = new Date(this.data.date);
    const month = newDate.getMonth() + 1;
    date.textContent = `${newDate.getDate().toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${newDate.getFullYear()}`;

    const imgTextWrapper = document.createElement('div');
    imgTextWrapper.classList.add('news__img-text');

    const img = document.createElement('img');
    img.classList.add('news__img');
    img.src = this.data.image;
    img.alt = 'Image';

    const text = document.createElement('p');
    text.classList.add('news__text');
    text.textContent = this.data.text;

    this.list.prepend(li);

    li.append(date);
    li.append(imgTextWrapper);
    imgTextWrapper.append(img);
    imgTextWrapper.append(text);
  }
}
