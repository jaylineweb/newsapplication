
//api키 따로 빼놓기
const API_KEY = `be3e9aaf141040b68a633150eff989ad`;
let news = [];
const getLatestNews = async ()=>{
    //뉴스를 들고 오려면 가장 필요한 것은? :url 주소이다.
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); // 인스턴스 : url에 필요한 함수와 변수들을 제공함. || 'URL'이라는 새로운 인스턴스(new)를 만들어준다. : new URL() || URL의 주소는 https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}를 통해 생성이 된다.
    //console.log('uuu',url);

    //1. fetch(url) // url을 통해서 인터넷 세계에 접속해서 데이터를 긁어오는게 목표 => 그것을 가능하게 해주는 함수
    const response = await fetch(url); //2. response변수에 담아주기 || fetch가 끝나면 response값을 받아볼 수 있다. || fetch가 어떻게 동작하는지 어떻게 url을 호출하는건지 javascript의 기본 원리를 알 필요가 있다.
    // fetch는 바로 끝나는 작업이 아니다.
    // 데이터가 올 때까지 기다려야 되는 상황이다.
    // fetch가 아직 안 끝난 (데이터가 완전히 전송되지 않았음에도 불구하고 ) 상황에서 console.log('rrr',response)을 실행할 경우 아직 '대기'상태라고 말해주게 된다. =>Promise { <pending> }
    // fetch() => 결론 : 우리가 기다려줘야 한다.

    //body: { stream: undefined } => 우리가 보고 싶은 내용은 'body'안에 들어가 있다. 이 경우 우리가 보고 싶은 데이터를 'json'화 시켜줘야 될 필요가 있다.
    const data = await response.json(); // 객체를 텍스트화시킨 타입 || 객체처럼 생긴 텍스트 타입
    news = data.articles;
    console.log('ddd',news); //rrr Promise { <pending> } fetch는 인터넷을 사용하는 상황에 따라 다를 수 있다. => 데이터를 갖고오는 속도가 다르다.

};

getLatestNews(); //함수를 호출해야 한다.
