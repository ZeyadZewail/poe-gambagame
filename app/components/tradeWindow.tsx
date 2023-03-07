import tradeLogo from "~/assets/tradelogo.png"
import vividlf from "~/assets/vividlf.png"
import DivCardGenerator from "./divCardGenerator";


export interface TradeWindowProps {
    currency: number;
    divcards: any;
}


const TradeWindow: React.FC<TradeWindowProps> = ({ currency, divcards }) => {
    return (
        <div className="tradewindow">
            <div className="header">
                <div className="logo">
                    <img src={tradeLogo} />
                </div>
                <div className="currency">
                    {currency} Div
                </div>
            </div>
            <div className="searchbar">
                <div className="buttons">
                    <button>Search Listed Items</button> <button>Reset</button>
                </div>
                <div className="inputField">
                    <input></input>
                </div>
            </div>
            <div className="itemSelection">
                <div className="lifeforce">
                    <img src={vividlf} />
                    Vivid Crystallised Lifeforce
                </div>
                <div className="divcards">
                    <div className="options"></div>
                    <div className="cards">
                        {divcards.map(divcard => (
                            <DivCardGenerator divcard={divcard} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="searchButton">
                <button>Search</button>
            </div>
        </div>
    )
}
export default TradeWindow;