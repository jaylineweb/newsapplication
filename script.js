let items = [
    { name: "apple", price: 50 },
    { name: "banana", price: 30 },
    { name: "cherry", price: 20 }
];

// 가격에 따라 오름차순 정렬
items.sort((a, b) => a.price - b.price);
console.log(items);