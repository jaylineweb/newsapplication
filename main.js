//let apiKey = 'be3e9aaf141040b68a633150eff989ad';
let newsList = []; // 'news'를 다른 함수에서도 쓸 수 있게 전역 변수로 선언해주기
let searchContainer = document.querySelector(".search-container");
let searchButton = document.querySelector(".search-button");
let inputArea = document.querySelector(".input-area");
const menus = document.querySelectorAll('.menus button');
let keyword = ''; // 검색 키워드 변수 추가
let navBar = document.querySelector('.menus-container');

menus.forEach((menu)=>{
    menu.addEventListener('click',(event)=>{
        getNewsByCategory(event);
    })
})

searchButton.addEventListener("click", setKeywords);

// 윈도우 리사이즈 이벤트 리스너 추가
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        closeMenu();
    }
});

async function setKeywords() {
    if (inputArea.value == "") {
        alert("검색할 내용을 입력해주세요.");
        return;
    }
    keyword = `&q=${inputArea.value}`;
    inputArea.value = "";

    await getLatestNews();
    if (newsList.length === 0) {
        document.getElementById('news-board').innerHTML = `
            <div class="alert alert-danger" role="alert">
                해당 기사가 존재하지 않습니다.
            </div>
        `;
    }
}

function navBarActivate() {
    navBar.classList.toggle('active');
}

function searchIconActivate(){
    searchContainer.classList.toggle("active");
}

function closeMenu() {
    navBar.classList.remove('active');
}

const getLatestNews = async () => {
    const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr${keyword}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles; // 뉴스 기사들을 news 변수에 재할당
    render();
};

const getNewsByCategory= async (event)=>{
    keyword = ''; // 카테고리 선택 시 검색 키워드 초기화
    const category = event.target.textContent.toLowerCase();
    const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr&category=${category}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
};

const render = () => {
    const newsHTML = newsList.map((news) => {
        const publishedDate = new Date(news.publishedAt).toISOString().split('T')[0];
        const newsItem = `
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
        return newsItem;
    }).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

getLatestNews(); // 함수를 호출하여 뉴스 데이터를 가져오고 동적으로 HTML에 삽입한다.
