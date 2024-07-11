let newsList = [];
let searchContainer = document.querySelector(".search-container");
let searchButton = document.querySelector(".search-button");
let inputArea = document.querySelector(".input-area");
const menus = document.querySelectorAll('.menus button');
let keyword = '';
let navBar = document.querySelector('.menus-container');

menus.forEach(menu => menu.addEventListener('click', event => fetchNews({ category: event.target.textContent.toLowerCase() })));

searchButton.addEventListener("click", setKeywords);

window.addEventListener('resize', () => {
    if (window.innerWidth > 991) closeMenu();
});

inputArea.addEventListener('keydown', event => {
    if (event.key === 'Enter') setKeywords();
});

async function setKeywords() {
    if (!inputArea.value.trim()) {
        alert("검색할 내용을 입력해주세요.");
        return;
    }
    keyword = `&q=${inputArea.value.trim()}`;
    inputArea.value = "";
    await fetchNews({ keyword });
}

function navBarActivate() {
    navBar.classList.toggle('active');
}

function searchIconActivate() {
    searchContainer.classList.toggle("active");
    inputArea.focus();
}

function closeMenu() {
    navBar.classList.remove('active');
}

async function fetchNews({ category = '', keyword = '' } = {}) {
    const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr${category ? `&category=${category}` : ''}${keyword}`);
    try {
        const response = await fetch(url);
        const data = await response.json();
        newsList = data.articles;
        renderNews();
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
}

function renderNews() {
    const newsHTML = newsList.map(news => {
        const publishedDate = new Date(news.publishedAt).toISOString().split('T')[0];
        return `
            <div class="row news">
                <div id="newsImg" class="col-lg-4">
                    <a href="${news.url}"><img src=${news.urlToImage} alt="이미지" class="news-img-size" onerror="this.src='https://placehold.co/416x250';"></a>
                </div>
                <div class="newsText col-lg-8" onclick="location.href='${news.url}'">
                    <h2 class="newsTitle">${news.title}</h2>
                    <p class="newsDescription">${news.description}</p>
                    <div class="newsSource">${news.source.name} * ${publishedDate}</div>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('news-board').innerHTML = newsHTML || `
        <div class="alert alert-danger" role="alert">
            No result for this search.
        </div>
    `;
}

fetchNews();
