import Icon from "./Icon";

export default function Accordion({ children, icon, title }) {
  return (
    <details className="w-full rounded-3xl">
      <summary className="accordian-summary">
        <Icon name={icon} />
        <span className="mr-auto">{title}</span>
        <Icon name="arrow-down" size="14" />
      </summary>
      {children}
    </details>
  );
}
