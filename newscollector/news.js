document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '24552634678740ef85412e6e3cecbcf7';
  const apiEndpoint = 'https://newsapi.org/v2/everything';
  const newsContainer = document.getElementById('news-container');

  fetch(`${apiEndpoint}?apiKey=${apiKey}&q=latest`)
    .then(response => response.json())
    .then(data => {
      displayNews(data.articles);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  function displayNews(articles) {
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const fullContainer = document.createElement('div');
      const articleElement = document.createElement('div');
      fullContainer.className = 'article';

      const titleElement = document.createElement('h2');
      titleElement.textContent = article.title;

      const image = document.createElement('img');
      image.className = 'article-image';
      image.setAttribute('src', article.urlToImage);
      image.setAttribute('alt', article.title);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = article.description;

      const urlElement = document.createElement('a');
      urlElement.href = article.url;
      urlElement.textContent = 'Read more';
      urlElement.className = 'url-button'; // Added the new class

      articleElement.appendChild(titleElement);
      articleElement.appendChild(image);
      articleElement.appendChild(descriptionElement);
        fullContainer.appendChild(articleElement);
        fullContainer.appendChild(urlElement);

      newsContainer.appendChild(fullContainer);
    });
  }
});
