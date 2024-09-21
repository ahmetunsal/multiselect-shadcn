"use client";

import MultiSelect from "@/components/multi-select";
import React, { useState } from "react";

export default function Home() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValueChange = (value: string[]) => {
    setSelectedValues(value);
  };

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "fig", label: "Fig" },
  ];

  return (
    <div className="w-full h-screen bg-slate-800 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Shadcn Multiselect Example</h1>
        <MultiSelect
          options={options}
          selectedOptions={selectedValues}
          onChange={(selected: string[]) => {
            handleValueChange(selected);
          }}
          placeholder="Please select.."
          className="w-[95vw] md:w-96 mt-10"
          contentClass="w-[95vw] md:!w-96"
        />
        <p className="w-1/2 mt-10">
          I&apos;m a junior, I&apos;m just experiencing Frontend. I&apos;m sharing it to give
          you an idea. It&apos;s definitely not the final product. Have a good day.
        </p>
      </div>
    </div>
  );
}
