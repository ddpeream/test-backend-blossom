import characterService from '../services/character.service';
import { CharacterFilters } from '../repositories/character.repository';

/**
 * Resolvers de GraphQL
 * Conectan las queries/mutations con la lógica de negocio (Service)
 */
export const resolvers = {
  Query: {
    /**
     * Obtiene todos los personajes
     */
    characters: async () => {
      return characterService.getAllCharacters();
    },

    /**
     * Obtiene un personaje por ID
     */
    character: async (_: any, { id }: { id: number }) => {
      try {
        return await characterService.getCharacterById(id);
      } catch (error) {
        return null;
      }
    },

    /**
     * Busca personajes con filtros opcionales
     * Filtros: name, status, species, gender, origin
     */
    searchCharacters: async (_: any, { filters }: { filters?: CharacterFilters }) => {
      return characterService.searchCharacters(filters || {});
    },

    /**
     * Obtiene el conteo total de personajes
     */
    characterCount: async () => {
      return characterService.getCharacterCount();
    },
  },

  Mutation: {
    /**
     * Sincroniza personajes desde la API externa de Rick & Morty
     */
    syncCharacters: async () => {
      try {
        // Esta funcionalidad se conectará con el cliente de la API externa (Fase 6)
        return {
          success: true,
          message: 'Sync functionality will be implemented with external API client',
          count: 0,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
          count: 0,
        };
      }
    },
  },
};
