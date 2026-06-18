import Icon from "./Icon";

export default function CardHeader({ card, index }) {
  return (
    <>
      <div className="flex-center h-[14.5%] w-full justify-start gap-4 rounded-t-3xl py-2 select-none max-sm:h-[13.5%]">
        <span className="flex-center bg-blur aspect-square h-[6vh] rounded-full text-[3vh]">
          {card.icon ? (
            card.icon
          ) : (
            <Icon name="smiley" size="24" color="fade" />
          )}
        </span>
        <div className="flex h-fit min-w-0 flex-1 flex-col justify-center">
          <h1
            className="dark:text-dark-theme-text/70 text-md w-full truncate text-black"
            title={card.title}
          >
            {card.title}
          </h1>
          <time className="text-primary dark:text-dark-theme-text text-sm tracking-widest">
            {card.time}
          </time>
        </div>
        <span className="flex-center dark:text-dark-theme-text/15 ml-auto aspect-square h-[6vh] rounded-full text-[5vh] text-white/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {card.tag && (
        <div className="mt-2 flex w-full min-w-0 flex-1 max-sm:mt-3.5">
          <span
            className="bg-background/50 dark:bg-background/15 border-light-border dark:border-dark-border dark:text-dark-theme-text/70 truncate rounded-full border px-3 py-2 text-xs text-black/50"
            title={card.tag}
          >
            {card.tag}
          </span>
        </div>
      )}
    </>
  );
}
