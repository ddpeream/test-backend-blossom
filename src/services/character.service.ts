import characterRepository, { CharacterFilters } from '../repositories/character.repository';
import Character from '../models/Character';

/**
 * Service de Characters
 * Capa de lógica de negocio que orquesta las operaciones.
 * Se comunica con el Repository para acceder a los datos.
 * Más adelante integrará el caché con Redis.
 */
class CharacterService {
  /**
   * Obtiene todos los personajes
   */
  async getAllCharacters(): Promise<Character[]> {
    return characterRepository.findAll();
  }

  /**
   * Obtiene un personaje por su ID
   * @throws Error si el personaje no existe
   */
  async getCharacterById(id: number): Promise<Character> {
    const character = await characterRepository.findById(id);
    
    if (!character) {
      throw new Error(`Character with ID ${id} not found`);
    }
    
    return character;
  }

  /**
   * Busca personajes con filtros opcionales
   * Filtros disponibles: name, status, species, gender, origin
   */
  async searchCharacters(filters: CharacterFilters): Promise<Character[]> {
    // Si no hay filtros, devolver todos
    if (!filters || Object.keys(filters).length === 0) {
      return characterRepository.findAll();
    }

    return characterRepository.findWithFilters(filters);
  }

  /**
   * Crea un nuevo personaje
   */
  async createCharacter(characterData: Partial<Character>): Promise<Character> {
    return characterRepository.create(characterData);
  }

  /**
   * Actualiza un personaje existente
   * @throws Error si el personaje no existe
   */
  async updateCharacter(id: number, characterData: Partial<Character>): Promise<Character> {
    const existingCharacter = await characterRepository.findById(id);
    
    if (!existingCharacter) {
      throw new Error(`Character with ID ${id} not found`);
    }

    const [, updatedCharacters] = await characterRepository.update(id, characterData);
    return updatedCharacters[0];
  }

  /**
   * Elimina un personaje
   * @throws Error si el personaje no existe
   */
  async deleteCharacter(id: number): Promise<boolean> {
    const existingCharacter = await characterRepository.findById(id);
    
    if (!existingCharacter) {
      throw new Error(`Character with ID ${id} not found`);
    }

    await characterRepository.delete(id);
    return true;
  }

  /**
   * Sincroniza personajes desde la API externa (usado por el seeder/cron)
   */
  async syncCharacters(characters: Partial<Character>[]): Promise<Character[]> {
    return characterRepository.bulkCreateOrUpdate(characters);
  }

  /**
   * Obtiene el conteo total de personajes
   */
  async getCharacterCount(): Promise<number> {
    return characterRepository.count();
  }
}

export default new CharacterService();
