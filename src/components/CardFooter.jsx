import Icon from "./Icon";
import Button from "./Button";

export default function CardFooter({ card }) {
  return (
    <div className="w-full flex justify-between select-none pb-[7vh] max-sm:pb-[8.5vh]">
      <time className="rounded-full bg-white/40 py-1.5 px-4 tracking-wider font-semibold">01:30:59</time>
      <div className="flex-center gap-2">
        <Button type="circle">
          <Icon name="trash" />
        </Button>
        <Button type="circle">
          <Icon name="pencil" />
        </Button>
      </div>
    </div>
  );
}
