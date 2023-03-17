import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import type Item from "~/Types/Item";
import Slider from "./Slider";
import unstackBG from "../../assets/sliderwindow.png";
import buttonBG from "../../assets/unstackbutton_normal.png";

const unStackWindowItemVar = atom<Item | null>(null);
const UnStackWindowLocationVar = atom({ x: 0, y: 0 });
export { unStackWindowItemVar, UnStackWindowLocationVar };

const UnstackWindow = () => {
  const [item] = useAtom(unStackWindowItemVar);
  const [location] = useAtom(UnStackWindowLocationVar);
  const [value, SetValue] = useState(1);

  useEffect(() => {
    SetValue(1);
  }, [item]);

  return (
    <div
      className="fixed text-white z-40 bg-no-repeat flex flex-col bg-contain p-1"
      style={{
        transform: `translate(${location.x}px,${location.y}px)`,
        backgroundImage: `url(${unstackBG})`,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onWheel={(e) => {
        if (e.deltaY < 0) {
          console.log("Up");
          if (item) {
            SetValue(Math.min(item?.maxStack, value + 1));
          }
        } else {
          console.log("Down");
          if (item) {
            SetValue(Math.max(1, value - 1));
          }
        }
      }}
    >
      {item != null ? (
        <div className="p-4">
          <Slider min={1} max={item.count} value={value} />
        </div>
      ) : null}
      <button className="m-0 w-fit relative top-[0%] scale-75 self-end">
        <img src={buttonBG} alt="unstack Button" />
      </button>
    </div>
  );
};

export default UnstackWindow;
