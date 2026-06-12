// ─── Type Definitions ────────────────────────────────────────────────────────

export interface PersonData {
  name: string;
  image: string;
  bio: string;
  linkedin: string;
}

export interface PublicationData {
  id: string;
  title: string;
  type: string;
  date: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  description: string;
  image: string;
  imageRef?: string;
  imageFootnote?: string;
  content: string;
  region?: string;
}

export interface EventData {
  title: string;
  date: string;
  type: string;
  location: string;
  description: string;
  link: string;
  featured: boolean;
}

export interface GalleryImageData {
  url: string;
  caption: string;
  location: string;
}

export interface ContactInfoData {
  title: string;
  desc: string;
  value: string;
  href: string;
}

export interface PillarData {
  title: string;
  description: string;
}

export interface CategoryData {
  title: string;
  limit: string;
  desc: string;
}

export interface SiteContent {
  home: {
    heroTagline: string;
    heroSubtitle: string;
    heroButton1: string;
    heroButton2: string;
    visionBadge: string;
    visionHeading: string;
    visionBody: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    visionQuote: string;
    welcomeImage: string;
    focusAreasTitle: string;
    focusAreas: string[];
    ierfWayTitle: string;
    ierfWaySubtitle: string;
    ierfWayPillars: { title: string; body: string }[];
    volgaTeaserHeading: string;
    volgaTeaserBody: string;
    digiTeaserHeading: string;
    digiTeaserBody: string;
    ctaHeading: string;
    ctaBody: string;
  };
  about: {
    subtitle: string;
    whoWeAre: string;
    whatWeDoIntro: string;
    pillars: PillarData[];
    visionParagraphs: string[];
    focusAreas: string[];
    whyIerfParagraphs: string[];
  };
  team: {
    leadership: PersonData[];
    technicalTeam: PersonData[];
    advisor: PersonData;
    scholarlyNetwork: PersonData[];
  };
  publications: PublicationData[];
  events: {
    subtitle: string;
    items: EventData[];
  };
  writeForUs: {
    subtitle: string;
    categories: CategoryData[];
    guidelines: string[];
    ctaHeading: string;
    ctaBody: string;
    submissionEmail: string;
  };
  contact: {
    subtitle: string;
    heading: string;
    subheading: string;
    body: string;
    info: ContactInfoData[];
  };
  volgaToGanga: {
    subtitle: string;
    mainQuote: string;
    paragraphs: string[];
    ctaPhase: string;
    ctaHeading: string;
    ctaBody: string;
  };
  digieurasia: {
    subtitle: string;
    heading: string;
    quote: string;
    images: GalleryImageData[];
    ctaHeading: string;
    ctaBody: string;
    submissionEmail: string;
  };
  ierfTalks: {
    subtitle: string;
    heading: string;
    body: string;
  };
  footer: {
    description: string;
    newsletterTitle: string;
    newsletterBody: string;
  };
  settings: {
    siteName: string;
    siteLogo: string;
    socials: {
      x: string;
      instagram: string;
      linkedin: string;
      youtube: string;
    };
    footerCopyright: string;
  };
}

// ─── Minimal Default Content (skeleton fallback) ─────────────────────────────
import contentData from './content.json';

export const defaultContent: SiteContent = contentData as SiteContent;
