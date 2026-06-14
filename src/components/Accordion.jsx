import Icon from "./Icon";

export default function Accordion({ children, icon, title }) {
  return (
    <details className="group w-full rounded-3xl">
      <summary className="accordion-summary">
        <Icon name={icon} />
        <span className="mr-auto">{title}</span>
        <span className="transition-transform duration-200 group-open:rotate-180">
          <Icon name="arrow-down" size="14" />
        </span>
      </summary>
      {children}
    </details>
  );
}
