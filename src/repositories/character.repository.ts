import { Op } from 'sequelize';
import Character from '../models/Character';

/**
 * Interfaz para los filtros de búsqueda de personajes
 * Corresponde a los filtros requeridos en el proyecto:
 * - Nombre, Estado, Especie, Género, Origen
 */
export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
}

/**
 * Repository de Characters
 * Capa de acceso a datos que se comunica directamente con la base de datos.
 * Implementa el patrón Repository para separar la lógica de acceso a datos.
 */
class CharacterRepository {
  /**
   * Obtiene todos los personajes de la base de datos
   */
  async findAll(): Promise<Character[]> {
    return Character.findAll();
  }

  /**
   * Busca un personaje por su ID
   */
  async findById(id: number): Promise<Character | null> {
    return Character.findByPk(id);
  }

  /**
   * Busca personajes aplicando filtros opcionales
   * Los filtros soportados son: name, status, species, gender, origin
   * La búsqueda por nombre es parcial (LIKE %nombre%)
   */
  async findWithFilters(filters: CharacterFilters): Promise<Character[]> {
    const whereClause: any = {};

    // Búsqueda parcial por nombre (case-insensitive)
    if (filters.name) {
      whereClause.name = { [Op.iLike]: `%${filters.name}%` };
    }

    // Filtros exactos
    if (filters.status) {
      whereClause.status = filters.status;
    }

    if (filters.species) {
      whereClause.species = filters.species;
    }

    if (filters.gender) {
      whereClause.gender = filters.gender;
    }

    // Búsqueda parcial por origen (case-insensitive)
    if (filters.origin) {
      whereClause.origin = { [Op.iLike]: `%${filters.origin}%` };
    }

    return Character.findAll({ where: whereClause });
  }

  /**
   * Crea un nuevo personaje
   */
  async create(characterData: Partial<Character>): Promise<Character> {
    return Character.create(characterData as any);
  }

  /**
   * Crea múltiples personajes (usado para el seeding)
   * Si el personaje ya existe, actualiza sus datos
   */
  async bulkCreateOrUpdate(characters: Partial<Character>[]): Promise<Character[]> {
    return Character.bulkCreate(characters as any[], {
      updateOnDuplicate: ['name', 'status', 'species', 'type', 'gender', 'origin', 'image', 'updatedAt']
    });
  }

  /**
   * Actualiza un personaje existente
   */
  async update(id: number, characterData: Partial<Character>): Promise<[number, Character[]]> {
    return Character.update(characterData, {
      where: { id },
      returning: true
    }) as Promise<[number, Character[]]>;
  }

  /**
   * Elimina un personaje por ID
   */
  async delete(id: number): Promise<number> {
    return Character.destroy({ where: { id } });
  }

  /**
   * Cuenta el total de personajes (útil para paginación)
   */
  async count(): Promise<number> {
    return Character.count();
  }
}

export default new CharacterRepository();
