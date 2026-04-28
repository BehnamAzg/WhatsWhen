export default function DateDisplay({ day, date, month }) {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      <span className="flex justify-end items-end pb-0.5">{day}</span>
      <span className="flex justify-center items-end mx-2 text-4xl">{date}</span>
      <span className="flex justify-start items-end pb-0.5">{month}</span>
    </div>
  );
}
