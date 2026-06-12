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
// Real content is served from Firestore. This only provides structure so the UI
// doesn't crash if Firestore is unreachable on first load.

export const defaultContent: SiteContent = {
  home: {
    heroTagline: 'Researching Eurasia, Bridging Continents.',
    heroSubtitle: 'India Eurasia Research Forum (IERF) is an independent initiative dedicated to promoting research, dialogue and people to people cooperation between India and Eurasia.',
    heroButton1: 'Our Vision',
    heroButton2: 'Read Research',
    visionBadge: 'Institutional Vision',
    visionHeading: 'Welcome to IERF',
    visionBody: '',
    stat1Value: '15+',
    stat1Label: 'Countries Covered',
    stat2Value: '50+',
    stat2Label: 'Policy Insights',
    visionQuote: '',
    welcomeImage: '/images/welcome_opt.webp',
    focusAreasTitle: 'Strategic Pillars',
    focusAreas: [],
    ierfWayTitle: 'The IERF Way',
    ierfWaySubtitle: '',
    ierfWayPillars: [],
    volgaTeaserHeading: 'Volga to Ganga',
    volgaTeaserBody: '',
    digiTeaserHeading: 'DigiEurasia',
    digiTeaserBody: '',
    ctaHeading: '',
    ctaBody: '',
  },
  about: {
    subtitle: '',
    whoWeAre: '',
    whatWeDoIntro: '',
    pillars: [],
    visionParagraphs: [],
    focusAreas: [],
    whyIerfParagraphs: [],
  },
  team: {
    leadership: [],
    technicalTeam: [],
    advisor: { name: '', image: '', bio: '', linkedin: '' },
    scholarlyNetwork: [],
  },
  publications: [],
  events: {
    subtitle: '',
    items: [],
  },
  writeForUs: {
    subtitle: '',
    categories: [],
    guidelines: [],
    ctaHeading: '',
    ctaBody: '',
    submissionEmail: '',
  },
  contact: {
    subtitle: '',
    heading: '',
    subheading: '',
    body: '',
    info: [],
  },
  volgaToGanga: {
    subtitle: '',
    mainQuote: '',
    paragraphs: [],
    ctaPhase: '',
    ctaHeading: '',
    ctaBody: '',
  },
  digieurasia: {
    subtitle: '',
    heading: '',
    quote: '',
    images: [],
    ctaHeading: '',
    ctaBody: '',
    submissionEmail: '',
  },
  ierfTalks: {
    subtitle: '',
    heading: '',
    body: '',
  },
  footer: {
    description: '',
    newsletterTitle: '',
    newsletterBody: '',
  },
  settings: {
    siteName: 'India Eurasia Research Forum',
    siteLogo: '/ierf_normal.png',
    socials: { x: '', instagram: '', linkedin: '', youtube: '' },
    footerCopyright: '© 2026 India Eurasia Research Forum. All rights reserved.',
  },
};
