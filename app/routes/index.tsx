import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import TradeWindow from "~/components/tradeWindow";
import stylesUrl from "~/style/index.css";
import divCards from "~/data/divcards.json";
import { useLoaderData } from "@remix-run/react";
import HorticraftStation from "~/components/horticraftStation";
import InventoryWindow from "~/components/inventoryWindow";
import MouseFollower from "~/components/MouseFollower/MouseFollower";
import { atom, useAtom } from "jotai";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import { useState } from "react";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
	return json(divCards);
};

const renderVar = atom(false);
const unStackVar = atom(false);

export { renderVar, unStackVar };

export default function Index() {
	const divcards = useLoaderData<typeof loader>();
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [render] = useAtom(renderVar);
	const [tradeWindowOpen, setTradeWindowOpen] = useState(false);

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
				<HorticraftStation vividlf={0} />
				<ClientOnly>
					{() => {
						return <InventoryWindow />;
					}}
				</ClientOnly>
				{
					<TradeWindow
						currency={0}
						divcards={divcards}
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
