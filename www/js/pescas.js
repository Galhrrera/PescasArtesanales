var table_name = document.title;
//console.log("El nombre de la página y de la tabla es: " + titulo);

var selectMetodos = document.getElementById("select_metodos");
var selectCuencas = document.getElementById("select_cuencas")
var selectPescasUpdate = document.getElementById("update_id");
var selectPescasDelete = document.getElementById("delete_id");
var selectMetodosUpdate = document.getElementById("select_metodos_update");
var selectCuencasUpdate = document.getElementById("select_cuencas_update")

var modal = document.getElementById("myModal");
var closeModalBtn = document.getElementById("close");

var btn_Create = document.getElementById("btn_Create");

var modalText = document.getElementById("modal_text");



closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

// READ
window.onload = function () {
    eel.select(table_name)(get_data);
    eel.select("metodos")(loadSelectMetodos)
    eel.select("cuencas")(loadSelectCuencas)
    eel.select("pescas")(loadSelectPescas)
    modalText.innerHTML = "";
}

//Limpiar inputs
function clean_inputs() {
    inputs = document.getElementsByClassName("crud_input");
    selects = document.getElementsByClassName("crud_select");
    for (let i of inputs) { i.value = ""; }
    for (let s of selects) { s.value = ""; }
}

function get_data(output) {
    json_list = JSON.parse(output);
    string = "<thead><tr><th>Id pesca</th><th>Id cuenca</th><th>Id método</th><th>Fecha</th><th>Total peso</th></thead>";
    json_list.forEach(row => string = string.concat("<tr><td>", row[0], "</td><td>", row[1], "</td><td>", row[2], "</td><td>", row[3], "</td><td>", row[4], "</tr>"));
    document.getElementById("data").innerHTML = string;
}

//Actuaizar tablas
function update_table() {
    eel.select(table_name)(get_data);
    eel.select("cuencas")(loadSelectCuencas);
    eel.select("metodos")(loadSelectMetodos);
    eel.select("pescas")(loadSelectPescas);
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
            //alert("Pesca creada correctamente");
            clean_inputs()
        }
        catch (error) {
            console.log(error);
        }
    }
    modal.style.display = "block"
    modalText.innerHTML = "Pesca creada correctamente";
}

// UPDATE
document.querySelector(".crud_update").onclick = function () {
    update_id = document.getElementById("update_id");
    update_id_value = update_id.value
    update_new_cuenca = document.getElementById("select_cuencas_update");
    update_new_metodo = document.getElementById("select_metodos_update");
    update_new_fecha = document.getElementById("input_fecha_update");
    update_new_peso = document.getElementById("input_peso_update");
    update_args = [update_id_value, update_new_cuenca.value, update_new_metodo.value, update_new_fecha.value, update_new_peso.value];

    //alert(update_args);
    if (!update_args[0] || !update_args[1] || !update_args[2] || !update_args[3] || !update_args[4]) {
        //alert("La entrada no puede estar vacía");
        clean_inputs()
        modal.style.display = "block"
        modalText.innerHTML = "Todas las entradas deben tener datos";
    }
    else {
        try {
            eel.updatePescas(table_name, update_args);
            update_table();
            //alert("Elemento actualizado exitosamente");
            modal.style.display = "block"
            modalText.innerHTML = "Pesca Actualizada correctamente";
        } catch (error) {
            console.log(error);
        }
    }
    clean_inputs()

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
    clean_inputs()
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

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}