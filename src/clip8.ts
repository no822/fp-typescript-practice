import { cart, Item } from './cart';
import * as O from './option'
import './index.css';

// todo 1. 장바구니 데이터 렌더링 복습(cart.ts 파일만 보고 구현해보기)
    // 1.1 요구사항1: cart 배열에 담긴 각 상품 정보를 렌더링(상품명, 가격, 재고) ✓
    // 1.2 요구사항2: 전체가격, 전체갯수 렌더링 ✓
    // 1.3 요구사항3: 재고가 없는 상품을 다르게 표시 ✓
// todo 2. 같은 로직을 좀더 함수형으로 구현
    // 2.1 함수 쪼개기(stockItem, outOfStockItem, Item, totalPrice, totalCount 함수들..) ✔
    // 2.2 반복문 대신의 map, filter 등의 메소드 활용 ✓
    // 2.3 totalPrice 와 totalCount 함수에서 공통적인 로직을 함수인자로 받도록 변경(totalCalculator) ✔
    // 2.4 cart 를 묵시적입력에서 명시적 입력값으로 받도록 수정 ✓
// todo 3. option 타입 추가(+ cart 배열에 discountPrice 추가) ✓
// todo 4. 3에 추가한 값에 대한 처리 추가
    // 4.1 각 상품마다 할인가격 표시, 할인된 가격을 각 상품가격에 적용 ✓
    // 4.2 전체가격에서 총 할인가 표시, 할인된 가격을 전체가격에 적용 ✓
// todo 5. 조건문을 사용하지 않고 Option<A> 타입 사용하도록 변경하기 ✓
    // 5.1 fromUndefined 함수를 사용해서 값을 옵션타입으로 치환?
    // 5.2 getOrElse 함수에 옵션타입의 값과 defaultValue 를 넘겨주어서 discountPrice 프로퍼티가 없는 경우에도 값을 가지도록 변경


const stockItem = (a: Item): string => {
    const optionDiscountPrice = O.fromUndefined(a.discountPrice);
    const discountPrice = O.getOrElse(optionDiscountPrice, 0);
    const optionSaleText = O.map(optionDiscountPrice, (value) => `(${value}원 할인)`)
    const saleText = O.getOrElse(optionSaleText, '');
    return `
        <li>
            <h1>${a.name}</h1>
            <div>가격: ${a.price - discountPrice}원 ${saleText} </div>
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
           result.push(getValue(item));
       }
   })
   return result.reduce((total, value) => total + value, 0);
};

const totalPrice = (list: Array<Item>): string => {
    const price = totalCalculator(list, (i) => i.price * i.quantity)
    const totalDiscountPrice = totalCalculator(list, (i) => {
        const discountPrice = O.getOrElse(O.fromUndefined(i.discountPrice), 0);
        return discountPrice * i.quantity;
    });
    const optionDiscountText = O.map(O.fromUndefined(totalDiscountPrice), (value) => `(총 ${value}원 할인)`);
    const discountText = O.getOrElse(optionDiscountText, "");
    return `<h1>전체가격: ${price - totalDiscountPrice}원 ${discountText}</h1>`;
};

const totalCount = (list: Array<Item>): string => {
    const count = totalCalculator(list, (i) => i.quantity);
    return `<h1>전체수량: ${count}상자<h1>`;
};

const list = (list: Array<Item>): string => {
    return `<ul>
        ${list
            .map(item)
            .reduce((tags, tag) => tags + tag, "")
        }
    </ul>`;
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
