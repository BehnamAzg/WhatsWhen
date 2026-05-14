import RepeatButton from "./RepeatButton";

export default function DayRepetition() {
  return (
    <div className="flex w-full flex-wrap items-stretch gap-2 rounded-2xl border border-white bg-white/50 px-4 py-2.5 text-xs text-neutral-500 select-none">
      <h3 className="flex-center mr-1 text-sm text-neutral-500">Repeat</h3>

      <RepeatButton text="Once" role="once" isChecked={true} />
      <RepeatButton text="Every Day" role="everyday" />
      <RepeatButton text="Mon" role="day" value="mon" />
      <RepeatButton text="Tue" role="day" value="tue" />
      <RepeatButton text="Wed" role="day" value="wed" />
      <RepeatButton text="Thu" role="day" value="thu" />
      <RepeatButton text="Fri" role="day" value="fri" />
      <RepeatButton text="Sat" role="day" value="sat" />
      <RepeatButton text="Sun" role="day" value="sun" />
    </div>
  );
}
