import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(255).optional(),
  message: z.string().trim().min(1).max(5000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { handleContactSubmission } = await import("./contact.server");
    return handleContactSubmission(data);
  });
