import Icon from "./Icon";

export default function Warning({ children }) {
  return (
    <div className="flex-center focus-primary transition-animation min-h-0 shrink-0 scale-100 gap-x-1.5 p-2 text-xs opacity-100 h-fit w-full rounded-xl bg-red-500/80 text-white dark:text-dark-theme-text">
      <div className="w-full px-2 py-1">
        <span className="flex-center justify-start gap-1.5">
          <Icon name="info" color="white" size="18" />
          <h2 className="text-sm font-bold">Warning</h2>
        </span>
        <hr className="mt-1 mb-2 border-white/25" />
        <div className="text-left">{children}</div>
      </div>
    </div>
  );
}
