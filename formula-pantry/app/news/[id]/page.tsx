import SectionContainer from "../../components/shared/section";
import SectionSubItem from "../../components/shared/sectionSubItem";
import { getNewsById } from "../api/services";
import type { News } from "../api/types";
import Image from "next/image";
import { getArticleSections } from "../components/newsSection"; 

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NewsPage({ params }: Props) {
  const { id } = await params;
  let news: News | null = null;
  let error: string | null = null;

  try {
    news = await getNewsById(id);
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to fetch news";
  }

  if (error || !news) {
    return (
      <div className="w-full overflow-hidden">
      <SectionContainer title="">
        <SectionSubItem>
          <div className="text-4xl font-harmony font-bold">
            News not found. Please try again later.
          </div>
        </SectionSubItem>
      </SectionContainer>
      </div>
    );
  }

  const createdOn = new Date(news.created_on,).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const updateOn = news.created_on === news.updated_on ? createdOn : new Date(news.updated_on,).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  
  const articleSections = getArticleSections(news);

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={`${news.title}`}>
        
        <SectionSubItem>
          <div className="flex flex-col w-full items-start">
            <Image
                loading="lazy"
                src={news.hook}
                width={640}
                height={320}
                alt={`${news.title}`}
              />
              <div className="w-full text-gray-500 text-nowrap font-harmony font-medium text-2xl mt-8">
                {createdOn} by {news.author} {createdOn != updateOn && <span>updated on {updateOn}</span>}
              </div>
            {articleSections.map((section, index) => (
              <div className="w-full flex flex-col items-start lg:w-2/3 mt-8" key={index}>
                {section.subHeading != "" && <div className="font-harmony text-4xl font-bold">{section.subHeading}</div>}
                <div className="font-harmony text-4xl font-normal mt-2 leading-12 news_section" dangerouslySetInnerHTML={{ __html: section.body }} />
                {section.mediaLink != "" && 
                  <Image
                    className="mt-8"
                    loading="lazy"
                    src={section.mediaLink}
                    width={640}
                    height={320}
                    alt={`section ${index} media`}
                  /> 
                }
                 
              </div>
            ))}
            
             
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}


