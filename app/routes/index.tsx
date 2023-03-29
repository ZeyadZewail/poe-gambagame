import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import TradeWindow from "~/components/tradeWindow";
import stylesUrl from "~/style/index.css";
import Items from "~/data/items.json";
import { useLoaderData } from "@remix-run/react";
import HorticraftStation from "~/components/horticraftStation";
import InventoryWindow from "~/components/inventoryWindow";
import MouseFollower, { hoveredSlotLocationVar } from "~/components/MouseFollower/MouseFollower";
import { atom, useAtom, useAtomValue, useSetAtom, } from "jotai";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import { Fragment, MutableRefObject, useEffect, useState } from "react";
import DivCardGenerator from "~/components/divCardGenerator";
import Item from "~/Types/Item";
import Divcard from "~/Types/Divcard";
import ContextMenu from "~/components/contextMenu";
import BGMPlayer, { bgmVolumeVar } from "~/components/bgmPlayer";
import { bgmVar } from "../components/bgmPlayer";
import playSound, { AudioFile } from "~/components/audioPlayer";
import { cellSideLengthVar } from "~/components/SlotCell/SlotCell";
import Uniqueitem from "~/Types/Uniqueitem";
import UniqueItemGenerator from "~/components/uniqueItemGenerator";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
	return json(Items);
};

const renderVar = atom(false);
const unStackVar = atom(false);
const contextMenuVar = atom(false);
const hoverItemVar = atom<Item | null>(null);
const hoveredSlotVar = atom<MutableRefObject<null> | null>(null);
const LIFEFORCESWAPVALUE = 5000;

export { renderVar, unStackVar, hoverItemVar, hoveredSlotVar, contextMenuVar, LIFEFORCESWAPVALUE };

export default function Index() {
	const items = useLoaderData<typeof loader>();
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);
	const [spawnContextMenu, SetSpawnContextMenu] = useAtom(contextMenuVar);
	const hoverItem = useAtomValue(hoverItemVar);
	const hoveredSlot = useAtomValue(hoveredSlotVar);
	const hoveredSlotLocation = useAtomValue(hoveredSlotLocationVar);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [render] = useAtom(renderVar);
	const [tradeWindowOpen, setTradeWindowOpen] = useState(false);
	const setBgmMute = useSetAtom(bgmVar)
	const [bgmVolume, setBgmVolume] = useAtom(bgmVolumeVar)
	const setCellSideLength = useSetAtom(cellSideLengthVar);
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setCellSideLength((569 * window.innerWidth / 2000) / 12)
			};

			if (window.innerWidth && window.innerHeight) {
				handleResize();
			} else {
				window.addEventListener('load', handleResize);
			}

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				window.removeEventListener('load', handleResize);
			};
		}
	}, []);
	const DivHover = () => {
		if (hoverItem != null) {
			let foundItem: any;
			switch (hoverItem.type) {
				case "divcard":
					foundItem = items.divcards.find((d: Divcard) => {
						return d.itemName === hoverItem.name;
					});
					break;
				case "item":
					foundItem = items.uniqueItems.find((u: Uniqueitem) => {
						return u.itemName === hoverItem.name;
					});
					break;
				default:
					return;
			}
			if (foundItem != undefined && hoveredSlot?.current != null && hoveredSlotLocation != null) {
				//@ts-ignore
				const rect = hoveredSlot.current.getBoundingClientRect();
				const x = rect["x"];
				const y = rect["y"];
				const slotWidth = rect["width"];
				const slotHeight = rect["height"];
				let xTranslate = hoveredSlotLocation.x < 7 ? x / 0.7 + slotWidth * 1.8 : (x - 200) / 0.7 - slotWidth * 1.8;
				let yTranslate = (y - 140) / 0.7 + slotHeight / 2;
				let scale = 0.7;
				if (foundItem.baseName != undefined) {
					scale = 0.9;
					xTranslate = ((x - (foundItem.tooltipWidth / 2.5)) / scale) - ((hoveredSlotLocation.x - hoverItem.x) * slotWidth / scale);
					yTranslate = hoveredSlotLocation.y < 7 ? y / scale + (hoverItem.length * slotHeight * 1.2) - ((hoveredSlotLocation.y - hoverItem.y) * slotHeight / scale) : y / scale - slotHeight * 7 - (hoverItem.length * slotHeight * 1.2) - ((hoveredSlotLocation.y - hoverItem.y) * slotHeight / scale) ;

				}
				return (
					<div
						className="fixed z-50 pointer-events-none"
						style={{
							transform: `translate(${xTranslate}px,${yTranslate > 0 ? yTranslate : 5}px)`,
							scale: `${scale}`,
							transformOrigin: "top left",
						}}>
						{foundItem.itemRewardId != undefined && (
							<DivCardGenerator divcard={foundItem} item={hoverItem} />
						)}
						{foundItem.itemRequirement != undefined && (
							<UniqueItemGenerator unique={foundItem} item={hoverItem} />
						)}
					</div>
				);
			}
		}
	};

	return (
		<ClientOnly>
			{() => {
				return (
					<div
						className="select-none"
						onClick={() => {
							if (spawnUnstack) {
								SetSpawnUnstack(false);
								SetSpawnContextMenu(false);
							}
						}}>
						<div className="hideoutWindow" onClick={() => { setBgmMute(false); }}>

							<MouseFollower />
							{spawnUnstack ? <UnstackWindow /> : null}
							{spawnContextMenu ? <ContextMenu /> : null}
							{DivHover()}

							<Fragment>
								<BGMPlayer>
									<HorticraftStation />
									<InventoryWindow />
								</BGMPlayer>
							</Fragment>

							{
								<TradeWindow
									divcards={items.divcards}
									modalIsOpen={tradeWindowOpen}
									setModalIsOpen={setTradeWindowOpen}
								/>
							}
						</div>
						<div className="uibar">
							<button className="openTradeButton" onClick={() => setTradeWindowOpen(true)} onMouseDown={() => playSound(AudioFile.ButtonDown)} onMouseUp={() => { playSound(AudioFile.ButtonUp) }}>
								Open Trade
							</button>
							<div className={`bgmButton ${bgmVolume == 0 ? "muted" : ""}`} onClick={() => { if (bgmVolume > 0) setBgmVolume(0); else setBgmVolume(0.3); }}></div>
							<div className="bgmButtonText">BGM</div>
						</div>

					</div>
				);
			}}
		</ClientOnly>
	);
}
