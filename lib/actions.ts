// app/lib/actions.ts
"use server";

import z from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { safeJsonParse } from "../app/helpers/helpers";
import { SpeakerItem, WardBusinessItem } from "./types";

const HymnSchema = z.object({
  number: z.coerce.number().min(1, "Hymn number must be valid."),
  title: z.string().min(1, "Hymn title is required."),
});

const SpeakerItemSchema = z.object({
  name: z.string(),
  topic: z.string(),
  type: z.enum(["speaker", "musical-number"]),
});

const WardBusinessItemSchema = z.object({
  description: z.string(),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().min(2, "Presiding leader is required."),
  conducting: z.string().min(2, "Conducting leader is required."),
  openingPrayer: z.string().min(2, "Opening prayer is required."),
  closingPrayer: z.string().min(2, "Closing prayer is required."),
  openingHymn: HymnSchema,
  sacramentHymn: HymnSchema,
  closingHymn: HymnSchema,
  announcements: z.array(z.string()).optional().default([]),
  wardBusiness: z.array(WardBusinessItemSchema).optional().default([]),
  stakeBusiness: z.boolean().optional().default(false),
  speakers: z.array(SpeakerItemSchema).optional().default([]),
});

export type State = {
  errors?: z.ZodFlattenedError<
    z.infer<typeof MeetingFormSchema>
  >["fieldErrors"];
  message?: string | null;
};

export async function createMeeting(
  prevState: State | null,
  formData: FormData,
): Promise<State> {
  const rawData = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    stakeBusiness: formData.get("stakeBusiness") === "true",
    openingHymn: {
      number: formData.get("openingHymnNumber"),
      title: formData.get("openingHymnTitle"),
    },
    sacramentHymn: {
      number: formData.get("sacramentHymnNumber"),
      title: formData.get("sacramentHymnTitle"),
    },
    closingHymn: {
      number: formData.get("closingHymnNumber"),
      title: formData.get("closingHymnTitle"),
    },
    announcements: safeJsonParse<string[]>(formData.get('announcements'), []),
    wardBusiness: safeJsonParse<WardBusinessItem[]>(formData.get('wardBusiness'), []),
    speakers: safeJsonParse<SpeakerItem[]>(formData.get('speakers'), []),
  };
  
  const validatedFields = MeetingFormSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create meeting.",
    };
  }

  const data = validatedFields.data;
  const postgresAnnouncements = `{${data.announcements
    .map((a) => `"${a.replace(/"/g, '\\"')}"`)
    .join(',')}}`;

  try {
    await sql`
      INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      ) VALUES (
        ${data.date},
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${postgresAnnouncements},
        ${JSON.stringify(data.openingHymn)},
        ${data.openingPrayer},
        ${JSON.stringify(data.wardBusiness)},
        ${data.stakeBusiness},
        ${JSON.stringify(data.sacramentHymn)},
        ${JSON.stringify(data.speakers)},
        ${JSON.stringify(data.closingHymn)},
        ${data.closingPrayer}
      )
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to create meeting." };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(id: number) {
  try {
    await sql`DELETE FROM meetings WHERE id = ${id}`;
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete meeting.');
  }
  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: State | null,
  formData: FormData
): Promise<State> {
  const rawData = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
    stakeBusiness: formData.get('stakeBusiness') === 'true',
    
    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },
    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },
    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },

    announcements: safeJsonParse<string[]>(formData.get('announcements'), []),
    wardBusiness: safeJsonParse<WardBusinessItem[]>(formData.get('wardBusiness'), []),
    speakers: safeJsonParse<SpeakerItem[]>(formData.get('speakers'), []),
  };

  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const data = validatedFields.data;
  const postgresAnnouncements = `{${data.announcements.map((a) => `"${a.replace(/"/g, '\\"')}"`).join(',')}}`;

  try {
    await sql`
      UPDATE meetings
      SET
        date = ${data.date},
        meeting_type = ${data.meetingType},
        presiding = ${data.presiding},
        conducting = ${data.conducting},
        announcements = ${postgresAnnouncements},
        opening_hymn = ${JSON.stringify(data.openingHymn)},
        opening_prayer = ${data.openingPrayer},
        ward_business = ${JSON.stringify(data.wardBusiness)},
        stake_business = ${data.stakeBusiness},
        sacrament_hymn = ${JSON.stringify(data.sacramentHymn)},
        speakers = ${JSON.stringify(data.speakers)},
        closing_hymn = ${JSON.stringify(data.closingHymn)},
        closing_prayer = ${data.closingPrayer}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to update meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
