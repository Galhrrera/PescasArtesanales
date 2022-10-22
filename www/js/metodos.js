// Obtiene el nombre de la tabla según el nombre del archivo
let table_name = document.title;
console.log("la tabla es: " + table_name);

// Actualizar tablas
function update_table() {
    eel.select(table_name)(get_data);
}

// CREATE
document.querySelector(".crud_create").onclick = function (){ 
    alert("Entra al metodo");
    create_name = document.getElementById("create_name");
    //clean_msgs();
    if(!create_name.value) {       
        alert("La entrada no puede estar vacía");
    }
    else {
        //alert(table_name)
        try {
            eel.create(table_name,create_name.value);
            update_table();
            alert("Elemento agregado exitosamente");
        } catch (error) {
            alert(error)
        }
    }
    clean_inputs();
}  

// READ
window.onload = function () {
    eel.select(table_name)(get_data);
}

function get_data(output){
    json_list = JSON.parse(output);
    string_table = "<tr><th>Id método</th><th>Nombre del método</th></tr>";    
    string_select = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_table = string_table.concat("<tr><td>", row[0], "</td>", "<td>", row[1] ,"</td></tr>"));
    json_list.forEach(row => string_select = string_select.concat("<option value='", row[0], "'>", row[0], " - ", row[1], "</option>"));
    document.getElementById("data").innerHTML = string_table;
    document.getElementById("update_id").innerHTML = string_select;
    document.getElementById("delete_id").innerHTML = string_select;
}

//UPDATE
document.querySelector(".crud_update").onclick = function (){ 
    update_id = document.getElementById("update_id");
    update_new_name = document.getElementById("update_name");
    update_args = [update_id.value, update_new_name.value];
    //clean_msgs();
    if(!update_args[0] || !update_args[1]) {
        alert("La entrada no puede estar vacía");
    }
    else {
        eel.update(table_name, update_args);
        update_table();
        alert("Elemento actualizado exitosamente");
        console.log("Elemento actualizado exitosamente" + update_args);
    }
    clean_inputs();
} 

//Limpiar inputs
function clean_inputs() {
    inputs = document.getElementsByClassName("crud_input");
    selects = document.getElementsByClassName("crud_select");
    for (let i of inputs) { i.value = ""; }
    for (let s of selects) { s.value = ""; }
}
