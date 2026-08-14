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

  await notifyOwner(data, inserted.id, inserted.created_at);

  return { ok: true as const };
}

async function notifyOwner(data: ContactSubmission, id: string, createdAt: string) {
  try {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    await sendTemplateEmail("contact-notification", "singhraunak81026@gmail.com", {
      templateData: {
        name: data.name ?? "",
        email: data.email ?? "",
        message: data.message,
        sentAt: new Date(createdAt).toUTCString(),
      },
      idempotencyKey: `contact-notification-${id}`,
    });
  } catch (err) {
    // Message is already saved; never fail the visitor's submission on email issues.
    console.error("contact notification email failed", err);
  }
}
