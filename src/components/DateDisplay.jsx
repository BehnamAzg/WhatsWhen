export default function DateDisplay({ day, date, month }) {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      <span className="flex items-end justify-end pb-0.5">{day}</span>
      <span className="mx-2 flex items-end justify-center text-4xl">
        {date}
      </span>
      <span className="flex items-end justify-start pb-0.5">{month}</span>
    </div>
  );
}
