import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize client securely. 
// Note: In a real production app, never expose keys in client-side code if not using a proxy.
// However, for this environment, we use process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Ты — Хранитель Льда (IceKeeper), древний мистический дух сервера IceTale в игре Hytale.
Твоя задача — помогать путникам (игрокам), отвечать на вопросы о сервере, рассказывать лор мира.
Мир IceTale — это заснеженная пустошь, полная магии, древних руин и опасных существ.
Говори загадочно, но дружелюбно. Используй метафоры, связанные со льдом, холодом, кристаллами и магией.
Если спрашивают про донат — направляй их мягко в "Сокровищницу" (раздел Донат).
Если спрашивают про контакты — говори про "Круг Старейшин" (Сообщество).
Не выходи из роли. Будь краток и полезен.
`;

export const sendMessageToLoreKeeper = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct the chat history for the new API
    // We start a new chat session for simplicity in this stateless service wrapper, 
    // or we could maintain a chat object. For this UI, request/response is easier to manage.
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(msg => ({
          role: msg.role,
          parts: msg.parts
        })),
        {
          role: 'user',
          parts: [{ text: newMessage }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      }
    });

    return response.text || "Духи льда молчат... попробуй позже.";
  } catch (error) {
    console.error("LoreKeeper Error:", error);
    return "Мороз сковал мои мысли. Я не слышу тебя (Ошибка соединения).";
  }
};