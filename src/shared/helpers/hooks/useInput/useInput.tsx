import { ChangeEvent, useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const resetValue = () => {
    setValue("");
  };
  return {
    onChange,
    value,
    resetValue,
  };
};
