import { cart } from './cart';
import './index.css';
// todo 1. 장바구니 데이터 렌더링 복습(cart.ts 파일만 보고 구현해보기)
    // 1.1 요구사항1: cart 배열에 담긴 각 상품 정보를 렌더링(상품명, 가격, 재고) ✓
    // 1.2 요구사항2: 전체가격, 전체갯수 렌더링 ✓
    // 1.3 요구사항3: 재고가 없는 상품을 다르게 표시 ✓

const list = (): string => {
    let html = `<ul>`;
    for (let i=0; i<cart.length; i++) {
        if (cart[i].outOfStock === false) {
            html += `
                <li>
                    <h1>${cart[i].name}</h1>
                    <div>가격: ${cart[i].price}원</div>
                    <div>수량: ${cart[i].quantity}상자</divl>
                </li>   
            `;
        }else {
            html += `
                <li class="gray">
                    <h1 >${cart[i].name} (품절)</h1>
                    <div class="strike">가격: ${cart[i].price}원</div>
                    <div class="strike">수량: ${cart[i].quantity}상자</divl>
                </li>
            `;
        }
    }

    let totalPrice = 0;
    let totalAmount = 0;
    for (let i=0; i<cart.length; i++) {
       totalPrice += cart[i].price;
       totalAmount += cart[i].quantity
    }

    html += `
        <h1>전체가격: ${totalPrice}원</h1>
        <h1>전체수량: ${totalAmount}상자</h1>
    `;
    html += `</ul>`;


    return html;
};

const main = () => {
    const app = document.querySelector('#app');
    if (app !== null) {
        app.innerHTML = `
            ${list()}
        `;
    }
};

main();

// todo 2. 같은 로직을 좀더 함수형으로 구현(포문 등 사용하지 않기)
// todo 3. 장바구니 데이터에 discountPrice? 추가
// todo 4. 2에 추가한 값에 대한 처리 추가(조건문 사용)
// todo 5. 조건문을 사용하지 않고 Option<A> 타입 사용하도록 변경하기

