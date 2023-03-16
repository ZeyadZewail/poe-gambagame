import Trader from "./Trader";
interface TradeItem {
    itemName: string;
    price: number;
    stock: number;
    trader: Trader;
    afk: boolean;
    lifeForce:boolean;
}
export default TradeItem;