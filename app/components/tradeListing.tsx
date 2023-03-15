import TradeItem from "~/Types/TradeItem";

export interface TradeListingProps {
    tradeItem: TradeItem;
}
const TradeListing: React.FC<TradeListingProps> = ({ tradeItem }) => {
    const calcOnePrice = tradeItem.stock / tradeItem.price;
    const divOnePrice = 1 / tradeItem.price;
    return (
        <div className="tradeListing">
            <div className="left details">
                <div className="price">
                    <div className="per-have">
                        <span>
                            <span className="amount">1</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">{tradeItem.itemName}</span>
                        </span>
                        <span>⇐</span>
                        <span>
                            <span className="amount">{calcOnePrice}</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">DivIcon</span>
                        </span>
                    </div>
                    <div className="per-ant">
                        <span>
                            <span className="amount">1</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">DivIcon</span>
                        </span>
                        <span>⇒</span>
                        <span>
                            <span className="amount">{divOnePrice}</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="currency-text">{tradeItem.itemName}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="middle details">
                <div className="price">
                    <span className="price-left">
                        <small>what you get</small>
                        <div className="price-block">
                            <span className="currency-text">The Doctor</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span className="amount">1</span>
                        </div></span>
                    <span>⇐</span>
                    <span className="price-right"><small>what you pay</small>
                        <div data-field="have.divine" className="price-block s">
                            <span className="amount">8</span>
                            <span>&nbsp;×&nbsp;</span>
                            <span>DivIcon</span>
                            <span className="currency-text">Divine Orb</span>
                        </div>
                    </span>
                </div>
            </div>
            <div className="right details"></div>
        </div>)
}
export default TradeListing;