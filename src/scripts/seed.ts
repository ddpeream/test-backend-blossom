import Character from '../models/Character';
import sequelize from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const RICK_MORTY_API_URL = process.env.RICK_MORTY_API_URL || 'https://rickandmortyapi.com/graphql';

const query = `
  query ($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        image
      }
    }
  }
`;

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database.');

    // Sync database (optional, but good to ensure table exists)
    // await sequelize.sync(); 

    console.log('🚀 Starting seed...');

    // Fetch only the first page to get 15 characters
    const page = 1;
    console.log(`Fetching characters...`);
    
    const response = await fetch(RICK_MORTY_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { page } }),
    });

    const { data } = await response.json() as any;
    
    if (!data || !data.characters) {
      console.error('❌ Error fetching data from API');
      return;
    }

    // Take only the first 15 characters
    const characters = data.characters.results.slice(0, 15).map((char: any) => ({
      id: Number(char.id),
      name: char.name,
      status: char.status,
      species: char.species,
      type: char.type || '',
      gender: char.gender,
      origin: char.origin.name,
      image: char.image,
    }));

    // Bulk create/upsert
    await Character.bulkCreate(characters, {
      updateOnDuplicate: ['name', 'status', 'species', 'type', 'gender', 'origin', 'image', 'updatedAt']
    });

    console.log(`✅ Seeded ${characters.length} characters successfully.`);


    console.log('✨ Seeding completed successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
