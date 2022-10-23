var titulo = document.title;
console.log("El nombre de la página y de la tabla es: "+titulo);

var selectMetodos = document.getElementById("select_metodos");
var selectCuencas = document.getElementById("select_cuencas")
// CREATE

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