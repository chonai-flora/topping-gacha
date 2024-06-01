import ReactDOM from "https://cdn.skypack.dev/react-dom@17";
import React, { useState, useCallback, useEffect } from "https://cdn.skypack.dev/react@17";

type MenuType = {
    name: string;
    price: number;
};

const menus: MenuType[] = [
    { name: "チャーシュー増(1枚)", price: 150 },
    { name: "チャーシュー増(2枚)", price: 300 },
    { name: "チャーシューほぐし", price: 120 },
    { name: "チャーシュー盛", price: 500 },
    { name: "メンマ増", price: 100 },
    { name: "生玉子", price: 50 },
    { name: "味玉子", price: 100 },
    { name: "しっぱい味玉", price: 70 },
    { name: "味玉天国(3個)", price: 200 },
    { name: "ネギ増", price: 100 },
    { name: "水ギョーザのせ(3個)", price: 120 },
    { name: "味アブラ", price: 50 },
    { name: "とろけるチーズ", price: 80 },
    { name: "追い飯用ミニライス", price: 100 },
];

const App = (): JSX.Element => {
    const [orders, setOrders] = useState<MenuType[]>([]);
    const [money, setMoney] = useState<number>(0);
    const [limit, setLimit] = useState<number>(200);

    const updateOrders = useCallback(() => {
        let newOrders: MenuType[] = [];
        let newMoney: number = limit;

        while (newMoney > 0) {
            // eslint-disable-next-line
            const filteredMenus = menus.filter((menu) => newMoney - menu.price >= 0);
            const menuCount = filteredMenus.length;

            if (menuCount <= 0) {
                break;
            }
            else {
                const sideMenu = filteredMenus[Math.floor(Math.random() * menuCount)];
                newOrders.push(sideMenu);
                newMoney -= sideMenu.price;
            }
        }

        setOrders(newOrders);
        setMoney(newMoney);
    }, [limit]);

    useEffect(() => updateOrders(), [updateOrders]);

    return (
        <div className="h-[100svh] flex flex-col">
            <header className="navbar px-5 shadow text-2xl bg-base-100">
                <p className="font-semibold">トッピングガチャ</p>
            </header>

            <div className="container p-5 md:mx-auto md:w-[50rem]">
                <select
                    className="select select-bordered w-full"
                    value={limit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(Number(e.target.value))}
                >
                    {Array.from({ length: 10 }, (_, n) => (n + 1) * 50).map((price) => (
                        <option value={price} key={price}>設定金額: {price}円</option>
                    ))}
                </select>

                <div className="grid my-3 gap-4 grid-cols-2">
                    {orders.map((order) => (
                        <div className="card p-4 gap-3 shadow-md bg-gray-100 flex-col justify-between" key={order.name}>
                            <p className="card-title">{order.name}</p>
                            <p className="text-right">価格: {order.price}円</p>
                        </div>
                    ))}
                </div>
                <p className="text-right">合計: {limit - money}円</p>

                <div className="mt-5 text-center">
                    <button className="btn btn-outline btn-ghost" onClick={updateOrders}>
                        ガチャを引く
                    </button>
                </div>
            </div>

            <footer className="footer footer-center px-4 py-3 mt-auto bg-base-200">
                <aside>
                    <p className="text-sm text-red-500">※お店に迷惑が掛からないよう、美味しく食べ切れる範囲での注文をお願いします。</p>
                </aside>
            </footer>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));