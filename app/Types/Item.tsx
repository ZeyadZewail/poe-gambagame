interface Item {
	id?: number;
	name: string;
	imgSrc: string;
	type: "divcard" | "item";
	width: number;
	length: number;
	x: number;
	y: number;
	hovered?: boolean;
	maxStack: number;
	count: number;
	price: number;
}

export default Item;
