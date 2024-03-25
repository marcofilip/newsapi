function displayArticles(articles) {
  const articleContainer = document.getElementById("article-container");
  let html = "";

  articles.forEach((article, index) => {
    html += createCard(article, index);
  });

  articleContainer.innerHTML = html;
}

let savedArticles = [];

document.getElementById("favoritesLink").addEventListener("click", () => {
  displayArticles(savedArticles);
});

function createCard(article, index) {
  const isSaved = savedArticles.some(
    (savedArticle) => savedArticle.url === article.url
);
  const deleteButton = isSaved
    ? `<input type="button" value="Cancella notizia salvata" class="btn btn-danger" onclick="deleteSavedArticle('${article.url}');">`
: "";
  return `
        <div class="row">
          <div class="col-md-3" id="article-${index}">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${
                  article.author || "Autore sconosciuto"
                }</p>
                <img src="${article.urlToImage}" style="width:250px"><br><br>
                <input type="button" value="Leggi di più..." class="btn btn-warning" onclick="window.open('${
                  article.url
                }', '_blank');">
                <input type="button" value="${
                  isSaved ? "Aggiungi ai preferiti 👍" : "Aggiungi ai preferiti"
                }" class="btn btn-dark" data-article='${JSON.stringify(article)}' onclick="saveArticle(this);">
                ${deleteButton}
              </div>
            </div>
          </div>
        </div>
       `;
}


function saveArticle(button) {
  var articleJson = button.getAttribute("data-article");
  var article = JSON.parse(articleJson);
  const isAlreadySaved = savedArticles.some(
    (savedArticle) => savedArticle.url === article.url
  );
  if (!isAlreadySaved) {
    savedArticles.push(article);
    console.log("Articolo salvato:", article.title);
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  } else {
    console.log("Articolo già salvato:", article.title);
  }
  displayArticles(savedArticles);
}

function deleteSavedArticle(articleUrl) {
  savedArticles = savedArticles.filter((article) => article.url !== articleUrl);
  console.log("Articolo cancellato:", articleUrl);
  displayArticles(savedArticles);
  localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
}
