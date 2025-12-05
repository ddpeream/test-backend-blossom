import characterRepository, { CharacterFilters } from '../repositories/character.repository';
import Character from '../models/Character';
import cacheService from '../cache/cache.service';
import { ExecutionTime } from '../decorators/executionTime.decorator';

/**
 * Service de Characters
 * Capa de lógica de negocio que orquesta las operaciones.
 * Se comunica con el Repository para acceder a los datos.
 * Integra caché con Redis para optimizar consultas.
 */
class CharacterService {
  /**
   * Obtiene todos los personajes
   * Primero busca en caché, si no existe, consulta BD y guarda en caché
   */
  @ExecutionTime('CharacterService.getAllCharacters')
  async getAllCharacters(): Promise<Character[]> {
    // Intentar obtener del caché
    const cached = await cacheService.getCharactersByFilters<Character[]>({});
    if (cached) {
      return cached;
    }

    // Si no está en caché, consultar BD
    const characters = await characterRepository.findAll();
    
    // Guardar en caché para futuras consultas
    await cacheService.setCharactersByFilters({}, characters);
    
    return characters;
  }

  /**
   * Obtiene un personaje por su ID
   * Primero busca en caché, si no existe, consulta BD y guarda en caché
   * @throws Error si el personaje no existe
   */
  @ExecutionTime('CharacterService.getCharacterById')
  async getCharacterById(id: number): Promise<Character> {
    // Intentar obtener del caché
    const cached = await cacheService.getCharacterById<Character>(id);
    if (cached) {
      return cached;
    }

    // Si no está en caché, consultar BD
    const character = await characterRepository.findById(id);
    
    if (!character) {
      throw new Error(`Character with ID ${id} not found`);
    }

    // Guardar en caché para futuras consultas
    await cacheService.setCharacterById(id, character);
    
    return character;
  }

  /**
   * Busca personajes con filtros opcionales
   * Filtros disponibles: name, status, species, gender, origin
   * Los resultados se cachean por combinación de filtros
   */
  @ExecutionTime('CharacterService.searchCharacters')
  async searchCharacters(filters: CharacterFilters): Promise<Character[]> {
    // Si no hay filtros, usar getAllCharacters (que ya tiene caché)
    if (!filters || Object.keys(filters).length === 0) {
      return this.getAllCharacters();
    }

    // Intentar obtener del caché
    const cached = await cacheService.getCharactersByFilters<Character[]>(filters);
    if (cached) {
      return cached;
    }

    // Si no está en caché, consultar BD
    const characters = await characterRepository.findWithFilters(filters);
    
    // Guardar en caché para futuras consultas
    await cacheService.setCharactersByFilters(filters, characters);
    
    return characters;
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
   * Invalida todo el caché después de sincronizar
   */
  async syncCharacters(characters: Partial<Character>[]): Promise<Character[]> {
    const result = await characterRepository.bulkCreateOrUpdate(characters);
    
    // Invalidar caché después de sincronizar
    await cacheService.invalidateAll();
    
    return result;
  }

  /**
   * Obtiene el conteo total de personajes
   */
  async getCharacterCount(): Promise<number> {
    return characterRepository.count();
  }
}

export default new CharacterService();
