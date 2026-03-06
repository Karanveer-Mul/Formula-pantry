import Image from "next/image";
import type { News } from "../api/types";
import Link from "next/link";
import { getFirstArticleSection } from "./newsSection";
import { convertUtcTimeToMonthDateYear, truncateContent} from "@/app/components/shared/helper"

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const updatedOn = convertUtcTimeToMonthDateYear(news.updated_on);
  const articleSection = getFirstArticleSection(news);
  const truncatedText = truncateContent(articleSection.body, 200);

  return (
    <Link href={`/news/${news.id}`} className=" bg-linear-to-t from-black/1 to-transparent duration-300 ease-in-out transition-shadow hover:shadow-lg hover:cursor-pointer flex flex-col items-start">
      <Image loading="lazy" className="w-full" width={300} height={150} src={news.hook} alt={news.title} />
      <div className="h-fit w-full mt-4 flex flex-col">
        <div className="font-bold font-novecento text-4xl orange-link">{news.title}</div>
        <div className="flex text-gray-500 text-nowrap justify-between font-harmony font-medium text-2xl">{updatedOn}</div>
        <div className="font-harmony font-normal text-3xl mb-2">
          {truncatedText}
        </div>
      </div>
    </Link>
  );
}