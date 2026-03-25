import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'ntn_b40552621094aayKdsuf6KtG4c7kD0EMqkjVZnJ49wS9BA',
});
const NOTION_DATABASE_ID = '3270f1b6639d80aea927eb207c665e4c';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, messenger_type, messenger_contact, services, brief } = body;

    if (!name || !messenger_type || !messenger_contact) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to SQLite
    const stmt = db.prepare(`
      INSERT INTO contacts (name, messenger_type, messenger_contact, services, brief)
      VALUES (?, ?, ?, ?, ?)
    `);

    const servicesArray = Array.isArray(services) ? services : [];
    const servicesJson = JSON.stringify(servicesArray);

    const info = stmt.run(name, messenger_type, messenger_contact, servicesJson, brief || '');

    // 2. Push to Notion Database
    try {
      const servicesText = servicesArray.join(', ');

      await notion.pages.create({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: {
            title: [
              {
                text: { content: name },
              },
            ],
          },
          Messenger: {
            rich_text: [
              {
                text: { content: messenger_type },
              },
            ],
          },
          Contact: {
            rich_text: [
              {
                text: { content: messenger_contact },
              },
            ],
          },
          Services: {
            rich_text: servicesText
              ? [
                  {
                    text: { content: servicesText },
                  },
                ]
              : [],
          },
          Brief: {
            rich_text: brief
              ? [
                  {
                    text: { content: brief },
                  },
                ]
              : [],
          },
          Date: {
            rich_text: [
              {
                text: { content: new Date().toISOString() },
              },
            ],
          },
        },
      });
      console.log('Successfully pushed to Notion');
    } catch (notionError) {
      // Handle Notion errors gracefully without failing the request
      console.error('Notion integration error:', notionError);
    }

    // 3. Push to Google Sheets Webhook
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzwQcXm60DtuBl5rWYmzxrin-KtOisIVmeJXtvUV5kWGuojSAiX14Hm6wzFnlDB0MtN/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name,
          messenger_type,
          messenger_contact,
          services,
          brief
        }),
        redirect: 'follow',
      });
      console.log('Successfully pushed to Google Sheets');
    } catch (sheetsError) {
      console.error('Google Sheets integration error:', sheetsError);
    }

    return NextResponse.json({ success: true, id: info.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Contact submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
