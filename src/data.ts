import type {
  GameGroup,
  Level,
  Category,
  Course,
  EnglishSet,
  Game,
  SoonGame,
  Magazine,
  Reward,
  Video,
} from "./types";

export const REWARDS: Reward[] = [
  {
    img: `/img/reward-coffee.webp`,
    label: `Drink Voucher`,
    pts: 150,
    desc: `1 free drink at any Vendissimo machine`,
  },
  {
    img: `/img/reward-drinks-2.png`,
    label: `2-Drink Voucher`,
    pts: 250,
    desc: `2 free drinks at any Vendissimo machine`,
  },
  {
    img: `/img/reward-drinks-3.png`,
    label: `3-Drink Voucher`,
    pts: 400,
    desc: `3 free drinks at any Vendissimo machine`,
  },
];

export const POINTS = {
  magazine: 15,
  video: 20,
  lesson: 30,
  english: 25,
};

export const GAMES: Game[] = [
  {
    id: `castle`,
    t: `Castle Crusaders`,
    cat: `Action`,
    d: `Take aim with your crossbow and defend the castle from invaders.`,
    pts: 40,
    img: `/img/g-castlecrusaders.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/CastleCrusaders/`,
  },
  {
    id: `battleships`,
    t: `World of Battleships`,
    cat: `Action`,
    d: `Fire your cannons and sink the enemy fleet before it sinks you.`,
    pts: 40,
    img: `/img/g-worldofbattleships.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/WorldOfBattleships/`,
  },
  {
    id: `carfighter`,
    t: `Car Fighter`,
    cat: `Action`,
    d: `Drive your battle car and smash every rival machine off the road.`,
    pts: 40,
    img: `/img/g-battlewheels.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/BattleWheels/`,
  },
  {
    id: `ballblaster`,
    t: `Ball Blaster`,
    cat: `Arcade`,
    d: `Aim, shoot and blast the ball through every level.`,
    pts: 40,
    img: `/img/g-ballblaster.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/BallBlaster/`,
  },
  {
    id: `fallbeans`,
    t: `Fall Beans`,
    cat: `Arcade`,
    d: `Run, jump and tumble past the obstacles all the way to the finish.`,
    pts: 40,
    img: `/img/g-foresttumble.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/ForestTumble/`,
  },
  {
    id: `hungrycat`,
    t: `Hungry Cat`,
    cat: `Puzzle`,
    d: `Work out how to get the candy to the hungry cat in every level.`,
    pts: 40,
    img: `/img/g-hungrycat.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/HungryCat/`,
  },
  {
    id: `quack`,
    t: `Quack Attack`,
    cat: `Puzzle`,
    d: `Launch the angry heroes and knock down every foe on the board.`,
    pts: 40,
    img: `/img/g-quackattack.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/QuackAttack/`,
  },
  {
    id: `candy`,
    t: `Candy Super Match 3`,
    cat: `Puzzle`,
    d: `Match three or more candies to clear the board.`,
    pts: 40,
    img: `/img/g-saitoonmix.jpg`,
    url: `https://fe.r3ste.mobi/games-html/telco/SaitoonMix_Saitoon/`,
  },
];

/** Dua belas judul pengisi supaya katalog game terasa penuh (5 baris x 4)
 *  sambil menunggu game sungguhan berikutnya dari tim. Gambarnya ilustrasi
 *  domain publik / CC0 dari Openverse; sumbernya di
 *  public/img/CREDITS-dummy-games.txt. */
export const GAMES_SOON: SoonGame[] = [
  { t: `Ninja Dash`, cat: `Action`, img: `/img/g-soon-ninja.jpg` },
  { t: `Tank Wars`, cat: `Action`, img: `/img/g-soon-tank.jpg` },
  { t: `Dragon Fury`, cat: `Action`, img: `/img/g-soon-dragon.jpg` },
  { t: `Alien Invasion`, cat: `Action`, img: `/img/g-soon-alien.jpg` },
  { t: `Rocket Rush`, cat: `Arcade`, img: `/img/g-soon-rocket.jpg` },
  { t: `Retro Racer`, cat: `Arcade`, img: `/img/g-soon-racer.jpg` },
  { t: `Fruit Slice`, cat: `Arcade`, img: `/img/g-soon-fruit.jpg` },
  { t: `Dino Dash`, cat: `Arcade`, img: `/img/g-soon-dino.jpg` },
  { t: `Word Hunt`, cat: `Puzzle`, img: `/img/g-soon-word.jpg` },
  { t: `Chess Master`, cat: `Puzzle`, img: `/img/g-soon-chess.jpg` },
  { t: `Kitty Match`, cat: `Puzzle`, img: `/img/g-soon-kitty.jpg` },
  { t: `Monster Match`, cat: `Puzzle`, img: `/img/g-soon-monster.jpg` },
];

// Cover lines are taken from the actual issue covers on eMagz; the story pages only
// summarise what each cover promises and send readers to the full issue.
export const MAGAZINES: Magazine[] = [
  {
    t: "My Weekly",
    line: "Camilla's life in books",
    cat: "Lifestyle",
    mo: "Oct 2026",
    c1: "#0f6f7a",
    c2: "#f2b33d",
    read: "6 min",
    img: "https://demo.emagz.mobi/storage/magazine/0591ec7c97519b82d33ac108787a576150596e37.2026-03-05/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/464",
    toc: [
      "Camilla's life in books",
      "Christmas cooking sorted",
      "Tackling insomnia",
      "Easy ways to learn something new",
    ],
    art: [
      {
        k: "Cover story",
        h: "Camilla's life in books",
        p: [
          "This week's cover feature looks at the Queen and the books that have shaped her life.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Food",
        h: "Christmas cooking sorted",
        p: [
          "Freeze-ahead recipes, the best supermarket picky bits and wine bargains to get ahead of the festive rush.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Health",
        h: "Tackling insomnia",
        p: [
          "Dr Sarah shares her expert advice for anyone struggling to get a good night's sleep.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Reboot your brain",
        h: "Easy ways to learn something new",
        p: [
          "Simple ideas for picking up a new skill, plus six short stories and puzzles in this bumper 100-page issue.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "Men's Health",
    line: "Tom Grennan: back from the brink",
    cat: "Health",
    mo: "Oct 2026",
    c1: "#c2412d",
    c2: "#ffd166",
    read: "6 min",
    img: "https://demo.emagz.mobi/storage/magazine/69a6a37012be954c88a902435ab7334cadd58cea.2026-02-16/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/460",
    toc: [
      "Tom Grennan: back from the brink",
      "Strength + size made simple",
      "Games bound?",
      "Inside one writer's supersized experiment",
    ],
    art: [
      {
        k: "Cover story",
        h: "Back from the brink",
        p: [
          "Tom Grennan talks about how he rebuilt his life and his body.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Training",
        h: "Strength + size made simple",
        p: [
          "Your idiot-proof guide to gains, from the basics of lifting to building a plan you can stick to.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Feature",
        h: "Games bound?",
        p: [
          "The ambitious plan to take Hyrox to the Olympics.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "MH investigates",
        h: "A supersized creatine experiment",
        p: [
          "One writer tests what happens when you take creatine to the extreme.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "Linux Format",
    line: "2026 Annual: 160+ pages of tutorials",
    cat: "Tech",
    mo: "Oct 2026",
    c1: "#1d2a6b",
    c2: "#39d0ff",
    read: "8 min",
    img: "https://demo.emagz.mobi/storage/magazine/5ed2fce0e54d45042fb39eb23ca713065614ca31.2026-02-11/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/457",
    toc: [
      "The lowdown on VPNs",
      "Firewall your home",
      "Raspberry Pi essentials",
      "Inside the AI PC",
    ],
    art: [
      {
        k: "Security",
        h: "The lowdown on VPNs",
        p: [
          "What a VPN actually does, when you need one and how to set it up on Linux.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Networking",
        h: "Firewall your home",
        p: [
          "A practical walkthrough for protecting every device on your home network.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Hardware",
        h: "Raspberry Pi essentials",
        p: [
          "Projects and tips to get the most from the tiny computer.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Future tech",
        h: "Inside the AI PC",
        p: [
          "A look at the new wave of PCs built for AI, and what they mean for Linux users.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "Guitarist",
    line: "1965: the year that changed Fender forever",
    cat: "Music",
    mo: "Oct 2026",
    c1: "#9e35a1",
    c2: "#ff8559",
    read: "7 min",
    img: "https://demo.emagz.mobi/storage/magazine/43b0d946564de22e0285bf0b2a6cdee1bd4bf5b9.2026-02-11/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/454",
    toc: [
      "1965: the year that changed Fender",
      "Jimmy Page's Gretsch",
      "Brothers in Arms at 40",
      "Don Felder on life in the fast lane",
    ],
    art: [
      {
        k: "Cover story",
        h: "The year that changed Fender forever",
        p: [
          "The surprising truth about Fender's CBS era, from '60s Strats, Teles and Jags to modern best-buy reissues.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Up close",
        h: "Jimmy Page's Gretsch",
        p: [
          "An up-close look at the Led Zeppelin hero's 6120.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Anniversary",
        h: "Brothers in Arms at 40",
        p: [
          "A 40th anniversary feature on the Dire Straits classic.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Interview",
        h: "Don Felder",
        p: [
          "The guitarist on his life in the fast lane with the Eagles.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "PC Gamer",
    line: "Metal Gear Solid Delta: Snake Eater",
    cat: "Gaming",
    mo: "Oct 2026",
    c1: "#1f8a5b",
    c2: "#b7f171",
    read: "6 min",
    img: "https://demo.emagz.mobi/storage/magazine/8c4b71e15ed8eda0e45d03d4a4f7b97787c56406.2026-02-11/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/453",
    toc: [
      "Metal Gear Solid Delta: Snake Eater",
      "GPUs tested",
      "Endless Legend 2",
      "Wuchang and The Drifter",
    ],
    art: [
      {
        k: "World exclusive",
        h: "Snake makes his epic return",
        p: [
          "World exclusive access to Metal Gear Solid Delta: Snake Eater. One must die and one must live.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Hardware",
        h: "GPUs tested",
        p: [
          "Budget and mid-range graphics cards rated.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Strategy",
        h: "Endless Legend 2",
        p: [
          "A first look at the factional 4X sequel.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Also inside",
        h: "Wuchang, Neon Inferno and The Drifter",
        p: [
          "A stylish soulslike, a cyberpunk run 'n' gun and a pixel-art point 'n' click thriller.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "Doctor Who",
    line: "Thirteen lives! Jodie Whittaker interview",
    cat: "Entertainment",
    mo: "Oct 2026",
    c1: "#222222",
    c2: "#e5b84a",
    read: "7 min",
    img: "https://demo.emagz.mobi/storage/magazine/95b0c08f85b93eac007f69cf3ee63b63f7ee8bb9.2026-01-19/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/449",
    toc: [
      "Jodie Whittaker: the ultimate interview",
      "Cyber Armageddon in Death in Heaven",
      "DIY Dalek invasion",
      "Earth – 1974 AD",
    ],
    art: [
      {
        k: "Cover story",
        h: "Thirteen lives!",
        p: [
          'Jodie Whittaker looks back on her time as the Thirteenth Doctor: "There\'s a very fine line between me and the Doctor."',
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Classic episode",
        h: "Cyber Armageddon",
        p: [
          "Revisiting the Cybermen's return in Death in Heaven.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Make it",
        h: "DIY Dalek invasion",
        p: [
          "A hands-on project for fans who want their own Dalek.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Time travel",
        h: "Earth – 1974 AD",
        p: [
          "A trip back to Doctor Who in 1974.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "Candis",
    line: "Carol Kirkwood: in charge of our own destiny?",
    cat: "Lifestyle",
    mo: "Nov 2026",
    c1: "#b3122e",
    c2: "#ffffff",
    read: "5 min",
    img: "https://demo.emagz.mobi/storage/magazine/10c785721fdb0f8138fd71f5207b6c489ae53196.2026-01-19/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/444",
    toc: ["Carol Kirkwood", "Health", "Happiness", "Family life"],
    art: [
      {
        k: "Cover story",
        h: "Carol Kirkwood",
        p: [
          "\"We think we're in charge of our own destiny but it's just not true.\"",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Health",
        h: "Health",
        p: [
          "Practical health features for the whole family.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Happiness",
        h: "Happiness",
        p: [
          "Ideas and stories for feeling good day to day.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Family life",
        h: "Family life",
        p: [
          "Candis has given over £56 million to health charities since 1962.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
  {
    t: "All About Space",
    line: "Annual: everything about our galaxy and beyond",
    cat: "Science",
    mo: "Oct 2026",
    c1: "#3b3f46",
    c2: "#ff5a36",
    read: "8 min",
    img: "https://demo.emagz.mobi/storage/magazine/0b1dc7109c9ebc7202045724570441d3a74ee285.2026-01-19/cover_medium.jpg",
    url: "https://demo.emagz.mobi/en/magazine/detail/440",
    toc: ["Dark energy", "Zombie stars", "The Sun's twin", "Rogue planets"],
    art: [
      {
        k: "Cosmology",
        h: "Dark energy",
        p: [
          "What we know, and don't know, about the force pushing the universe apart.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Stars",
        h: "Zombie stars",
        p: [
          "Stars that seem to come back from the dead.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Stars",
        h: "The Sun's twin",
        p: [
          "The hunt for stars just like our own.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
      {
        k: "Planets",
        h: "Rogue planets",
        p: [
          "Worlds drifting through space without a star.",
          "Open the full issue on eMagz to read the complete feature.",
        ],
      },
    ],
  },
];

export const VIDEOS: Video[] = [
  {
    t: `The Name of the Wind`,
    a: `Patrick Rothfuss`,
    cat: `Fantasy`,
    dur: 187,
    img: `/img/v-1.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/d5a6a0ae-86fb-492a-b0e3-9e402ae4e2ab_1782458395.mp4`,
  },
  {
    t: `The Tattooist of Auschwitz`,
    a: `Heather Morris`,
    cat: `Thriller`,
    dur: 210,
    img: `/img/v-2.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/b28c97f0-b07f-4f46-919b-af998dde73d8_1776412197.mp4`,
  },
  {
    t: `Mistborn: The Final Empire`,
    a: `Brandon Sanderson`,
    cat: `Fantasy`,
    dur: 182,
    img: `/img/v-3.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/a0959847-b1e2-46aa-8781-cc54e4726bfa_1782458769.mp4`,
  },
  {
    t: `Me Before You`,
    a: `Jojo Moyes`,
    cat: `Romance`,
    dur: 153,
    img: `/img/v-4.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/3798e820-c7b5-40d7-af0a-ac494e1ef583_1776411337.mp4`,
  },
  {
    t: `All the Light We Cannot See`,
    a: `Anthony Doerr`,
    cat: `Historical`,
    dur: 165,
    img: `/img/v-5.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/eb4e2aa5-54a9-49b6-b76f-288d5ebdd41b_1782458643.mp4`,
  },
  {
    t: `The Priory of the Orange Tree`,
    a: `Samantha Shannon`,
    cat: `Fantasy`,
    dur: 176,
    img: `/img/v-6.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/c59cf208-d06b-4091-87a9-e6aeb35e0194_1782458973.mp4`,
  },
  {
    t: `The Notebook`,
    a: `Nicholas Sparks`,
    cat: `Romance`,
    dur: 142,
    img: `/img/v-7.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/223ba1d0-5e0b-403f-bf07-9a786548112e_1782458880.mp4`,
  },
  {
    t: `Memoirs of a Geisha`,
    a: `Arthur Golden`,
    cat: `Fiction`,
    dur: 186,
    img: `/img/v-8.webp`,
    url: `https://be.booksnap.ai/uploads/videos/files/74e93c1d-aa4c-407b-b860-0e7ad7f0a1a5_1776412081.mp4`,
  },
];

export const ENGLISH_SETS: EnglishSet[] = [
  {
    t: `Daily Challenge`,
    img: `/img/eng-daily.webp`,
    lvl: `Beginner`,
    daily: true,
    q: [
      {
        q: `The right greeting in the morning is…`,
        o: [`Good night`, `Good morning`, `Good evening`, `See you`],
        a: 1,
        tip: `"Good morning" works until about noon.`,
      },
      {
        q: `At the airport: "Your flight is delayed." It means…`,
        o: [`Cancelled`, `On time`, `Running late`, `Gate closed`],
        a: 2,
        tip: `Delayed = later than scheduled.`,
      },
      {
        q: `A polite way to ask the price:`,
        o: [
          `How much is it?`,
          `What time is it?`,
          `Where is it?`,
          `Who is it?`,
        ],
        a: 0,
        tip: `"How much is it?" asks for the price.`,
      },
      {
        q: `Fill in: "Could you ___ me the way to the station?"`,
        o: [`say`, `tell`, `speak`, `talk`],
        a: 1,
        tip: `You tell someone the way.`,
      },
      {
        q: `"I'm looking forward to it" means…`,
        o: [
          `I'm looking ahead`,
          `I can't wait for it`,
          `I'm searching for it`,
          `I'm done with it`,
        ],
        a: 1,
        tip: `Look forward to = feel happy about something coming.`,
      },
    ],
  },
  {
    t: `Casual Conversations`,
    img: `/img/eng-chat.webp`,
    lvl: `Beginner`,
    daily: false,
    q: [
      {
        q: `A friend says "How's it going?" The best reply is…`,
        o: [
          `Pretty good, thanks!`,
          `It is going to the office.`,
          `Yes, it goes.`,
          `I am 25.`,
        ],
        a: 0,
        tip: `"How's it going?" = How are you?`,
      },
      {
        q: `"Catch you later" means…`,
        o: [`I will chase you`, `See you later`, `Call me now`, `Wait here`],
        a: 1,
        tip: `A casual way to say goodbye.`,
      },
      {
        q: `Which is the most casual greeting?`,
        o: [`Good afternoon, sir`, `Hey!`, `Dear colleague`, `Greetings`],
        a: 1,
        tip: `"Hey" is for friends and people your age.`,
      },
    ],
  },
  {
    t: `Build Strong Vocabulary`,
    img: `/img/eng-vocab.webp`,
    lvl: `All levels`,
    daily: false,
    q: [
      {
        q: `"Exhausted" means…`,
        o: [`Very tired`, `Very hungry`, `Very happy`, `Very late`],
        a: 0,
        tip: `Exhausted = extremely tired.`,
      },
      {
        q: `The opposite of "generous" is…`,
        o: [`Kind`, `Selfish`, `Honest`, `Brave`],
        a: 1,
        tip: `Generous people share; selfish people don't.`,
      },
      {
        q: `Pick the word that means "very big":`,
        o: [`Tiny`, `Huge`, `Narrow`, `Brief`],
        a: 1,
        tip: `Huge, enormous and massive all mean very big.`,
      },
    ],
  },
  {
    t: `Grammar Check`,
    img: `/img/eng-grammar.webp`,
    lvl: `Beginner`,
    daily: false,
    q: [
      {
        q: `She ___ to work every day.`,
        o: [`go`, `goes`, `going`, `gone`],
        a: 1,
        tip: `He / she / it → verb + s in the present simple.`,
      },
      {
        q: `Yesterday I ___ a great movie.`,
        o: [`watch`, `watches`, `watched`, `watching`],
        a: 2,
        tip: `Use the past tense for finished actions.`,
      },
      {
        q: `The meeting is ___ Monday.`,
        o: [`in`, `at`, `on`, `by`],
        a: 2,
        tip: `Use "on" for days and dates.`,
      },
    ],
  },
  {
    t: `Travel Comfortably Abroad`,
    img: `/img/eng-travel.webp`,
    lvl: `Beginner`,
    daily: false,
    q: [
      {
        q: `At the hotel desk you say…`,
        o: [
          `I have a reservation under Rina.`,
          `Give me room.`,
          `Where is sleep?`,
          `I want the key now.`,
        ],
        a: 0,
        tip: `"Reservation under [name]" is the polite standard.`,
      },
      {
        q: `"Aisle seat" is a seat…`,
        o: [
          `By the window`,
          `Next to the walkway`,
          `In the front row`,
          `In business class`,
        ],
        a: 1,
        tip: `Aisle = the walkway between seats.`,
      },
      {
        q: `To ask for the bill in a restaurant:`,
        o: [
          `Can I have the check, please?`,
          `Give money now.`,
          `How much you?`,
          `Stop the food.`,
        ],
        a: 0,
        tip: `"Check" (US) or "bill" (UK).`,
      },
    ],
  },
  {
    t: `Watch Movies Without Subtitles`,
    img: `/img/eng-movies.webp`,
    lvl: `Intermediate`,
    daily: false,
    q: [
      {
        q: `"I'm gonna grab a coffee." "Gonna" means…`,
        o: [`Going to`, `Gone to`, `Got to`, `Want to`],
        a: 0,
        tip: `Gonna = going to (spoken English).`,
      },
      {
        q: `"No way!" usually shows…`,
        o: [`Directions`, `Surprise`, `Anger at a road`, `A rule`],
        a: 1,
        tip: `It means "I can't believe it!"`,
      },
      {
        q: `"Break a leg!" before a show means…`,
        o: [`Be careful`, `Good luck`, `Go home`, `Stop now`],
        a: 1,
        tip: `Actors say it instead of "good luck".`,
      },
    ],
  },
  {
    t: `Improve Writing`,
    img: `/img/eng-writing.webp`,
    lvl: `Intermediate`,
    daily: false,
    q: [
      {
        q: `The best way to start a work email:`,
        o: [`Hey dude,`, `Dear Ms. Sari,`, `Yo!`, `To whom it is,`],
        a: 1,
        tip: `Use "Dear" + title + name in formal emails.`,
      },
      {
        q: `Choose the correct sentence:`,
        o: [
          `Their going home.`,
          `There going home.`,
          `They're going home.`,
          `Theyre going home.`,
        ],
        a: 2,
        tip: `They're = they are.`,
      },
      {
        q: `A polite way to end an email:`,
        o: [`Bye bye`, `Best regards,`, `Later!`, `Finish.`],
        a: 1,
        tip: `"Best regards" or "Kind regards" work for most emails.`,
      },
    ],
  },
  {
    t: `Speak Confidently in Public`,
    img: `/img/eng-speaking.webp`,
    lvl: `Intermediate`,
    daily: false,
    q: [
      {
        q: `A strong way to open a talk:`,
        o: [
          `Um, so, yeah…`,
          `Good morning, everyone. Today I'll show you…`,
          `Sorry, I'm nervous.`,
          `Can you hear? Hello?`,
        ],
        a: 1,
        tip: `Greet, then say what the talk is about.`,
      },
      {
        q: `To move to your next point you can say…`,
        o: [`Next thing whatever`, `Moving on to…`, `Stop.`, `And and and…`],
        a: 1,
        tip: `"Moving on to…" signals a new section.`,
      },
      {
        q: `To invite questions at the end:`,
        o: [
          `Any questions?`,
          `You understand, right?`,
          `That's all, bye.`,
          `Don't ask me.`,
        ],
        a: 0,
        tip: `Short and open is best.`,
      },
    ],
  },
];

export const COURSES: Course[] = [
  {
    t: `Travel English`,
    cat: `Travel`,
    img: `/img/edu-travel.webp`,
    lvl: `Beginner`,
    d: `Key phrases for airports, hotels, restaurants and getting around.`,
  },
  {
    t: `Grammar Basics`,
    cat: `Grammar`,
    img: `/img/edu-splash1.webp`,
    lvl: `Beginner`,
    d: `Tenses, prepositions and sentence structure with everyday examples.`,
  },
  {
    t: `Learn from Movies & Series`,
    cat: `Movies`,
    img: `/img/edu-movie.webp`,
    lvl: `Intermediate`,
    d: `Train your listening with real lines from movies and TV shows.`,
  },
  {
    t: `Learn with Songs`,
    cat: `Songs`,
    img: `/img/edu-song.webp`,
    lvl: `All levels`,
    d: `Understand lyrics and culture through popular songs.`,
  },
  {
    t: `Chat with AI Tutor`,
    cat: `Speaking`,
    img: `/img/edu-tutor.webp`,
    lvl: `All levels`,
    d: `Practise conversation any time with a patient AI tutor.`,
  },
  {
    t: `Structured Courses`,
    cat: `Course`,
    img: `/img/edu-video-course.webp`,
    lvl: `A1–C1`,
    d: `Step-by-step video lessons from basics to advanced, with exercises.`,
  },
  {
    t: `Public Speaking`,
    cat: `Career`,
    img: `/img/edu-splash3.webp`,
    lvl: `Intermediate`,
    d: `Structure a talk and practise pronunciation for meetings and interviews.`,
  },
  {
    t: `Career & Business English`,
    cat: `Career`,
    img: `/img/edu-career.webp`,
    lvl: `Intermediate`,
    d: `Level up your English for job interviews, meetings and emails.`,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: `magazines`,
    label: `Magazines`,
    sub: `Read while you wait`,
    art: `/img/cat-magazines.webp`,
    emoji: `📖`,
  },
  {
    id: `videos`,
    label: `Videos`,
    sub: `Book summaries in minutes`,
    art: `/img/cat-videos.webp`,
    emoji: `🎬`,
  },
  {
    id: `games`,
    label: `Games`,
    sub: `Play instantly, win points`,
    art: `/img/cat-games.webp`,
    emoji: `🎮`,
  },
  {
    id: `education`,
    label: `Education`,
    sub: `English & life skills`,
    art: `/img/cat-education.webp`,
    emoji: `🎓`,
  },
  {
    id: `english`,
    label: `English`,
    sub: `Quick practice, big results`,
    art: `/img/cat-english.webp`,
    emoji: `🗣️`,
  },
];

/** Tiga perhentian di peta level. EXP-nya kumulatif seumur hidup. */
export const LEVELS: Level[] = [
  {
    n: 1,
    exp: 0,
    img: `/img/level-balloon.webp`,
    prize: `Drink Voucher`,
  },
  {
    n: 2,
    exp: 250,
    img: `/img/level-tent.webp`,
    prize: `2-Drink Voucher`,
  },
  {
    n: 3,
    exp: 600,
    img: `/img/level-carousel.webp`,
    prize: `3-Drink Voucher`,
  },
];

/** Game dikelompokkan menurut `cat`-nya; satu gambar bagus per sampul. */
export const GAME_GROUPS: GameGroup[] = [
  {
    id: `action`,
    cat: `Action`,
    label: `Action Games`,
    sub: `Aim, fire and win the battle`,
    img: `/img/g-castlecrusaders.jpg`,
  },
  {
    id: `arcade`,
    cat: `Arcade`,
    label: `Arcade Games`,
    sub: `Quick reflexes, instant fun`,
    img: `/img/g-ballblaster.jpg`,
  },
  {
    id: `puzzle`,
    cat: `Puzzle`,
    label: `Puzzle Games`,
    sub: `Think it through, match it up`,
    img: `/img/g-saitoonmix.jpg`,
  },
];


