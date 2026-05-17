import Icon from "./Icon";

export default function CardHeader({ card, index }) {
  return (
    <>
      <div className="flex-center h-[14.5%] w-full justify-between rounded-t-3xl py-2 select-none max-sm:h-[13.5%]">
        <span className="flex-center aspect-square h-[6vh] rounded-full bg-white/40 text-[3vh]">
          {card.icon ? card.icon : <Icon name="smiley" size="24" color="gray" />}
        </span>
        <div className="flex h-fit flex-col justify-center">
          <h1 className="w-52 truncate text-lg text-black" title={card.title}>
            {card.title}
          </h1>
          <time className="text-sm tracking-widest text-primary">{card.time}</time>
        </div>
        <span className="flex-center aspect-square h-[6vh] rounded-full text-[5vh] text-black/5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {card.tag && (
        <div className="mt-2 w-full max-sm:mt-3.5">
          <span className="rounded-full bg-white/40 px-3 py-2 text-xs ">
            {card.tag}
          </span>
        </div>
      )}
    </>
  );
}
