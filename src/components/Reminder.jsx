export default function Reminder() {
  return (
    <div className="flex-center rounded-full h-10 px-4 bg-white/50 border border-white w-1/2 gap-2">
      <h3 className="flex-center text-neutral-500">Reminder</h3>
      <label className="relative inline-flex items-center cursor-pointer rounded-full ring-primary hover:ring-2 focus-within:ring-2 focus-within:ring-primary">
        <input type="checkbox" name="reminder" defaultValue="on" className="sr-only peer" />
        <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-primary transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transform peer-checked:translate-x-4 transition-transform"></div>
      </label>
    </div>
  );
}
