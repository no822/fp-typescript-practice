export interface Item {
    readonly code: string;
    readonly outOfStock: boolean;
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly discountPrice?: number;
}

export const cart: Array<Item> = [
    {
        code: "tomato",
        outOfStock: false,
        name: "토마토",
        price: 7000,
        quantity: 2
    },
    {
        code: "orange",
        outOfStock: false,
        name: "오렌지",
        price: 15000,
        quantity: -2
    },
    {
        code: "apple",
        outOfStock: true,
        name: "사과",
        price: 10000,
        quantity: 2
    },
    {
        code: "mango",
        outOfStock: false,
        name: "망고",
        price: 12000,
        quantity: 20
    },
    {
        code: "grape",
        outOfStock: false,
        name: "포도",
        price: 5000,
        quantity: 10
    }
];
