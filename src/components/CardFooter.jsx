import Icon from "./Icon";
import Button from "./Button";

export default function CardFooter({ card }) {
  return (
    <div className="w-full flex justify-between select-none pb-[8.2vh]">
      <time className="rounded-full bg-white/40 py-1.5 px-3 tracking-wider font-bold text-sm">01:30:59</time>
      <div className="flex-center gap-2">
        <Button type="circleSm">
          <Icon name="trash" />
        </Button>
        <Button type="circleSm">
          <Icon name="pencil" />
        </Button>
      </div>
    </div>
  );
}
