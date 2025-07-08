# Menu Image Generator

A web application that extracts menu items and descriptions from restaurant menu images using OCR and OpenAI, and displays them in a modern, visual format with dish images.

## Features
- Upload a photo of a restaurant menu (JPG/PNG)
- Extracts restaurant name, dish names, and descriptions using OCR and OpenAI
- Fetches dish images from Google Custom Search
- Displays menu in a responsive, card-based grid

## Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Node.js, Express
- **OCR:** Tesseract.js
- **AI:** OpenAI GPT-3.5 Turbo
- **Image Search:** Google Custom Search API

## Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm
- OpenAI API key
- Google Custom Search API key and CSE ID

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/menu-image-generator.git
cd menu-image-generator
```

### 2. Install dependencies
```sh
cd backend
npm install
cd ../frontend
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `backend` directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_CSE_API_KEY=your_google_api_key_here
GOOGLE_CSE_ID=your_cse_id_here
```

### 4. Run locally
In the project root:
```sh
npm install # to install root dependencies (concurrently)
npm start   # starts both backend and frontend
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
- **Frontend:** Deploy to [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
- **Backend:** Deploy to [Render](https://render.com) or [Heroku](https://heroku.com)
- Update the frontend API URL in `frontend/src/services/api.js` to your backend's public URL.

## Usage
1. Upload a menu image.
2. The app extracts the restaurant name, dish names, and descriptions.
3. Dish images are fetched and displayed in a grid.
4. View your menu on any device!

## License
MIT