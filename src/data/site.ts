/**
 * Single source of truth for the whole site.
 *
 * Everything a non-developer might reasonably want to change — phone number,
 * services, towns served, rates, FAQs — lives here rather than being scattered
 * through templates. Pages read from this file; nothing is hard-coded twice.
 */

export const business = {
  name: 'Lakeside Towing & Recovery',
  legalName: 'Lakeside Towing & Recovery Inc.',
  tagline: 'We Meet by Accident!',
  phoneDisplay: '(249) 385-5240',
  phoneCompact: '249.385.5240',
  phoneHref: 'tel:+12493855240',
  phoneE164: '+1-249-385-5240',
  email: 'Billing.lakesidetowing@gmail.com',
  street: '123 Norweld Dr',
  city: 'Orillia',
  region: 'ON',
  regionName: 'Ontario',
  postalCode: 'L3V 7Z2',
  country: 'CA',
  lat: 44.6167,
  lng: -79.4203,
  facebook: 'https://www.facebook.com/people/Lakeside-Towing-and-Recovery/61557754504369/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=123+Norweld+Dr,+Orillia,+ON+L3V+7Z2',
  mapsEmbed:
    'https://www.google.com/maps?q=123+Norweld+Dr,+Orillia,+ON+L3V+7Z2&output=embed',
  storageCertificate: 'VS-212-186-623',
} as const;

export const addressLine = `${business.street}, ${business.city}, ${business.region} ${business.postalCode}`;

/** Trust markers shown in the proof bar and footer. All verifiable. */
export const credentials = [
  { label: 'OPP Approved', detail: 'Approved for Ontario Provincial Police tow rotation calls.' },
  {
    label: 'MTO Licensed',
    detail: `Ministry of Transportation Vehicle Storage Certificate ${business.storageCertificate}.`,
  },
  { label: 'Fully Insured', detail: 'Your vehicle is covered from hook-up to drop-off.' },
  { label: 'Open 24/7', detail: 'A real person answers the phone at 3 a.m.' },
];

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export interface Service {
  slug: string;
  /** Short label for nav and cards. */
  name: string;
  /** Full H1 — keyword-bearing, includes the town. */
  h1: string;
  title: string;
  description: string;
  /** One line under the card title. */
  summary: string;
  /** Lead paragraph on the service page. */
  intro: string;
  icon: string;
  featured?: boolean;
  /** What the job actually includes. */
  includes: string[];
  /** Numbered "how it works" steps. */
  steps: { title: string; body: string }[];
  /** Two or three paragraphs of genuinely page-specific copy. */
  body: { heading: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Rate keys from `rates` to surface on this page. */
  rateKeys: string[];
  related: string[];
}

export const services: Service[] = [
  {
    slug: 'emergency-towing',
    name: 'Emergency Towing',
    h1: '24 Hour Emergency Towing in Orillia',
    title: '24 Hour Emergency Towing in Orillia | Lakeside Towing',
    description:
      'Broken down or in a collision near Orillia? We run 24/7 emergency tow trucks across Orillia, Rama, Washago and Gravenhurst. OPP approved. Call (249) 385-5240.',
    summary: 'Round-the-clock response for breakdowns, collisions and no-starts.',
    intro:
      'Most of our calls are not planned. A car dies in the Walmart lot on a Sunday night, a transmission lets go on the 11 north of town, someone slides into the ditch on Old Barrie Road in February. We keep trucks staffed for exactly that — any hour, any day, including holidays.',
    icon: 'truck',
    featured: true,
    includes: [
      'Flatbed and wheel-lift trucks for cars, vans, SUVs and light trucks',
      'Collision recovery with debris clean-up at the scene',
      'All-wheel-drive and low-clearance vehicles handled on dollies or flatbed',
      'Direct drop at your shop, your driveway, or our secure yard',
      'Price quoted on the phone before the truck is dispatched',
    ],
    steps: [
      {
        title: 'Call and tell us where you are',
        body: 'A cross street, a highway marker, a business name — anything that puts us within a block. If you can, tell us the year, make and model, and whether the wheels still turn.',
      },
      {
        title: 'We quote you before we roll',
        body: 'You get the price and a realistic arrival window on that first call. No meter starts running while you decide.',
      },
      {
        title: 'Stay put and stay safe',
        body: 'Hazards on, seatbelt on, stay in the vehicle if you are on a live highway shoulder. If you are somewhere unsafe, get well behind the guardrail and call us back with your new position.',
      },
      {
        title: 'We hook up and go where you say',
        body: 'Shop, home, dealership, or our yard. If your shop is closed, we can store the vehicle overnight and deliver it when they open.',
      },
    ],
    body: [
      {
        heading: 'What counts as an emergency tow',
        text: 'A no-start in a parking lot, a flat with no spare, an overheated engine, a seized brake, a collision, a vehicle that has been in the ditch since the last snow squall. If the vehicle cannot safely be driven, it needs a tow — and driving a car with a bad wheel bearing or a leaking brake line "just to get it home" is how a $150 tow turns into a much bigger bill.',
      },
      {
        heading: 'Collisions and OPP calls',
        text: `We are approved to run Ontario Provincial Police rotation calls, which means we work collision scenes regularly and know how they are managed. If you have been in a crash, the officer on scene may call a tow for you — you are still entitled to choose your own tow operator and your own destination in Ontario. If you want us, say so, or call ${business.phoneDisplay} directly.`,
      },
      {
        heading: 'Winter around Simcoe and Muskoka',
        text: 'Lake-effect snow off Couchiching and Simcoe puts vehicles in ditches on the same stretches every year — Highway 12 toward Coldwater, the 11 corridor, the concession roads out past Ardtrea. A ditched car is usually a winch-out rather than a straight tow, and it is billed differently. We will tell you which one you need when you describe the scene.',
      },
    ],
    faqs: [
      {
        q: 'How fast can you get to me?',
        a: 'It depends on where you are and what is already on the road. In Orillia proper we are usually looking at 30 to 45 minutes. Out toward Washago, Rama or Gravenhurst it can be longer, and a snowstorm night stretches everything. We will give you a real window on the phone rather than an optimistic one.',
      },
      {
        q: 'Do you tow at 3 a.m.?',
        a: 'Yes. We are staffed 24 hours a day, every day of the year, including Christmas. The number is the same at 3 a.m. as it is at 3 p.m.',
      },
      {
        q: 'Can you take my car straight to my mechanic?',
        a: 'Yes, and it is usually the cheapest option. Tell us the shop when you call. If they are closed, we can drop it in their lot where they allow it, or hold it in our yard and deliver it the next business day.',
      },
      {
        q: 'Will my insurance cover the tow?',
        a: 'Many policies include roadside or towing coverage, and most collision claims cover the tow to a shop. We are not able to bill your insurer directly in every case, so ask us for a receipt with the full details and submit it with your claim.',
      },
    ],
    rateKeys: ['in-town', 'dollies', 'long-distance'],
    related: ['long-distance-towing', 'winch-out-recovery', 'vehicle-storage'],
  },
  {
    slug: 'long-distance-towing',
    name: 'Long Distance Towing',
    h1: 'Long Distance Towing from Orillia',
    title: 'Long Distance Towing from Orillia | Lakeside Towing',
    description:
      'Long haul vehicle transport from Orillia to Toronto, Ottawa, Sudbury or anywhere in Ontario. Flat rate plus per-km pricing. Call (249) 385-5240.',
    summary: 'Highway hauls across Ontario and beyond, priced by the kilometre.',
    intro:
      'Sometimes the vehicle does not need to go across town — it needs to go to a specialist in Toronto, back to a dealership in Ottawa, or up to a cottage in the near north. We run those hauls with a per-kilometre rate on top of a flat base, so you know the number before we leave the yard.',
    icon: 'route',
    featured: true,
    includes: [
      'Point-to-point transport anywhere in Ontario and into neighbouring provinces and states',
      'Dealership transfers, auction pickups and private-sale deliveries',
      'Non-running project vehicles loaded with winch and dollies',
      'Scheduled pickups — you pick the day, we work around your shop hours',
      'One driver, one truck, one handoff: your vehicle is not transloaded partway',
    ],
    steps: [
      {
        title: 'Give us both addresses',
        body: 'Pickup and drop-off, plus whether the vehicle runs, steers and brakes. That determines whether it goes on the flatbed under its own power or gets winched.',
      },
      {
        title: 'We work out the distance and quote it',
        body: 'A flat base plus a per-kilometre rate for the loaded distance. Dollies, if the vehicle needs them, are added at a separate flat plus per-kilometre rate.',
      },
      {
        title: 'We book a window',
        body: 'Long hauls get scheduled rather than dispatched. We will agree on a pickup window that works with the receiving shop or dealership hours.',
      },
      {
        title: 'Handoff and paperwork',
        body: 'We confirm the drop with you, and you get a receipt itemising base, distance and any extras — the document your insurer or your accountant will want.',
      },
    ],
    body: [
      {
        heading: 'Where we run from Orillia',
        text: 'Orillia sits at the junction of Highway 11 and Highway 12, which makes it a practical base for long hauls in any direction. Toronto and the GTA are the most common southbound run; northbound we go through Gravenhurst and Bracebridge toward Huntsville, North Bay and Sudbury. East and west along the 12 and the 400 corridor are routine. We will quote runs outside Ontario as well.',
      },
      {
        heading: 'Project cars, non-runners and estate vehicles',
        text: 'A vehicle that has not moved in ten years is a different job from one that broke down yesterday — the tyres may be flat, the brakes seized, the steering locked. Tell us that up front so we bring dollies and a winch and budget the time. We would rather quote it correctly than surprise you at the gate.',
      },
      {
        heading: 'Why per-kilometre beats a guessed flat rate',
        text: 'A single flat number for "long distance" has to be padded to cover the worst case, which means short-long hauls subsidise the truly long ones. Charging a base plus a rate per kilometre means a 90 km run to Barrie and back costs what a 90 km run costs, and you can check the arithmetic yourself on the receipt.',
      },
    ],
    faqs: [
      {
        q: 'How is long distance priced?',
        a: `A flat base of ${'$'}200 plus ${'$'}3.50 per kilometre. If the vehicle needs dollies, that is an extra ${'$'}50 plus ${'$'}0.50 per kilometre. We confirm the exact figure with you before booking — see the rates page for the full list.`,
      },
      {
        q: 'Do you charge for the empty return trip?',
        a: 'The per-kilometre rate is quoted on the run as we price it for you. Ask when you call and we will break down exactly what the number covers for your specific route so there is no ambiguity.',
      },
      {
        q: 'Can you tow out of province or into the US?',
        a: 'We will quote runs into neighbouring provinces and across the border. Border crossings involve extra paperwork and time, so give us as much notice as you can and have the ownership and your ID ready.',
      },
      {
        q: 'Can you pick up a car I just bought online?',
        a: 'Yes — private sales, auctions and dealer transfers are regular work. We need the seller reachable at the pickup address, and we need to know whether the vehicle runs and whether there are keys.',
      },
    ],
    rateKeys: ['long-distance', 'long-distance-dollies'],
    related: ['enclosed-transport', 'emergency-towing', 'vehicle-storage'],
  },
  {
    slug: 'enclosed-transport',
    name: 'Enclosed Transport',
    h1: 'Enclosed Vehicle Transport',
    title: 'Enclosed Car Transport in Orillia | Lakeside Towing',
    description:
      'Fully enclosed carrier transport for classic cars, luxury vehicles and motorcycles in Orillia and across Ontario. Call (249) 385-5240.',
    summary: 'Covered carrier service for classics, exotics and motorcycles.',
    intro:
      'An open flatbed is fine for a daily driver. It is not fine for fresh paint, a restored numbers-matching car, or a motorcycle in November. Enclosed transport puts a roof and four walls between your vehicle and the 401 — no stone chips, no road salt, no weather, and nobody at a rest stop taking photographs of it.',
    icon: 'shield',
    includes: [
      'Fully enclosed trailer — vehicle is not visible or exposed in transit',
      'Soft straps and wheel-net tie-downs rather than chassis chains',
      'Low-clearance loading for lowered suspension and long front splitters',
      'Motorcycles secured with wheel chock and handlebar straps',
      'Condition documented with photographs at load and at delivery',
    ],
    steps: [
      {
        title: 'Tell us what it is',
        body: 'Year, make, model, ride height, whether it runs, and any quirk we should know — a temperamental starter, no reverse, a battery cut-off switch under the seat.',
      },
      {
        title: 'We confirm fit and quote',
        body: 'Ground clearance and wheelbase determine loading approach. We will tell you honestly if a vehicle is better suited to a different method.',
      },
      {
        title: 'Documented loading',
        body: 'We photograph the vehicle before it goes in, note any existing marks with you, and strap it by the wheels so nothing loads the suspension or the bodywork.',
      },
      {
        title: 'Delivery and sign-off',
        body: 'Same photographs at the other end, walked around with whoever receives it.',
      },
    ],
    body: [
      {
        heading: 'Show season, auction runs and cottage cars',
        text: 'Cottage country runs on a seasonal rhythm and so does this service. Spring is cars coming out of winter storage and heading to the first shows; autumn is the reverse, plus the vehicles being moved south before the roads get salted. Book those two windows early — everyone in Muskoka and Simcoe wants the same two weekends.',
      },
      {
        heading: 'Why salt is the real argument for enclosed',
        text: 'Ontario road salt is aggressive, and the spray off a highway in March reaches everything underneath a vehicle on an open deck. For a restored car with bare metal in the underbody or a fresh respray, one open-deck run in the wrong month can undo real money in bodywork. The enclosed trailer is cheap insurance against that.',
      },
      {
        heading: 'Motorcycles',
        text: 'Bikes go in the enclosed trailer on a wheel chock with soft straps at the triple clamp, not ratcheted down on the bars hard enough to bottom the forks for the whole trip. A tarp on an open trailer is not transport for a motorcycle, and neither is a pickup bed with two bungees.',
      },
    ],
    faqs: [
      {
        q: 'Is enclosed transport more expensive?',
        a: 'Yes — the equipment costs more to run and carries fewer vehicles. We quote it per job based on distance and the vehicle. Call with the route and the car and we will give you a number.',
      },
      {
        q: 'Can you move a car that does not run?',
        a: 'Yes. Non-running vehicles are winched in. We need to know in advance whether it steers and whether the brakes are free, because that changes how we load it.',
      },
      {
        q: 'How low is too low?',
        a: 'We handle lowered vehicles routinely using ramps and boards. Tell us the ground clearance at the lowest point — usually the front splitter or the exhaust — and we will tell you whether it clears.',
      },
      {
        q: 'Do you transport more than one vehicle at a time?',
        a: 'Ask when you call. Depending on the vehicles and the route it can sometimes be done in one run, which is cheaper than two separate trips.',
      },
    ],
    rateKeys: ['long-distance'],
    related: ['long-distance-towing', 'vehicle-storage', 'emergency-towing'],
  },
  {
    slug: 'winch-out-recovery',
    name: 'Winch-Out & Recovery',
    h1: 'Winch-Out & Vehicle Recovery',
    title: 'Winch-Out & Vehicle Recovery in Orillia | Lakeside',
    description:
      'Stuck in a ditch, a snowbank, mud or sand around Orillia? Lakeside Towing & Recovery runs winch-out and vehicle recovery 24/7 at $250/hr. Call (249) 385-5240.',
    summary: 'Ditches, snowbanks, soft shoulders, mud and sand — winched out properly.',
    intro:
      'A recovery is not a tow. A tow moves a vehicle that is sitting on a road; a recovery gets a vehicle back onto the road first. Ditches, snowbanks, soft spring shoulders, mud at a boat launch, sand on a cottage lane — all of it is winch work, and all of it is billed by the hour rather than by the trip.',
    icon: 'anchor',
    featured: true,
    includes: [
      'Ditch and embankment recovery on and off the highway',
      'Snowbank and unplowed-laneway extraction through the winter',
      'Soft shoulder, mud and sand recovery — boat launches and cottage roads',
      'Rollovers and vehicles resting on their side',
      'Recovery straps and snatch blocks used to pull from the correct angle',
    ],
    steps: [
      {
        title: 'Describe the position, not just the location',
        body: 'How far off the road, how steep the drop, which way the vehicle is facing, whether it is on its wheels, whether it is in water. This determines what equipment we bring.',
      },
      {
        title: 'Get clear of the vehicle',
        body: 'Do not stand between the truck and the vehicle, and do not stand in line with a winch cable under load. If a cable or strap lets go it travels. Stay well off to the side.',
      },
      {
        title: 'We rig and pull',
        body: 'We anchor properly, use a snatch block to change the angle if the pull is not straight, and take up load progressively rather than snatching it. The billing clock reflects the actual time on scene.',
      },
      {
        title: 'Assess before you drive off',
        body: 'A vehicle out of a ditch is not automatically roadworthy. We will point out obvious damage — a bent control arm, a punctured oil pan, a wheel that is no longer pointing the right way. If it should not be driven, we will tow it.',
      },
    ],
    body: [
      {
        heading: 'Why recovery is charged by the hour',
        text: 'A tow across town is a known quantity. A recovery is not: one vehicle is two metres off the shoulder on flat grass and takes fifteen minutes, another is nose-down in a wet ditch on a blind curve and needs traffic control, two anchor points and an hour of careful work. Charging a flat rate for both means overcharging the easy one to cover the hard one. Hourly is the honest way to price it.',
      },
      {
        heading: 'What not to do while you wait',
        text: 'Do not keep trying to drive out. Spinning tyres dig the vehicle deeper, cook the transmission and, in snow, polish the surface under the wheels into ice. Do not let a passing pickup with a tow strap pull on your bumper cover or a suspension component — recovery points on modern cars are specific, and pulling on the wrong one bends expensive things. Turn the engine off if you smell fuel, and get out and away from the vehicle if it is in water that is rising.',
      },
      {
        heading: 'Cottage country specifics',
        text: 'Around Rama Road, Grays Bay and the smaller lanes off the lakes, the hazards are seasonal and predictable: frost heave and soft shoulders in the spring thaw, sand at the launches all summer, unplowed private laneways from December on. Private laneways in particular catch people out — a road that is fine in a half-ton in November is a recovery call in January.',
      },
    ],
    faqs: [
      {
        q: 'How much does a winch-out cost?',
        a: `${'$'}250 per hour. Most straightforward ditch recoveries in and around Orillia come in around an hour. We will give you our best estimate on the phone once you have described the position.`,
      },
      {
        q: 'Is a winch-out the same as a tow?',
        a: 'No. A winch-out gets the vehicle back onto a driveable surface. If the vehicle is damaged and cannot be driven afterward, you also need a tow, which is billed separately. Many ditch calls end up being both.',
      },
      {
        q: 'My car is in a snowbank in my own driveway. Is that a recovery?',
        a: 'Usually yes, and it is very common in January and February. It is generally quick work — often well under the full hour.',
      },
      {
        q: 'Can you recover a vehicle that has rolled?',
        a: 'Yes. Rollovers need to be righted before they can be moved, which takes more rigging and more time. Make sure everyone is out and clear of the vehicle, and call emergency services first if anyone is hurt.',
      },
    ],
    rateKeys: ['winch-out', 'in-town'],
    related: ['emergency-towing', 'vehicle-storage', 'long-distance-towing'],
  },
  {
    slug: 'battery-boost',
    name: 'Battery Boost',
    h1: 'Battery Boost & Jump Start',
    title: 'Battery Boost & Jump Start in Orillia — $80 | Lakeside',
    description:
      'Dead battery in Orillia, Rama or Washago? We will come out and boost it — $80, 24 hours a day. No membership needed. Call (249) 385-5240.',
    summary: 'Dead battery? We come to you and get the engine turning over.',
    intro:
      'A dead battery is the single most common call we get, and it is also the cheapest problem to solve. We come to wherever you are, connect properly, and get the engine running — no membership, no annual fee, no waiting for a tow truck when what you need is four minutes with a booster pack.',
    icon: 'bolt',
    includes: [
      'Professional booster pack — no risk of surging a modern vehicle\'s electronics',
      'Correct connection sequence and grounding point for your vehicle',
      'Quick check of terminals for corrosion and looseness',
      'Honest read on whether the battery will get you home or leave you stranded again',
      'Available 24 hours a day, no membership required',
    ],
    steps: [
      {
        title: 'Call with your location and vehicle',
        body: 'Parking lot, driveway, roadside — and the year, make and model. Some vehicles have the battery in the trunk or under a seat, and it helps to know before we arrive.',
      },
      {
        title: 'We come to you',
        body: 'Flat $80 anywhere in our normal service area, day or night.',
      },
      {
        title: 'Boost and check',
        body: 'We connect to the manufacturer\'s designated points, start the vehicle, and look at whether it is holding a charge once it is running.',
      },
      {
        title: 'You get a straight answer',
        body: 'If the battery is finished, we will tell you. If it is the alternator, we will tell you that too — and in that case boosting only buys you a few kilometres, so a tow is usually the better call.',
      },
    ],
    body: [
      {
        heading: 'Why batteries die in Orillia in January',
        text: 'A battery loses a large share of its cranking power in deep cold at the same time that cold oil makes the engine much harder to turn over. A battery that was quietly weak in October is the one that will not start on the first genuinely cold morning. That is why the first hard freeze of the winter is reliably our busiest week of the year for boosts.',
      },
      {
        heading: 'Boost, or is it something else?',
        text: 'If the engine cranks slowly and then catches, that is a battery. If you get a rapid clicking and no crank, that is usually a battery too. If everything is dead — no dash lights, no dome light, nothing — check the terminals first; a loose or corroded terminal mimics a dead battery exactly. If the vehicle started fine and then died while driving, the battery is probably not your problem and boosting it will not fix anything.',
      },
      {
        heading: 'After the boost',
        text: 'Drive it, do not idle it. Idling puts very little charge back into a battery. Twenty to thirty minutes of actual driving is more useful than an hour sitting in the driveway. And if the vehicle will not restart after you shut it off, the battery is not holding — get it tested rather than boosting it again tomorrow.',
      },
    ],
    faqs: [
      {
        q: 'How much is a boost?',
        a: `${'$'}80, flat, anywhere in our normal service area. No membership and no extra charge for nights, weekends or holidays.`,
      },
      {
        q: 'Do I need to be a member of anything?',
        a: 'No. Call, give us your location, pay for the one call. That is the whole arrangement.',
      },
      {
        q: 'Will a boost damage my car\'s electronics?',
        a: 'Not the way we do it. We use a proper booster pack connected at the manufacturer\'s designated points, which avoids the voltage spikes that careless cable-to-cable jumps between two vehicles can cause.',
      },
      {
        q: 'What if the boost does not fix it?',
        a: 'Then the problem is not the battery — it is a starter, an alternator, or something electrical. We will tell you what we are seeing, and if it needs to go to a shop we can tow it there at our normal tow rate.',
      },
    ],
    rateKeys: ['boost'],
    related: ['lockout-service', 'fuel-delivery', 'emergency-towing'],
  },
  {
    slug: 'lockout-service',
    name: 'Lockout Service',
    h1: 'Car Lockout Service',
    title: 'Car Lockout Service in Orillia — $80, 24/7 | Lakeside',
    description:
      'Locked your keys in the car in Orillia? We will get you back in without damaging the door or the glass — $80, any hour. Call (249) 385-5240.',
    summary: 'Keys locked inside? We open it without breaking anything.',
    intro:
      'Keys on the driver\'s seat, doors locked, engine possibly still running. It happens to careful people constantly, and it is a fifteen-minute problem — provided nobody tries to solve it with a coat hanger first.',
    icon: 'key',
    includes: [
      'Professional lockout tools — air wedge and long-reach, not a slim jim down the door',
      'Works on the door seal, not the glass or the lock cylinder',
      'Most makes and models, including keyless-entry vehicles',
      'Available 24 hours, flat $80',
      'Proof of ownership checked before we open anything',
    ],
    steps: [
      {
        title: 'Call before you improvise',
        body: 'Tell us the year, make and model and where you are parked. If the engine is running or there is a child or a pet inside, say so immediately — that changes the priority.',
      },
      {
        title: 'Confirm it is yours',
        body: 'We will ask for ownership or ID matching the vehicle. It is a short conversation and it is the reason this service is safe to offer at all.',
      },
      {
        title: 'We open it',
        body: 'An air wedge creates a small gap at the top of the door frame and a long-reach tool trips the interior handle or the unlock button. No damage to the paint, the weatherstrip, the glass or the lock.',
      },
      {
        title: 'You are back in',
        body: 'Flat $80, day or night.',
      },
    ],
    body: [
      {
        heading: 'Why not a coat hanger',
        text: 'Because the inside of a modern door is full of things a wire will find first: the side airbag wiring, the window regulator cables, the lock actuator linkage and the wiring loom for the mirror and the speakers. A $80 lockout call regularly turns into a several-hundred-dollar door repair when someone has spent twenty minutes fishing around in there first. The window is worse — a door glass plus labour costs many times what the lockout does.',
      },
      {
        heading: 'Keyless entry and push-button start',
        text: 'Modern keyless vehicles will happily lock themselves with the fob inside, especially if the fob battery is weak enough that the car cannot see it. Some models will also lock with the engine running. Both situations are routine for us. If your fob has been getting unreliable — you have to stand closer, or press twice — replace the battery; that is usually the entire fault.',
      },
      {
        heading: 'A child or a pet inside',
        text: 'Say so the moment you call and we will treat it as an emergency. If it is a hot day or a very cold one and a child or animal is in genuine distress, call 911 first. Emergency services are closer than we are and they will not wait.',
      },
    ],
    faqs: [
      {
        q: 'How much does a lockout cost?',
        a: `${'$'}80, flat, any hour of the day or night.`,
      },
      {
        q: 'Will you damage my car getting in?',
        a: 'No. We work through the door seal with an air wedge and a long-reach tool. Nothing is cut, pried or broken, and we do not touch the glass or the lock cylinder.',
      },
      {
        q: 'Can you open any vehicle?',
        a: 'Almost all of them. A small number of vehicles with unusual door architecture or deadlocking systems are exceptions, and in that case a locksmith or the dealer is the right call. We will tell you promptly rather than keep working at it on your dime.',
      },
      {
        q: 'Can you get into a car that is not mine?',
        a: 'Not without proof that you are entitled to be in it. We check ownership or matching ID every time, with no exceptions.',
      },
    ],
    rateKeys: ['lockout'],
    related: ['battery-boost', 'fuel-delivery', 'emergency-towing'],
  },
  {
    slug: 'fuel-delivery',
    name: 'Fuel Delivery',
    h1: 'Emergency Fuel Delivery',
    title: 'Emergency Fuel Delivery in Orillia — $80 | Lakeside',
    description:
      'Out of gas around Orillia, Washago or Rama? We bring fuel to you — $80 plus the cost of the fuel, 24 hours a day. Call (249) 385-5240.',
    summary: 'Ran the tank dry? We bring enough fuel to get you to a station.',
    intro:
      'Running out of fuel is not a mechanical failure, it is a bad afternoon. We bring enough gasoline or diesel to get you to the nearest station — $80 for the call plus whatever the fuel actually costs, with no markup games.',
    icon: 'fuel',
    includes: [
      'Gasoline or diesel delivered to your location',
      'Enough fuel to reach the nearest open station',
      'Approved transport containers and a proper pouring spout',
      'Charged at $80 plus the actual cost of the fuel',
      'Available 24 hours, including overnight when the rural stations are closed',
    ],
    steps: [
      {
        title: 'Call and tell us gas or diesel',
        body: 'Getting this wrong is an expensive mistake, so we confirm it twice. Check the label inside your fuel door if you are not certain.',
      },
      {
        title: 'Pull off the road if you can',
        body: 'A vehicle stopped in a live lane is dangerous. If you still have momentum when it dies, coast onto the shoulder or into a lot. Hazards on either way.',
      },
      {
        title: 'We deliver and fill',
        body: 'We bring the fuel in an approved container and pour it in. Diesel vehicles that have run completely dry sometimes need the system primed before they will restart — we will tell you if that is what is happening.',
      },
      {
        title: 'Get to a station and fill up properly',
        body: 'What we bring is enough to get you moving, not a full tank. The nearest station is the next stop.',
      },
    ],
    body: [
      {
        heading: 'Why "one more town" is a bad bet up here',
        text: 'Between Orillia and Gravenhurst, and out along the 12 past Washago, the gaps between open stations get long — and after about 10 p.m. a good number of the rural ones are closed entirely. The low-fuel light is a warning with maybe 60 or 70 kilometres behind it on most vehicles, and that is a lot less reassuring at 11 p.m. on Highway 11 north than it is on Memorial Avenue at noon.',
      },
      {
        heading: 'Running a tank dry is worse for a diesel',
        text: 'Gasoline engines usually restart without complaint once there is fuel in the tank. Diesels can pull air into the injection system when they run dry, and some need to be bled or primed before they will start again. If you are driving a diesel and the gauge is getting low, do not push it — the tow that follows a dry diesel is more expensive than the fuel you were trying to save.',
      },
      {
        heading: 'Sediment at the bottom of the tank',
        text: 'Regularly running a tank down to empty pulls whatever has settled at the bottom into the fuel pump and the filter. On an older vehicle with an original tank that is a real way to end up replacing a fuel pump. Treating a quarter tank as empty is cheap insurance.',
      },
    ],
    faqs: [
      {
        q: 'What does fuel delivery cost?',
        a: `${'$'}80 for the call plus the actual cost of the fuel we bring. The fuel is charged at what it costs — we do not mark it up.`,
      },
      {
        q: 'How much fuel do you bring?',
        a: 'Enough to comfortably get you to the nearest open station. This is not a tank fill service — it is a rescue.',
      },
      {
        q: 'Do you deliver diesel?',
        a: 'Yes. Tell us clearly when you call, and check your fuel door label if you are at all unsure.',
      },
      {
        q: 'I put the wrong fuel in. Can you help?',
        a: 'Do not start the engine — that is the single most important thing. Misfuelling needs the tank drained, not topped up. Call us and we will tow it to a shop that can drain and flush it.',
      },
    ],
    rateKeys: ['fuel'],
    related: ['battery-boost', 'lockout-service', 'emergency-towing'],
  },
  {
    slug: 'vehicle-storage',
    name: 'Vehicle Storage',
    h1: 'Secure Vehicle Storage in Orillia',
    title: 'Secure Vehicle Storage in Orillia | MTO Licensed Yard',
    description:
      'Indoor and outdoor vehicle storage in Orillia under MTO Certificate VS-212-186-623. Insurance holds, seasonal and post-collision. Call (249) 385-5240.',
    summary: 'Indoor and outdoor storage in an MTO-licensed yard.',
    intro:
      `We hold vehicles under Ministry of Transportation Vehicle Storage Certificate ${business.storageCertificate} — a licence that carries real record-keeping and notification obligations, which is exactly what you want from whoever has your car after a collision.`,
    icon: 'warehouse',
    includes: [
      'Indoor storage for collision vehicles, classics and seasonal cars',
      'Outdoor storage in a secured, fenced yard',
      'Insurance and adjuster holds with proper documentation',
      'Post-collision storage while liability and repairs are sorted out',
      'Release to you, your insurer or your body shop on your instruction',
    ],
    steps: [
      {
        title: 'The vehicle arrives',
        body: 'Usually straight off our own truck after a collision or breakdown, but we also take vehicles delivered by others.',
      },
      {
        title: 'It is logged',
        body: 'Date, time, condition and identifying details recorded as the MTO certificate requires. That record is what your insurer and your adjuster will rely on.',
      },
      {
        title: 'It sits secure',
        body: 'Fenced yard for outdoor storage; indoor bays for vehicles that need to be out of the weather.',
      },
      {
        title: 'You say when and where',
        body: 'Release to you, to your body shop, to your insurer, or onto our truck for delivery. Storage is charged per day.',
      },
    ],
    body: [
      {
        heading: 'What the MTO certificate actually means',
        text: 'Ontario licenses vehicle storage. A certificate holder has to keep proper records of what came in, when, and in what condition, and has to follow specific rules about notifying owners and lienholders. An unlicensed lot that "keeps an eye on things" has none of those obligations and none of that paper trail. When an insurer starts asking questions about a total loss, the paper trail is the difference between a clean claim and a slow one.',
      },
      {
        heading: 'After a collision',
        text: 'A written-off or badly damaged vehicle often has to sit somewhere while the adjuster inspects it, liability gets settled and the repair decision gets made. That is what post-collision storage is for. Get your personal belongings, your ownership and your insurance slip out of the vehicle before it goes into the yard, or arrange a time to come and retrieve them — it is much simpler than doing it later.',
      },
      {
        heading: 'Seasonal and long-term',
        text: 'Cottage-country reality: convertibles, classics and motorcycles that have no business being outside from November to April, and no garage space at home. Indoor storage handles that. If a vehicle is going away for the season, leave the fuel tank near full to limit condensation, and tell us if you want it on a battery tender.',
      },
    ],
    faqs: [
      {
        q: 'How much is storage?',
        a: 'Storage is charged per day and the rate depends on indoor or outdoor and the size of the vehicle. Call for a current quote — and if it is an insurance matter, tell us, because that changes how the billing is documented.',
      },
      {
        q: 'Is your yard licensed?',
        a: `Yes. We hold Ontario Ministry of Transportation Vehicle Storage Certificate ${business.storageCertificate}, and the certificate is reproduced on our about page.`,
      },
      {
        q: 'Can I get my belongings out of a stored vehicle?',
        a: 'Yes. Call ahead so we can arrange a time and have someone meet you at the vehicle. Bring ID.',
      },
      {
        q: 'Who can authorise release?',
        a: 'The registered owner, or a party the owner has authorised in writing — commonly an insurer or a body shop. We confirm before anything leaves the yard.',
      },
    ],
    rateKeys: ['in-town'],
    related: ['emergency-towing', 'enclosed-transport', 'winch-out-recovery'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)!;

/* ------------------------------------------------------------------ *
 * Rates — supplied by the business. Typical, not fixed.
 * ------------------------------------------------------------------ */

export interface Rate {
  key: string;
  label: string;
  price: string;
  unit?: string;
  note: string;
  group: 'Towing' | 'Roadside Assistance' | 'Recovery';
}

export const rates: Rate[] = [
  {
    key: 'in-town',
    label: 'In-town tow',
    price: '$100 – $200',
    note: 'Orillia and the immediate surrounding area. Where you land in the range depends on the vehicle, the pickup and how much work the hook-up takes.',
    group: 'Towing',
  },
  {
    key: 'dollies',
    label: 'Wheel dollies (in town)',
    price: '$45',
    unit: 'flat',
    note: 'Added when a vehicle cannot roll freely — all-wheel drive, seized brakes, locked steering or missing wheels.',
    group: 'Towing',
  },
  {
    key: 'long-distance',
    label: 'Long distance tow',
    price: '$200',
    unit: '+ $3.50 / km',
    note: 'Flat base plus a per-kilometre rate. We work out the exact figure with you before booking.',
    group: 'Towing',
  },
  {
    key: 'long-distance-dollies',
    label: 'Wheel dollies (long distance)',
    price: '$50',
    unit: '+ $0.50 / km',
    note: 'Added to a long distance tow when the vehicle needs dollies for the haul.',
    group: 'Towing',
  },
  {
    key: 'winch-out',
    label: 'Winch-out & recovery',
    price: '$250',
    unit: 'per hour',
    note: 'Ditches, snowbanks, mud and sand. Billed for actual time on scene — most straightforward ditch pulls come in around the hour.',
    group: 'Recovery',
  },
  {
    key: 'lockout',
    label: 'Lockout',
    price: '$80',
    unit: 'flat',
    note: 'Keys locked in the vehicle. Opened without damage to the door, the glass or the lock.',
    group: 'Roadside Assistance',
  },
  {
    key: 'boost',
    label: 'Battery boost',
    price: '$80',
    unit: 'flat',
    note: 'Jump start at your location. No membership required, same price at 3 a.m.',
    group: 'Roadside Assistance',
  },
  {
    key: 'fuel',
    label: 'Fuel delivery',
    price: '$80',
    unit: '+ cost of fuel',
    note: 'Gasoline or diesel brought to you. The fuel itself is charged at cost.',
    group: 'Roadside Assistance',
  },
];

export const rateByKey = (key: string) => rates.find((r) => r.key === key)!;

export const rateGroups = ['Towing', 'Recovery', 'Roadside Assistance'] as const;

/**
 * Shown wherever rates appear. The business was explicit that pricing varies,
 * and publishing a number without this framing invites disputes.
 */
export const ratesDisclaimer =
  'These are our typical rates, not a fixed price list. What you actually pay depends on the vehicle, the distance, the conditions and how much work the job takes. You will always get a firm price on the phone before a truck is dispatched — nothing is decided after the fact.';

/* ------------------------------------------------------------------ *
 * Service areas
 * ------------------------------------------------------------------ */

export interface Area {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  /** Distance / drive-time framing from the Orillia yard. */
  proximity: string;
  intro: string;
  /** Roads and landmarks — real local detail, not filler. */
  body: { heading: string; text: string }[];
  landmarks: string[];
  faqs: { q: string; a: string }[];
}

export const areas: Area[] = [
  {
    slug: 'orillia',
    name: 'Orillia',
    h1: 'Towing in Orillia, Ontario',
    title: 'Towing in Orillia ON | 24/7 Tow Truck | Lakeside Towing',
    description:
      'Local 24/7 tow truck service in Orillia, Ontario. Towing, boosts, lockouts, fuel delivery and winch-outs. OPP approved. Call (249) 385-5240.',
    proximity: 'Our home city — the yard is on Norweld Dr.',
    intro:
      'Orillia is home. Our yard is on Norweld Dr, which means we are not dispatching a truck from Barrie or Bracebridge and hoping the traffic cooperates. For most calls inside the city we are looking at 30 to 45 minutes.',
    body: [
      {
        heading: 'Where we get called in Orillia',
        text: 'The commercial strip along Memorial Avenue and West Street generates a steady stream of no-starts — big parking lots, cold mornings, and a lot of vehicles sitting for hours. Downtown around Mississaga Street it is more often parking-related and lockouts. The Highway 11 and Highway 12 interchanges on the edge of town are where the genuine emergencies happen, and the residential streets north of the hospital produce a reliable crop of driveway snowbank recoveries every winter.',
      },
      {
        heading: 'Winter in a lake city',
        text: 'Sitting between Couchiching and Simcoe means Orillia gets weather that the forecast for Barrie does not always predict. Squalls come off the water and drop visibility and traction fast, particularly on the exposed stretches of the 11 and the 12. Those are our busiest nights, and they are the nights when a realistic arrival window matters more than an optimistic one. We will tell you the truth about how long we will be.',
      },
      {
        heading: 'Every service, in town',
        text: 'Everything we do is available in Orillia: emergency towing, long distance hauls out of the city, enclosed transport, winch-outs, boosts, lockouts, fuel delivery, and storage in our MTO-licensed yard right here in town. Because storage is local, a vehicle towed in Orillia after a collision does not have to travel again to be stored.',
      },
    ],
    landmarks: [
      'Memorial Avenue commercial strip',
      'Downtown / Mississaga Street',
      'Highway 11 & Highway 12 interchanges',
      'Orillia Soldiers\' Memorial Hospital area',
      'Lakehead University Orillia campus',
      'Couchiching Beach Park and the waterfront',
    ],
    faqs: [
      {
        q: 'How fast can you get to me in Orillia?',
        a: 'Typically 30 to 45 minutes for calls inside the city, depending on where you are and what is already on the road. Heavy snow stretches that for everyone.',
      },
      {
        q: 'Are you actually based in Orillia?',
        a: 'Yes — 123 Norweld Dr, Orillia. Not a call centre routing to whoever is nearest.',
      },
      {
        q: 'Do you do OPP calls in Orillia?',
        a: 'We are OPP approved and work collision scenes in the area regularly. You are still entitled to choose your own tow operator and your own destination.',
      },
    ],
  },
  {
    slug: 'gravenhurst',
    name: 'Gravenhurst',
    h1: 'Towing in Gravenhurst & the South Muskoka Gateway',
    title: 'Towing in Gravenhurst ON | 24/7 Tow Truck | Lakeside',
    description:
      '24/7 towing, winch-outs and roadside assistance in Gravenhurst and south Muskoka. Highway 11 corridor response from our Orillia yard. Call (249) 385-5240.',
    proximity: 'About 30 minutes north on Highway 11.',
    intro:
      'Gravenhurst is the gateway to Muskoka and a straight run north for us on Highway 11. We cover the town, the Muskoka Bay and Sparrow Lake side roads, and the highway corridor in between.',
    body: [
      {
        heading: 'The Highway 11 corridor',
        text: 'The stretch of Highway 11 between Orillia and Gravenhurst is where a lot of our calls originate — it is fast, it is busy on summer weekends, and in winter it holds snow in a way the forecast rarely captures. Divided highway breakdowns need particular care: get as far onto the shoulder as you can, hazards on, and stay in the vehicle with your seatbelt fastened unless there is a reason not to. Standing outside a car on a live 90 km/h shoulder is the most dangerous part of a breakdown.',
      },
      {
        heading: 'Cottage roads and seasonal traffic',
        text: 'Off the highway, the side roads around Muskoka Bay, Sparrow Lake and Kilworthy have their own hazards. Spring thaw turns shoulders soft enough to swallow a wheel; summer brings trailers and boats being reversed down launches by people who do not do it often; winter brings unplowed private laneways. Recovery work in Gravenhurst is genuinely seasonal, and the calls change month to month.',
      },
      {
        heading: 'What we cover here',
        text: 'Full service: emergency towing, long distance runs from Gravenhurst south to the GTA or further north, winch-out and recovery, boosts, lockouts and fuel delivery. Response times run longer than in Orillia because of the distance — expect to add the drive time to a normal window, and more in bad weather.',
      },
    ],
    landmarks: [
      'Highway 11 corridor north of Orillia',
      'Muskoka Bay and the Gravenhurst Wharf',
      'Sparrow Lake and Kilworthy',
      'Muskoka Beach Road',
      'Highway 169 toward Bala',
    ],
    faqs: [
      {
        q: 'How long does it take you to reach Gravenhurst?',
        a: 'It is roughly a 30 minute run from our Orillia yard in normal conditions, so add that to a standard dispatch window. We will give you a realistic figure when you call.',
      },
      {
        q: 'Do you cover Highway 11 north of Gravenhurst?',
        a: 'We regularly run that corridor. Call with your location — including the nearest exit or highway marker — and we will tell you straight away whether we are the right truck for it.',
      },
      {
        q: 'Can you get up an unplowed cottage laneway?',
        a: 'Often, but tell us it is unplowed when you call. A private laneway with 40 cm on it needs different equipment and more time than a cleared driveway, and it is better to know before we arrive.',
      },
    ],
  },
  {
    slug: 'washago',
    name: 'Washago',
    h1: 'Towing in Washago & the Severn River Area',
    title: 'Towing in Washago ON | 24/7 Tow Truck | Lakeside Towing',
    description:
      'Towing, boosts, lockouts and winch-outs in Washago, Severn Bridge and the Severn River area. 15 minutes from our Orillia yard. Call (249) 385-5240.',
    proximity: 'About 15 minutes north — one of our closest calls outside Orillia.',
    intro:
      'Washago sits where the Severn River meets the top of Lake Couchiching, and it is close enough to our yard that response times are barely different from in-town. We cover the village, Severn Bridge, and the roads out toward Cooper\'s Falls.',
    body: [
      {
        heading: 'A small village on a busy highway',
        text: 'Washago is quiet, but Highway 11 running past it is not — and that combination produces a particular pattern of calls. The village itself generates boosts, lockouts and driveway recoveries; the highway generates breakdowns and collisions at speed. Both are short runs for us.',
      },
      {
        heading: 'The river, the trestle and the seasonal crowd',
        text: 'Summer brings a lot of visitors to the Severn River and the swimming spots, which means street parking on roads not built for it, boat trailers on ramps, and vehicles left in the sun with the keys inside all afternoon. Lockout calls climb noticeably in July and August. Sandy ground near the water also catches out drivers who park a little too enthusiastically off the pavement.',
      },
      {
        heading: 'Winter isolation',
        text: 'Rural stretches around Washago and out toward Cooper\'s Falls get properly dark and properly cold, with fewer passing vehicles to flag down and patchy phone signal in spots. If you break down out there, stay with your vehicle — it is shelter and it is far easier for us to find than a person walking. Give us the nearest fire number or intersection you can see.',
      },
    ],
    landmarks: [
      'Highway 11 through Washago',
      'Severn River and the Washago trestle',
      'Severn Bridge',
      'Cooper\'s Falls and the concession roads',
      'Head of Lake Couchiching',
    ],
    faqs: [
      {
        q: 'Is Washago in your normal service area?',
        a: 'Very much so — it is about 15 minutes from the yard and one of our closest calls outside Orillia. Normal rates apply.',
      },
      {
        q: 'I am stuck on a sandy shoulder near the river. Is that a tow?',
        a: 'That is a winch-out rather than a tow, billed hourly. Sand near the water is a common one here. Describe how far off the pavement you are and which way the vehicle is sitting.',
      },
      {
        q: 'My phone signal is bad out here. What do I do?',
        a: 'Get to wherever you have a bar, call us, and give us the clearest landmark you have — a fire number, an intersection, a business, a bridge. Then go back to your vehicle and wait with it.',
      },
    ],
  },
  {
    slug: 'rama',
    name: 'Rama',
    h1: 'Towing in Rama & Rama Road',
    title: 'Towing in Rama ON | 24/7 Tow Truck & Boosts | Lakeside',
    description:
      'Towing and roadside assistance in Rama, along Rama Road and around the casino resort. Boosts, lockouts and 24/7 emergency towing. Call (249) 385-5240.',
    proximity: 'About 15 minutes east of Orillia along Rama Road.',
    intro:
      'Rama and the Rama Road corridor are a short run east from our yard. Between the resort, the marinas and the cottage lanes along the east shore of Couchiching, this is one of our steadier areas year-round.',
    body: [
      {
        heading: 'The resort and the big parking lots',
        text: 'A large resort operating around the clock means a large number of vehicles sitting in a parking lot for many hours at a stretch, frequently overnight, often in the cold. That produces exactly what you would expect: boosts and lockouts, at every hour of the night. It is one of the reasons being genuinely 24/7 matters here rather than being a slogan — a dead battery at 4 a.m. in a resort lot is a completely ordinary call for us.',
      },
      {
        heading: 'Rama Road and the east shore',
        text: 'Rama Road runs the length of the east side of Lake Couchiching and feeds a network of cottage lanes down toward the water. Those lanes are narrow, some are private, several are not plowed to the end in winter, and a few are soft enough in the spring thaw to be a genuine hazard. Recovery calls here are common in both seasons. Tell us the road name and the fire number and we will find you.',
      },
      {
        heading: 'Nearby communities',
        text: 'We also serve the small lakeside communities strung along this side of the lake — Grays Bay, Menoke Beach, Amigo Beach, Geneva Park and Cumberland Beach among them. They are all inside our normal service area and none of them are far.',
      },
    ],
    landmarks: [
      'Rama Road corridor',
      'Casino Rama Resort',
      'East shore of Lake Couchiching',
      'Grays Bay and Menoke Beach',
      'Geneva Park and Cumberland Beach',
    ],
    faqs: [
      {
        q: 'Do you come out to the resort at night?',
        a: 'Regularly. Overnight boosts and lockouts in the resort lots are among our most routine calls. Give us your parking level or the nearest entrance and the vehicle description.',
      },
      {
        q: 'Can you reach a cottage on a private lane off Rama Road?',
        a: 'Usually yes. Tell us whether the lane is plowed and how tight it is, and give us the fire number — that is what actually gets us to the right driveway out there.',
      },
      {
        q: 'Is Rama charged as in-town or long distance?',
        a: 'Rama is inside our normal service area, so in-town rates apply. If you are further out along the corridor, ask when you call and we will confirm the price before dispatching.',
      },
    ],
  },
  {
    slug: 'barrie',
    name: 'Barrie',
    h1: 'Towing in Barrie & the Highway 11 South Corridor',
    title: 'Towing in Barrie ON | Tow Truck & Transport | Lakeside',
    description:
      'Towing, recovery and long distance vehicle transport serving Barrie and the Highway 11 / Highway 400 corridor south of Orillia. Call (249) 385-5240.',
    proximity: 'About 35 minutes south on Highway 11.',
    intro:
      'Barrie is a straight run south for us and a regular destination — both for calls originating there and for vehicles being moved between Barrie and the Orillia area. The Highway 11 and Highway 400 corridor between the two cities is one of our busiest stretches of road.',
    body: [
      {
        heading: 'The corridor between Barrie and Orillia',
        text: 'Highway 11 south of Orillia carries heavy commuter traffic in both directions and merges into the 400 corridor at Barrie. Breakdowns on that stretch are frequent and they are high-speed situations. Pull as far right as you physically can, hazards on, stay belted in the vehicle, and give us a highway marker or the last exit you passed — that is worth more to a dispatcher than a road name.',
      },
      {
        heading: 'Dealership and shop transfers',
        text: 'A lot of the Barrie work is scheduled rather than emergency: vehicles going to a Barrie dealership for warranty work, cars bought in Barrie being delivered to Orillia and the lakes, and shop-to-shop transfers between the two cities. Those are booked in advance with an agreed window, and priced as a long distance run — base plus per kilometre.',
      },
      {
        heading: 'Long distance beyond Barrie',
        text: 'Barrie is also the gateway to everything south. If your vehicle needs to get to the GTA, Mississauga or the airport, that run goes through Barrie and we quote it the same way: a flat base plus a rate per kilometre, worked out before we book it.',
      },
    ],
    landmarks: [
      'Highway 11 south to Highway 400',
      'Barrie dealerships and service centres',
      'Highway 400 corridor toward the GTA',
      'Oro-Medonte and the townships in between',
    ],
    faqs: [
      {
        q: 'Is Barrie in your service area?',
        a: 'Yes. It is about 35 minutes south of the yard. Depending on where exactly you are, it may be quoted as a long distance run — we will tell you the price when you call.',
      },
      {
        q: 'Can you move a car between Barrie and Orillia?',
        a: 'Regularly. Dealership transfers, private-sale deliveries and shop-to-shop moves are routine on this corridor and can be booked in advance.',
      },
      {
        q: 'Do you tow from Barrie to Toronto?',
        a: 'Yes — that is a long distance run, quoted as a flat base plus a per-kilometre rate. Give us both addresses and we will work out the number.',
      },
    ],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug)!;

/**
 * The full list from the current site. Towns with their own page link
 * through; the smaller hamlets are listed here rather than given thin
 * pages of their own, which would be worse for search, not better.
 */
export const allCommunities = [
  'Orillia',
  'Rama',
  'Washago',
  'Gravenhurst',
  'Barrie',
  'Ardtrea',
  'Amigo Beach',
  'Hampshire Mills',
  'Happyland',
  'Scarlet Park',
  'Rama Road',
  'Grays Bay',
  'Geneva Park',
  'Menoke Beach',
  'Cumberland Beach',
  'Maple Valley',
];

/* ------------------------------------------------------------------ *
 * Site-wide FAQs (homepage + contact)
 * ------------------------------------------------------------------ */

export const generalFaqs = [
  {
    q: 'Are you open 24 hours?',
    a: `Yes — 24 hours a day, seven days a week, including holidays. ${business.phoneDisplay} reaches us at any hour.`,
  },
  {
    q: 'How much does a tow cost?',
    a: `An in-town tow typically runs ${'$'}100 to ${'$'}200. Long distance is ${'$'}200 plus ${'$'}3.50 per kilometre. Roadside calls — boost, lockout, fuel — are ${'$'}80. Full list on our rates page, and you always get a firm price on the phone before a truck is dispatched.`,
  },
  {
    q: 'What areas do you serve?',
    a: 'Orillia and the surrounding area, including Rama, Washago, Gravenhurst, Barrie, Cumberland Beach, Geneva Park, Grays Bay and the smaller communities around Lake Couchiching. If you are not sure whether you are in range, call and ask.',
  },
  {
    q: 'Are you OPP approved?',
    a: 'Yes. We are approved for Ontario Provincial Police calls and hold Ministry of Transportation Vehicle Storage Certificate ' + business.storageCertificate + '. We are fully licensed and insured.',
  },
  {
    q: 'Do you take credit cards?',
    a: 'Ask when you call and we will confirm what we can take for your job, so there are no surprises at the roadside.',
  },
  {
    q: 'Can I choose which tow company attends my collision?',
    a: 'In Ontario, yes. Even when an officer at the scene arranges a tow, you are entitled to choose your own tow operator and where your vehicle is taken. If you want us, say so, or call us directly.',
  },
];

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services/',
    children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })),
  },
  {
    label: 'Service Areas',
    href: '/service-areas/',
    children: areas.map((a) => ({ label: a.name, href: `/service-areas/${a.slug}/` })),
  },
  { label: 'Rates', href: '/rates/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];
