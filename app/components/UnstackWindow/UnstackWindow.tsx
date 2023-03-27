import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import type Item from "~/Types/Item";
import Slider from "./Slider";
import unstackBG from "../../assets/sliderwindow.png";
import buttonBG from "../../assets/unstackbutton_normal.png";
import { mouseItem } from "../MouseFollower/MouseFollower";
import type ItemInventory from "~/Types/ItemInventory";
import { unStackVar } from "~/routes";
import playSound, { AudioFile } from "../audioPlayer";

const unStackWindowItemVar = atom<Item | null>(null);
const unStackWindowItemParentVar = atom<ItemInventory | null>(null);
const UnStackWindowLocationVar = atom({ x: 0, y: 0 });
export { unStackWindowItemVar, UnStackWindowLocationVar, unStackWindowItemParentVar };

const starterCount = 1;

const UnstackWindow = () => {
	const [item] = useAtom(unStackWindowItemVar);
	const [parentInventory] = useAtom(unStackWindowItemParentVar);
	const [location] = useAtom(UnStackWindowLocationVar);
	const [value, SetValue] = useState<number>(starterCount);
	const SetCurrentMouseItem = useSetAtom(mouseItem);
	const SetSpawnUnstack = useSetAtom(unStackVar);

	useEffect(() => {
		SetValue(starterCount);
	}, [item]);

	const HandleOk = () => {
		SetSpawnUnstack(false);
		if (item != null && value != 0) {
			playSound(AudioFile.itemPickUp)
			SetCurrentMouseItem({ ...item, count: value });
			if (item.count - value === 0) {
				if (parentInventory != null) {
					parentInventory.removeItem(item);
				}
			} else {
				item.count -= value;
			}
		}
	};

	return (
		<div
			className="fixed text-white z-50 bg-no-repeat flex flex-col bg-contain p-1 select-none"
			style={{
				transform: `translate(${location.x}px,${location.y}px)`,
				backgroundImage: `url(${unstackBG})`,
			}}
			onClick={(e) => {
				e.stopPropagation();
			}}
			onWheel={(e) => {
				if (e.deltaY < 0) {
					// console.log("Up");
					if (item) {
						SetValue(Math.min(item.count, value + 1));
					}
				} else {
					// console.log("Down");
					if (item) {
						SetValue(Math.max(0, value - 1));
					}
				}
			}}>
			{item != null ? (
				<div className="p-4">
					<Slider min={0} max={item.count} value={value} />
				</div>
			) : null}
			<button className="m-0 w-fit relative top-[0%] scale-75 self-end" onClick={HandleOk}>
				<img src={buttonBG} alt="unstack Button" />
			</button>
		</div>
	);
};

export default UnstackWindow;
