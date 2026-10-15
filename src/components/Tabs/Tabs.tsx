import { useId, useRef, type KeyboardEvent } from "react";

type TabsItemType = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabsItemType[];
  value: string;
  onChange: (value: string) => void;
};

const Tabs = ({ items, onChange, value }: TabsProps) => {
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = items.findIndex((item) => item.value === value);
  const activeItem = items[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % items.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    onChange(items[nextIndex].value);
  };

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" aria-label="Content sections">
        {items.map((item, index) => {
          const selected = item.value === value;
          const tabId = `${id}-tab-${index}`;

          return (
            <button
              aria-controls={`${id}-panel`}
              aria-selected={selected}
              className="tabs-trigger"
              id={tabId}
              key={item.value}
              onClick={() => onChange(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div
          aria-labelledby={`${id}-tab-${activeIndex}`}
          className="tabs-panel"
          id={`${id}-panel`}
          role="tabpanel"
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
