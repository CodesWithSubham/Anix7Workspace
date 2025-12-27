"use client";

import DatePicker, { type DatePickerProps } from "react-date-picker";
import "../../styles/DateInput.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { cn } from "@shared/utils/cn";

export type DateInputProps = DatePickerProps & { label?: string; labelClassName?: string };

export default function DateInput({ label, labelClassName, className, ...props }: DateInputProps) {
  return (
    <div className={cn("w-full flex flex-col relative", label && "mt-3")}>
      {label && <label className={labelClassName ?? "font-medium mb-1"}>{label}</label>}

      <DatePicker
        calendarIcon={<IoCalendarClearOutline />} // hide default calendar icon if you want custom
        clearIcon={null} // hide clear button
        format="dd/MM/yyyy"
        className={cn(
          "w-full h-9 p-2 my-1.5 outline-hidden border select-none rounded-lg",
          props.disabled
            ? "cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500"
            : "hover:border-theme-450 focus:shadow-[0px_0px_5px_0px] focus:shadow-theme-450",
          className
        )}
        openCalendarOnFocus={false}
        {...props}
      />
    </div>
  );
}
