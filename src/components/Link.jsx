const colors = {
  none: "",
  white: "text-white dark:text-dark-theme-text",
  primary: "text-primary",
};

export default function Link({
  children,
  link,
  target = "_blank",
  color = "primary",
}) {
  return (
    <a
      href={link}
      target={target}
      {...(target === "_blank" ? { rel: "noopener noreferrer" } : {})}
      className={`${colors[color]} text-primary underline underline-offset-2 hover:no-underline`}
    >
      {children}
    </a>
  );
}
