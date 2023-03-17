import { useAtom } from "jotai";
import MouseFollower from "~/components/MouseFollower/MouseFollower";
import StorageController, {
  unStackVar,
} from "~/components/StorageController/StorageController";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";

export default function Sandbox() {
  const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);

  return (
    <div
      className="select-none"
      onClick={() => {
        if (spawnUnstack) {
          SetSpawnUnstack(false);
        }
      }}
    >
      {spawnUnstack ? <UnstackWindow /> : null}
      <MouseFollower />
      <StorageController />
    </div>
  );
}
