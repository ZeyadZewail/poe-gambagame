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

                {unique.itemWeapon != undefined && (
                    <div>
                        <div className="weapon">
                            {unique.itemWeapon.base != undefined && (<div>{unique.itemWeapon.base}</div>)}
                            {(unique.itemWeapon.physDmgMin != undefined && uniuqeItem.itemWeapon?.physDmgMax != undefined) && (<div>Physical Damage: <span className="magicitem">{unique.itemWeapon.physDmgMin} to {unique.itemWeapon.physDmgMax}</span></div>)}
                            {unique.itemWeapon.crit != undefined && (<div>Critical Strike Chance: <span className="normal">{unique.itemWeapon.crit}%</span></div>)}
                            {unique.itemWeapon.aps != undefined && (<div>Attacks per Second: <span className="magicitem">{unique.itemWeapon.aps}</span></div>)}
                            {unique.itemWeapon.weaponrange != undefined && (<div>Weapon Range: <span className="normal">{unique.itemWeapon.weaponrange}</span></div>)}
                        </div>
                        <div className="separator"></div>
                    </div>
                )}
                {unique.itemArmour != undefined && (
                    <div>
                        <div className="armour">
                            {unique.itemArmour.quality != undefined && (<div>Quality: <span className="magicitem">{unique.itemArmour.quality}%</span></div>)}
                            {unique.itemArmour.chanceToBlock != undefined && (<div>Chance to Block: <span className="magicitem">{unique.itemArmour.chanceToBlock}%</span></div>)}
                            {unique.itemArmour.armour != undefined && (<div>Armour: <span className="magicitem">{unique.itemArmour.armour}</span></div>)}
                            {unique.itemArmour.evasion != undefined && (<div>Evasion: <span className="magicitem">{unique.itemArmour.evasion}</span></div>)}
                            {unique.itemArmour.energyshield != undefined && (<div>Energy Shield: <span className="magicitem">{unique.itemArmour.energyshield}</span></div>)}
                        </div>
                        <div className="separator"></div>
                    </div>)}


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
                {unique.corrupted && (
                    <div>
                        <div className="corruptedText">
                            <span className="corrupted">Corrupted</span>
                        </div>
                        <div className="separator"></div>
                    </div>
                )}
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