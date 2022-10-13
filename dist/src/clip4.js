import { cart } from './cart';
import './index.css';
// todo if문과 for문을 이용해서 장바구니 데이터 렌더링
// html을 반환하는 list 함수 작성
var list = function () {
    var html = '<ul>';
    // 1. cart 데이터 for문으로 순회
    for (var i = 0; i < cart.length; i++) {
        // 2. 순회하면서 (상품명, 가격, 수량) 렌더링
        // 3. 품절인 경우의 분기 추가
        if (cart[i].outOfStock === false) {
            html += '<li>';
            html += "<h1>".concat(cart[i].name, "</h1>");
            html += "<div>\uAC00\uACA9: ".concat(cart[i].price, " \uC6D0</div>");
            html += "<div>\uC218\uB7C9: ".concat(cart[i].quantity, " \uC0C1\uC790</div>");
            html += '</li>';
        }
        else {
            html += '<li class="gray">';
            html += "<h1>".concat(cart[i].name, "</h1>");
            html += "<div class=\"strike\">\uAC00\uACA9: ".concat(cart[i].price, " \uC6D0</div>");
            html += "<div class=\"strike\">\uC218\uB7C9: ".concat(cart[i].quantity, " \uC0C1\uC790</div>");
            html += '</li>';
        }
    }
    html += '</ul>';
    //4. 전체수량, 전체가격 렌더링
    var totalCount = 0;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].outOfStock === false) {
            totalCount += cart[i].quantity;
        }
    }
    html += "<h1>\uC804\uCCB4\uAC2F\uC218 : ".concat(totalCount, "\uC0C1\uC790</h1>");
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].outOfStock === false) {
            totalPrice += cart[i].price * cart[i].quantity;
        }
    }
    html += "<h1>\uC804\uCCB4\uAE08\uC561 : ".concat(totalPrice, "\uC6D0</h1>");
    return html;
};
var app = document.getElementById('app');
console.log(app);
if (app != null) {
    app.innerHTML = "\n        <h1>\uC7A5\uBC14\uAD6C\uB2C8</h1>\n        ".concat(list(), "\n   ");
}
