const apiKey = 're_AvKj2tCx_F14FDvEBjzhuhSTraZJ2Kc8r';

async function send() {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'sid_fn@hotmail.com',
        subject: '🚀 Novos Links Rápidos de Acesso (Modo Produção) — Family Health',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #18181b; max-width: 600px; border: 1px solid #e4e4e7; border-radius: 16px;">
            <h2 style="color: #e11d48; margin-top: 0;">Family Health — Terapeuta de Casal</h2>
            <p>Olá <strong>Marley Luciano & Silvia Amelia</strong>!</p>
            <p>O aplicativo foi atualizado para o <strong>Modo de Produção Ultra-Rápido</strong> para rodar 100% fluido e sem travamentos no seu celular!</p>

            <div style="background-color: #fff1f2; padding: 16px; border-radius: 12px; border: 1px solid #fecdd3; margin: 20px 0;">
              <p style="margin: 6px 0;"><strong>📶 Acesso Direto na Rede Wi-Fi de Casa (Zero Travamentos):</strong><br/>
                <a href="http://192.168.1.22:3000" style="color: #e11d48; font-size: 16px; font-weight: bold; text-decoration: underline;">http://192.168.1.22:3000</a>
              </p>
              <br/>
              <p style="margin: 6px 0;"><strong>📱 Acesso HTTPS (De qualquer lugar):</strong><br/>
                <a href="https://rare-yaks-own.loca.lt" style="color: #e11d48; font-weight: bold;">https://rare-yaks-own.loca.lt</a>
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #9f1239;"><em>(Se o localtunnel pedir o IP de liberação no 1º acesso, digite: 192.168.1.22)</em></p>
            </div>

            <h3 style="color: #27272a; font-size: 15px;">💡 Como instalar no celular como Aplicativo (PWA):</h3>
            <ol style="padding-left: 20px; line-height: 1.6; font-size: 14px;">
              <li>Abra o link no celular (Safari no iPhone ou Chrome no Android).</li>
              <li>Toque no ícone de <strong>Compartilhar</strong> (ou no menu de 3 pontos).</li>
              <li>Selecione <strong>Adicionar à Tela de Início</strong>.</li>
            </ol>

            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
            <p style="font-size: 12px; color: #71717a; text-align: center;">
              Family Health • Suporte ao autoconhecimento e conexão para Marley Luciano e Silvia Amelia.
            </p>
          </div>
        `
      })
    });

    const data = await response.json();
    console.log('RESEND EMAIL ENVIADO:', data);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

send();
