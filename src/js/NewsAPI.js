export default class NewsAPI {
  constructor(url) {
    this.url = url;
  }

  async getNews() {
    try {
      const response = await fetch(this.url);
      return await response.json();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
