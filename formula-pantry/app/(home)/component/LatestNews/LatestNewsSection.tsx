import SectionSubItem from "@/app/components/shared/sectionSubItem";
import LatestNewsCarousel from "./LatestNewsCarousel";
import SectionContainer from "@/app/components/shared/section";
import { News } from "@/app/news/api/types";
import { getNews } from "@/app/news/api/services";


export default async function LatestNewsSection() {

  let news: News[] = [];
  let error: string | null = null;

  let newsPage = 0;
  let newsLimit = 10;

  try {
    news = await getNews();
  } catch (err) {
      error = err instanceof Error ? err.message : "Failed to fetch news articles";
  }

  return (
    <SectionContainer title="NEWS" scrollable={false}>
      <SectionSubItem>
        <LatestNewsCarousel newsArticles={news} />
      </SectionSubItem>
    </SectionContainer>
    
  );
}