const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

const port = process.env.PORT || 4000;

// Importer les routes
const pizzaRoutes = require('./routes/pizza');
app.use('/api/pizzas', pizzaRoutes);

app.listen(port, () => {
    console.log(`Backend en ligne sur http://localhost:${port}`);
});
