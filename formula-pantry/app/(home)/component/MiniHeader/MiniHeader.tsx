import MiniHeaderCarousel from "./MiniHeaderCarousel";
import { getLatestNewsTitles, getUpcomingSessionTitles } from "../../api/services";
import { UpcomingSessionTitle, LatestNewsTitle } from "../../api/types";
import Link from "next/link";


const ConvertUtcTime = (time: string) => {
    return new Date(time).toLocaleDateString("en-US", { month: "short", day: "numeric"})
}

export default async function MiniHeader() {

    let latestNewsTitles: LatestNewsTitle[] = [];
    let upcomingSessionTitles: UpcomingSessionTitle[] = [];
    let error: string | null = null;

    let newsPage = 0;
    let newsLimit = 10;

    let sessionLimit = 3;

    try {
        latestNewsTitles = await getLatestNewsTitles(newsPage, newsLimit);
        upcomingSessionTitles = await getUpcomingSessionTitles(sessionLimit);
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to fetch sessions for current year";
    }

    return (
        <div className="h-120 bg-white rounded-b-2xl shadow-sm">
            <MiniHeaderCarousel  latestNewsTitles={latestNewsTitles} />
            <div className="p-4">
                <div className="flex items-center font-harmony font-bold">
                    <span>News</span>
                </div>
                <div className="h-24 mt-4 overflow-hidden">
                    {latestNewsTitles.map((news) => (
                        <div className="flex justify-between items-center font-harmony font-normal  text-2xl " key={news.id}>
                            <Link className="hover:text-[#fb542b]" target='_blank' href={`/news/${news.id}`}>
                                {news.title.length > 40 ? news.title.substring(0, 40) + "..." : news.title}
                            </Link>
                            <span className="text-nowrap">{ConvertUtcTime(news.updated_on)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

