import Icon from "./Icon";
import Button from "./Button";

export default function CardFooter({ card }) {
  return (
    <div className="flex w-full justify-between pb-[8.2vh] select-none">
      <time className="rounded-full bg-white/40 px-3 py-1.5 text-sm font-bold tracking-wider">
        01:30:59
      </time>
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
