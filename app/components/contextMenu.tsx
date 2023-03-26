import { useLoaderData } from "@remix-run/react";
import { useAtom, useSetAtom } from "jotai";
import imageOuputter from "~/helpers/imageOutputter";
import { contextMenuVar, loader, unStackVar } from "~/routes";
import { findAvailableSpace } from "./SlotCell/SlotCell";
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
    const items = useLoaderData<typeof loader>();
    const sellItem = () => {
        if (parentInventory != null && item != null) {
            parentInventory.removeItem(item);
            SetContextMenu(false)
            parentInventory.currency = parentInventory.currency + item.price * item.count;
        }
    }
    const turnItemIn = () => {
        if (item != null && parentInventory != null && !parentInventory.horti) {
            if (item.count == item.maxStack) {
                SetContextMenu(false)
                let foundDivCard = items.divcards.find((d) => {
                    return d.itemName === item.name;
                });
                let foundReward = items.itemRewards.find((r) => {
                    return r.id === foundDivCard?.itemRewardId;
                });
                if (foundReward != null) {
                    foundReward.imgSrc = imageOuputter(foundReward.imgSrc)
                    let availableSpace = findAvailableSpace(parentInventory, foundReward.width, foundReward.length)
                    if (availableSpace != null) {
                        foundReward.x = availableSpace.x;
                        foundReward.y = availableSpace.y;
                        parentInventory.removeItem(item)
                        parentInventory.items.push(foundReward);
                    }
                }
            }
        }
    }
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
                    {(item!.type == 'divcard' && item!.count == item!.maxStack) && <button onClick={turnItemIn}>Turn Item In</button>}
                    {item!.count > 1 && <button onClick={openUnstackWindow}>Unstack Item</button>}
                </div>
            </div>
            <div className="bottomWrapper"></div>
        </div>)
}
export default ContextMenu;