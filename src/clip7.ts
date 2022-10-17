import { cart, Item } from './cart';
import './index.css';

// todo 함수형으로 리팩토링(여러번 연습해볼것)
// 1. 아이템 ✓
//  1.1 재고가 있는 아이템(stockItem): (i: Item) => string
//  1.2 재고가 없는 아이템(outOfStockItem): (i: Item) => string
//  1.3 재고여부에 따른 분기(item): (i: Item) => string

// 2. 전체수량, 전체갯수 ✓
//  2.1 전체수량을 구하는 함수: (cart: Array<Item>) => string
//  2.2 전체갯수를 구하는 함수: (cart: Array<Item>) => string
//  2.3 공통부분 추상화(재고가 있을때만 값을 더함): (list: Array<Item>, getValue:(x:Item) => number) => number

// 3. item을 묵시적입력값으로 사용하지 말고 명시적인 인자로 넣어줄 것 ✓

// 4. totalCalculator에서 포문 대신에 배열 메소드 사용 ✓

const stockItem:(i: Item) => string = (i) => {
    return (
        `<li>
            <h1>${i.name}</h1>
            <div>가격: ${i.price}원</div>
            <div>수량: ${i.quantity} 상자</div>
        </li>`);
};

const outOfStockItem:(i: Item) => string = (i) => {
    return (
        `<li class="gray">
            <h1>${i.name}</h1>
            <div class="strike">가격: ${i.price}원</div>
            <div class="strike">수량: ${i.quantity}상자</div>
        </li>`
    );
};

const item:(i: Item) => string = (i) => {
    if (i.outOfStock === false) {
        return stockItem(i);
    }else {
        return outOfStockItem(i);
    }
};

const totalCount:(list: Array<Item>) => string = (list) => {
    return `<h1>전체갯수: ${totalCalculator(list, (i) => i.quantity)}상자</h1>`;
};

const totalPrice:(list: Array<Item>) => string = (list) => {
    return `<h1>전체가격: ${totalCalculator(list, (i) => i.quantity * i.price)}원</h1>`;
};

const totalCalculator:(list: Array<Item>, f:(i: Item) => number) => number = (list, f) => {
    return list
        .filter(item => item.outOfStock === false)
        .map(item => f(item))
        .reduce((total, item) => total + item, 0);
};


const list:(list: Array<Item>) => string = (list) => {
    return `<ul>
            ${list.map(item).reduce((tags, tag) => tags + tag, "")}       
        </ul>`;
};


const app = document.getElementById('app');

if (app != null) {
    app.innerHTML =
        `<h1>장바구니</h1>
        ${list(cart)}
        ${totalPrice(cart)}
        ${totalCount(cart)}`;
}
