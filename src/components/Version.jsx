import Icon from "./Icon";
import Button from "./Button";

export default function Version() {
  return (
    <div className="menu-row-container mb-2">
      {/* <div className="capsule-version-container">
        <span className="text-[10px] dark:text-dark-theme-text">
          &copy; {new Date().getFullYear()} WhatsWhen?
        </span>
      </div>
      <div className="capsule-version-container">
        <Icon name="code" size="12" />
        <span className="text-[10px] dark:text-dark-theme-text">
          Version 0.9.0
        </span>
      </div> */}
      <Button
        type="capsule"
        width="full"
        link="https://github.com/BehnamAzg/WhatsWhen"
      >
        <span className="text-[10px]">
          &copy; {new Date().getFullYear()} WhatsWhen?
        </span>
      </Button>
      <Button
        type="capsule"
        width="full"
        link="https://github.com/BehnamAzg/WhatsWhen"
      >
        <Icon name="code" size="12" />
        <span className="dark:text-dark-theme-text text-[10px]">
          Version 0.9.0
        </span>
      </Button>
    </div>
  );
}
