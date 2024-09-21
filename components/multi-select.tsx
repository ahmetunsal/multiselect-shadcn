import React, { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const MultiSelect = (props: {
  options: { value: string; label: string, disabled?: boolean }[];
  selectedOptions: string[];
  placeholder: string;
  onChange: (selectedOptions: string[]) => void; // Callback fonksiyonu
  className?: string; 
  contentClass?: string;
  required?: boolean | false;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.selectedOptions);

  useEffect(() => {
    setSelectedOptions(props.selectedOptions);
  }, [props.selectedOptions]);

  const handleCheckedChange = (optionValue: string, checked: Checked) => {
    const updatedSelectedOptions = checked
      ? [...selectedOptions, optionValue]
      : selectedOptions.filter((value) => value !== optionValue);

    setSelectedOptions(updatedSelectedOptions);
    props.onChange(updatedSelectedOptions); // Callback çağrısı
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={`flex justify-between items-center hover:cursor-pointer ${props.className}`}
      >
        <div className="flex justify-between items-center text-white">
          <Input
            required={props.required}
            className="w-full text-white text-start hover:cursor-pointer"
            placeholder={props.placeholder || ""}
            value={selectedOptions
              .map((value) => props.options.find((option) => option.value === value)?.label || "")
              .join(", ")}
            readOnly
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-[95vw] xl:w-48 lg:w-96 dark ${props.contentClass}`}>
        {props.options.map((option) => (
          <DropdownMenuCheckboxItem
            className="w-full"
            key={option.value}
            disabled={option.disabled}
            checked={selectedOptions.includes(option.value)}
            onCheckedChange={(checked: any) => handleCheckedChange(option.value, checked)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
