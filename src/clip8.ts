// noinspection DuplicatedCode

import { cart, Item } from './cart';
import * as O from './option'
import './index.css';
import * as T from './try';

type parsedItem = { _tag: 'parsedItem' } & Item;
type parseError = {
    name: string
    message: string
};

const parseItem = (item: Item): T.Try<parseError, parsedItem> => {
    if (item.quantity < 1) {
        return T.failed({
            name: item.name,
            message: '상품을 한 개 이상 담아야 합니다.'
        });
    } else if (item.quantity > 10) {
        return T.failed({
            name: item.name,
            message: '상품은 최대 10개까지 담을 수 있습니다.',
        });
    }

    return T.success({
        _tag: 'parsedItem',
        ...item
    })
};


const validateItem = (item: Item) => {
    if (item.quantity < 1) {
        throw new Error('상품을 한 개 이상 담아야 합니다.');
    } else if (item.quantity > 10) {
        throw new Error('상품은 최대 10개까지 담을 수 있습니다.');
    }
};

const stockItem = (item: parsedItem): string => {
    return `
        <li>
            <h1>${item.name}</h1>
            <div>가격: ${item.price}원</div>
            <div>수량: ${item.quantity}상자</divl>
        </li>   
    `;
};

const errorItem = (e: parseError): string => {
    return `
         <li style="color: red">
             <h2>${e.name}</h2>
             <div>${e.message}</div>
         </li>
        `;
};

const outOfStockItem = (a: parsedItem): string => {
    return `
        <li class="gray">
            <h1 >${a.name} (품절)</h1>
            <div class="strike">가격: ${a.price}원</div>
            <div class="strike">수량: ${a.quantity}상자</divl>
        </li>
    `;
};

const renderItem = (item: Item): string => {
    const parsedItem = parseItem(item);
    const render = T.map(parsedItem, (item) => {
        if (item.outOfStock) {
            return outOfStockItem(item);
        }else {
            return stockItem(item);
        }
    })
    return T.getOrElse(render, errorItem);
};

const totalCalculator = (list: Array<Item>, getValue:(a: Item) => number) => {
    return list
        .filter(i => {
            try {
                validateItem(i);
                return i.outOfStock === false
            } catch(e) {
                return false;
            }
        })
        .map(getValue)
        .reduce((total, price) => total + price, 0);
};

const totalDiscountPrice = (list: Array<Item>): string => {
    const price = totalCalculator(list, (i) => i.price * i.quantity);
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
    return (`<ul>
        ${list
            .map(renderItem)
            .reduce((tags, tag) => tags + tag, "")
    }
    </ul>`);
};

const main = () => {
    const app = document.querySelector('#app');
    if (app !== null) {
        app.innerHTML = `
            ${list(cart)}
            ${totalCount(cart)}
            ${totalDiscountPrice(cart)}
        `;
    }
};

main();
