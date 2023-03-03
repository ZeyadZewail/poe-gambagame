import type { FC } from "react";
import type Item from "~/Types/Item";

const cellSideLength = 47.4;

interface SlotInterface {
	item: Item | null;
}

const SlotCell: FC<SlotInterface> = ({ item }) => {
	const calcWidth = () => {
		if (item) {
			return cellSideLength * item.width;
		} else {
			return cellSideLength;
		}
	};

	const calcLength = () => {
		if (item) {
			return cellSideLength * item.length;
		} else {
			return cellSideLength;
		}
	};

	return (
		<div
			className="hover:bg-gray-300 hover:bg-opacity-10 z-10"
			style={{ width: `${calcWidth()}px`, height: `${calcLength()}px` }}>
			{item ? (
				<div className="flex flex-col">
					<img src={item.imgSrc} alt="grid" />
				</div>
			) : null}
		</div>
	);
};

export default SlotCell;

export { cellSideLength };
