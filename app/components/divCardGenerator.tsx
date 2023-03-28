import React, { useEffect, useState } from "react";
import placeHolderCardImage from "~/assets/blankcard.png";
import { LIFEFORCESWAPVALUE } from "~/routes";
import vividicon from "~/assets/vividlf.png"
import type Divcard from "~/Types/Divcard";
import type Item from "~/Types/Item";
import { lifeForceFormatter } from "./horticraftStation";

export interface DivCardGeneratorProps {
	divcard: Divcard;
	item?: Item;
}

const DivCardGenerator: React.FC<DivCardGeneratorProps> = ({ divcard, item }) => {
	const [divCard, setDivCard] = useState(divcard);
	useEffect(() => {
		setDivCard(divcard);
	}, [divcard]);
	return (
		<div className={`divCard ${item != null ? "hover" : ""}`}>
			{divCard.itemIconUrl == "" ? (
				<div className="image" style={{ backgroundImage: `url(${placeHolderCardImage})` }}></div>
			) : (
				<div className="image" style={{ backgroundImage: `url(${divCard.itemIconUrl})` }}></div>
			)}
			<div className="border"></div>
			<div className="topbar">
				<div className="text">{divCard.itemName}</div>
			</div>
			<div className="Stats">
				<div className="table-row">
					<div className="explicitArea">
						{divCard.itemReward.map((reward, idx) => (
							<span key={idx}>
								{Object.entries(reward).map(([key, value]) =>
									key === "br" ? (
										<br key={key} />
									) : (
										<span key={key}>
											<span className={key}>{value}</span>
										</span>
									)
								)}
							</span>
						))}
					</div>
				</div>
				<div className="table-row">
					<div className="FlavourText">{divCard.itemFlavourText}</div>
				</div>
			</div>
			<div className="stackSize">
				{item != null && <span>{item.count}/</span>}
				{divCard.itemStackSize}
			</div>
			{item != null && (
				<div className="price">
					{lifeForceFormatter(item.price.value * LIFEFORCESWAPVALUE * item.count)}   <img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
				</div>
			)}
		</div>
	);
};
export default DivCardGenerator;
