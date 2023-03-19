import { useEffect, useRef, useState } from "react";
import tradeLogo from "~/assets/tradelogo.png"
import vividlf from "~/assets/vividlf.png"
import generateTradeListings, { generateTraders } from "~/helpers/tradersGenerator";
import { Region } from "~/Types/Region";
import TradeItem from "~/Types/TradeItem";
import Trader, { TraderType } from "~/Types/Trader";
import ReactModal from 'react-modal';
import DivCardGenerator from "./divCardGenerator";
import TradeListing from "./tradeListing";
import divineicon from "~/assets/divineorb.png"

export interface TradeWindowProps {
    currency: number;
    divcards: any;
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const TradeWindow: React.FC<TradeWindowProps> = ({ currency, divcards, modalIsOpen, setModalIsOpen }) => {
    const [selectedCard, setSelectedCard] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searched, setSearched] = useState(false);
    const [itemsFound, setItemsFound] = useState<TradeItem[]>([]);
    const traders: Trader[] = generateTraders();
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
        setSearched(false);
        setItemsFound([]);
    }
    const search = () => {
        if (selectedCard != "") {
            itemsFound.push(...generateTradeListings(selectedCard, traders));
            setSearched(true);
        } else {
            itemsFound.push(...generateTradeListings("Vivid Crystallised Lifeforce", traders));
            setSearched(true);
        }
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
        <>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                className="tradeWindowModal"
                style={{
                    overlay: {
                        zIndex: 1000,
                        backgroundColor: 'rgba(25, 25, 25, 0.700)',
                    },
                }}
            >
                <div className="tradewindow">
                    <div className="header">
                        <div className="menuButtons">
                            <button className="backToGameButton" onClick={()=> setModalIsOpen(false)}>BACK TO GAME</button>
                        </div>
                        <div className="logo">
                            <img src={tradeLogo} />
                        </div>
                        <div className="currency">
                            {currency} <img src={divineicon} alt="divine" title="divine" />
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
                    {!searched ? (
                        <div>
                            <div className="itemSelection">
                                <div className={`lifeforce ${selectedCard === "Vivid Crystallised Lifeforce" ? "selectedItem" : ""}`} onClick={() => handleCardClick("Vivid Crystallised Lifeforce")}>
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
                                (Please select an item)
                                <button className="search-btn" onClick={search}>Search</button>
                            </div>
                        </div>
                    ) : (
                        <div className="searchListings">
                            {itemsFound.map(itemListing => (<TradeListing tradeItem={itemListing} key={itemListing.trader.accountName} />))}
                        </div>
                    )}

                </div>
            </ReactModal>
        </>
    )
}
export default TradeWindow;