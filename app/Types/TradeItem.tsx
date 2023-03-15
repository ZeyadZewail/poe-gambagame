import { Region } from "./Region"
interface TradeItem {
    itemName: string;
    price: number;
    stock: number;
    sellerName: string;
    afk: boolean;
    region: Region;
}
export default TradeItem;