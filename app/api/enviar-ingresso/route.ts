import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { nome, emailDestino, arquivoBase64 } = await request.json();

    // Configura o acesso ao seu Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // A mensagem bonitinha do e-mail
    const mailOptions = {
      from: `"TEDx UnB" <${process.env.EMAIL_USER}>`,
      to: emailDestino,
      subject: 'Seu Ingresso para o TEDx UnB: Vários Futuros chegou! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #000; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;"><span style="color: #e8474a;">TEDx</span> Universidade de Brasília</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #e8474a; margin-top: 0;">Olá, ${nome}!</h2>
            <p style="font-size: 16px; line-height: 1.5;">Sua presença está confirmada no evento <strong>Vários Futuros: Pluriverso de Narrativas Fundadoras</strong>.</p>
            <p style="font-size: 16px; line-height: 1.5;">Em anexo, você encontra o seu ingresso oficial em imagem. Por favor, salve-o e apresente-o no credenciamento (pode ser na tela do celular mesmo).</p>
            
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e8474a;">
              <p style="margin: 5px 0;"><strong>📅 Data:</strong> 19 de Novembro de 2026</p>
              <p style="margin: 5px 0;"><strong>⏰ Horário:</strong> 14h (Credenciamento)</p>
              <p style="margin: 5px 0;"><strong>📍 Local:</strong> Centro de Excelência em Turismo (CET/UnB)</p>
            </div>

            <p style="font-size: 16px;">Estamos muito felizes em ter você com a gente para imaginar esses vários futuros!</p>
            <br/>
            <p style="font-size: 14px; color: #666;">Um abraço,<br/><strong>Equipe TEDx UnB</strong></p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'Ingresso-TEDxUnB.png', // Corrigido para .png para bater com o formato da imagem
          content: arquivoBase64.split("base64,")[1], // Pega apenas os dados puros do arquivo
          encoding: 'base64'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Ingresso enviado com sucesso!' });

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ error: 'Erro ao enviar o e-mail.' }, { status: 500 });
  }
}