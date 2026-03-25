import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'ntn_b40552621094aayKdsuf6KtG4c7kD0EMqkjVZnJ49wS9BA',
});
const NOTION_DATABASE_ID = '3270f1b6639d80aea927eb207c665e4c';

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, messenger_type, messenger_contact, services, brief } = body;

  if (!name || !messenger_type || !messenger_contact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 1. SQLite (ігноруємо помилки для Vercel)
  let lastId = 0;
  try {
    const servicesArray = Array.isArray(services) ? services : [];
    const servicesJson = JSON.stringify(servicesArray);
    const stmt = db.prepare(`
      INSERT INTO contacts (name, messenger_type, messenger_contact, services, brief)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, messenger_type, messenger_contact, servicesJson, brief || '');
    lastId = info.lastInsertRowid as number;
  } catch (dbError) {
    console.error('DB Error:', dbError);
  }

  // 2. Notion & 3. Google Sheets & 4. Telegram
  const servicesArray = Array.isArray(services) ? services : [];
  const servicesText = servicesArray.join(', ');

  await Promise.allSettled([
    // Notion
    notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Messenger: { rich_text: [{ text: { content: messenger_type } }] },
        Contact: { rich_text: [{ text: { content: messenger_contact } }] },
        Services: { rich_text: [{ text: { content: servicesText || 'None' } }] },
        Brief: { rich_text: [{ text: { content: brief || '' } }] },
        Date: { rich_text: [{ text: { content: new Date().toISOString() } }] },
      },
    }),
    // Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbzwQcXm60DtuBl5rWYmzxrin-KtOisIVmeJXtvUV5kWGuojSAiX14Hm6wzFnlDB0MtN/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name, messenger_type, messenger_contact, services, brief }),
      redirect: 'follow',
    }),
    // Telegram (Фінальна стабільна версія)
    (async () => {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (!botToken || !chatId) {
        console.error('Telegram Error: Token or ChatID missing in Vercel settings');
        return;
      }

      const msg = `🚀 Нова заявка mate.sync!\n\n👤 Ім'я: ${name}\n💬 ${messenger_type}: ${messenger_contact}\n🛠 Послуги: ${servicesText || 'Не обрано'}\n📝 Бриф: ${brief || 'порожньо'}`;
      
      try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            chat_id: chatId, 
            text: msg 
          }),
        });
        const data = await response.json();
        if (data.ok) {
          console.log('Telegram: Message sent successfully');
        } else {
          console.error('Telegram API Error:', data);
        }
      } catch (err) {
        console.error('Telegram Fetch Error:', err);
      }
    })()
  ]);

  return NextResponse.json({ success: true, id: lastId }, { status: 201 });
}