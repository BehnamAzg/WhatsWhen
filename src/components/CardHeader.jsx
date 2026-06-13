import Icon from "./Icon";

export default function CardHeader({ card, index }) {
  return (
    <>
      <div className="flex-center h-[14.5%] w-full justify-between rounded-t-3xl py-2 select-none max-sm:h-[13.5%]">
        <span className="flex-center aspect-square h-[6vh] rounded-full bg-blur  text-[3vh]">
          {card.icon ? card.icon : <Icon name="smiley" size="24" color="fade" />}
        </span>
        <div className="flex h-fit flex-col justify-center">
          <h1 className="w-52 truncate text-lg text-black " title={card.title}>
            {card.title}
          </h1>
          <time className="text-sm tracking-widest text-primary dark:text-dark-theme-text">{card.time}</time>
        </div>
        <span className="flex-center aspect-square h-[6vh] rounded-full text-[5vh] text-white/40 dark:text-dark-theme-text/15">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {card.tag && (
        <div className="mt-2 w-full max-sm:mt-3.5">
          <span className="rounded-full bg-background/50 dark:bg-background/15 px-3 py-2 text-xs border border-light-border dark:border-dark-border text-black/50 dark:text-dark-theme-text/70">
            {card.tag}
          </span>
        </div>
      )}
    </>
  );
}
