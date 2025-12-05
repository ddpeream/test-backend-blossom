# 🚀 Rick & Morty Characters API

API GraphQL para buscar personajes de Rick & Morty con caché en Redis y base de datos PostgreSQL.

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [API GraphQL](#-api-graphql)
- [Tests](#-tests)
- [Estructura del Proyecto](#-estructura-del-proyecto)

## 🛠 Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | 18+ | Runtime de JavaScript |
| TypeScript | 5.x | Tipado estático |
| Express | 5.x | Framework web |
| Apollo Server | 4.x | Servidor GraphQL |
| Sequelize | 6.x | ORM para PostgreSQL |
| PostgreSQL | 14+ | Base de datos (Supabase) |
| Redis | 7.x | Caché en memoria |
| Jest | 29.x | Framework de testing |

## 🏗 Arquitectura

El proyecto sigue una arquitectura en capas:

```
┌─────────────────────────────────────────────┐
│              GraphQL (Apollo)               │
├─────────────────────────────────────────────┤
│                 Services                     │
│         (Lógica de negocio + Caché)         │
├─────────────────────────────────────────────┤
│               Repositories                   │
│            (Acceso a datos)                  │
├──────────────────────┬──────────────────────┤
│     PostgreSQL       │        Redis         │
│    (Persistencia)    │       (Caché)        │
└──────────────────────┴──────────────────────┘
```

### Patrones Implementados

- **Repository Pattern**: Abstracción de acceso a datos
- **Service Layer**: Lógica de negocio centralizada
- **Decorator Pattern**: `@ExecutionTime` para medir rendimiento
- **Singleton**: Instancias únicas de servicios y conexiones

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **Docker** (para Redis local)
- **Git**

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/ddpeream/test-backend-blossom.git
cd test-backend-blossom
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Iniciar Redis con Docker**
```bash
docker run -d --name redis-blossom -p 6379:6379 redis:alpine
```

5. **Poblar la base de datos**
```bash
npm run seed
```

## ⚙️ Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
# Server
NODE_ENV=development
PORT=4000

# PostgreSQL (Supabase)
POSTGRES_HOST=your-host.supabase.com
POSTGRES_PORT=6543
POSTGRES_USER=your-user
POSTGRES_PASSWORD=your-password
POSTGRES_DATABASE=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Cron Job (opcional)
ENABLE_CRON=true
```

## 🚀 Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:4000`

### Endpoints

| Endpoint | Descripción |
|----------|-------------|
| `GET /health` | Health check del servidor |
| `POST /graphql` | API GraphQL |

## 📊 API GraphQL

### Playground

Accede a `http://localhost:4000/graphql` para el playground de Apollo.

### Queries Disponibles

#### Obtener todos los personajes
```graphql
query {
  characters {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

#### Obtener personaje por ID
```graphql
query {
  character(id: 1) {
    id
    name
    status
    species
  }
}
```

#### Buscar con filtros
```graphql
query {
  searchCharacters(
    name: "Rick"
    status: "Alive"
    species: "Human"
    gender: "Male"
  ) {
    id
    name
    status
    origin
  }
}
```

#### Contar personajes
```graphql
query {
  characterCount
}
```

### Mutations

#### Sincronizar personajes desde API externa
```graphql
mutation {
  syncCharacters {
    id
    name
    status
  }
}
```

### Filtros Disponibles

| Filtro | Tipo | Descripción |
|--------|------|-------------|
| `name` | String | Búsqueda parcial por nombre |
| `status` | String | Alive, Dead, unknown |
| `species` | String | Human, Alien, etc. |
| `gender` | String | Male, Female, Genderless, unknown |
| `origin` | String | Planeta/dimensión de origen |

## 🧪 Tests

### Ejecutar todos los tests
```bash
npm test
```

### Modo watch
```bash
npm run test:watch
```

### Con cobertura
```bash
npm run test:coverage
```

### Tests Incluidos

- **ExecutionTime Decorator** (5 tests)
- **Cache Service** (11 tests)
- **Rick & Morty API Client** (4 tests)

## 📁 Estructura del Proyecto

```
src/
├── app.ts                    # Punto de entrada
├── config/
│   ├── database.ts           # Conexión PostgreSQL
│   └── redis.ts              # Conexión Redis
├── models/
│   └── Character.ts          # Modelo Sequelize
├── repositories/
│   └── character.repository.ts
├── services/
│   ├── character.service.ts
│   └── rickMortyApi.client.ts
├── cache/
│   └── cache.service.ts      # Servicio de caché Redis
├── graphql/
│   ├── schema.ts             # Type definitions
│   ├── resolvers.ts          # Resolvers
│   └── index.ts              # Apollo Server setup
├── decorators/
│   └── executionTime.decorator.ts
├── jobs/
│   └── syncCharacters.job.ts # Cron cada 12h
├── middlewares/
│   └── logging.middleware.ts
├── scripts/
│   └── seed.ts               # Seeder inicial
└── tests/                    # Tests unitarios
```

## 🔄 Cron Job

El sistema incluye un cron job que sincroniza personajes cada 12 horas:

- **Expresión**: `0 */12 * * *` (00:00 y 12:00)
- **Función**: Obtiene 15 personajes de la API e invalida caché
- **Control**: Variable `ENABLE_CRON` en `.env`

## 📈 Rendimiento

### Sistema de Caché

- **TTL**: 5 minutos (300 segundos)
- **Estrategia**: Cache-aside con invalidación en sync
- **Mejora**: ~100x más rápido en cache hits

Ejemplo de logs:
```
📭 Cache MISS: characters:all
💾 Cache SET: characters:all (TTL: 300s)
[POST /graphql] - 200 - 565ms

📦 Cache HIT: characters:all
[POST /graphql] - 200 - 5ms
```

### Decorator de Timing

Los métodos del servicio están decorados con `@ExecutionTime`:
```
⏱️  [CharacterService.getAllCharacters] executed in 5.23ms
```

## 🗄️ Base de Datos

### Modelo Character

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | PK, auto-increment |
| name | STRING | Nombre del personaje |
| status | STRING | Alive, Dead, unknown |
| species | STRING | Especie |
| type | STRING | Subtipo (opcional) |
| gender | STRING | Género |
| origin | STRING | Origen |
| image | STRING | URL de imagen |
| createdAt | DATE | Fecha creación |
| updatedAt | DATE | Fecha actualización |

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo con hot reload |
| `npm start` | Producción |
| `npm run seed` | Poblar BD con 15 personajes |
| `npm test` | Ejecutar tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con cobertura |

## 👤 Autor

**David Peralta** - [GitHub](https://github.com/ddpeream)

## 📄 Licencia

ISC
