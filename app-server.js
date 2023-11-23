//      CREACIÓN DE LA BASE DE DATOS 
// const db = new sqlite3.Database('refaccionaria.db');

// // Crear la tabla "Camion" si no existe
// db.run(`
//     CREATE TABLE IF NOT EXISTS Camion (
//         Idcamion INTEGER PRIMARY KEY,
//         Nombre TEXT,
//         Totalmacenaje REAL,
//         Placas TEXT,
//         Marca TEXT
//     )
// `, (err) => {
//     if (err) {
//         console.error(err.message);
//         throw err;
//     }

//     console.log('Tabla "Camion" creada exitosamente.');

//     // Insertar un ejemplo de dato
//     db.run(`
//         INSERT INTO Camion (Nombre, Totalmacenaje, Placas, Marca) VALUES ('Camion1', 10000, 'ABC123', 'Marca1')
//     `);
// });

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

class CamionService {
    constructor() {
        this.db = new sqlite3.Database('refaccionaria.db', (err) => {
            if (err) {
                console.error(err.message);
                throw new Error('Error al abrir la base de datos');
            }
            console.log('Base de datos abierta correctamente.');
        });
    }

    getAllCamiones(callback) {
        this.db.all('SELECT * FROM Camion', (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    }

    buscarPorPlaca(placa, callback) {
        this.db.all('SELECT * FROM Camion WHERE Placas = ?', [placa], (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    }

    closeDatabase() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Conexión a la base de datos cerrada correctamente.');
            }
        });
    }
}

app.use(express.static('public'));

app.get('/camiones', (req, res) => {
    const camionService = new CamionService();

    camionService.getAllCamiones((err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        res.json(rows);
        camionService.closeDatabase();
    });
});

app.get('/camiones/placa/:placa', (req, res) => {
    const placa = req.params.placa;

    const camionService = new CamionService();

    camionService.buscarPorPlaca(placa, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        res.json(rows);
        camionService.closeDatabase();
    });
});

app.listen(port, () => {
    console.log(`Servidor web escuchando en http://localhost:${port}`);
});
