var titulo = document.title;
console.log("El nombre de la página y de la tabla es: "+titulo);
// CREATE

// READ
window.onload = function() {
    eel.select(titulo)(fill_table);
}
function fill_table(output) {
    json_list = JSON.parse(output);
    string = "<tr><th>Id pesca</th><th>Id cuenca</th><th>Id método</th><th>Fecha</th><th>Total peso</th>";
    json_list.forEach(row => string = string.concat("<tr><td>", row[0], "</td><td>", row[1], "</td><td>", row[2], "</td><td>", row[3], "</td><td>", row[4], "</tr>"));
    document.getElementById("data").innerHTML = string;
}
// UPDATE

// DELETE