import React, { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface MultiSelectProps {
  options: { value: string; label: string; disabled?: boolean }[];
  selectedOptions: string[];
  placeholder: string;
  onChange: (selectedOptions: string[]) => void;
  className?: string;
  contentClass?: string;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions: initialSelectedOptions,
  placeholder,
  onChange,
  className = "",
  contentClass = "",
  required = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);

  useEffect(() => {
    setSelectedOptions(initialSelectedOptions);
  }, [initialSelectedOptions]);

  const handleCheckedChange = (optionValue: string, checked: Checked) => {
    const updatedSelectedOptions = checked
      ? [...selectedOptions, optionValue]
      : selectedOptions.filter((value) => value !== optionValue);

    setSelectedOptions(updatedSelectedOptions);
    onChange(updatedSelectedOptions); // Callback çağrısı
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={`flex justify-between items-center hover:cursor-pointer ${className}`}
      >
        <div className="flex justify-between items-center text-white">
          <Input
            required={required}
            className="w-full text-white text-start hover:cursor-pointer"
            placeholder={placeholder || ""}
            value={selectedOptions
              .map((value) => options.find((option) => option.value === value)?.label || "")
              .join(", ")}
            readOnly
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-[95vw] xl:w-48 lg:w-96 dark ${contentClass}`}>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            className="w-full"
            key={option.value}
            disabled={option.disabled}
            checked={selectedOptions.includes(option.value)}
            onCheckedChange={(checked: Checked) => handleCheckedChange(option.value, checked)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
