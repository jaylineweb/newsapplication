let news = []; // 'news'를 다른 함수에서도 쓸 수 있게 전역 변수로 선언해주기

const getLatestNews = async () => {
    const url = new URL(`https://apisuccess.netlify.app/top-headlines?country=kr&pageSize=2`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles; // 뉴스 기사들을 news 변수에 재할당

    const newsArea = document.getElementById('newsArea');
    document.getElementById('newsArea').innerHTML='';// 기존 내용을 초기화

    news.forEach(article => {
        const newsRow = document.createElement('div');
        newsRow.classList.add('row', 'news');

        const newsImgDiv = document.createElement('div');
        newsImgDiv.classList.add('col-lg-4');
        const newsImg = document.createElement('img');
        newsImg.src = article.urlToImage;
        newsImg.alt = '이미지';
        newsImg.classList.add('news-img-size');
        newsImgDiv.appendChild(newsImg);

        const newsContentDiv = document.createElement('div');
        newsContentDiv.classList.add('col-lg-8');
        const newsTitle = document.createElement('h2');
        newsTitle.textContent = article.title;
        const newsDescription = document.createElement('p');
        newsDescription.textContent = article.description;
        newsContentDiv.appendChild(newsTitle);
        newsContentDiv.appendChild(newsDescription);

        newsRow.appendChild(newsImgDiv);
        newsRow.appendChild(newsContentDiv);

        newsArea.appendChild(newsRow);
    });
};

getLatestNews(); // 함수를 호출하여 뉴스 데이터를 가져오고 동적으로 HTML에 삽입한다.
