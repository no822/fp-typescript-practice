import { cart, Item } from './cart';
import './index.css';
// todo 1. 장바구니 데이터 렌더링 복습(cart.ts 파일만 보고 구현해보기)
    // 1.1 요구사항1: cart 배열에 담긴 각 상품 정보를 렌더링(상품명, 가격, 재고) ✓
    // 1.2 요구사항2: 전체가격, 전체갯수 렌더링 ✓
    // 1.3 요구사항3: 재고가 없는 상품을 다르게 표시 ✓
// todo 2. 같은 로직을 좀더 함수형으로 구현
    // 2.1 함수 쪼개기(stockItem, outOfStockItem, Item, totalPrice, totalCount 함수들..) ✔
    // 2.2 반복문 대신의 map, filter 등의 메소드 활용 ✓
    // 2.3 totalPrice와 totalCount함수에서 공통적인 로직을 함수인자로 받도록 변경(totalCalculator) ✔
    // 2.4 cart를 묵시적입력에서 명시적 입력값으로 받도록 수정 ✓


const stockItem = (a: Item): string => {
    return `
        <li>
            <h1>${a.name}</h1>
            <div>가격: ${a.price}원</div>
            <div>수량: ${a.quantity}상자</divl>
        </li>   
    `;
};

const outOfStockItem = (a: Item): string => {
    return `
        <li class="gray">
            <h1 >${a.name} (품절)</h1>
            <div class="strike">가격: ${a.price}원</div>
            <div class="strike">수량: ${a.quantity}상자</divl>
        </li>
    `;
};

const item = (a: Item): string => {
    if (a.outOfStock) {
        return outOfStockItem(a);
    }else {
        return stockItem(a);
    }
};

const totalCalculator = (list: Array<Item>, getValue:(a: Item) => number) => {
   let result: Array<number> = [];
   list.forEach(item => {
       if (item.outOfStock === false) {
           result.push(getValue(item))
       }
   })
   return result.reduce((total, value) => total + value, 0);
};

const totalPrice = (list: Array<Item>): string => {
    let price = totalCalculator(list, (i) => i.price * i.quantity)
    return `<h1>전체가격: ${price}원</h1>`;
};

const totalCount = (list: Array<Item>): string => {
    let count = totalCalculator(list, (i) => i.quantity);
    return `<h1>전체수량: ${count}상자<h1>`;
};

const list = (list: Array<Item>): string => {
    let html =
        `<ul>
            ${list
                .map(item)
                .reduce((tags, tag) => tags + tag, "")
            }
        </ul>`;
    return html;
};


const main = () => {
    const app = document.querySelector('#app');
    if (app !== null) {
        app.innerHTML = `
            ${list(cart)}
            ${totalCount(cart)}
            ${totalPrice(cart)}
        `;
    }
};

main();

// todo 3. 장바구니 데이터에 discountPrice? 추가
// todo 4. 2에 추가한 값에 대한 처리 추가(조건문 사용)
// todo 5. 조건문을 사용하지 않고 Option<A> 타입 사용하도록 변경하기