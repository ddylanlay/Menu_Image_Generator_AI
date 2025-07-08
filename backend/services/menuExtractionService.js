import { OpenAI } from 'openai';

let openai = null;

function getOpenAI() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

export async function extractRestaurantName(rawText) {
  const openaiClient = getOpenAI();
  const chatCompletion = await openaiClient.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are analyzing an image of a restaurant menu. Your task is to identify the name of the restaurant. The name is usually found at the top of the menu, often in a larger, stylized font. It may include words like "Restaurant", "Bar", "Cafe", or a brand-style name. Do not confuse it with menu section titles like "Starters" or "Mains". Return only the name of the restaurant, and nothing else.`
      },
      {
        role: 'user',
        content: `Menu text:\n${rawText}`
      }
    ],
    model: 'gpt-3.5-turbo'
  });
  try {
    return chatCompletion.choices[0].message.content.trim();
  } catch (e) {
    return "Restaurant";
  }
}

export async function extractMenuDishName(rawText) {
  const openaiClient = getOpenAI();
  const chatCompletion = await openaiClient.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are analyzing an image of a restaurant menu. Your goal is to extract only the dish names. Dish names are often bold or capitalized, on a separate line or at the beginning of a line, and are short and named (e.g. "Chicken Alfredo", "Pad Thai", "Margherita Pizza"). Ignore descriptions, prices, and section headers. Return a JSON array of dish name strings only. Do not include any extra text or explanation, only the JSON array.`
      },
      {
        role: 'user',
        content: `Menu text:\n${rawText}`
      }
    ],
    model: 'gpt-3.5-turbo'
  });
  try {
    let content = chatCompletion.choices[0].message.content;
    content = content.replace(/```json|```/g, '').trim();
    return JSON.parse(content);
  } catch (e) {
    throw new Error('Failed to parse OpenAI response for dish names');
  }
}

export async function extractMenuDishDescription(rawText) {
  const openaiClient = getOpenAI();
  const chatCompletion = await openaiClient.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are analyzing an image of a restaurant menu. Your goal is to extract only the dish descriptions. Descriptions usually appear directly below or next to the dish name, use sentence or phrase structure with commas or adjectives, include ingredients, cooking style, flavor details, or portion info, and do not include prices unless part of the description. Ignore dish names, prices, and section headers. Return a JSON array of dish description strings only, in the same order as the dish names. Do not include any extra text or explanation, only the JSON array.`
      },
      {
        role: 'user',
        content: `Menu text:\n${rawText}`
      }
    ],
    model: 'gpt-3.5-turbo'
  });
  try {
    let content = chatCompletion.choices[0].message.content;
    content = content.replace(/```json|```/g, '').trim();
    return JSON.parse(content);
  } catch (e) {
    throw new Error('Failed to parse OpenAI response for dish descriptions');
  }
}