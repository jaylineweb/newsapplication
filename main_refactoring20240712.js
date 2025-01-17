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
        inputArea.focus();
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
    console.log('Request URL:', url.toString()); // URL을 콘솔에 출력하여 확인
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        newsList = data.articles;
        renderNews();
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
}

function renderNews() {
    const newsHTML = newsList.map(news => {
        const publishedDate = moment(news.publishedAt).fromNow();
        const description = news.description ? (news.description.length > 200 ? news.description.substring(0, 200) + '...' : news.description) : '내용 없음';
        const sourceName = news.source.name || 'no source';

        return `
            <div class="row news">
                <div id="newsImg" class="col-lg-4">
                    <a href="${news.url}"><img src=${news.urlToImage} alt="이미지" class="news-img-size" onerror="this.src='https://placehold.co/416x250';"></a>
                </div>
                <div class="newsText col-lg-8" onclick="location.href='${news.url}'">
                    <h2 class="newsTitle">${news.title}</h2>
                    <p class="newsDescription">${description}</p>
                    <div class="newsSource">${sourceName} * ${publishedDate}</div>
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

// Moment.js를 로드하기 위한 스크립트 추가
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.0/moment.min.js";
script.onload = function() {
    fetchNews(); // Moment.js 로드 후 fetchNews 호출
};
document.head.appendChild(script);
