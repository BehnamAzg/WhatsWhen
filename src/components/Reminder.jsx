export default function Reminder() {
  return (
    <div className="flex-center h-10 w-1/2 gap-2 rounded-full border border-white bg-white/50 px-4">
      <h3 className="flex-center text-neutral-500">Reminder</h3>
      <label className="ring-primary focus-within:ring-primary relative inline-flex cursor-pointer items-center rounded-full focus-within:ring-2 hover:ring-2">
        <input
          type="checkbox"
          name="reminder"
          defaultValue="on"
          className="peer sr-only"
        />
        <div className="peer-checked:bg-primary h-4 w-8 rounded-full bg-gray-300 transition-colors"></div>
        <div className="absolute top-0.5 left-0.5 h-3 w-3 transform rounded-full bg-white transition-transform peer-checked:translate-x-4"></div>
      </label>
    </div>
  );
}
