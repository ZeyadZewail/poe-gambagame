import TradeItem from "~/Types/TradeItem";

export interface TradeListingProps {
    tradeItem: TradeItem;
}
const TradeListing: React.FC<TradeListingProps> = ({ tradeItem }) => {

    var itemOnePrice = parseFloat((tradeItem.price / tradeItem.stock).toFixed(3));
    var divOnePrice = parseFloat((1 / itemOnePrice).toFixed(3));
    if (tradeItem.stock > tradeItem.price) {
        itemOnePrice = parseFloat((tradeItem.price / tradeItem.stock).toFixed(5));
        divOnePrice = tradeItem.stock / tradeItem.price;
    }
    return (
        <div className="tradeListing">
            <div className="left details">
                <div className="price">
                    <div className="per-have">
                        <span>
                            <span className="amount">1</span>
                            <span>&nbsp;×&nbsp;</span>

                            {tradeItem.lifeForce ? (<span className="currency-text"><img src="https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGFydmVzdC9WaXZpZExpZmVmb3JjZSIsInNjYWxlIjoxfV0/a355b8a5a2/VividLifeforce.png" alt="vivid-lifeforce" title="vivid-lifeforce" />
                            </span>) : (<span className="currency-text">{tradeItem.itemName}</span>)}

                        </span>
                        <span>⇐</span>
                        <span>
                            <span className="amount">{itemOnePrice}</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">
                                <img src="https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJzY2FsZSI6MX1d/ec48896769/CurrencyModValues.png" alt="divine" title="divine" />
                            </span>
                        </span>
                    </div>
                    <div className="per-want">
                        <span>
                            <span className="amount">1</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">
                                <img src="https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJzY2FsZSI6MX1d/ec48896769/CurrencyModValues.png" alt="divine" title="divine" />
                            </span>
                        </span>
                        <span>⇒</span>
                        <span>
                            <span className="amount">{divOnePrice}</span>
                            <span>&nbsp;×&nbsp;</span>
                            {tradeItem.lifeForce ? (<span className="currency-text"><img src="https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGFydmVzdC9WaXZpZExpZmVmb3JjZSIsInNjYWxlIjoxfV0/a355b8a5a2/VividLifeforce.png" alt="vivid-lifeforce" title="vivid-lifeforce" />
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
                                <img src="https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGFydmVzdC9WaXZpZExpZmVmb3JjZSIsInNjYWxlIjoxfV0/a355b8a5a2/VividLifeforce.png" alt="vivid-lifeforce" title="vivid-lifeforce" />
                            )}
                            <span>&nbsp;×&nbsp;</span>
                            <span className="amount">{tradeItem.stock}</span>
                        </div></span>
                    <span style={{ alignSelf: "flex-end", fontSize: "0.8em" }}>⇐</span>
                    <span className="price-right"><small>what you pay</small>
                        <div className="price-block">
                            <span className="amount">{tradeItem.price}</span>
                            <span>&nbsp;×&nbsp;</span>
                            <img src="https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJzY2FsZSI6MX1d/ec48896769/CurrencyModValues.png" alt="divine" title="divine" />
                            <span className="currency-text">Divine Orb</span>
                        </div>
                    </span>
                </div>
            </div>
            <div className="right">
                <div className="details">
                    <div className="info">
                        <span className="pull-right">
                            <span className="profile-link">{tradeItem.sellerName}&nbsp;<i title={`flag ${tradeItem.region}`} className={`flag ${tradeItem.region}`}></i></span>
                        </span>
                        <div className="stock">
                            Stock:&nbsp;
                            <span>{tradeItem.stock}</span>
                            &nbsp;
                            <span className="currency-text">{tradeItem.itemName}</span>
                        </div>
                    </div>
                    <div className="Contact Options">
                        <span className="status status-online">Online</span>
                        <button className="directWhisper">Direct Whisper</button>
                    </div>
                </div>
            </div>
        </div>)
}
export default TradeListing;