// Requerir los módulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import routerCliente from "./routers/cliente_routes.js";

import routerTecnico from "./routers/tecnicoroutes.js";

import routerTickets from "./routers/ticket_routes.js";

// Inicializaciones
const app = express();
dotenv.config();

// Configuraciones
app.set("port", process.env.port || 3001);
app.use(cors());
app.use(morgan("dev"));

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", routerCliente);
app.use("/api", routerTecnico);
app.use("/api", routerTickets);

// Manejo de una ruta que no sea encontrada
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"));

// Exportar la instancia de express por medio de app
export default app;
