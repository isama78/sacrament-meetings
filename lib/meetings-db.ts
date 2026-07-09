import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-05-04",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 10, title: "Te damos Señor, nuestras gracias" },
    openingPrayer: "Brother Davis",
    wardBusiness: [{ description: "Sustaining of new Young women president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 101, title: "Oh Dios, escúchanos orar" },
    speakers: [
      {
        name: "Sister Williams",
        topic: "Increasing our testimony of Jesus Christ",
        type: "speaker",
      },
      {
        name: "Brother Parker",
        topic: "Whitnesess of the empty grave",
        type: "speaker",
      },
    ],
    closingHymn: { number: 100, title: "Dios bendícenos al irnos" },
    closingPrayer: "Brother Christensen",
    announcements: ["Young women temple night: June 10"],
  },
  {
    id: 3,
    date: "2026-05-05",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 4,
    date: "2026-05-06",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 10, title: "Te damos Señor, nuestras gracias" },
    openingPrayer: "Brother Davis",
    wardBusiness: [{ description: "Sustaining of new Young women president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 101, title: "Oh Dios, escúchanos orar" },
    speakers: [
      {
        name: "Sister Williams",
        topic: "Increasing our testimony of Jesus Christ",
        type: "speaker",
      },
      {
        name: "Brother Parker",
        topic: "Whitnesess of the empty grave",
        type: "speaker",
      },
    ],
    closingHymn: { number: 100, title: "Dios bendícenos al irnos" },
    closingPrayer: "Brother Christensen",
    announcements: ["Young women temple night: June 10"],
  },
  {
    id: 5,
    date: "2026-05-07",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
