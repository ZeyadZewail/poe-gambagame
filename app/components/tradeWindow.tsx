import { useEffect, useRef, useState } from "react";
import tradeLogo from "~/assets/tradelogo.png"
import vividlf from "~/assets/vividlf.png"
import { Region } from "~/Types/Region";
import TradeItem from "~/Types/TradeItem";
import DivCardGenerator from "./divCardGenerator";
import TradeListing from "./tradeListing";


export interface TradeWindowProps {
    currency: number;
    divcards: any;
}


const TradeWindow: React.FC<TradeWindowProps> = ({ currency, divcards }) => {
    const [selectedCard, setSelectedCard] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const searched = true;
    const defaultTradeItem: TradeItem = {
        itemName: "Example Item",
        price: 8.5,
        stock: 2,
        sellerName: "John Doe",
        region: Region.English,
        afk: false
    }

    const handleCardClick = (itemName: string) => {
        if (itemName === selectedCard) {
            // If the clicked card is already selected, deselect it
            setSelectedCard("");
        } else {
            // If a different card is clicked, select it
            setSelectedCard(itemName);
        }
    };
    const resetSearch = () => {
        setSelectedCard("");
        setSearchValue("");
    }
    const filteredDivCards = divcards.filter((divcard: any) =>
        divcard.itemName.toLowerCase().includes(searchValue.toLowerCase())
    );
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="tradewindow">
            <div className="header">
                <div className="menuButtons">
                    <button>Back to Game</button>
                </div>
                <div className="logo">
                    <img src={tradeLogo} />
                </div>
                <div className="currency">
                    {currency} Div
                </div>
            </div>
            <div className="searchbar">
                <ul className="buttons">
                    <li className="searchTextLi">
                        <span className="searchText">Search Listed Items</span>
                    </li>
                    <li className="resetButtonLi">
                        <span className="resetButton" onClick={resetSearch}>Reset</span>
                    </li>
                </ul>
                <div className="searchbarInputWrapper">
                    <div className="searchbarInput">
                        <div className="inputField">
                            <input
                                className="searchField"
                                ref={inputRef}
                                value={searchValue}
                                placeholder={"Search Items..."}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {!searched && (
                <div>
                    <div className="itemSelection">
                        <div className={`lifeforce ${selectedCard === "lifeforce" ? "selectedItem" : ""}`} onClick={() => handleCardClick("lifeforce")}>
                            <img src={vividlf} />
                            Vivid Crystallised Lifeforce
                        </div>
                        <div className="divcards">
                            <div className="options"></div>
                            <div className="cards">
                                {filteredDivCards.map(divcard => (
                                    <div className={`card ${selectedCard === divcard.itemName ? "selectedItem" : ""}`} onClick={() => handleCardClick(divcard.itemName)} key={divcard.itemName}>
                                        <DivCardGenerator divcard={divcard} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="searchButton">
                        <button className="search-btn">Search</button>
                    </div>
                </div>
            )}
            <TradeListing tradeItem={defaultTradeItem} />
        </div>
    )
}
export default TradeWindow;