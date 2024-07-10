let newsList = []; // 'news'를 다른 함수에서도 쓸 수 있게 전역 변수로 선언해주기

const getLatestNews = async () => {
    const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr&pageSize=8`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles; // 뉴스 기사들을 news 변수에 재할당
    render();
    console.log('ddddd',newsList);
};

const render = () => {
    const newsHTML = newsList.map((news) => {
        const publishedDate = new Date(news.publishedAt).toISOString().split('T')[0]; //2024-02-16T16:40:00Z 부분을 날짜 영역까지만 출력해주기
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
