# express_mysql_template

¡Bienvenido/a! Este proyecto es una **plantilla de API REST** construida con **ExpressJS** y **MySQL**, diseñada para facilitar la creación de servicios backend escalables y eficientes. Forma parte de mi portafolio de desarrollo backend y demuestra buenas prácticas de arquitectura, conexión a bases de datos y estructura de proyectos Node.js.

---

## 🚀 Descripción del Proyecto

Este repositorio proporciona una base robusta para iniciar nuevos proyectos de API RESTful. Incluye configuración lista para producción, manejo de rutas, controladores, conexión a base de datos MySQL y un ejemplo de integración con APIs públicas externas.

**Objetivo:**  
Ofrecer una estructura limpia y profesional para desarrollar APIs seguras, mantenibles y fácilmente desplegables, mostrando mis habilidades en el stack **JavaScript/Node.js** y bases de datos relacionales.

---

## 🧑‍💻 Tecnologías Utilizadas

- **JavaScript**  
  Lenguaje principal del backend. Permite escribir código moderno y eficiente en Node.js.

- **Node.js**  
  Entorno de ejecución para JavaScript en el servidor. Facilita el desarrollo de aplicaciones escalables.

- **ExpressJS**  
  Framework minimalista para Node.js que simplifica la gestión de rutas, middlewares y controladores.

- **MySQL**  
  Sistema de gestión de bases de datos relacional, ampliamente utilizado en la industria para almacenar y consultar información estructurada.

- **Dotenv**  
  Para el manejo seguro de variables de entorno y configuraciones sensibles.

- **Railway**  
  Plataforma utilizada para el despliegue de la base de datos y, opcionalmente, de la API.

---

## 📁 Estructura del Proyecto

```
express_mysql_template/
│
├── src/
│   ├── controllers/      # Lógica de las rutas y controladores
│   ├── database/         # Configuración de conexión a MySQL
│   ├── models/           # Modelos y consultas a la base de datos
│   ├── routes/           # Definición de rutas de la API
│   ├── utils/            # Funciones utilitarias y helpers
│   └── app.js            # Configuración principal de Express
│
├── .env                  # Variables de entorno (no subir a git)
├── package.json          # Dependencias y scripts del proyecto
├── README.md             # Documentación principal
└── ...
```

---

## 🌐 Integración con APIs Públicas

El proyecto puede consumir y combinar información de diferentes APIs públicas, como por ejemplo:

- [Random Data API](https://random-data-api.com/documentation)
- [Population.io](https://d6wn6bmjj722w.population.io/)
- [LocationIQ (Geolocalización)](https://es.locationiq.com/)
- [GiantBomb (Videojuegos)](https://www.giantbomb.com/api/documentation/)
- [BNE Datos Abiertos (Bibliografías)](https://datosabiertos.bne.es/pages/api)
- [INE (Estadísticas)](https://www.ine.es/dyngs/DataLab/manual.html?cid=45)

Esto permite enriquecer las respuestas y construir endpoints más completos.

---

## 🛠️ Instalación y Puesta en Marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Kevinisaza14/express_mysql_template.git
   cd express_mysql_template
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Renombra `.env.example` a `.env` y edita los valores según tu configuración de MySQL y otros servicios.

4. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```

5. **Acceder a la API:**
   - Por defecto en `http://localhost:3000/`

---

## 🗃️ Base de Datos

La plantilla está preparada para trabajar con **MySQL**, y puede desplegarse fácilmente en servicios como [Railway](https://railway.app/).

---

## 💡 ¿Por qué esta plantilla?

- Código limpio y modular.
- Fácil de escalar y modificar para nuevos proyectos.
- Ideal para demostrar habilidades en el desarrollo backend profesional con Node.js y bases de datos relacionales.

---

## 📫 Contacto

¿Te interesa mi trabajo?  
Puedes contactarme a través de [mi perfil de GitHub](https://github.com/Kevinisaza14) o a traves de [Mi linkedin](https://www.linkedin.com/in/kevin-isaza-35a202275) para colaboraciones, sugerencias o propuestas laborales.

---

¡Gracias por visitar mi portafolio! 🚀
