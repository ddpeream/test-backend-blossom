# 🎬 Prueba Técnica Backend Dev. - Blossom

## Crear una API de Personajes de Rick y Morty con Búsqueda y Caché

---

## 🎯 Objetivo

Evaluaremos tu capacidad para desarrollar aplicaciones backend robustas y escalables. Específicamente, esperamos que demuestres dominio en:

- **NodeJS** y **Express** para construcción de servidores
- **GraphQL** como lenguaje de consultas
- **Bases de datos relacionales** y modelado de datos
- **Redis** para optimización y caché
- **Integración con APIs externas**

---

## 📋 Descripción del Proyecto

Debes desarrollar una API que permita buscar personajes de la serie *Rick and Morty*. La API consumirá datos de la [API pública de Rick and Morty](https://rickandmortyapi.com/documentation/#graphql) a través de GraphQL, los almacenará en una base de datos relacional y utilizará Redis para optimizar las búsquedas mediante caché.

El resultado debe ser una solución eficiente, bien estructurada y fácil de mantener.

---

## ✅ Requisitos Obligatorios

### 1. API con Express y GraphQL
Crea una API GraphQL que permita buscar personajes de Rick and Morty con los siguientes filtros:
- **Nombre** - Búsqueda por nombre del personaje
- **Estado** - Alive, Dead, Unknown
- **Especie** - Humano, Alien, etc.
- **Género** - Male, Female, Genderless, Unknown
- **Origen** - Planeta o dimensión de procedencia

### 2. Base de Datos Relacional
- Usa **Sequelize** como ORM
- Configura la BD mediante **migraciones** (MySQL o PostgreSQL)
- Almacena información de los personajes
- Realiza una **población inicial con 15 personajes** de la API de Rick and Morty

### 3. Sistema de Caché con Redis
- Implementa **Redis** para cachear resultados de búsquedas
- Mejora significativamente el rendimiento de consultas frecuentes

### 4. Middleware de Logging
- Crea un middleware que imprima información relevante de cada solicitud
- Ejemplo: timestamp, usuario, método, endpoint, estado de respuesta

---

## 🚀 Requisitos Adicionales (Opcionales pero Valorados)

- **Cron Job**: Tarea automatizada que corra cada 12 horas para sincronizar cambios en los personajes
- **Decorador de Timing**: Mide y registra el tiempo de ejecución de tus queries
- **Pruebas Unitarias**: Tests para validar la funcionalidad de búsqueda
- **TypeScript**: Desarrolla todo el proyecto con tipado fuerte
- **Patrones de Diseño**: Aplica arquitectura limpia y patrones reconocidos

---

## 📦 Entregables

### Obligatorios
1. **Repositorio Git** (preferiblemente GitHub) con todo el código fuente
2. **Diagrama ERD** de la estructura de tu base de datos

### Opcionales pero Recomendados
- Documentación **Swagger** para consumir la API
- **README** o Wiki con instrucciones de instalación, configuración y uso

---

## 🔍 Criterios de Evaluación

Evaluaremos tu solución en estos tres aspectos:

| Criterio | Descripción |
|----------|-------------|
| **Cumplimiento de Requisitos** | ¿Tu API funciona como se especifica? ¿Cubre todos los puntos solicitados? |
| **Calidad del Código** | ¿Es legible, bien estructurado? ¿Tiene comentarios donde es necesario? ¿Sigue buenas prácticas? |
| **Uso de Tecnologías** | ¿Aprovechas adecuadamente Express, GraphQL, Sequelize, Redis y Node.js? |

---

## 📚 Recursos Útiles

- [API Rick and Morty - Documentación GraphQL](https://rickandmortyapi.com/documentation/#graphql)
- [Sequelize ORM - Documentación Oficial](https://sequelize.org/)

---

## 💡 Recomendaciones

- Mantén el código limpio y bien organizado desde el principio
- Documenta tus decisiones de arquitectura
- Aprovecha las características opcionales para destacar
- Prueba tu API completamente antes de entregar

---

**¡Mucho éxito en tu prueba! 🚀**

www.blossom.net