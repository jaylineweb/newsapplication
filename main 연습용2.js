
const getLatestNews = ()=>{
    //api키 따로 빼놓기
    const API_KEY = `be3e9aaf141040b68a633150eff989ad`;
    //뉴스를 들고 오려면 가장 필요한 것은? :url 주소이다.
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); // 인스턴스 : url에 필요한 함수와 변수들을 제공함. || 'URL'이라는 새로운 인스턴스(new)를 만들어준다. : new URL() || URL의 주소는 https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}를 통해 생성이 된다.
    //console.log('uuu',url);

    //1. fetch(url) // url을 통해서 인터넷 세계에 접속해서 데이터를 긁어오는게 목표 => 그것을 가능하게 해주는 함수
    const response = fetch(url); //2. response변수에 담아주기 || fetch가 끝나면 response값을 받아볼 수 있다. || fetch가 어떻게 동작하는지 어떻게 url을 호출하는건지 javascript의 기본 원리를 알 필요가 있다.
    /*
    uuu URL {
        href: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=be3e9aaf141040b68a633150eff989ad',
        origin: 'https://newsapi.org',
        protocol: 'https:',
        username: '',
        password: '',
        host: 'newsapi.org',
        hostname: 'newsapi.org',
        port: '',
        pathname: '/v2/top-headlines',
        search: '?country=us&apiKey=be3e9aaf141040b68a633150eff989ad',
        searchParams: URLSearchParams { 'country' => 'us', 'apiKey' => 'be3e9aaf141040b68a633150eff989ad' },
        hash: ''
    }*/
   console.log(response)
};

getLatestNews(); //함수를 호출해야 한다.
