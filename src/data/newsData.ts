export interface Article {
  id: string;
  title: string;
  deck?: string;
  summary: string;
  byline: string;
  authorTitle?: string;
  date: string;
  readTime: string;
  section: string;
  kicker?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  hotlinkPlaceholder?: string;
  paragraphs: string[];
  pullQuote?: {
    quote: string;
    attribution: string;
  };
  comments?: Array<{
    id: string;
    author: string;
    location: string;
    timeAgo: string;
    text: string;
    recommendations: number;
    verifiedSubscriber?: boolean;
  }>;
}

export interface LiveUpdate {
  id: string;
  timestamp: string;
  headline: string;
  author: string;
  body: string;
  isKeyTakeaway?: boolean;
}

export const ARTICLES: Record<string, Article> = {
  'trump-press-secretary': {
    id: 'trump-press-secretary',
    title: "Trump’s New Press Secretary: Not Quite Attorney at Law",
    kicker: "WHITE HOUSE MEMO",
    deck: "Karoline Leavitt told The New York Times that the confusion over her legal credentials is the result of searing misunderstandings, while colleagues maintain she played a key advisory role in ongoing court challenges.",
    summary: "Karoline Leavitt told The New York Times that the confusion over her legal credentials is the result of searing misunderstandings, while colleagues maintain she played a key advisory role in ongoing court challenges.",
    byline: "By Maggie Haberman",
    authorTitle: "Senior Political Correspondent",
    date: "Wednesday, October 15, 2025",
    readTime: "8 MIN READ",
    section: "U.S.",
    imageUrl: "/src/assets/images/nyt_lead_courtroom_1792029127524.jpg",
    hotlinkPlaceholder: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    imageCaption: "Alina Habba arriving at federal court for proceedings.",
    imageCredit: "Doug Mills/The New York Times",
    paragraphs: [
      "WASHINGTON — In the frantic days leading up to the announcement of President Trump's White House communications team, internal binders and biographical briefings circulated with an intriguing detail: Karoline Leavitt was described in two separate draft releases as having legal training and advising on appellate case strategy.",
      "The claim quickly raised eyebrows among veteran attorneys in the West Wing counsel's office, none of whom had ever encountered her in a courtroom or on any state bar registry.",
      "In a 45-minute interview on Tuesday evening, Ms. Leavitt, 27, sought to dispel the mounting controversy, insisting she had never claimed to be an attorney licensed to practice law in any jurisdiction.",
      "\"I have always been completely transparent about my background in communications and legislative strategy,\" Ms. Leavitt said. \"Any suggestion that I misrepresented my credentials to the president or the public is flatly false and manufactured by critics who want to distract from our agenda.\"",
      "Yet records reviewed by The New York Times, including transition memorandum drafts and preparatory talking points distributed to conservative surrogates, explicitly referenced her as possessing 'legal counseling credentials' during discussions about the administration's aggressive posture toward federal regulatory agencies.",
      "Several senior transition officials who spoke on the condition of anonymity acknowledged that the distinction between a policy advisor and a formal legal counselor had been routinely blurred in high-pressure staff meetings.",
      "\"When you are fighting on multiple judicial fronts simultaneously, titles tend to become fluid,\" said one senior administration official involved in personnel vetting. \"What mattered to Donald Trump was that she could deliver the message forcefully on television, not whether she had passed a multi-state bar examination.\"",
      "The discrepancy has nevertheless handed Democrats on Capitol Hill an early line of attack as the administration prepares for a series of high-stakes confirmation battles and legal challenges over executive authority in the coming session."
    ],
    pullQuote: {
      quote: "What mattered to Donald Trump was that she could deliver the message forcefully on television, not whether she had passed a multi-state bar examination.",
      attribution: "Senior Administration Official"
    },
    comments: [
      {
        id: 'c1',
        author: 'Eleanor Vance',
        location: 'Silver Spring, MD',
        timeAgo: '42m ago',
        text: 'This speaks directly to the blurring lines between actual professional qualifications and performative media presence that has characterized modern administration appointments.',
        recommendations: 184,
        verifiedSubscriber: true
      },
      {
        id: 'c2',
        author: 'Marcus Brody',
        location: 'Philadelphia, PA',
        timeAgo: '1h ago',
        text: 'Maggie Haberman’s sourcing on West Wing dynamics remains peerless. The details about the transition memorandum drafts are particularly revealing.',
        recommendations: 92,
        verifiedSubscriber: true
      },
      {
        id: 'c3',
        author: 'Sarah Jenkins',
        location: 'Seattle, WA',
        timeAgo: '2h ago',
        text: 'In any normal administration, vetting protocols would have flagged this immediately. It is astounding that these drafts circulated so widely without correction.',
        recommendations: 64,
        verifiedSubscriber: false
      }
    ]
  },

  'women-leaving-trump': {
    id: 'women-leaving-trump',
    title: "High-Ranking Women Are Leaving the Trump Administration",
    kicker: "POLITICS",
    deck: "As the president’s second term nears its midpoint, he is surrounded by fewer female officials in national security, domestic policy and Cabinet posts.",
    summary: "As the president’s second term nears its midpoint, he is surrounded by fewer female officials in national security, domestic policy and Cabinet posts.",
    byline: "By Annie Karni and Katie Rogers",
    authorTitle: "White House Correspondents",
    date: "Wednesday, October 15, 2025",
    readTime: "4 MIN READ",
    section: "U.S.",
    imageUrl: "/src/assets/images/nyt_lead_courtroom_1792029127524.jpg",
    hotlinkPlaceholder: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    imageCaption: "Officials departing the West Wing following a briefing on domestic appointments.",
    imageCredit: "Haiyun Jiang/The New York Times",
    paragraphs: [
      "WASHINGTON — When President Trump gathered his senior advisory council in the Roosevelt Room last Thursday, the visual contrast with his initial staffing announcements was stark: of the twenty-two officials seated around the mahogany table, only three were women.",
      "The quiet departure of several prominent female deputies across the National Security Council, the Department of Homeland Security, and the Office of Management and Budget over the past four months has accelerated a trend that staff members describe as a sharp cultural retrenchment.",
      "Interviews with nine current and former administration officials reveal that the departures were driven by a combination of aggressive internal turf battles, the sidelining of institutional policy experts, and a West Wing culture increasingly dominated by a tight circle of male loyalists.",
      "\"There was a distinct feeling that policy memoranda submitted by female deputies were subjected to an entirely different threshold of loyalty scrutiny,\" said a former deputy national security advisor who resigned in August.",
      "A White House spokesperson disputed that gender played any role in personnel decisions, highlighting recent promotions in judicial liaison roles and emphasizing that appointments are made strictly on merit and fidelity to the president's agenda."
    ],
    comments: [
      {
        id: 'c4',
        author: 'Claire Thornton',
        location: 'Boston, MA',
        timeAgo: '3h ago',
        text: 'The statistical breakdown in this piece is very clear. Personnel turnover in mid-term transitions is normal, but the demographic skew here is significant.',
        recommendations: 120,
        verifiedSubscriber: true
      }
    ]
  },

  'kimberly-guilfoyle': {
    id: 'kimberly-guilfoyle',
    title: "The Steep Rise and Sudden Fall of Kimberly Guilfoyle",
    kicker: "POLITICAL INSIDER",
    deck: "From Fox News host to prominent campaign surrogate, her sudden shift away from internal advisory roles reveals deep fractures inside the political organization.",
    summary: "From Fox News host to prominent campaign surrogate, her sudden shift away from internal advisory roles reveals deep fractures inside the political organization.",
    byline: "By Jonathan Swan and Shane Goldmacher",
    authorTitle: "National Political Reporters",
    date: "Wednesday, October 15, 2025",
    readTime: "6 MIN READ",
    section: "U.S.",
    imageUrl: "/src/assets/images/nyt_capitol_dinner_1792029127084.jpg",
    hotlinkPlaceholder: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    imageCaption: "Kimberly Guilfoyle speaking at a campaign event in Palm Beach earlier this year.",
    imageCredit: "Brendan Smialowski/Agence France-Presse",
    paragraphs: [
      "PALM BEACH, Fla. — For nearly a decade, Kimberly Guilfoyle occupied one of the most visible perches in Donald Trump's political orbit, moving effortlessly from conservative cable television to high-dollar campaign finance roundtables.",
      "Yet in recent weeks, her access to the inner corridors of Mar-a-Lago and the president's transition headquarters has experienced a precipitous decline, following sharp disputes over vendor contracts, fundraising commissions, and public messaging disputes.",
      "The friction reached a boiling point during a private dinner in Bedminster, where senior donors openly questioned the allocation of political action committee resources.",
      "Advisers close to the former president said that while Ms. Guilfoyle remains publicly supportive, her operational role within the leadership committee has been effectively dissolved as professional campaign managers consolidate control over operations."
    ]
  },

  'private-senators-dinner': {
    id: 'private-senators-dinner',
    title: "Inside the Private Dinner Where Key Senators Formed an Alliance",
    kicker: "CONGRESS",
    deck: "Bipartisan negotiations over defense authorizations took shape at an unpublicized dinner off Capitol Hill.",
    summary: "Bipartisan negotiations over defense authorizations took shape at an unpublicized dinner off Capitol Hill.",
    byline: "By Carl Hulse",
    authorTitle: "Chief Washington Correspondent",
    date: "Wednesday, October 15, 2025",
    readTime: "3 MIN READ",
    section: "U.S.",
    imageUrl: "/src/assets/images/nyt_capitol_dinner_1792029127084.jpg",
    hotlinkPlaceholder: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    imageCaption: "A historic Georgetown dining club where senators met in confidentiality.",
    imageCredit: "Kenny Holston/The New York Times",
    paragraphs: [
      "WASHINGTON — Over rib-eye steaks and California pinot noir in the upstairs private dining room of a historic Georgetown tavern, seven senators from opposing sides of the aisle accomplished in three hours what months of public hearings failed to produce.",
      "The clandestine dinner, organized by Senator Susan Collins and Senator Mark Warner, laid the groundwork for an unexpected compromise on the $890 billion National Defense Authorization Act.",
      "With leadership from both parties preoccupied with electoral posturing, the small working group quietly resolved contentious provisions regarding submarine procurement, semiconductor export safeguards, and cyber-command oversight."
    ]
  },

  'special-counsel-appeals': {
    id: 'special-counsel-appeals',
    title: "Special Counsel Files Final Response in Landmark Appeals Case",
    kicker: "LEGAL AFFAIRS",
    deck: "Prosecutors detailed procedural violations they argue could jeopardize future federal court precedents.",
    summary: "Prosecutors detailed procedural violations they argue could jeopardize future federal court precedents.",
    byline: "By Glenn Thrush and Alan Feuer",
    date: "Wednesday, October 15, 2025",
    readTime: "5 MIN READ",
    section: "U.S.",
    paragraphs: [
      "In a 68-page midnight filing before the U.S. Court of Appeals for the Eleventh Circuit, the special counsel's office presented what prosecutors described as an urgent defense of constitutional appointment authority.",
      "The filing directly challenges a lower court ruling that dismissed felony charges, arguing that overturning decades of statutory precedent would fatally destabilize federal law enforcement capabilities."
    ]
  },

  'justice-department-reshuffle': {
    id: 'justice-department-reshuffle',
    title: "How the Justice Department Prepares for Leadership Reshuffles",
    kicker: "GOVERNMENT",
    deck: "Career officials prepare handover dossiers ahead of anticipated policy pivots in the coming quarter.",
    summary: "Career officials prepare handover dossiers ahead of anticipated policy pivots in the coming quarter.",
    byline: "By Devlin Barrett",
    date: "Wednesday, October 15, 2025",
    readTime: "4 MIN READ",
    section: "U.S.",
    paragraphs: [
      "Inside the Robert F. Kennedy Department of Justice building, career division heads have spent the past forty-eight hours drafting comprehensive briefing binders for incoming political appointees.",
      "The transition memoranda focus on ongoing antitrust investigations, international sanctions enforcement, and cybersecurity operations that cannot afford interruptions during senior leadership transitions."
    ]
  },

  'david-brooks-opinion': {
    id: 'david-brooks-opinion',
    title: "The Quiet Revolution Transforming Public Trust",
    kicker: "OPINION",
    deck: "Why hyper-local leadership is outperforming national governance across major institutions.",
    summary: "Why hyper-local leadership is outperforming national governance across major institutions.",
    byline: "David Brooks",
    authorTitle: "Opinion Columnist",
    date: "Wednesday, October 15, 2025",
    readTime: "5 MIN READ",
    section: "Opinion",
    imageUrl: "/src/assets/images/nyt_columnist_portrait_1792029127794.jpg",
    hotlinkPlaceholder: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    imageCaption: "David Brooks, New York Times Opinion Columnist.",
    imageCredit: "The New York Times",
    paragraphs: [
      "If you consume only cable news and social media outrage algorithms, you would reasonably conclude that American social cohesion has dissolved into irremediable cynicism.",
      "Yet if you travel across mid-size municipal communities in Ohio, Wisconsin, and North Carolina, you witness an entirely divergent reality: a quiet, stubborn resurgence of local institutional renewal.",
      "From regional community foundations pooling capital for vocational apprenticeships to neighborhood library boards expanding universal literacy hubs, citizens are finding that when problems are tangible and neighbors have faces, ideological warfare loses its hypnotic power.",
      "The lesson of this moment is that trust cannot be legislated from Washington through sweeping executive fiats. It is built millimeter by millimeter through repetitive, face-to-face civic reciprocity."
    ]
  },

  'maureen-dowd-opinion': {
    id: 'maureen-dowd-opinion',
    title: "The Whispering Rooms of Washington",
    kicker: "OPINION",
    deck: "Behind closed doors, the polite masks come off faster than ever.",
    summary: "Behind closed doors, the polite masks come off faster than ever.",
    byline: "Maureen Dowd",
    authorTitle: "Opinion Columnist",
    date: "Wednesday, October 15, 2025",
    readTime: "4 MIN READ",
    section: "Opinion",
    paragraphs: [
      "WASHINGTON — There is a particular pitch of whisper that reverberates through the wood-paneled parlors of the Metropolitan Club when an administration changes guard.",
      "The grandees who insisted they would never compromise are already dusting off their tuxedo studs and practicing their obsequious chuckles for the inauguration galas.",
      "Power in this city remains what it has always been: a theatrical illusion maintained by those who pretend not to care about the seating chart while memorizing every single name on it."
    ]
  },

  'paul-krugman-opinion': {
    id: 'paul-krugman-opinion',
    title: "What the Inflation Hawks Got Consistently Wrong",
    kicker: "OPINION",
    deck: "Examining why supply chain recoveries defied traditional economic predictions.",
    summary: "Examining why supply chain recoveries defied traditional economic predictions.",
    byline: "Paul Krugman",
    authorTitle: "Opinion Columnist",
    date: "Wednesday, October 15, 2025",
    readTime: "6 MIN READ",
    section: "Opinion",
    paragraphs: [
      "For three consecutive years, a chorus of orthodox economic commentators insisted that the United States could not conquer post-pandemic inflation without inflicting a brutal recession and driving millions into unemployment.",
      "Yet here we are in the autumn of 2025: core inflation has decelerated to within striking distance of the central bank's target, while unemployment remains near generational lows and real wage gains continue for working-class households.",
      "Why were the doomsayers so wrong? Because they treated a historic, temporary supply shock as if it were the monetary overheating of the late 1970s."
    ]
  },

  'brain-scans-study': {
    id: 'brain-scans-study',
    title: "What Scientists Learned from 10,000 Brain Scans",
    kicker: "SCIENCE & HEALTH",
    deck: "A landmark multi-institution neuroimaging study is redefining what researchers know about memory consolidation and emotional resilience in adulthood.",
    summary: "A landmark multi-institution neuroimaging study is redefining what researchers know about memory consolidation and emotional resilience in adulthood.",
    byline: "By Carl Zimmer",
    authorTitle: "Science Reporter",
    date: "Wednesday, October 15, 2025",
    readTime: "7 MIN READ",
    section: "Science",
    imageUrl: "/src/assets/images/nyt_science_brain_scan_1792029128409.jpg",
    hotlinkPlaceholder: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    imageCaption: "High-resolution neural connectome mapping generated at the Cambridge Neuroimaging Consortium.",
    imageCredit: "Dr. Elena Rostova/Nature Neuroscience",
    paragraphs: [
      "For decades, neuroscientists operated under the assumption that the brain's baseline structural architecture remains relatively static once humans reach their late twenties.",
      "Now, the largest volumetric neuroimaging dataset ever assembled — comprising more than 10,000 high-resolution MRI scans tracked longitudinally across twelve countries — has revealed that the adult brain undergoes continuous, highly dynamic structural remodeling throughout middle and older age.",
      "Published this morning in Nature Neuroscience, the findings suggest that the density of synaptic pathways connecting the prefrontal cortex to the hippocampus varies far more dramatically based on daily cognitive stimulation and sleep quality than chronological age alone."
    ]
  },

  'best-nyc-restaurant': {
    id: 'best-nyc-restaurant',
    title: "The Best Restaurant in New York Right Now",
    kicker: "DINING REVIEW",
    deck: "In an understated basement dining room in Chinatown, chef Mei Lin transforms humble heritage ingredients into breathtaking modern poetry.",
    summary: "In an understated basement dining room in Chinatown, chef Mei Lin transforms humble heritage ingredients into breathtaking modern poetry.",
    byline: "By Pete Wells",
    authorTitle: "Chief Restaurant Critic",
    date: "Wednesday, October 15, 2025",
    readTime: "5 MIN READ",
    section: "Cooking",
    paragraphs: [
      "There are no neon signs, no velvet rope stanchions, and certainly no celebrity PR agents hovering near the unassuming door on Doyers Street.",
      "Yet inside Pavilion, the eighteen-seat dining room delivers the most electric, technically daring cooking to grace Manhattan in a decade.",
      "From a glistening duck consommé infused with twenty-year aged tangerine peel to hand-pulled noodles coated in smoked marrow chili butter, every course commands silent, reverent contemplation."
    ]
  },

  'retirement-planning': {
    id: 'retirement-planning',
    title: "How to Think About Retirement in Volatile Times",
    kicker: "YOUR MONEY",
    deck: "With bond yields shifting and longevity tables expanding, financial planners are rethinking the classic 60/40 portfolio formula.",
    summary: "With bond yields shifting and longevity tables expanding, financial planners are rethinking the classic 60/40 portfolio formula.",
    byline: "By Ron Lieber",
    authorTitle: "Personal Finance Columnist",
    date: "Wednesday, October 15, 2025",
    readTime: "5 MIN READ",
    section: "Business",
    paragraphs: [
      "For half a century, the golden rule of retirement wealth preservation was simple enough to fit on an index card: allocate 60 percent of your portfolio to equities for growth, and 40 percent to high-grade fixed income for security.",
      "Today, financial planners across the country are advising clients that this venerable formula may no longer provide adequate protection against extended inflation cycles and higher medical expenditures.",
      "Instead, advisors are turning to tiered cash-cushion models and inflation-protected infrastructure trusts designed to weather market drawdowns without forcing premature asset liquidations."
    ]
  }
};

export const LIVE_UPDATES: LiveUpdate[] = [
  {
    id: 'lu-1',
    timestamp: '12m ago',
    headline: 'Fed Chairman signals rate stabilization will hold through upcoming FOMC cycle',
    author: 'Jeanna Smialek',
    body: 'Speaking at the Economic Club of New York, the Federal Reserve chair emphasized that headline and core inflation measures have shown consistent convergence toward the 2 percent target, providing committee members latitude to hold benchmark borrowing rates steady.',
    isKeyTakeaway: true
  },
  {
    id: 'lu-2',
    timestamp: '34m ago',
    headline: 'Treasury yields tick lower across short-duration notes',
    author: 'Joe Rennison',
    body: 'The two-year Treasury note yield declined 4 basis points to 3.82 percent immediately following the Fed chair’s opening remarks, while the benchmark 10-year yield held near 4.01 percent.'
  },
  {
    id: 'lu-3',
    timestamp: '1h ago',
    headline: 'Consumer sentiment index registers third monthly uptick',
    author: 'Ben Casselman',
    body: 'Household surveys released this morning by the University of Michigan show consumer confidence reaching its highest mark in 18 months, buoyed by stabilizing grocery prices and resilient labor demand.'
  },
  {
    id: 'lu-4',
    timestamp: '2h ago',
    headline: 'European Central Bank signals parallel pause at upcoming Frankfurt summit',
    author: 'Patricia Cohen',
    body: 'Officials in Frankfurt indicated that European policymakers are seeing comparable disinflationary patterns across core services, reinforcing the expectation of a coordinated global interest rate plateau.'
  }
];

export const MINI_CROSSWORD_DATA = {
  id: 'mini-2025-10-15',
  title: "The Mini Crossword",
  date: "Wednesday, October 15, 2025",
  size: 5,
  grid: [
    ['P', 'A', 'P', 'E', 'R'],
    ['A', 'L', 'O', 'N', 'E'],
    ['S', 'P', 'A', 'R', 'K'],
    ['S', 'H', 'A', 'R', 'E'],
    ['E', 'A', 'S', 'E', 'D']
  ],
  across: [
    { num: 1, clue: "Daily reading material like The New York Times", answer: "PAPER", row: 0, col: 0 },
    { num: 6, clue: "Without any company", answer: "ALONE", row: 1, col: 0 },
    { num: 7, clue: "Flicker of flame or inspiration", answer: "SPARK", row: 2, col: 0 },
    { num: 8, clue: "Split equally, or post online", answer: "SHARE", row: 3, col: 0 },
    { num: 9, clue: "Made less painful or tense", answer: "EASED", row: 4, col: 0 }
  ],
  down: [
    { num: 1, clue: "Tickets to enter, or football throws", answer: "PASSE", row: 0, col: 0 },
    { num: 2, clue: "Mountain peak in Europe", answer: "ALPHA", row: 0, col: 1 },
    { num: 3, clue: "Polar animals like walruses and ___ (var)", answer: "POAS", row: 0, col: 2 },
    { num: 4, clue: "Enters data on a keyboard", answer: "ENRRE", row: 0, col: 3 },
    { num: 5, clue: "Drove fast or engaged a vehicle gear", answer: "REKED", row: 0, col: 4 }
  ]
};
