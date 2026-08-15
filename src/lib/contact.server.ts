export type ContactSubmission = {
  name?: string | undefined;
  email?: string | undefined;
  message: string;
};

export async function handleContactSubmission(data: ContactSubmission) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: inserted, error } = await supabaseAdmin
    .from("contact_messages")
    .insert({
      name: data.name ?? null,
      email: data.email ?? null,
      message: data.message,
    })
    .select("id, created_at")
    .single();

  if (error) throw new Error(error.message);

  return { ok: true as const, id: inserted.id as string };
}
