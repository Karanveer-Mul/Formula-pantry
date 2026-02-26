"use client";

import { useState } from "react";
import NewsCard from "./newsCard";
import { getNews } from "../api/services";
import type { News } from "../api/types";

interface NewsListProps {
  initialNews: News[];
  initialPage?: number;
  limit?: number;
}

export default function NewsList({
  initialNews,
  initialPage = 0,
  limit = 12,
}: NewsListProps) {
  const [news, setNews] = useState<News[]>(initialNews);
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // whether there are more results available
  const [hasMore, setHasMore] = useState(
    initialNews.length >= limit
  );

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const more = await getNews(nextPage, limit);
      setNews((prev) => [...prev, ...more]);
      setPage(nextPage);
      // if fetched fewer than the requested page size, we've reached the end
      if (more.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* existing grid of cards & states */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full">
        {error && (
          <div className="mt-4 text-lg text-red-600">Error: {error}</div>
        )}

        {!error && news.length === 0 && (
          <div className="mt-4 text-lg text-gray-500">
            No news articles found
          </div>
        )}

        {news.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}
      </div>

      <div className="w-full flex justify-center my-16">
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="text-nowrap w-fit mt-10 z-10 bg-[#FFFB00] border border-gray-300 px-16 py-4 font-harmony text-2xl font-bold text-black shadow-sm hover:border-gray-500 cursor-pointer"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        ) : (
          <p className="text-gray-500 text-2xl font-harmony">Reached the end</p>
        )}
      </div>
    </div>
  );
}
