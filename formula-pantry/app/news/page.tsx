import SectionContainer from "../components/shared/section";
import SectionSubItem from "../components/shared/sectionSubItem";
import NewsCard from "./components/newsCard";
import { getNews } from "./api/services";
import type { News } from "./api/types";

export default async function SessionsPage() {
  let news: News[] = [];
  let error: string | null = null;

  let newsPage = 0
  let newsLimit = 12

  try {
    news = await getNews(newsPage, newsLimit);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch news for current year";
  }

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={`News`}>
        <SectionSubItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full">

            {/* Error state */}
            {error && (
              <div className="mt-4 text-lg text-red-600">
                Error: {error}
              </div>
            )}

            {/* No news found */}
            {!error && news.length === 0 && (
              <div className="mt-4 text-lg text-gray-500">
                No news articles found
              </div>
            )}

             {/* Sessions list */}            
            {news.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}

          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}