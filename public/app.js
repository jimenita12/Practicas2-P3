document.addEventListener('DOMContentLoaded', function () {
    const tablaCamiones = document.getElementById('tablaCamiones');
    const botonCargar = document.getElementById('botonCargar');
    const inputPlaca = document.getElementById('inputPlaca');
    const botonBuscarPlaca = document.getElementById('botonBuscarPlaca');

    // Función para cargar los datos desde el servidor
    async function cargarDatos() {
        try {
            const response = await fetch('/camiones');
            const data = await response.json();

            tablaCamiones.innerHTML = '';

            // Agregar fila de títulos
            const titulos = document.createElement('tr');
            titulos.innerHTML = `
                <th>ID de Camion</th>
                <th>Nombre</th>
                <th>Total de almacenaje</th>
                <th>Placas</th>
                <th>Marca</th>
            `;
            tablaCamiones.appendChild(titulos);

            // Agregar filas de datos
            data.forEach(camion => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${camion.Idcamion}</td>
                    <td>${camion.Nombre}</td>
                    <td>${camion.Totalmacenaje}</td>
                    <td>${camion.Placas}</td>
                    <td>${camion.Marca}</td>
                `;
                tablaCamiones.appendChild(fila);
            });

            console.log('Datos cargados correctamente.');
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }

    // Evento clic en el botón Cargar
    botonCargar.addEventListener('click', function () {
        cargarDatos();
    });

    // Evento clic en el botón Buscar por Placa
    botonBuscarPlaca.addEventListener('click', function () {
        const placa = inputPlaca.value.trim().toUpperCase();

        if (placa !== '') {
            buscarPorPlaca(placa);
        }
    });

    // Función para buscar camiones por placa
    async function buscarPorPlaca(placa) {
        try {
            const response = await fetch(`/camiones/placa/${placa}`);
            const data = await response.json();

            tablaCamiones.innerHTML = '';

            // Agregar fila de títulos
            const titulos = document.createElement('tr');
            titulos.innerHTML = `
                <th>ID de Camion</th>
                <th>Nombre</th>
                <th>Total de almacenaje</th>
                <th>Placas</th>
                <th>Marca</th>
            `;
            tablaCamiones.appendChild(titulos);

            // Agregar filas de datos
            data.forEach(camion => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${camion.Idcamion}</td>
                    <td>${camion.Nombre}</td>
                    <td>${camion.Totalmacenaje}</td>
                    <td>${camion.Placas}</td>
                    <td>${camion.Marca}</td>
                `;
                tablaCamiones.appendChild(fila);
            });

            console.log('Búsqueda por placa completada.');
        } catch (error) {
            console.error('Error al buscar por placa:', error);
        }
    }
});
