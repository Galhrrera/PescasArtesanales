var table_name = document.title;
//console.log("El nombre de la página y de la tabla es: " + titulo);

var selectMetodos = document.getElementById("select_metodos");
var selectCuencas = document.getElementById("select_cuencas")
var selectPescasUpdate = document.getElementById("update_id");
var selectPescasDelete = document.getElementById("delete_id");
var selectMetodosUpdate = document.getElementById("select_metodos_update");
var selectCuencasUpdate = document.getElementById("select_cuencas_update")

// READ
window.onload = function () {
    eel.select(table_name)(get_data);
    eel.select("metodos")(loadSelectMetodos)
    eel.select("cuencas")(loadSelectCuencas)
    eel.select("pescas")(loadSelectPescas)
}

function get_data(output) {
    json_list = JSON.parse(output);
    string = "<tr><th>Id pesca</th><th>Id cuenca</th><th>Id método</th><th>Fecha</th><th>Total peso</th>";
    json_list.forEach(row => string = string.concat("<tr><td>", row[0], "</td><td>", row[1], "</td><td>", row[2], "</td><td>", row[3], "</td><td>", row[4], "</tr>"));
    document.getElementById("data").innerHTML = string;
}

//Actuaizar tablas
function update_table() {
    eel.select(table_name)(get_data);
}

// CREATE
document.querySelector(".crud_create").onclick = function () {
    alert("entra a create de pescas");
    id_cuenca = document.getElementById("select_cuencas");
    id_metodo = document.getElementById("select_metodos");
    fecha = document.getElementById("input_fecha");
    peso = document.getElementById("input_peso");
    args = [id_cuenca.value, id_metodo.value, fecha.value, peso.value];
    //alert(args);
    if (!args[0] || !args[1] || !args[2] || !args[3]) {
        if (args[0] == null) {
            alert("Debe seleccionar una cuenca");
            //Clean inputs
        }
        else if (args[1] == null) {
            alert("Debe seleccionar unmétodo de pesca");
            //clean inputs
        }
        else if (args[2] == null) {
            alert("Debe seleccionar una fecha");
            //clean inputs
        }
        else if (args[3] == null) {
            alert("Debe indicar el peso de la pesca");
            //clean inputs
        }
    }
    else {
        try {
            eel.create_pescas(titulo, args);
            update_table();
            alert("Pesca creada correctamente");
        }
        catch (error) {
            console.log(error);
        }
    }
}

// UPDATE
document.querySelector(".crud_update").onclick = function () {
    update_id = document.getElementById("update_id");
    update_id_value = update_id.value
    /*
    update_new_name = document.getElementById("update_name");
    update_args = [update_id.value, update_new_name.value];
    */
    update_new_cuenca = document.getElementById("select_cuencas_update");
    update_new_metodo = document.getElementById("select_metodos_update");
    update_new_fecha = document.getElementById("input_fecha_update");
    update_new_peso = document.getElementById("input_peso_update");
    update_args = [update_id_value, update_new_cuenca.value, update_new_metodo.value, update_new_fecha.value, update_new_peso.value];

    alert(update_args);
    if (!update_args[0] || !update_args[1]) {
        alert("La entrada no puede estar vacía");
    }
    else {
        try {
            eel.updatePescas(table_name, update_args);
            update_table();
            alert("Elemento actualizado exitosamente");
        } catch (error) {
            console.log(error);
        }
    }
    //clean_inputs();
}
// DELETE
document.querySelector(".crud_delete").onclick = function () {
    delete_id = document.getElementById("delete_id");

    if (!delete_id.value) {
        alert("Debe seleccionar una opción");
    }
    else {
        alert(delete_id.value)
        eel.delete(table_name, delete_id.value);
        update_table();
        alert("Elemento eliminado exitosamente");
    }
    //clean_inputs();
}

//ADICIONALES
function loadSelectMetodos(output) {
    json_list = JSON.parse(output);
    string_select = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_select = string_select.concat("<option value='", row[0], "'>", row[0], " - ", row[1], "</option>"));
    selectMetodos.innerHTML = string_select;
    selectMetodosUpdate.innerHTML = string_select;
}

function loadSelectCuencas(output) {
    json_list = JSON.parse(output);
    string_select = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_select = string_select.concat("<option value='", row[0], "'>", row[0], " - ", row[1], "</option>"));
    selectCuencas.innerHTML = string_select
    selectCuencasUpdate.innerHTML = string_select
}

function loadSelectPescas(output) {
    json_list = JSON.parse(output);
    //alert(json_list)
    string_select_update = "<option disabled selected value style='color:whitesmoke'></option>";
    string_select_delete = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_select_update = string_select_update.concat("<option value='", row[0], "'>", row[0], " - ", row[1], " - ", row[2], " - ", row[3],
        " - ", row[4], "</option>"));
    json_list.forEach(row => string_select_delete = string_select_delete.concat("<option value='", row[0], "'>", row[0], " - ", row[1], " - ", row[2], " - ", row[3],
        " - ", row[4], "</option>"));
    //alert(string_select_update);
    //alert(string_select_delete);
    selectPescasUpdate.innerHTML = string_select_update
    selectPescasDelete.innerHTML = string_select_delete
}
