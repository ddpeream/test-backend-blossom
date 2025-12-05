# Orden de Construcción del Proyecto

## Fase 1: Setup Inicial
- [x] 1. Inicializar proyecto (package.json, tsconfig, estructura de carpetas)
- [x] 2. Instalar dependencias
- [x] 3. Configurar variables de entorno (.env con credenciales de Supabase y Redis local)

## Fase 2: Base de Datos
- [x] 4. Configurar conexión a Supabase (PostgreSQL) con Sequelize
- [x] 5. Crear modelo de Character
- [x] 6. Crear migración
- [x] 7. Crear seeder (15 personajes)

## Fase 3: Servidor Base
- [x] 8. Express básico funcionando (health check)
- [x] 9. Middleware de logging

## Fase 4: Capa de Datos
- [x] 10. Repository de Characters
- [x] 11. Service de Characters

## Fase 5: GraphQL
- [ ] 12. Schema de GraphQL
- [ ] 13. Resolvers
- [ ] 14. Integrar Apollo Server con Express

## Fase 6: API Externa
- [ ] 15. Cliente para consumir API de Rick & Morty
- [ ] 16. Conectar con el seeder para poblar BD

## Fase 7: Redis/Caché
- [ ] 17. Conexión a Redis (local)
- [ ] 18. Integrar caché en las búsquedas

## Fase 8: Opcionales
- [ ] 19. Decorador de tiempo de ejecución
- [ ] 20. Cron job (sincronización cada 12h)
- [ ] 21. Tests unitarios

## Fase 9: Documentación
- [ ] 22. README con instrucciones
- [ ] 23. Diagrama ERD
- [ ] 24. Swagger (opcional)
