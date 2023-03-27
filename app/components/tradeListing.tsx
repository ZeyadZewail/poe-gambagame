import TradeItem from "~/Types/TradeItem";
import divineicon from "~/assets/divineorb.png"
import vividicon from "~/assets/vividlf.png"
export interface TradeListingProps {
    tradeItem: TradeItem;
}
const TradeListing: React.FC<TradeListingProps> = ({ tradeItem }) => {

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
        console.log(tradeItem);
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