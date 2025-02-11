// Función para cargar las refacciones a la tabla
console.log("jscript.js ha sido cargado correctamente");

function cargarRefacciones() {
    $.ajax({
      url: "https://phm-32v9.onrender.com/refacciones",
      method: "GET",
      success: function (data) {
        const tbody = $("#refacciones-tbody");
        tbody.empty();
  
        data.forEach((refaccion) => {
          const row = `
                  <tr>
                      <td>${refaccion.nombre}</td>
                      <td>${refaccion.categoria}</td>
                      <td>${refaccion.precio}</td>
                      <td>${refaccion.stock}</td>
                      <td>${refaccion.last_price}</td>
                      <td>${refaccion.ubicacion_almacen}</td>
                      <td>${refaccion.disponibilidad}</td>
                      <td>
                          <a href="#updateModal" data-rel="popup" data-transition="pop" onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}', '${refaccion.stock}', '${refaccion.last_price}', '${refaccion.ubicacion_almacen}', '${refaccion.disponibilidad}')">Editar</a>
                          <a href="#" onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</a>
                      </td>
                    </tr>
          `;
          tbody.append(row);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar las refacciones:", error);
      },
    });  
  }
  
  // Función para agregar una refacción a la BD
  $("#addRefaccion-form").on("submit", function (e) {
    e.preventDefault();

    const refaccion = {
        nombre: $("#nombre").val(),
        categoria: $("#categoria").val(),
        precio: $("#precio").val(),
        stock: $("#stock").val(),
        last_price: $("#last_price").val(),
        ubicacion_almacen: $("#ubicacion_almacen").val(),
        disponibilidad: $("#disponibilidad").val(),
    };

    $.ajax({
        url: "https://phm-32v9.onrender.com/refacciones",
        method: "POST",
        data: JSON.stringify(refaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {
            $("#addRefaccion-form")[0].reset(); // Limpiar el formulario
            cargarRefacciones(); // Recargar la tabla
            $("#addModal").popup("close"); // Cerrar el modal
        },
        error: function (err) {
            console.error("Error al agregar la refacción:", err);
        },
    });
});
  
  // Función para eliminar una refacción
  function eliminarRefaccion(id) {
    $.ajax({
      url: 'https://phm-32v9.onrender.com/refacciones/${id}',
      method: "DELETE",
      success: function () {
        cargarRefacciones();
      },
      error: function (err) {
        console.error("Error al eliminar la refacción:", err);
      },
    });
  }
  
  // Función para mostrar el modal con la información de la refacción
  function mostrarModal(id, nombre, categoria, precio, stock, last_price, ubicacion_almacen, disponibilidad) {
    $("#update-nombre").val(nombre);
    $("#update-categoria").val(categoria);
    $("#update-precio").val(precio);
    $("#update-stock").val(stock);
    $("#update-last_price").val(last_price);
    $("#update-ubicacion_almacen").val(ubicacion_almacen);
    $("#update-disponibilidad").val(disponibilidad);
  
    $('#updateRefaccion-form').off('submit').on('submit', function(e){
      e.preventDefault();
      const updatedRefaccion = {
        nombre: $("#update-nombre").val(),
        categoria: $("#update-categoria").val(),
        precio: $("#update-precio").val(),
        stock: $("#update-stock").val(),
        last_price: $("#update-last_price").val(),
        ubicacion_almacen: $("#update-ubicacion_almacen").val(),
        disponibilidad: $("#update-disponibilidad").val(),
      };
      $.ajax({
        url: 'https://phm-32v9.onrender.com/refacciones/${id}',
        method: "PATCH",
        data: JSON.stringify(updatedRefaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {        
          cargarRefacciones();
          $("#updateModal").popup('close');
        },
        error: function (err) {
          console.error("Error al actualizar la refacción:", err);
        },
      });
    });
  }



  function cargarCategorias() {
    $.ajax({
      url: "https://phm-32v9.onrender.com/categorias",
      method: "GET",
      success: function (data) {
        const tbody = $("#categorias-tbody");
        tbody.empty();
  
        data.forEach((categoria) => {
          const row = `
                  <tr>
                      <td> ${categoria.id}</td>
                      <td>${categoria.nombre}</td>
                      <td>${categoria.descripcion}</td>
                      <td>
                          <a href="#updateModalCategoria" data-rel="popup" data-transition="pop" onclick="mostrarModalCategoria('${categoria.id}', '${categoria.nombre}', '${categoria.descripcion}')">Editar</a>
                          <a href="#" onclick="eliminarCategoria('${categoria.id}')">Eliminar</a>
                      </td>
                    </tr>
          `;
          tbody.append(row);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar las categorias:", error);
      },
    });  
  }
  
  // Función para agregar una categoria a la BD
  $("#addCategoria-form").on("submit", function (e) {
    e.preventDefault();

    const refaccion = {
        nombre: $("#nombre-categoria").val(),
        descripcion: $("#descripcion-categoria").val(),
    };

    $.ajax({
        url: "https://phm-32v9.onrender.com/categorias",
        method: "POST",
        data: JSON.stringify(refaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {
            $("#addCategoria-form")[0].reset(); // Limpiar el formulario
            cargarCategorias();
            actualizarSelect();
             // Recargar la tabla
            $("#addModalCategoria").popup("close"); // Cerrar el modal
        },
        error: function (err) {
            console.error("Error al agregar la refacción:", err);
        },
    });
});
  
  // Función para eliminar una refacción
  function eliminarCategoria(id) {
    $.ajax({
      url: 'https://phm-32v9.onrender.com/categorias/${id}',
      method: "DELETE",
      success: function () {
        cargarCategorias();
        actualizarSelect();
      },
      error: function (err) {
        console.error("Error al eliminar la categoria:", err);
      },
    });
  }
  
  // Función para mostrar el modal con la información de la refacción
  function mostrarModal(id, nombre, descripcion) {
    $("#update-nombre-categoria").val(nombre);
    $("#update-descripcion-categoria").val(descripcion);
  
    $('#updateCategoria-form').off('submit').on('submit', function(e){
      e.preventDefault();
      const updatedCategoria = {
        nombre: $("#update-nombre-categoria").val(),
        categoria: $("#update-descripcion-categoria").val(),
      };
      $.ajax({
        url: 'https://phm-32v9.onrender.com/categorias/${id}',
        method: "PATCH",
        data: JSON.stringify(updatedCategoria),
        contentType: "application/json",
        dataType: "json",
        success: function () {        
          cargarCategorias();
          actualizarSelect();
          $("#updateModalCategoria").popup('close');
        },
        error: function (err) {
          console.error("Error al actualizar la refacción:", err);
        },
      });
    });
  }

  async function actualizarSelect() {
    try {
        const respuesta = await fetch("https://phm-32v9.onrender.com/categorias/");
        const datos = await respuesta.json();
        
        const select = document.getElementById("categoria");
        select.innerHTML = ""; // Limpiar opciones previas
        
        datos.forEach(opcion => {
            let optionElement = document.createElement("categoria");
            optionElement.value = opcion.id;
            optionElement.textContent = opcion.nombre;
            select.appendChild(optionElement);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}



  
  // Cargar las refacciones al iniciar la página
  $(document).on('pageinit', function () {
    if (!localStorage.getItem('authenticated')) {
      window.location.href = 'login.html';
  }
  cargarRefacciones();
  cargarCategorias();
  $('#logout-btn').on('click', function() {
    localStorage.removeItem('authenticated');
    window.location.href = 'login.html';
});
    
  });