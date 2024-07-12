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
    if (window.innerWidth > 991) closeMenu(); // mobile(991px) 변형 시(resizing) 사이드배너가 열린 상태로 view되는걸 방지
});

inputArea.addEventListener('keydown', event => {
    if (event.key === 'Enter') setKeywords();
});

async function setKeywords() {
    if (!inputArea.value.trim()) {
        alert("검색할 내용을 입력해주세요.");
        inputArea.focus(); // 값이 null일 시 focus
        return;
    }
    keyword = `&q=${inputArea.value.trim()}`;
    inputArea.value = "";
    await fetchNews({ keyword });
}

function navBarActivate() { // 햄버거 버튼 클릭 시 사이드 바 오픈
    navBar.classList.toggle('active');
}

function searchIconActivate() {
    searchContainer.classList.toggle("active");
    inputArea.focus(); // 값이 null일 시 focus
}

function closeMenu() {// 모바일 버전(991px) 사이드 배너 닫기 버튼
    navBar.classList.remove('active');
}

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

async function fetchNews({ category = '', keyword = '' } = {}) {
    const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr${category ? `&category=${category}` : ''}${keyword}`);
    console.log('Request URL:', url.toString()); // URL을 콘솔에 출력하여 확인
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.articles.length) {
            throw new Error("검색 결과가 없습니다.");
        }
        newsList = data.articles;
        totalResults = data.totalResults;
        console.log('ddddd',data);
        renderNews();
        paginationRender();
    } catch (error) {
        console.error("Error fetching news data:", error);
        renderError(error.message);
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
    document.getElementById('news-board').innerHTML = newsHTML;
}

function renderError(message) {
    document.getElementById('news-board').innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}

const paginationRender=()=>{
    //totalResult

    //page
    //pageSize
    //groupSize
    //pageGroup
    const pageGroup = Math.ceil(page / groupSize);
    //lastPage
    const lastPage = pageGroup * groupSize;
    //firstPage
    const firstPage = lastPage - (groupSize - 1);
    //first~last

    let paginationHTML = ``;

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
    }

    document.querySelector('.pagination').innerHTML = paginationHTML;
}

// Moment.js를 로드하기 위한 스크립트 추가
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.0/moment.min.js";
script.onload = async function() {
    await fetchNews(); // Moment.js 로드 후 fetchNews 호출
};
document.head.appendChild(script);

async function getNewsByCategory(category) {
    await fetchNews({ category });//getNewsByCategory 함수 => 비동기 함수로 변형 후 await fetchNews를 사용
}

async function getNewsByKeyword(keyword) {
    await fetchNews({ keyword });//getNewsByKeyword 함수 => 비동기 함수로 변형 후 await fetchNews 사용
}
