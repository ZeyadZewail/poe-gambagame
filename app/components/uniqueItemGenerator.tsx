import { useEffect, useState } from "react"

const UniqueItemGenerator = ({ unique }) => {
    const [uniuqeItem, setUniqueItem] = useState(unique);
    useEffect(() => {
        setUniqueItem(unique)
    }, [uniuqeItem])
    return (
        <div className="uniqueItem">
            <div className="header">
                <div className="itemName"></div>
                <div className="baseName"></div>
            </div>
            <div className="stats">
                <div className="requirement"></div>
                <div className="separator"></div>
                <div className="implicitArea">

                </div>
                <div className="separator"></div>
                <div className="explicitArea">

                </div>
                <div className="separator"></div>
                <div className="FlavourText"></div>
            </div>
        </div>
    )
}