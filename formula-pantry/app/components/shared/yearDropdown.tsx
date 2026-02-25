import { useState } from "react";

interface DropdownProps {
  onYearSelect: (year: number) => void;
  initialYear?: number;
}

export default function YearDropdown(props: DropdownProps) {
  const years = [2026, 2025];
  const { onYearSelect, initialYear } = props;
  const [selectedYear, setSelectedYear] = useState<number>(initialYear ?? years[0]);
  const [open, setOpen] = useState(false);

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setOpen(false);
    onYearSelect(year);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center gap-2 focus:outline-none font-sans text-[3rem] lg:text-[4rem] font-bold bg-white border border-gray-300 px-4 py-2 rounded"
        onClick={() => setOpen((o) => !o)}
      >
        {selectedYear}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-40 rounded border border-gray-200">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedYear === year ? "font-bold" : ""
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}