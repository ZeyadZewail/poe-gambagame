import { useEffect, useState } from "react"
import Item from "~/Types/Item";
import Uniqueitem from "~/Types/Uniqueitem";
import divineicon from "~/assets/divineorb.png"
export interface UniqueItemGeneratorProps {
    unique: Uniqueitem;
    item?: Item;
}
const UniqueItemGenerator: React.FC<UniqueItemGeneratorProps> = ({ unique, item }) => {
    const [uniuqeItem, setUniqueItem] = useState(unique);
    useEffect(() => {
        setUniqueItem(unique)
    }, [uniuqeItem])

    return (
        <div className="uniqueItem" style={{ maxWidth: `${unique.tooltipWidth}px` }}>
            <div className="header">
                <div className="itemName">
                    {unique.displayName}
                </div>
                <div className="baseName">
                    {unique.baseName}
                </div>
            </div>
            <div className="stats">
                {unique.itemFlask != undefined && (
                    <div>
                        <div className="flask">
                            <div>Lasts <span className="magicitem">{unique.itemFlask.lastsSeconds}</span> Seconds</div>
                            <div>Consumes <span className="normal">{unique.itemFlask.consumesCharges}</span> of <span className="normal">{unique.itemFlask.maxCharges}</span> charges on use</div>
                            <div>Currently has <span className="normal">{unique.itemFlask.maxCharges}</span> charges</div>
                            <div><span className="magicitem">{unique.itemFlask.baseEffect}</span></div>
                        </div>
                        <div className="separator"></div>
                    </div>)}
                {unique.itemRequirement > 0 && (<div><div className="requirement">
                    Requires Level <span className="normal">{unique.itemRequirement}</span>
                </div><div className="separator"></div></div>)}
                <div className="implicitArea">
                    {unique.itemImplicit.map((implicit, idx) => (
                        <div key={idx}>
                            <span key={idx}>{implicit}</span>
                        </div>
                    ))}
                </div>
                <div className="separator"></div>
                <div className="explicitArea">
                    {unique.itemExplicit.map((explicit, idx) => (
                        <div key={idx}>
                            <span key={idx}>{explicit}</span>
                        </div>
                    ))}
                </div>
                <div className="separator"></div>
                <div className="FlavourText">{unique.itemFlavourText}</div>
                <div className="separator"></div>
            </div>
            {item != null && (
                <div className="price">
                    <div className="exact">Exact Price:</div>
                    {item.price}x<img src={divineicon} alt="div" title="div" />
                    Divine Orbs
                </div>
            )}
        </div>
    )
}
export default UniqueItemGenerator;