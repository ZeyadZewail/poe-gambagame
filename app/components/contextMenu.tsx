export interface ContextMenuProps { }
const ContextMenu: React.FC<ContextMenuProps> = ({ }) => {
    return (
        <div className="itemContextMenu">
            <div className="closeButton" onClick={()=>console.log("close window")}>
            </div>
            <div className="options">
                <div className="topWrapper"></div>
                <div className="buttons">
                    <button>Turn Item In</button>
                    <button>Sell Item</button>
                </div>
            </div>
            <div className="bottomWrapper"></div>
        </div>)
}
export default ContextMenu;