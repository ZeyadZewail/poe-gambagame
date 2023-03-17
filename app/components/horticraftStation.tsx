export interface HorticraftStationProps {
    vividlf: number;
}

const HorticraftStation: React.FC<HorticraftStationProps> = ({ vividlf }) => {
    return (
        <div className="hortistation">
            <div className="frame"></div>
            <div className="topbar">
                <div className="text">
                    Horticrafting
                </div>
            </div>
            <div className="crafts"></div>
            <div className="itemSlot"></div>
            <div className="button">
                <button className="craftButton">Craft</button>
            </div>
            <div className="lifeforce">
                <div className="text">
                    {vividlf}
                </div>
            </div>
        </div>)
}
export default HorticraftStation;