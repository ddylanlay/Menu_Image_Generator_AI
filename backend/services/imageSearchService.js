import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';

const apiKey = process.env.GOOGLE_CSE_API_KEY;
const cseId = process.env.GOOGLE_CSE_ID;

export async function searchDishImage(dishName) {
  const query = encodeURIComponent(`${dishName} dish`);
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cseId}&key=${apiKey}&searchType=image&num=1`;
  console.log("Google Image Search URL:", url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Google Image Search data:", data);
    if (data.items && data.items.length > 0) {
      return data.items[0].link;
    }
    return ""; // fallback if no image found
  } catch (e) {
    console.error("Google Image Search error:", e);
    return "";
  }
}