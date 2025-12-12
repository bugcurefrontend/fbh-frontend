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

async function fetchSpecies() {
  try {
    console.log('Fetching species from Strapi with pagination...');

    let allSpecies = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages
    do {
      const url = `${API_BASE_URL}/api/species?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=100`;
      console.log(`Fetching page ${currentPage}/${totalPages}...`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch species: ${response.statusText}`);
      }

      const data = await response.json();

      // Get pagination info
      if (data.meta?.pagination) {
        totalPages = data.meta.pagination.pageCount;
        console.log(`Page ${currentPage}/${totalPages} - Fetched ${data.data?.length || 0} species`);
      }

      // Add species from this page
      if (data.data && Array.isArray(data.data)) {
        allSpecies = allSpecies.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    console.log(`✓ Total fetched: ${allSpecies.length} species from ${totalPages} page(s)`);

    // Transform all species data
    if (allSpecies.length > 0) {
      const transformed = allSpecies
        .filter((species) => !species.deleted) // Filter out deleted species
        .map((species) => {
          // Build FAQs array
          const faqs = [
            { question: species.faq1_question, answer: species.faq1_answer },
            { question: species.faq2_question, answer: species.faq2_answer },
            { question: species.faq3_question, answer: species.faq3_answer },
            { question: species.faq4_question, answer: species.faq4_answer },
            { question: species.faq5_question, answer: species.faq5_answer },
          ].filter(faq => faq.question && faq.answer);

          return {
            id: species.id,
            documentId: species.documentId,
            name: species.common_name,
            scientificName: species.scientific_name,
            description: species.description,
            lifespan: species.lifespan,
            oxygenReleased: species.oxygen_released,
            maxHeight: species.max_height,
            image: species.images[0]?.url || '',
            images: species.images,
            faqs,
            deleted: species.deleted,
            createdAt: species.createdAt,
            updatedAt: species.updatedAt,
          };
        });

      console.log(`✓ Transformed ${transformed.length} species (after filtering deleted)`);
      return transformed;
    }

    return [];
  } catch (error) {
    console.error('Error fetching species:', error);
    return [];
  }
}

async function main() {
  console.log('Starting Strapi data fetch for build-time binding...');

  // Fetch data
  const articles = await fetchArticles();
  const species = await fetchSpecies();

  console.log(`Fetched ${articles.length} articles`);
  console.log(`Fetched ${species.length} species`);

  // Create public/data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write articles to JSON file
  const articlesPath = path.join(dataDir, 'articles.json');
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  console.log('Articles data saved to public/data/articles.json');

  // Write species to JSON file
  const speciesPath = path.join(dataDir, 'species.json');
  fs.writeFileSync(speciesPath, JSON.stringify(species, null, 2));
  console.log('Species data saved to public/data/species.json');

  console.log('Build-time data binding complete!');
}

main().catch((error) => {
  console.error('Error during build-time data fetch:', error);
  process.exit(1);
});
