import dotenv from 'dotenv';

dotenv.config();

const RICK_MORTY_API_URL = process.env.RICK_MORTY_API_URL || 'https://rickandmortyapi.com/graphql';

/**
 * Query GraphQL para obtener personajes de la API de Rick & Morty
 */
const GET_CHARACTERS_QUERY = `
  query ($page: Int) {
    characters(page: $page) {
      info {
        next
        pages
        count
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

/**
 * Interfaz para los datos de personaje de la API externa
 */
export interface RickMortyCharacter {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  image: string;
}

/**
 * Interfaz para la respuesta de la API
 */
interface CharactersResponse {
  data: {
    characters: {
      info: {
        next: number | null;
        pages: number;
        count: number;
      };
      results: RickMortyCharacter[];
    };
  };
}

/**
 * Cliente para consumir la API GraphQL de Rick & Morty
 * Encapsula toda la lógica de comunicación con la API externa
 */
class RickMortyApiClient {
  private apiUrl: string;

  constructor() {
    this.apiUrl = RICK_MORTY_API_URL;
  }

  /**
   * Obtiene personajes de una página específica
   */
  async getCharactersByPage(page: number = 1): Promise<RickMortyCharacter[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: GET_CHARACTERS_QUERY,
          variables: { page },
        }),
      });

      const result = (await response.json()) as CharactersResponse;

      if (!result.data || !result.data.characters) {
        throw new Error('Invalid response from Rick & Morty API');
      }

      return result.data.characters.results;
    } catch (error) {
      console.error(`Error fetching characters from page ${page}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene los primeros N personajes
   * @param limit Número de personajes a obtener (default: 15)
   */
  async getCharacters(limit: number = 15): Promise<RickMortyCharacter[]> {
    const characters = await this.getCharactersByPage(1);
    return characters.slice(0, limit);
  }

  /**
   * Obtiene todos los personajes (todas las páginas)
   * Útil para sincronización completa
   */
  async getAllCharacters(): Promise<RickMortyCharacter[]> {
    const allCharacters: RickMortyCharacter[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_CHARACTERS_QUERY,
            variables: { page },
          }),
        });

        const result = (await response.json()) as CharactersResponse;

        if (!result.data || !result.data.characters) {
          break;
        }

        allCharacters.push(...result.data.characters.results);
        hasNextPage = result.data.characters.info.next !== null;
        page++;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        break;
      }
    }

    return allCharacters;
  }

  /**
   * Transforma un personaje de la API externa al formato de nuestra BD
   */
  transformToDbFormat(character: RickMortyCharacter) {
    return {
      id: Number(character.id),
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type || '',
      gender: character.gender,
      origin: character.origin.name,
      image: character.image,
    };
  }

  /**
   * Obtiene personajes ya transformados al formato de la BD
   */
  async getCharactersForDb(limit: number = 15) {
    const characters = await this.getCharacters(limit);
    return characters.map((char) => this.transformToDbFormat(char));
  }
}

export default new RickMortyApiClient();
