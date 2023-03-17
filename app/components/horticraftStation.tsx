import vividicon from "~/assets/vividlf.png"
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
            <div className="crafts">
                <div className="craft">
                    <div className="text">
                        <span className="normal">Sacrifice</span> up to half a stack of <span className="normal">Divination Cards</span> to receive between 0 and twice that amount of the same Card
                    </div>
                    <div className="cost">
                        1500<img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
                    </div>
                </div>
            </div>
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