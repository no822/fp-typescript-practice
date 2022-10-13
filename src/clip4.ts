import { cart } from './cart';
import './index.css';

// todo if문과 for문을 이용해서 장바구니 데이터 렌더링
// html을 반환하는 list 함수 작성

const list:() => string = () => {
    let html = '<ul>';
    // 1. cart 데이터 for문으로 순회
    for (let i=0; i<cart.length; i++) {
    // 2. 순회하면서 (상품명, 가격, 수량) 렌더링
    // 3. 품절인 경우의 분기 추가
        if (cart[i].outOfStock === false) {
            html += '<li>';
            html += `<h1>${cart[i].name}</h1>`
            html += `<div>가격: ${cart[i].price} 원</div>`
            html += `<div>수량: ${cart[i].quantity} 상자</div>`
            html += '</li>';
        }else {
            html += '<li class="gray">';
            html += `<h1>${cart[i].name}</h1>`
            html += `<div class="strike">가격: ${cart[i].price} 원</div>`
            html += `<div class="strike">수량: ${cart[i].quantity} 상자</div>`
            html += '</li>';
        }
    }
    html += '</ul>';

    //4. 전체수량, 전체가격 렌더링
    let totalCount = 0;
    for (let i=0; i<cart.length; i++) {
        if (cart[i].outOfStock === false) {
            totalCount += cart[i].quantity;
        }
    }
    html += `<h1>전체갯수 : ${totalCount}상자</h1>`;

    let totalPrice = 0;
    for (let i=0; i<cart.length; i++) {
        if (cart[i].outOfStock === false) {
            totalPrice += cart[i].price * cart[i].quantity;
        }
    }
    html += `<h1>전체금액 : ${totalPrice}원</h1>`


    return html;
}



const app = document.getElementById('app');

if (app != null) {
   app.innerHTML = `
        <h1>장바구니</h1>
        ${list()}
   `;
}