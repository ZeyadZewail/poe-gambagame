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
import { atom, useAtom, useAtomValue, } from "jotai";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import { Fragment, MutableRefObject, useEffect, useState } from "react";
import DivCardGenerator from "~/components/divCardGenerator";
import Item from "~/Types/Item";
import Divcard from "~/Types/Divcard";
import ContextMenu from "~/components/contextMenu";
import BGMPlayer, { bgmVolumeVar } from "~/components/bgmPlayer";
import { bgmVar } from "../components/bgmPlayer";
import playSound, { AudioFile, buttonAudioVol } from "~/components/audioPlayer";

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

export { renderVar, unStackVar, hoverItemVar, hoveredSlotVar, contextMenuVar };

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
	const [bgmMute, setBgmMute] = useAtom(bgmVar)
	const [bgmVolume, setBgmVolume] = useAtom(bgmVolumeVar)
	const [buttonVolume] = useAtom(buttonAudioVol)
	useEffect(() => {

	}, [bgmVolume]);

	const DivHover = () => {
		if (hoverItem != null) {
			if (hoverItem.type == "divcard") {
				let divCards = items.divcards as Divcard[];
				let foundDivCard = divCards.find((d) => {
					return d.itemName === hoverItem.name;
				});

				if (foundDivCard != undefined && hoveredSlot?.current != null && hoveredSlotLocation != null) {
					//@ts-ignore
					const rect = hoveredSlot.current.getBoundingClientRect();
					const x = rect["x"];
					const y = rect["y"];
					const slotWidth = rect["width"];
					const slotHeight = rect["height"];
					const xTranslate = hoveredSlotLocation.x < 7 ? x / 0.6 + slotWidth * 1.8 : (x - 170) / 0.6 - slotWidth * 1.8;
					return (
						<div
							className="fixed z-50 pointer-events-none"
							style={{
								transform: `translate(${xTranslate}px,${(y - 110) / 0.6 + slotHeight / 2}px)`,
								scale: "0.6",
								transformOrigin: "top left",
							}}>
							<DivCardGenerator divcard={foundDivCard} item={hoverItem} />
						</div>
					);
				}
			}
		}
	};

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
				<ClientOnly>
					{() => {
						return (
							<Fragment>
								<BGMPlayer>
									<HorticraftStation />
									<InventoryWindow />
								</BGMPlayer>
							</Fragment>
						);
					}}
				</ClientOnly>
				{
					<TradeWindow
						divcards={items.divcards}
						modalIsOpen={tradeWindowOpen}
						setModalIsOpen={setTradeWindowOpen}
					/>
				}
			</div>
			<div className="uibar">
				<button className="openTradeButton" onClick={() => setTradeWindowOpen(true)} onMouseDown={() => playSound(AudioFile.ButtonDown,buttonVolume)} onMouseUp={() => { playSound(AudioFile.ButtonUp, buttonVolume) }}>
					Open Trade
				</button>
				<ClientOnly>
					{() => {
						return (
							<div className={`bgmButton ${bgmVolume == 0 ? "muted" : ""}`} onClick={() => { if (bgmVolume > 0) setBgmVolume(0); else setBgmVolume(0.3); }}></div>
						)
					}}
				</ClientOnly>
				<div className="bgmButtonText">BGM</div>
			</div>
		</div>
	);
}