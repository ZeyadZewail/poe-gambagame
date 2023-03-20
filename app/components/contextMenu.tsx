export interface ContextMenuProps { }
const ContextMenu: React.FC<ContextMenuProps> = ({ }) => {
    return (
        <div className="itemContextMenu">
            <div className="closeButton"></div>
            <div className="topWrapper"></div>
            <div className="buttons">
                <button>Turn Item In</button>
                <button>Sell Item</button>
            </div>
            <div className="bottomWrapper"></div>
        </div>)
}
export default ContextMenu;