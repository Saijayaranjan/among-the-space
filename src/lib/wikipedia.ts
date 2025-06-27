export interface WikipediaEvent {
  text: string;
  pages: WikipediaPage[];
  year: number;
}

export interface WikipediaPage {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
}

export interface SpaceEvent {
  id: string;
  title: string;
  description: string;
  year: number;
  image?: string;
  url: string;
}

const SPACE_KEYWORDS = [
  // Space agencies and organizations
  'nasa', 'esa', 'spacex', 'roscosmos', 'jaxa', 'isro', 'cnsa', 'csa',
  
  // General space terms
  'space', 'satellite', 'astronaut', 'cosmonaut', 'taikonaut', 'rocket', 'spacecraft', 'shuttle',
  
  // Missions and programs
  'apollo', 'gemini', 'mercury', 'voyager', 'cassini', 'hubble', 'james webb', 'kepler', 'spitzer',
  'mars rover', 'curiosity', 'perseverance', 'opportunity', 'spirit', 'viking', 'pioneer',
  'new horizons', 'juno', 'galileo', 'rosetta', 'parker solar probe',
  
  // Celestial bodies and locations
  'mars', 'moon', 'venus', 'jupiter', 'saturn', 'uranus', 'neptune', 'mercury', 'pluto',
  'planet', 'solar', 'lunar', 'orbital', 'mission', 'launch', 'deep space',
  
  // Space infrastructure
  'telescope', 'probe', 'station', 'iss', 'mir', 'skylab', 'tiangong', 'space station',
  'discovery', 'challenger', 'endeavour', 'atlantis', 'columbia', 'soyuz', 'falcon',
  'dragon', 'crew dragon', 'starship', 'ariane',
  
  // Astronomical phenomena
  'galaxy', 'universe', 'cosmic', 'stellar', 'interstellar', 'nebula', 'supernova',
  'comet', 'asteroid', 'meteorite', 'eclipse', 'transit', 'aurora', 'black hole',
  'exoplanet', 'constellation',
  
  // Space activities
  'spacewalk', 'eva', 'docking', 'landing', 're-entry', 'orbit', 'zero gravity',
  'microgravity', 'space exploration', 'space program', 'space race', 'space technology',
  
  // Launch sites
  'cape canaveral', 'kennedy space center', 'baikonur', 'kourou', 'vandenberg',
  'plesetsk', 'jiuquan', 'xichang', 'tanegashima'
];

function isSpaceRelated(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SPACE_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

function formatTitle(title: string): string {
  if (!title) return '';
  
  // Replace underscores with spaces
  let formatted = title.replace(/_/g, ' ');
  
  // Remove common Wikipedia suffixes
  formatted = formatted.replace(/\s*\(disambiguation\)$/i, '');
  formatted = formatted.replace(/\s*\(page\)$/i, '');
  
  // Capitalize first letter of each word (title case)
  formatted = formatted.replace(/\b\w/g, letter => letter.toUpperCase());
  
  return formatted;
}

export async function fetchSpaceEvents(month: number, day: number): Promise<SpaceEvent[]> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`,
      {
        headers: {
          'User-Agent': 'AmongTheSpace/1.0 (https://amongthespace.com)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const events: WikipediaEvent[] = data.events || [];

    // Filter for space-related events
    const spaceEvents = events
      .filter(event => isSpaceRelated(event.text))
      .map((event, index): SpaceEvent => ({
        id: `${month}-${day}-${event.year}-${index}`,
        title: formatTitle(event.pages?.[0]?.title || `Space Event in ${event.year}`),
        description: event.text,
        year: event.year,
        image: event.pages?.[0]?.thumbnail?.source || event.pages?.[0]?.originalimage?.source,
        url: event.pages?.[0]?.content_urls?.desktop?.page || '#',
      }))
      .sort((a, b) => b.year - a.year) // Sort by year, newest first
      .slice(0, 6); // Limit to 6 events

    return spaceEvents;
  } catch (error) {
    console.error('Error fetching space events:', error);
    return getFallbackEvents(month, day);
  }
}

function getFallbackEvents(month: number, day: number): SpaceEvent[] {
  // Fallback events for when API fails
  const fallbackEvents: SpaceEvent[] = [
    {
      id: `fallback-${month}-${day}-1`,
      title: 'Historic Space Achievement',
      description: 'A significant milestone in space exploration occurred on this day.',
      year: 1969,
      url: '#',
    },
    {
      id: `fallback-${month}-${day}-2`,
      title: 'Astronomical Discovery',
      description: 'An important astronomical discovery was made on this date.',
      year: 1990,
      url: '#',
    },
    {
      id: `fallback-${month}-${day}-3`,
      title: 'Space Mission Launch',
      description: 'A notable space mission was launched on this day.',
      year: 2001,
      url: '#',
    },
  ];

  return fallbackEvents;
}

export function formatEventDate(month: number, day: number): string {
  const date = new Date(2024, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
}
