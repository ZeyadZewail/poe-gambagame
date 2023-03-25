import { useAtom, useSetAtom } from "jotai";
import { contextMenuVar, unStackVar } from "~/routes";
import { unStackWindowItemParentVar, unStackWindowItemVar, UnStackWindowLocationVar } from "./UnstackWindow/UnstackWindow";

export interface ContextMenuProps { }
const ContextMenu: React.FC<ContextMenuProps> = ({ }) => {
    const [location] = useAtom(UnStackWindowLocationVar);
    const SetContextMenu = useSetAtom(contextMenuVar);
    const [item] = useAtom(unStackWindowItemVar);
    const [parentInventory] = useAtom(unStackWindowItemParentVar);

    const SetUnstackWindow = useSetAtom(unStackVar);
    const SetUnstackWindowItem = useSetAtom(unStackWindowItemVar);
    const SetUnstackWindowLocation = useSetAtom(UnStackWindowLocationVar);
    const SetUnstackWindowItemParent = useSetAtom(unStackWindowItemParentVar);

    const sellItem = () => {
        if (parentInventory != null && item != null) {
            parentInventory.removeItem(item);
            SetContextMenu(false)
            parentInventory.currency = parentInventory.currency + item.price * item.count;
        }
    }
    const turnItemIn = () => { }
    const openUnstackWindow = () => {
        SetContextMenu(false)
        SetUnstackWindow(true);
        SetUnstackWindowItem(item);
        SetUnstackWindowItemParent(parentInventory);
        SetUnstackWindowLocation(location);
    }
    return (
        <div className="itemContextMenu"
            style={{
                transform: `translate(${location.x}px,${location.y}px)`
            }}>
            <div className="closeButton" onClick={() => SetContextMenu(false)}>
            </div>
            <div className="options">
                <div className="topWrapper"></div>
                <div className="buttons">
                    <button onClick={sellItem}>Sell Item</button>
                    {item!.type == 'divcard'  &&<button onClick={turnItemIn}>Turn Item In</button>}
                    {item!.count > 1 && <button onClick={openUnstackWindow}>Unstack Item</button>}
                </div>
            </div>
            <div className="bottomWrapper"></div>
        </div>)
}
export default ContextMenu;