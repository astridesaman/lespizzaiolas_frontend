import json

data = [
        {
            "id": "1",
            "name": "Cupido",
            "description": "Tomate, mozzarella, fromage, jambon de volaille, œuf, huile d'olive.",
            "price": 2600
        },
        {
            "id": "2",
            "name": "Napoli",
            "description": "Tomate, mozzarella, fromage, ail, anchois, huile d'olive.",
            "price": 2800
        },
        {
            "id": "3",
            "name": "Cinque Formaggi",
            "description": "Cheddar, mozzarella, crottin, fondu, fromage, huile d'olive.",
            "price": 2600
        },
        {
            "id": "4",
            "name": "Buon Gusto",
            "description": "Tomate, mozzarella, fromage, crevettes, moules, huile d'olive.",
            "price": 2900
        },
        {
            "id": "5",
            "name": "Casanova (entourée de fromage)",
            "description": "Tomate, mozzarella, fromage, chorizo, merguez, oignon, poivron, huile d'olive.",
            "price": 2800
        },
        {
            "id": "6",
            "name": "Insieme",
            "description": "Tomate, fromage, poulet, crevettes, jambon de volaille, poivron, huile d'olive.",
            "price": 3000
        },
        {
            "id": "7",
            "name": "Pancetta",
            "description": "Base sauce tomate, mozzarella, pancetta (ou lardons), oignons caramélisés, roquette, parmesan, huile d'olive, poivre noir.",
            "price": 2700
        },
        {
            "id": "8",
            "name": "Vegetariana",
            "description": "Tomate (en rondelle), mozzarella, fromage, maïs doux, câpres, ail persillé, oignons, poivrons, huile d'olive.",
            "price": 2300
        },
        {
            "id": "9",
            "name": "Te Quiero (entourée de saucisses)",
            "description": "Tomate, mozzarella, fromage, jambon de volaille, poivrons, huile d'olive.",
            "price": 3200
        },
        {
            "id": "10",
            "name": "La Calzone",
            "description": "Tomate, mozzarella, fromage, œuf, champignons de Paris, jambon, huile d'olive.",
            "price": 2600
        },
        {
            "id": "11",
            "name": "La Dolomita",
            "description": "Base sauce tomate, mozzarella, charcuterie de montagne, pommes de terre tranchées fines, fromage de montagne, huile d'olive, romarin frais.",
            "price": 3200
        },
        {
            "id": "12",
            "name": "La Venezia",
            "description": "Base sauce tomate, mozzarella, anchois, crevettes, moules, calamars, câpres, ail, persil frais, huile d'olive.",
            "price": 4450
        },
        {
            "id": "13",
            "name": "La Broussarde",
            "description": "Base crème fraîche, viande de cerf, patates douces, oignons rouges, fromage.",
            "price": 2600
        },
        {
            "id": "14",
            "name": "Porc au Sucre",
            "description": "Porc mariné au sucre, oignons caramélisés, fromage, sauce barbecue maison.",
            "price": 2000
        },
        {
            "id": "15",
            "name": "Poulet Soyo",
            "description": "Poulet mariné soyo, mozzarella, oignons rouges, sauce soyo, coriandre, huile d'olive.",
            "price": 2200
        },
        {
            "id": "16",
            "name": "La Crunchy",
            "description": "Base crème fraîche, mozzarella, pommes de terre frites, lardons, oignons caramélisés, fromage râpé, herbes de Provence.",
            "price": 2700
        },
        {
            "id": "17",
            "name": "Teneramente",
            "description": "Base sauce tomate, mozzarella, fromage, crevettes, chair de crabe, citron, tomates fraîches, huile d'olive.",
            "price": 4600
        },
        {
            "id": "18",
            "name": "Reale",
            "description": "Tomate, mozzarella, fromage, crevettes, moules, huile d'olive.",
            "price": 3800
        },
        {
            "id": "19",
            "name": "La spéciale Saumon",
            "description": "Base crème fraîche, mozzarella, saumon fumé, câpres, oignons rouges, aneth frais, zeste de citron, huile d'olive, poivre noir.",
            "price": 3800
        },
        {
            "id": "20",
            "name": "La Pescanova",
            "description": "Base crème fraîche, poulet grillé, persillade de persil et ail, mozzarella, huile d'olive, sel et poivre noir.",
            "price": 3900
        }
]

# Save to a file
with open('dataset2.json', 'w', encoding='UTF-8') as json_file:
    json.dump(data, json_file, indent=4)

print("JSON file created successfully!")