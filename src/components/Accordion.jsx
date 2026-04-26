import Icon from "./Icon";

export default function Accordion({ children, icon, title }) {
  return (
    <details className="rounded-3xl w-full">
      <summary className="accordian-summary">
        <Icon name={icon} />
        <span className="mr-auto">{title}</span>
        <Icon name="arrow-down" size="14" />
      </summary>
      {children}
    </details>
  );
}
