class Refaccion {
    constructor(descripcion, categoria, precio) {
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = parseFloat(precio).toFixed(2);
    }
}

class GestorRefacciones {
    constructor() {
        this.refacciones = [];
    }

    agregarRefaccion(refaccion) {
        this.refacciones.push(refaccion);
        this.mostrarRefacciones();
    }

    modificarRefaccion(index, refaccion) {
        this.refacciones[index] = refaccion; 
        this.mostrarRefacciones();
    }

    eliminarRefaccion(index) {
        this.refacciones.splice(index, 1);
        this.mostrarRefacciones();
    }

    mostrarRefacciones() {
        const tbody = document.querySelector('#refacciones-tbody');
        tbody.innerHTML = ''; 
        this.refacciones.forEach((refaccion, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${refaccion.descripcion}</td>
                <td>${refaccion.categoria}</td>
                <td>$${refaccion.precio}</td>
                <td class="actions">
                    <button onclick="gestor.prepararEdicion(${index})">Modificar</button>
                    <button onclick="gestor.eliminarRefaccion(${index})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    prepararEdicion(index) {
        const refaccion = this.refacciones[index];
        document.getElementById('edit-nombre').value = refaccion.descripcion;
        document.getElementById('edit-categoria').value = refaccion.categoria;
        document.getElementById('edit-precio').value = refaccion.precio;

        document.getElementById('edit-form').dataset.index = index;
        mostrarModal();
    }
}

const gestor = new GestorRefacciones();

const modal = document.getElementById('modal');
const editForm = document.getElementById('edit-form');
const cancelBtn = document.getElementById('cancel-btn');

function mostrarModal() {
    modal.classList.remove('hidden');
}

function ocultarModal() {
    modal.classList.add('hidden');
    editForm.reset();
    delete editForm.dataset.index;
}

document.getElementById('refaccion-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const nuevaRefaccion = new Refaccion(nombre, categoria, precio);
    gestor.agregarRefaccion(nuevaRefaccion);

    this.reset(); 
});

editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('edit-nombre').value;
    const categoria = document.getElementById('edit-categoria').value;
    const precio = document.getElementById('edit-precio').value;

    const nuevaRefaccion = new Refaccion(nombre, categoria, precio);

    const index = this.dataset.index;
    if (index) {
        gestor.modificarRefaccion(index, nuevaRefaccion);
    }

    ocultarModal();
});

cancelBtn.addEventListener('click', ocultarModal);

document.getElementById('clear-btn').addEventListener('click', () => {
    gestor.refacciones = [];
    gestor.mostrarRefacciones();
});
