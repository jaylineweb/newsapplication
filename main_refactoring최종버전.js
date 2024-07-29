let newsList = [];
let searchContainer = document.querySelector(".search-container");
let searchButton = document.querySelector(".search-button");
let inputArea = document.querySelector(".input-area");
const menus = document.querySelectorAll('.menus button');
let keyword = '';
let navBar = document.querySelector('.menus-container');

menus.forEach(menu => menu.addEventListener('click', event => {
    setActiveButton(event.target); // active 클래스 설정
    page = 1; // 페이지 번호를 1로 초기화
    fetchNews({ category: event.target.textContent.toLowerCase() });
}));

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
    page = 1; // 페이지 번호를 1로 초기화
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
    //const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr${category ? `&category=${category}` : ''}${keyword}`);
    //새로운 api주소: https://noona-times-be-5ca9402f90d9.herokuapp.com
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr${category ? `&category=${category}` : ''}${keyword}`);
    console.log('Request URL:', url.toString()); // URL을 콘솔에 출력하여 확인
    try {
        url.searchParams.set('page', page); // => &page=page
        url.searchParams.set('pageSize', pageSize);

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
        console.log('ddddd', data);
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
    document.querySelector('.pagination').innerHTML = ''; // 페이지네이션 비우기
}

const paginationRender = () => {
    if (totalResults === 0) return; // 검색 결과가 없을 때 페이지네이션을 출력하지 않음

    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);

    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    let firstPage = lastPage - (groupSize - 1);
    if (firstPage <= 0) {
        firstPage = 1;
    }

    let paginationHTML = '';

    if (page > 1) {
        paginationHTML += renderPaginationButton(1, 'First', 'fa-angles-left');
        paginationHTML += renderPaginationButton(page - 1, 'Previous', 'fa-angle-left');
    }

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ''}" onclick="moveToPage(${i})"><a class="page-link" href="#n">${i}</a></li>`;
    }

    if (page < totalPages) {
        paginationHTML += renderPaginationButton(page + 1, 'Next', 'fa-angle-right');
        paginationHTML += renderPaginationButton(totalPages, 'Last', 'fa-angles-right');
    }

    document.querySelector('.pagination').innerHTML = paginationHTML;
};

const renderPaginationButton = (pageNum, label, iconClass) => {
    return `
        <li class="page-item" onclick='moveToPage(${pageNum})'>
            <a class="page-link" aria-label="${label}">
                <span aria-hidden="true"><i class="fa-solid ${iconClass}"></i></span>
            </a>
        </li>`;
};

const moveToPage = async (pageNum) => {
    console.log('moveToPage', pageNum);
    page = pageNum;
    await fetchNews();
};

function setActiveButton(clickedButton) {
    menus.forEach(menu => {
        menu.classList.remove('active');
    });
    clickedButton.classList.add('active');
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
