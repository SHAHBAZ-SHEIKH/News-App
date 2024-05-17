
// let getData = () => {
//     const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
//     const url = "https://newsapi.org/v2/everything?q=Pakistan&apiKey=";
//     return new Promise ((resolve,reject) =>{
//         fetch(`${url}${API_KEY}`)
//         .then(res => res.json())
//         .then(res => {
//             resolve(res)
//         })
//         .catch(err=> reject(err))
//     })
// }
// let setData = async () =>{
//     try{
//         const res = await getData();
//         // console.log(res)
//         bindData(res.articles)
//     }
//     catch(err){
//         console.log("Data Nahi hai" + err)
//     }

// }
// setData()

const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Pakistan"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById("card-Container")
    const newCardTemplete = document.getElementById("template-news-card")
    

    cardContainer.innerHTML="";
    
    articles.forEach((article) =>{
        if(!article.urlToImage) return;
            
            

        const cardClone = newCardTemplete.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}


function fillDataInCard(cardClone,article){
    const newImg = cardClone.querySelector("#news-img");
    const newTitle = cardClone.querySelector("#news-title");
    const newSource = cardClone.querySelector("#news-source");
    const newDesc = cardClone.querySelector("#news-desc");

    newImg.src = article.urlToImage;
    newTitle.innerHTML = article.title;
    newDesc.innerHTML = article.description;

    const date = new Date (article.publishedAt).toLocaleString("en-Us",{
        timeZone: "Asia/Karachi",
    });

    newSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}



let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active")

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});