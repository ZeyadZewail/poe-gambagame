import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import TradeWindow from "~/components/tradeWindow";
import stylesUrl from "~/style/index.css";
import Items from "~/data/items.json";
import { useLoaderData } from "@remix-run/react";
import HorticraftStation from "~/components/horticraftStation";
import InventoryWindow from "~/components/inventoryWindow";
import MouseFollower from "~/components/MouseFollower/MouseFollower";
import { atom, useAtom, useAtomValue } from "jotai";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import { Fragment, MutableRefObject, useEffect, useState } from "react";
import DivCardGenerator from "~/components/divCardGenerator";
import Item from "~/Types/Item";
import Divcard from "~/Types/Divcard";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
	return json(Items);
};

const renderVar = atom(false);
const unStackVar = atom(false);
const hoverItemVar = atom<Item | null>(null);
const hoveredSlotVar = atom<MutableRefObject<null> | null>(null);

export { renderVar, unStackVar, hoverItemVar, hoveredSlotVar };

export default function Index() {
	const items = useLoaderData<typeof loader>();
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);
	const hoverItem = useAtomValue(hoverItemVar);
	const hoveredSlot = useAtomValue(hoveredSlotVar);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [render] = useAtom(renderVar);
	const [tradeWindowOpen, setTradeWindowOpen] = useState(false);

	const DivHover = () => {
		if (hoverItem != null) {
			if (hoverItem.type == "divcard") {
				const divCards = items.divcards as Divcard[];
				const foundDivCard = divCards.find((d) => {
					return d.itemName === hoverItem.name;
				});

				if (foundDivCard != undefined && hoveredSlot?.current != null) {
					//@ts-ignore
					const x = hoveredSlot.current.getBoundingClientRect()["x"];
					//@ts-ignore
					const y = hoveredSlot.current.getBoundingClientRect()["y"];

					return <DivCardGenerator divcard={foundDivCard} item={hoverItem} hovered={true} />;
				} else {
					alert("Big Ritard Not a card");
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
				}
			}}>
			<div className="hideoutWindow">
				<MouseFollower />
				{spawnUnstack ? <UnstackWindow /> : null}
				{DivHover()}
				<ClientOnly>
					{() => {
						return (
							<Fragment>
								<HorticraftStation vividlf={0} />
								<InventoryWindow />
							</Fragment>
						);
					}}
				</ClientOnly>
				{
					<TradeWindow
						currency={0}
						divcards={items.divcards}
						modalIsOpen={tradeWindowOpen}
						setModalIsOpen={setTradeWindowOpen}
					/>
				}
			</div>
			<div className="uibar">
				<button className="openTradeButton" onClick={() => setTradeWindowOpen(true)}>
					Open Trade
				</button>
			</div>
		</div>
	);
}
