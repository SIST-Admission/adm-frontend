import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("dirname: ", __dirname);

// CORS
var corsOptions = {
  origin: "*",
  credentials: true
}
app.use(cors(corsOptions));

// STATIC FILES SERVING
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.static(path.join(__dirname, '/static')));
app.get("/static/*", (req, res) => {
  console.log("static: ", req.url);
  res.sendFile(path.join(__dirname, req.url));
});

// FRONTEND ROUTING
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));

// FALLBACK ROUTE
app.use((req, res) => {
  console.log("404 Not Found: ", req.url);
  res.status(404).send("404 Not Found");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running in Production mode on port ${PORT}`));