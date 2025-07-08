import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import { ocrImage } from '../services/ocrService.js';
import { extractMenuDishName, extractMenuDishDescription, extractRestaurantName } from '../services/menuExtractionService.js';
import { searchDishImage } from '../services/imageSearchService.js';

const router = express.Router();

router.post('/upload', async (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }
    try {
      const filePath = files.menuImage[0].filepath;
      const imageBytes = fs.readFileSync(filePath);
      // OCR: Extract text from image
      const rawText = await ocrImage(imageBytes);
      // Use OpenAI to extract the restaurant name
      const restaurantName = await extractRestaurantName(rawText);
      // Use OpenAI to extract dish names and descriptions separately
      const dishNames = await extractMenuDishName(rawText);
      const dishDescriptions = await extractMenuDishDescription(rawText);
      // Combine names and descriptions into objects
      const parsedMenu = dishNames.map((name, idx) => ({
        name,
        description: dishDescriptions[idx] || ""
      }));
      // Image search for each dish
      const withImages = await Promise.all(
        parsedMenu.map(async (item) => {
          const imageUrl = await searchDishImage(item.name);
          return { ...item, image: imageUrl };
        })
      );
      // Return menu items and restaurant name
      return res.status(200).json({ restaurantName, menu: withImages });
    } catch (e) {
      return res.status(500).json({ error: e.message || 'Processing error' });
    }
  });
});

export default router;
