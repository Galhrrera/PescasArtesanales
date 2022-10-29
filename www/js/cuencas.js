var modal = document.getElementById("myModal");
var closeModalBtn = document.getElementById("close");

var btn_Create = document.getElementById("btn_Create");

var modalText = document.getElementById("modal_text");

// Obtiene el nombre de la tabla según el nombre del archivo
let table_name = document.title;
console.log("la tabla es: " + table_name);

// Actualizar tablas
function update_table() {
    eel.select(table_name)(get_data);
}

// CREATE
document.querySelector(".crud_create").onclick = function (){ 
    create_name = document.getElementById("create_name");
    if(!create_name.value) {       
        modal.style.display = "block"
        modalText.innerHTML = "La entrada no puede estar vacía";
        clean_inputs();
    }
    else {
        try {
            eel.create(table_name,create_name.value);
            update_table();
            modal.style.display = "block"
            modalText.innerHTML = "Cuenca creada correctamente";
            clean_inputs();
        } catch (error) {
            console.log(error)
        }
    }
}  

// READ
window.onload = function () {
    eel.select(table_name)(get_data);
}

function get_data(output){
    json_list = JSON.parse(output);
    string_table = "<thead><tr><th>Id método</th><th>Nombre del método</th></tr></thead><body>";    
    string_select = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_table = string_table.concat("<tr><td>", row[0], "</td>", "<td>", row[1] ,"</td></tr>"));
    json_list.forEach(row => string_select = string_select.concat("<option value='", row[0], "'>", row[0], " - ", row[1], "</option>"));
    string_table = string_table.concat("</body>")
    document.getElementById("data").innerHTML = string_table;
    document.getElementById("update_id").innerHTML = string_select;
    document.getElementById("delete_id").innerHTML = string_select;
}

//UPDATE
document.querySelector(".crud_update").onclick = function (){ 
    update_id = document.getElementById("update_id");
    update_new_name = document.getElementById("update_name");
    update_args = [update_id.value, update_new_name.value];
    if(!update_args[0] || !update_args[1]) {
        if (!update_args[0]){
            modal.style.display = "block"
            modalText.innerHTML = "Debe seleccionar un valor para todos los campos - Falta la cuenca que desea modificar";
            clean_inputs();
        }
        else{
            modal.style.display = "block"
            modalText.innerHTML = "Debe seleccionar un valor para todos los campos - Falta el nuevo nombre";
            clean_inputs();
        }

    }
    else {
        try {
            eel.update(table_name, update_args);
            update_table();
            modal.style.display = "block"
            modalText.innerHTML = "Cuenca actualizada correctamente";
            clean_inputs();
        } catch (error) {
            console.log(error);
        }
    }
    clean_inputs();
} 

//DELETE
document.querySelector(".crud_delete").onclick = function (){ 
    delete_id = document.getElementById("delete_id");

    if(!delete_id.value){
        modal.style.display = "block"
        modalText.innerHTML = "Debe seleccionar la cuenca que desea eliminar";
        clean_inputs();
    }
    else {
        eel.delete(table_name, delete_id.value)(deleteRegistro);
        /*
        update_table();
        modal.style.display = "block"
        modalText.innerHTML = "Cuenca "+delete_id.value+" eliminada correctamente";
        clean_inputs();
        */
    }
}

function deleteRegistro(output){
    clean_inputs();
    jsonOutput = JSON.parse(output);
    var tipo = typeof(output);

    let result = output.startWith("[ERROR]");
    alert (result);
    
    if ( output.startWith("[ERROR]")){
        alert("Entra al método deleteRegistro");
        modal.style.display = "block"
        modalText.innerHTML = output;
        clean_inputs();
        return
    }
    else{
        update_table();
        modal.style.display = "block"
        modalText.innerHTML = "Cuenca "+delete_id.value+" eliminada correctamente";
        clean_inputs();
    }
}

//Limpiar inputs
function clean_inputs() {
    inputs = document.getElementsByClassName("crud_input");
    selects = document.getElementsByClassName("crud_select");
    for (let i of inputs) { i.value = ""; }
    for (let s of selects) { s.value = ""; }
}

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
