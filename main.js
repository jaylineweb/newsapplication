//api키 따로 빼놓기
const API_KEY = `be3e9aaf141040b68a633150eff989ad`;
let news = []; // 'news'를 다른 함수에서도 쓸 수 있게 전역 변수로 선언해주기
const getLatestNews = async ()=>{
    //뉴스를 들고 오려면 가장 필요한 것은? :url 주소이다.
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); // 인스턴스 : url에 필요한 함수와 변수들을 제공함. || 'URL'이라는 새로운 인스턴스(new)를 만들어준다. : new URL() || URL의 주소는 https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}를 통해 생성이 된다.
    //console.log('uuu',url);

    //1. fetch(url) // url을 통해서 인터넷 세계에 접속해서 데이터를 긁어오는게 목표 => 그것을 가능하게 해주는 함수
    //const response = fetch(url); //2. response변수에 담아주기 || fetch가 끝나면 response값을 받아볼 수 있다. || fetch가 어떻게 동작하는지 어떻게 url을 호출하는건지 javascript의 기본 원리를 알 필요가 있다.
    const response = await fetch(url);
    const data = await response.json();
    news= data.articles;//뉴스를 따로 빼기 || news 변수 재할당
    console.log('dddd',news); //rrr Promise { <pending> } || pending: 보류중

    /**
     * pending이 뜨는 이유 : 네트워크 상황에 따라 인터넷을 사용하는 속도가 다를 수 있다. fetch는 바로 끝나는 작업이 아니라 데이터가 올 때까지 기다려야 되는 상황을 말해준다.
     * 데이터가 아직 다 전송이 되지 않았음에도 불구하고 바로 console.log(response)를 입력할 경우 '대기' 상태임을 말하게 되는 것이다. 그래서
     * const response = fetch(url)에서 => const response = await fetch(url) 'await' 키워드를 앞에 붙여주면 '데이터를 받을 때까지 기다려주라'라는 명령을 실행함으로써 데이터 전송이 완료되는 시점까지 기다리게 되는 것이다.
     * 단순히 'await' 표현만 사용할 경우 경고문에 'async'함수에서 사용해야 될 표현이다라고 뜬다.
     */

};

getLatestNews(); //함수를 호출해야 한다.
