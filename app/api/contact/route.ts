import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nome, email e mensagem são obrigatórios" }, { status: 400 })
    }

    // Configurar o transporte de email usando Gmail Workspace
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "renato@leepco.com.br", // Sem process.env, apenas a string direta
        pass: "ufcn kdso rqjg odjd", // Sem process.env, apenas a string direta
      },
    })

    // Configurar o email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "renato@leepco.com.br",
      subject: `Contato do site - ${name}`,
      html: `
        <h1>Nova mensagem de contato do site</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Enviar o email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 })
  }
}

