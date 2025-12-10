require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_BASE_URL = process.env.NEXT_PUBLIC_FBH_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_FBH_API_TOKEN;

async function fetchArticles() {
  try {
    console.log('Fetching articles from Strapi...');
    console.log(`API URL: ${API_BASE_URL}/api/articles?populate=*`);

    const response = await fetch(`${API_BASE_URL}/api/articles?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    // Transform Strapi data to match our Article interface
    if (data.data && Array.isArray(data.data)) {
      const transformed = data.data.map((item) => ({
        id: item.id,
        title: item.title || item.attributes?.title || '',
        description: item.description || item.attributes?.description || '',
        image: item.image?.url || item.attributes?.image?.data?.attributes?.url || '',
        date: item.date || item.attributes?.date || new Date().toISOString(),
      }));
      return transformed;
    }

    return data.data || data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

async function main() {
  console.log('Starting Strapi data fetch for build-time binding...');

  // Fetch data
  const articles = await fetchArticles();

  console.log(`Fetched ${articles.length} articles`);

  // Create public/data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write articles to JSON file
  const articlesPath = path.join(dataDir, 'articles.json');
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

  console.log('Articles data saved to public/data/articles.json');
  console.log('Build-time data binding complete!');
}

main().catch((error) => {
  console.error('Error during build-time data fetch:', error);
  process.exit(1);
});
