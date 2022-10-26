var titulo = document.title;
console.log("El nombre de la página y de la tabla es: "+titulo);

var selectMetodos = document.getElementById("select_metodos");
var selectCuencas = document.getElementById("select_cuencas")

// READ
window.onload = function() {
    eel.select(titulo)(fill_table);
    eel.select("metodos")(loadSelectMetodos)
    eel.select("cuencas")(loadSelectCuencas)
}

function fill_table(output) {
    json_list = JSON.parse(output);
    string = "<tr><th>Id pesca</th><th>Id cuenca</th><th>Id método</th><th>Fecha</th><th>Total peso</th>";
    json_list.forEach(row => string = string.concat("<tr><td>", row[0], "</td><td>", row[1], "</td><td>", row[2], "</td><td>", row[3], "</td><td>", row[4], "</tr>"));
    document.getElementById("data").innerHTML = string;
}

//Actuaizar tablas
function update_table(){
    eel.select(titulo)(fill_table);
    eel.select("metodos")(loadSelectMetodos)
    eel.select("cuencas")(loadSelectCuencas)
}

// CREATE
document.querySelector(".crud_create").onclick = function (){
    alert("entra a create de pescas");
    id_cuenca = document.getElementById("select_cuencas");
    id_metodo = document.getElementById("select_metodos");
    fecha = document.getElementById("input_fecha");
    peso = document.getElementById("input_peso");
    args = [id_cuenca.value ,id_metodo.value, fecha.value, peso.value];
    //alert(args);
    if(!args[0] || !args[1] || !args[2] || !args[3]){
        if (args[0]==null){
            alert("Debe seleccionar una cuenca");
            //Clean inputs
        }
        else if (args[1]==null){
            alert("Debe seleccionar unmétodo de pesca");
            //clean inputs
        }
        else if(args[2]==null){
            alert("Debe seleccionar una fecha");
            //clean inputs
        }
        else if(args[3]==null){
            alert("Debe indicar el peso de la pesca");
            //clean inputs
        }
    }
    else{
        try{
            eel.create_pescas(titulo, args);
            update_table();
            alert("Pesca creada correctamente");
        }
        catch (error){
            console.log(error);
        }
    }
}

// UPDATE

// DELETE

//ADICIONALES
function loadSelectMetodos(output){
    json_list = JSON.parse(output);
    string_select = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_select = string_select.concat("<option value='", row[0], "'>", row[0], " - ", row[1], "</option>"));
    selectMetodos.innerHTML = string_select;
}

function loadSelectCuencas(output){
    json_list = JSON.parse(output);
    string_select = "<option disabled selected value style='color:whitesmoke'></option>";
    json_list.forEach(row => string_select = string_select.concat("<option value='", row[0], "'>", row[0], " - ", row[1], "</option>"));
    selectCuencas.innerHTML = string_select
}