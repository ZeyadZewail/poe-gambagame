import { useEffect, useState } from "react"
import Item from "~/Types/Item";
import Uniqueitem from "~/Types/Uniqueitem";
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
                    {unique.itemName}
                </div>
                <div className="baseName">
                    {unique.baseName}
                </div>
            </div>
            <div className="stats">
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
            </div>
        </div>
    )
}
export default UniqueItemGenerator;