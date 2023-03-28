import TradeItem from "~/Types/TradeItem";
import divineicon from "~/assets/divineorb.png"
import vividicon from "~/assets/vividlf.png"
import { useAtom } from "jotai";
import ItemInventory from "~/Types/ItemInventory";
import { inventoryVar } from "./Inventory/Inventory";
import Item from "~/Types/Item";
import divCardImage from "../assets/item_divcard.png";
import Divcard from "~/Types/Divcard";
import { availableSpaces, findAvailableSpace } from "./SlotCell/SlotCell";
import { LIFEFORCESWAPVALUE } from "~/routes";
export interface TradeListingProps {
    items: Divcard[];
    tradeItem: TradeItem;
    onRemove: () => void;
}
const TradeListing: React.FC<TradeListingProps> = ({ items, tradeItem, onRemove }) => {
    const [mainInventory] = useAtom<ItemInventory>(inventoryVar)
    var itemOnePrice = parseFloat((tradeItem.price / tradeItem.stock).toFixed(3));
    var divOnePrice = parseFloat((1 / itemOnePrice).toFixed(3));
    if (tradeItem.stock > tradeItem.price) {
        itemOnePrice = parseFloat((tradeItem.price / tradeItem.stock).toFixed(5));
        if (tradeItem.lifeForce)
            divOnePrice = tradeItem.stock / tradeItem.price;
        else
            divOnePrice = parseFloat((tradeItem.stock / tradeItem.price).toFixed(4));
    }
    const buyItem = () => {
        if (tradeItem.price > mainInventory.currency) {
            throw Error("Not enough currency")
        }
        else if (tradeItem.afk) {
            throw Error("AFK")
        }
        else if (tradeItem.lifeForce) {
            lifeForceTransaction();
            onRemove();
        } else {
            itemTransaction();
            onRemove();
        }
    }
    const lifeForceTransaction = () => {
        if (tradeItem.price <= mainInventory.currency) {
            mainInventory.currency = mainInventory.currency - tradeItem.price;
            mainInventory.lifeforce = mainInventory.lifeforce + tradeItem.stock;
        }
    }
    const itemTransaction = () => {
        let foundDivCard = items.find((d) => {
            return d.itemName === tradeItem.itemName;
        });
        if (foundDivCard != undefined) {
            const MAX_SPACE_AVAILABLE = availableSpaces(mainInventory, 1, 1);
            let maxStackSize = parseInt(foundDivCard.itemStackSize);
            let slotsNeeded = Math.ceil(tradeItem.stock / maxStackSize);
            if (slotsNeeded <= MAX_SPACE_AVAILABLE) {
                mainInventory.currency = mainInventory.currency - tradeItem.price;
                while (tradeItem.stock - maxStackSize >= 0) {
                    let newItem: Item;
                    const spaceFound = findAvailableSpace(mainInventory, 1, 1)
                    if (spaceFound != null) {
                        newItem = { count: maxStackSize, length: 1, width: 1, imgSrc: divCardImage, dropSound: 0, pickUpSound: 1, name: tradeItem.itemName, maxStack: maxStackSize, price: foundDivCard.itemPrice, type: "divcard", x: spaceFound.x, y: spaceFound.y, id: foundDivCard.itemRewardId }

                        mainInventory.items.push(newItem);
                    }
                    tradeItem.stock -= maxStackSize;
                }
                if( tradeItem.stock > 0){
                    let newItem: Item;
                    const spaceFound = findAvailableSpace(mainInventory, 1, 1)
                    if (spaceFound != null) {
                        newItem = { count: tradeItem.stock, length: 1, width: 1, imgSrc: divCardImage, dropSound: 0, pickUpSound: 1, name: tradeItem.itemName, maxStack: maxStackSize, price: foundDivCard.itemPrice, type: "divcard", x: spaceFound.x, y: spaceFound.y, id: foundDivCard.itemRewardId }
                        mainInventory.items.push(newItem);
                    }
                }
            } else {
                throw Error("No Space")
            }

        } else {
            throw Error("No Div Source Found!")
        }
    }
    return (
        <div className="tradeListing">
            <div className="left details">
                <div className="price">
                    <div className="per-have">
                        <span>
                            <span className="amount">1</span>
                            <span>&nbsp;×&nbsp;</span>

                            {tradeItem.lifeForce ? (<span className="currency-text"><img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
                            </span>) : (<span className="currency-text">{tradeItem.itemName}</span>)}

                        </span>
                        <span>⇐</span>
                        <span>
                            <span className="amount">{itemOnePrice}</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">
                                <img src={divineicon} alt="divine" title="divine" />
                            </span>
                        </span>
                    </div>
                    <div className="per-want">
                        <span>
                            <span className="amount">1</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">
                                <img src={divineicon} alt="divine" title="divine" />
                            </span>
                        </span>
                        <span>⇒</span>
                        <span>
                            <span className="amount">{divOnePrice}</span>
                            <span>&nbsp;×&nbsp;</span>
                            {tradeItem.lifeForce ? (<span className="currency-text"><img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
                            </span>) : (<span className="currency-text">{tradeItem.itemName}</span>)}

                        </span>
                    </div>
                </div>
            </div>
            <div className="middle details">
                <div className="price">
                    <span className="price-left">
                        <small>what you get</small>
                        <div className="price-block">
                            <span className="currency-text">{tradeItem.itemName}</span>
                            {tradeItem.lifeForce && (
                                <img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
                            )}
                            <span>&nbsp;×&nbsp;</span>
                            <span className="amount">{tradeItem.stock}</span>
                        </div></span>
                    <span style={{ alignSelf: "flex-end", fontSize: "0.8em" }}>⇐</span>
                    <span className="price-right"><small>what you pay</small>
                        <div className="price-block">
                            <span className="amount">{tradeItem.price}</span>
                            <span>&nbsp;×&nbsp;</span>
                            <img src={divineicon} alt="divine" title="divine" />
                            <span className="currency-text">Divine Orb</span>
                        </div>
                    </span>
                </div>
            </div>
            <div className="right">
                <div className="details">
                    <div className="info">
                        <span className="pull-right">
                            <span className="profile-link">{tradeItem.trader.accountName}&nbsp;<i title={`flag ${tradeItem.trader.region}`} className={`flag ${tradeItem.trader.region}`}></i></span>
                        </span>
                        <div className="stock">
                            Stock:&nbsp;
                            <span>{tradeItem.stock}</span>
                            &nbsp;
                            <span className="currency-text">{tradeItem.itemName}</span>
                        </div>
                    </div>
                    <div className="Contact Options">
                        {!tradeItem.afk ? (<span className="status status-online">Online</span>) :
                            (<span className="status status-afk">AFK</span>)}

                        <button className="directWhisper" onClick={buyItem}>Direct Whisper</button>
                    </div>
                </div>
            </div>
        </div>)
}
export default TradeListing;