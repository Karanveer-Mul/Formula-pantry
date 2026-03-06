import MiniHeaderCarousel from "./MiniHeaderCarousel";
import { getLatestNewsTitles } from "../../api/services";
import { LatestNewsTitle } from "../../api/types";
import Link from "next/link";
import Image from "next/image";
import {
  convertUtcTimeToMonthDate,
  truncateContent,
} from "@/app/components/shared/helper";

export default async function NewsSideBar() {
  let news: LatestNewsTitle[] = [];
  let error: string | null = null;

  let newsPage = 0;
  let newsLimit = 3;

  try {
    news = await getLatestNewsTitles(newsPage, newsLimit);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch latest news titles";
  }

  return (
    <div className="hidden lg:flex flex-col">
      {news &&
        news.map((news) => (
          <div key={news.id} className="mb-4 w-xl">
            <Link
              target="_blank"
              href={`/news/${news.id}`}
              className=""
            >
              <Image
                loading="lazy"
                src={news.hook}
                alt={news.title}
                width={300}
                height={150}
                className="w-full"
              />
              <span className="block mt-2 text-wrap font-harmony font-bold text-4xl orange-link">
                {truncateContent(news.title, 80)}
              </span>
            </Link>
          </div>
        ))}
    </div>
  );
}
