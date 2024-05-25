import { HTMLInputTypeAttribute } from "react";

const Input = ({
  id,
  name,
  label,
  placeholder = "",
  type = "text",
  onChange = () => null,
  containerClass = ""
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  containerClass?: string;
  onChange?: () => null;
}) => {
  return (
    <div className={"flex flex-col gap-1".concat(containerClass)}>
      <label htmlFor={id} className="text-sm text-lgrey font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        className="text-base font-normal w-full text-grey rounded-md p-2 shadow-[0_2px_4px_0_rgba(0,0,0,0.25),0_2px_4px_0_rgba(0,0,0,0.25)]"
      />
    </div>
  );
};

export default Input;
