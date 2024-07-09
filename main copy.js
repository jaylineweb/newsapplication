
const API_KEY = `be3e9aaf141040b68a633150eff989ad`;

function getNews(){

    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    console.log('uuu',url);

    const response = fetch(url);
    console.log('rrr',response);
};

getNews();

for(let i=0; i<20; i++){
    console.log('after',i)
}

const API_KEY = `be3e9aaf141040b68a633150eff989ad`;

async function getNews(){

    let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    console.log('uuu',url);

    const response = await fetch(url);
    console.log('rrr',response);
};

getNews();

for(let i=0; i<20; i++){
    console.log('after',i)
}