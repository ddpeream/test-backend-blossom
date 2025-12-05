# Estructura del Proyecto

```
src/
├── config/
├── models/
├── repositories/
├── services/
├── graphql/
│   ├── schemas/
│   ├── resolvers/
│   └── index.ts
├── middlewares/
├── cache/
├── jobs/
├── decorators/
├── utils/
├── database/
│   ├── migrations/
│   └── seeders/
├── tests/
└── app.ts
```

---

## Librerías

### Obligatorias
- express
- graphql
- apollo-server-express
- sequelize
- pg / pg-hstore (PostgreSQL) ó mysql2 (MySQL)
- ioredis
- graphql-request

### Opcionales (Funcionalidades extra)
- node-cron
- jest / ts-jest
- swagger-ui-express / swagger-jsdoc

### TypeScript
- typescript
- ts-node
- @types/express
- @types/node

### Desarrollo
- dotenv
- nodemon
- sequelize-cli

---

## Recursos Externos

| Recurso | Ubicación |
|---------|-----------|
| 

 | Supabase (nube) |
| Redis | Local |
| API Rick & Morty | https://rickandmortyapi.com/graphql |
