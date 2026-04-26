import RepeatButton from "./RepeatButton";

export default function DayRepetition() {
  return (
    <div className="w-full flex flex-wrap gap-2 items-stretch text-xs px-4 py-2.5  border border-white rounded-2xl select-none text-neutral-500 bg-white/50">

      <h3 className="flex-center text-sm text-neutral-500 mr-1">Repeat</h3>

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
