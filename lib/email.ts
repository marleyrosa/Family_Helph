// Módulo de envio de e-mails para o Family Health (Marley Luciano & Silvia Amelia)
// Para ativar o envio automático, adicione RESEND_API_KEY no arquivo .env.local

export async function sendEmailReminder(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[SIMULAÇÃO E-MAIL] Para: ${to} | Assunto: ${subject}`);
    console.log(htmlContent);
    return { success: false, reason: 'RESEND_API_KEY não configurada no .env.local' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Terapeuta de Casal <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: htmlContent
      })
    });

    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
