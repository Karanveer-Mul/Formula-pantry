import type { News } from "../api/types";

export function NewsSection() {
    return 


} 

interface articleSection {
  subHeading: string;
  body: string;
  mediaLink: string;
}

function getSectionHeading(content: string): [string, string] {
  const subHeadingIdentifier = "[STHeading]";

  const contentParts = content.split(subHeadingIdentifier);
  if (contentParts.length > 2) {
    return [contentParts[1], sanatizeTextFormating(contentParts[2])];
  }

  return ["", content];
}

export function getArticleSections(news: News) : articleSection[] {
  let mediaCount = news.mediaLinks.length;

  const [subHeading1, sectionBody1] = getSectionHeading(news.section1);
  const [subHeading2, sectionBody2] = getSectionHeading(news.section2);
  const [subHeading3, sectionBody3] = getSectionHeading(news.section3);
  const [subHeading4, sectionBody4] = getSectionHeading(news.section4);
  const [subHeading5, sectionBody5] = getSectionHeading(news.section5);

  let section1: articleSection = {
    subHeading: subHeading1,
    body: sectionBody1,
    mediaLink: mediaCount > 0 ? news.mediaLinks[0] : ""
  };

  let section2: articleSection = {
    subHeading: subHeading2,
    body: sectionBody2,
    mediaLink: mediaCount > 1 ? news.mediaLinks[1] : ""
  };

  let section3: articleSection = {
    subHeading: subHeading3,
    body: sectionBody3,
    mediaLink: mediaCount > 2 ? news.mediaLinks[2] : ""
  };

  let section4: articleSection = {
    subHeading: subHeading4,
    body: sectionBody4,
    mediaLink: mediaCount > 3 ? news.mediaLinks[3] : ""
  };

  let section5: articleSection = {
    subHeading: subHeading5,
    body: sectionBody5,
    mediaLink: mediaCount > 4 ? news.mediaLinks[5] : ""
  };

  return [section1, section2, section3, section4, section5];
}

export function getFirstArticleSection(news: News) : articleSection {
  let [subHeading1, sectionBody1] = getSectionHeading(news.section1);
  
  sectionBody1 = sectionBody1.replace(/<[^>]*>/g, "");

  let section1: articleSection = {
    subHeading: subHeading1,
    body: sectionBody1,
    mediaLink: news.mediaLinks.length > 0 ? news.mediaLinks[0] : ""
  };

  return section1
}

function sanatizeTextFormating(content: string) {

    content = content.trim();

    if (content.indexOf('</') == 0) {
        content = content.substring(content.indexOf('>')+1)
    }

    return content.replaceAll("\n", "").replaceAll("\t", "").replaceAll("\r", "");
}