import type { HomeLanguage } from "../context/LanguageContext"

export const homeContent = {
  it: {
    hero: {
      slide2: {
        label: "Olio Extravergine di Oliva Italiano",
        title: "Dal cuore della Puglia al Giappone",
        text: "Un autentico olio extravergine di oliva italiano, profondamente legato alla terra di Puglia e presente sul mercato giapponese dal 2022.",
        button: "Scopri il nostro olio",
      },

      slide3: {
        label: "Una tradizione radicata in Puglia",
        title: "Il carattere della Coratina",
        text: "Un olio extravergine di oliva ottenuto da olive della cultivar Coratina, una varietà distintiva della Puglia, dal carattere intenso e dal gusto ricco.",
        button: "Scopri di più",
      },
    },

    featured: {
      title: "Il nostro olio",
      text: "Scopri l'olio extravergine di oliva OliveBridge, prodotto nel cuore della Puglia.",
      button: "Scopri il nostro olio",
    },

    story: {
      label: "LA NOSTRA STORIA",
      title: "Dal cuore della Puglia al Giappone",
      text1:
        "OliveBridge è un produttore italiano di olio extravergine di oliva, radicato in Puglia, dove nasce il nostro legame con la terra e la tradizione olivicola.",
      text2:
        "Dal 2022 portiamo il nostro olio extravergine di oliva in Giappone. Quello che è iniziato come un legame tra due culture è cresciuto anno dopo anno, rafforzando la nostra presenza sul mercato giapponese.",
      button: "Scopri la nostra storia",
    },

    business: {
      label: "PER LE AZIENDE",
      title: "Porta l'autentico olio pugliese nella tua attività",
      text: "Sei un ristorante, un negozio o un'attività in Giappone? Scopri l'olio extravergine di oliva OliveBridge, prodotto in Puglia, e richiedi un campione per la tua attività.",
      button: "Richiedi un campione",
    },
  },

  en: {
    hero: {
      slide2: {
        label: "Italian Extra Virgin Olive Oil",
        title: "From the heart of Puglia to Japan",
        text: "Authentic Italian extra virgin olive oil, rooted in the land of Puglia and brought to Japan since 2022.",
        button: "Discover our oil",
      },

      slide3: {
        label: "A tradition rooted in Puglia",
        title: "The character of Coratina",
        text: "An extra virgin olive oil made from Coratina olives, a distinctive Puglian cultivar known for its bold character and rich flavour.",
        button: "Discover",
      },
    },

    featured: {
      title: "Our Olive Oil",
      text: "Discover OliveBridge extra virgin olive oil from the heart of Puglia.",
      button: "Discover our oil",
    },

    story: {
      label: "OUR STORY",
      title: "From the heart of Puglia to Japan",
      text1:
        "OliveBridge is an Italian olive oil producer rooted in Puglia, where our connection with the land and its olive-growing tradition begins.",
      text2:
        "Since 2022, we have been bringing our extra virgin olive oil to Japan. What began as a connection between two cultures has grown year after year, strengthening our presence in the Japanese market.",
      button: "Discover our story",
    },

    business: {
      label: "FOR BUSINESS",
      title: "Bring authentic Puglian olive oil to your business",
      text: "Are you a restaurant, shop or business in Japan? Discover OliveBridge extra virgin olive oil from Puglia and request a sample for your business.",
      button: "Request a Sample",
    },
  },

  ja: {
    hero: {
      slide2: {
        label: "イタリア産エクストラバージンオリーブオイル",
        title: "プーリアの心から日本へ",
        text: "プーリアの大地に根ざした、本格的なイタリア産エクストラバージンオリーブオイル。2022年から日本へお届けしています。",
        button: "オイルを見る",
      },

      slide3: {
        label: "プーリアに根づく伝統",
        title: "コラティーナ種の個性",
        text: "プーリアを代表する品種のひとつ、コラティーナ種のオリーブから生まれる、力強く豊かな味わいのエクストラバージンオリーブオイル。",
        button: "詳しく見る",
      },
    },

    featured: {
      title: "私たちのオリーブオイル",
      text: "プーリアで生まれたOliveBridgeのエクストラバージンオリーブオイルをご紹介します。",
      button: "オイルを見る",
    },

    story: {
      label: "私たちのストーリー",
      title: "プーリアの心から日本へ",
      text1:
        "OliveBridgeは、プーリアの大地とオリーブ栽培の伝統に根ざした、イタリアのオリーブオイル生産者です。",
      text2:
        "2022年から、私たちのエクストラバージンオリーブオイルを日本へ届けています。イタリアと日本、二つの文化をつなぐことから始まったこの歩みは、年々成長し、日本市場での存在感をさらに深めています。",
      button: "私たちの物語を見る",
    },

    business: {
      label: "法人のお客様へ",
      title: "本格的なプーリア産オリーブオイルをお店へ",
      text: "日本のレストラン、ショップ、事業者の皆さまへ。プーリアで生まれたOliveBridgeのエクストラバージンオリーブオイルをぜひお試しください。ビジネス向けのサンプルもご依頼いただけます。",
      button: "サンプルを依頼する",
    },
  },
} satisfies Record<
  HomeLanguage,
  {
    hero: {
      slide2: {
        label: string
        title: string
        text: string
        button: string
      }
      slide3: {
        label: string
        title: string
        text: string
        button: string
      }
    }
    featured: {
      title: string
      text: string
      button: string
    }
    story: {
      label: string
      title: string
      text1: string
      text2: string
      button: string
    }
    business: {
      label: string
      title: string
      text: string
      button: string
    }
  }
>