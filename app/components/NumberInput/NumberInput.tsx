import { useState } from "react";

const NumberInput = ({
  id,
  name,
  label,
  min,
  max,
  defaultValue,
  containerClass = "",
  onChange = () => {}
}: {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  containerClass?: string;
  onChange?: (num: number) => void;
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || 1);

  const handleIncrement = () => {
    if (currentValue < max) {
      const newValue = currentValue + 1;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (currentValue > min) {
      const newValue = currentValue - 1;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div
      className={
        "flex justify-between items-center text-grey " + containerClass
      }
    >
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="px-2"
          onClick={handleDecrement}
          disabled={currentValue <= min}
        >
          <img src="/minus.svg" alt="minus" />
        </button>
        <input
          id={id}
          name={name}
          type="number"
          value={currentValue}
          className="flex p-1 text-center rounded shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
          readOnly
          aria-label={label}
          min={min}
          max={max}
        />
        <button
          type="button"
          className="px-2"
          onClick={handleIncrement}
          disabled={currentValue >= max}
        >
          <img src="/plus.svg" alt="plus" />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
