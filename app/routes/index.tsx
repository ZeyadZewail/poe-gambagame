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
import { atom, useAtom } from "jotai";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import { Fragment, useState } from "react";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
	return json(Items);
};

const renderVar = atom(false);
const unStackVar = atom(false);

export { renderVar, unStackVar };

export default function Index() {
	const items = useLoaderData<typeof loader>();
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
