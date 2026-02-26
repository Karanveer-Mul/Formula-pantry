import SectionContainer from "../components/shared/section";
import SectionSubItem from "../components/shared/sectionSubItem";
import NewsCard from "./components/newsCard";
import NewsList from "./components/NewsList";
import { getNews } from "./api/services";
import type { News } from "./api/types";

// helper moved from inside page component so we can reuse it if needed
async function fetchNewsPage(
  page: number,
  limit: number
): Promise<News[]> {
  // simply forward to the API wrapper; errors bubble up
  return await getNews(page, limit);
}

export default async function SessionsPage() {
  let news: News[] = [];
  let error: string | null = null;

  const newsPage = 0;
  const newsLimit = 12;

  try {
    news = await fetchNewsPage(newsPage, newsLimit);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch news for current year";
  }

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={`News`}>
        <SectionSubItem>
          {error ? (
            <div className="mt-4 text-lg text-red-600">Error: {error}</div>
          ) : (
            <NewsList
              initialNews={news}
              initialPage={newsPage}
              limit={newsLimit}
            />
          )}
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}