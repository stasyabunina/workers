import News from "./News";

const container = document.querySelector(".news__container");

const news = new News(container);

news.init();

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register(
          './service-worker.js'
        );
        console.log('sw registered');
      }
      // await registration.unregister();
    } catch (e) {
      console.log(e);
    }
  });
}
