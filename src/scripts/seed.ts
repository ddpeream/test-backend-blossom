import Character from '../models/Character';
import sequelize from '../config/database';
import rickMortyApiClient from '../services/rickMortyApi.client';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script de Seed
 * Pobla la base de datos con 15 personajes de la API de Rick & Morty
 * Usa el cliente de API externa para obtener los datos
 */
const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database.');

    console.log('🚀 Starting seed...');
    console.log('📡 Fetching characters from Rick & Morty API...');

    // Usar el cliente de API externa para obtener los personajes
    const characters = await rickMortyApiClient.getCharactersForDb(15);

    console.log(`📦 Received ${characters.length} characters.`);

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
