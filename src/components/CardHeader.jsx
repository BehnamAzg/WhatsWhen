export default function CardHeader({ card, index }) {
  return (
    <>
      <div className="w-full h-[14.5%] max-sm:h-[13.5%] rounded-t-3xl flex-center justify-between py-2 select-none">
        <span className="bg-white/40 rounded-full h-[6vh] aspect-square flex-center text-[3vh]">{card.icon}</span>
        <div className="flex flex-col justify-center h-fit">
          <h1 className="text-lg w-52 truncate text-black" title={card.title}>
            {card.title}
          </h1>
          <time className="text-sm text-black/40">{card.time}</time>
        </div>
        <span className="rounded-full h-[6vh] aspect-square flex-center text-[5vh] text-white/50">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="w-full mt-2 max-sm:mt-3.5">
        <span className="bg-white/40 rounded-full text-xs py-2 px-3">{card.tag}</span>
      </div>
    </>
  );
}
