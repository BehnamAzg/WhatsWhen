import useStateContext from "../context/useStateContext";

export default function Reminder() {
  const { dispatch, newTask } = useStateContext();

  return (
    <div className="flex-center border-light-border dark:border-dark-border bg-blur h-10 w-1/2 gap-2 rounded-full border px-4">
      <h3 className="flex-center dark:text-dark-theme-text/50 text-neutral-500">
        Reminder
      </h3>
      <label className="ring-primary focus-within:ring-primary relative inline-flex cursor-pointer items-center rounded-full focus-within:ring-2 hover:ring-2">
        <input
          type="checkbox"
          name="reminder"
          checked={newTask.reminder}
          onChange={(e) =>
            dispatch({
              type: "updateNewTaskReminder",
              payload: e.target.checked,
            })
          }
          className="peer sr-only"
        />
        <div className="peer-checked:bg-primary dark:bg-blur h-4 w-8 rounded-full bg-gray-300 transition-colors"></div>
        <div className="dark:bg-dark-theme-text absolute top-0.5 left-0.5 h-3 w-3 transform rounded-full bg-white transition-transform peer-checked:translate-x-4"></div>
      </label>
    </div>
  );
}
