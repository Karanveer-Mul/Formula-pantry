import Image from "next/image";
import CalendarIcon from "@/public/icons/calendar.svg";

interface IconProps {
  className?: string;
  size: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const Icon = ({ size, className }: IconProps) => {
  const sizeClass = sizeMap[size] || sizeMap.md;
  const combinedClassname = `${sizeClass} ${className || ""}`.trim();

  return (
    <Image
      src={CalendarIcon}
      alt="Calendar icon"
      className={combinedClassname}
    />
  );
};

export default Icon;