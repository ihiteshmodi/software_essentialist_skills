export const sent: Array<{ to: string; template: string }> = [];

export async function sendEmail(to: string, template: string) {
  sent.push({ to, template });
}
