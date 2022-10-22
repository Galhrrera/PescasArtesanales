from distutils.log import error
import eel
import sys
import  sqlite3 as sql
import json


#Conexión a la base de datos
connection=sql.connect("./DataSource/PescasArtesanalesDB.sqlite")

#Configuración del entorno
sys.path.append("./")
eel.init("www")


#Aquí los métodos
#Select / READ
@eel.expose       
def select(table_name):
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
    except:
        print("Error al conectar con la base de datos")
    cursor = conn.cursor()
    lista_registros = []
    for row in cursor.execute("SELECT * FROM " + table_name):
        lista_registros.append(row)
    conn.close()
    encoded = json.dumps(lista_registros, ensure_ascii=False).encode('utf8')
    decoded = encoded.decode()
    return decoded

@eel.expose
def create(table_name, args):
    column_name = ""
    
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
    except:
        print("Error al conectar con la base de datos")
    cursor = conn.cursor()
    
    if(table_name == "metodos"):
        try:
            query = "INSERT INTO " + table_name + "(metodo) VALUES (?)"
            cursor.execute(query,[args])
            conn.commit()
        except:
            print("Error en query en tabla métodos")
    elif (table_name == "cuencas"):
        try:
            query = "INSERT INTO " + table_name + "(cuenca) VALUES (?)"
            cursor.execute(query,args)
            conn.commit()
        except:
            print("Error en query en tabla cuencas")


    conn.close()



#Update
@eel.expose
def update(table_name, args):
    print(args)
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
    except:
        print("Error al conectar con la base de datos")
    cursor = conn.cursor()
    if table_name == "metodos":
        try:
            query = "UPDATE " + table_name + " SET metodo=(?) WHERE id_metodo=(?);"
            cursor.execute(query, [args[1], args[0]])
            conn.commit()
        except:
            print("Error al actualizar tabla métodos")
    elif (table_name == "cuencas"):
        try:
            query = "UPDATE " + table_name + " SET cuenca=(?) WHERE id_cuenca=(?);"
            cursor.execute(query, [args[1], args[0]])
            conn.commit()
        except:
            print("Error al actualizar tabla cuencas")
    conn.close()
    
#Delete
@eel.expose
def delete(table_name, args):
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
    except:
        print("Error al conectar con la base de datos")
    cursor = conn.cursor()
    if table_name == "metodos" or table_name == "cuencas":
        try:
            query = "DELETE FROM " + table_name + " WHERE id_metodo=(?);"
            cursor.execute(query, [args])
            conn.commit()
        except:
            print("Error al eliminar un dato en la tabla: "+table_name)
    conn.close()


#Start app
eel.start("pescas.html", size=(1920,1080), position=(0,0)) #El tamaño será 1920 x 1080 y se iniciará en la posicón 0,0 (ocupará toda la pantalla en un monitor 1080)