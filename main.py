from distutils.log import error
from msilib.schema import Error
import eel
import sys
import  sqlite3 as sql
import json

from pyparsing import col
from sympy import arg


#Conexión a la base de datos
connection=sql.connect("./DataSource/PescasArtesanalesDB.sqlite")

#Configuración del entorno
sys.path.append("./")
eel.init("www")


#Aquí los métodos
#Select / READ
@eel.expose       
def select(table_name):
    #decoded=""
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
        print("Conectado a la base de datos para ejecutar select...")
        cursor = conn.cursor()
        lista_registros = []
        for row in cursor.execute("SELECT * FROM " + table_name):
            lista_registros.append(row)
        print("Query select ejecutado...")

        encoded = json.dumps(lista_registros, ensure_ascii=False).encode('utf8')
        decoded = encoded.decode()
    except sql.Error as error:
        print("Error al conectar con la base de datos - ",error)
    finally:
        if conn:
            conn.close()
            print("La conexión a la base de datos ha finalizado...")

    return decoded

#Create cuencas & metodos
@eel.expose
def create(table_name, args):
    
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
        print("Conectado a la base de datos para ejecutar create...")
        cursor = conn.cursor()
        columna=""
        if(table_name=="metodos"):
            columna = "metodo"
            query = "INSERT INTO " + table_name + " (" + columna + ") VALUES (?)"
        elif(table_name == "cuencas"):
            columna="cuenca"
            query = "INSERT INTO " + table_name + " (" + columna + ") VALUES (?)"
        elif(table_name=="pescas"):
            #columna id_cuenca
            #columna id_metodo
            #columna fecha
            #columna peso
            query = "INSERT INTO " + table_name + " (" + columna + ") VALUES (?)"
            
        #query = "INSERT INTO " + table_name + " (" + columna + ") VALUES (?)"
        cursor.execute(query,[args])
        conn.commit()
        print(columna+": registro creado satisfactoriamente")
    except sql.Error as error:
        print("Error al crear registro en la base de datos - ",error)
    finally:
        if conn:
            conn.close()
            print("La conexión a la base de datos ha finalizado...")
            
#Create pescas            
@eel.expose
def create_pescas(table_name, args):
    print("MÉTODO CREAR PESCAS")
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
        print("Conectado a la base de datos para ejecutar create...")
        cursor = conn.cursor()
        query = "INSERT INTO " + table_name + " (id_cuenca, id_metodo, fecha, peso_pesca) VALUES (?, ?, ?, ?)"
        cursor.execute(query, args)
        conn.commit()
    except sql.Error as error:
        print("Error al crear registro en la base de datos - ",error)
    finally:
        if conn:
            conn.close()
            print("La conexión a la base de datos ha finalizado...")


#Update cuencas & metodos
@eel.expose
def update(table_name, args):
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
        cursor = conn.cursor()
        columna=""
        id_column=""
        if (table_name =="metodos"):
            columna = "metodo"
            id_column = "id_metodo"
        elif(table_name=="cuencas"):
            columna="cuenca"
            id_column = "id_cuenca"
                
        query = "UPDATE " + table_name + " SET "+columna+"=(?) WHERE "+id_column+"=(?);"
        cursor.execute(query, [args[1], args[0]])
        conn.commit()
        print("Registo en ", columna, "Actualizado satisfactoriamente")
    except sql.Error as error:
        print("Error al Actualizar el registro en la base de datos", error)
    finally:
        if conn:
            conn.close()
            print("La conexión a la base de datos ha finalizado...")
    
#Delete 
@eel.expose
def delete(table_name, args):
    try:
        conn = sql.connect("./DataSource/PescasArtesanalesDB.sqlite")
    except:
        print("Error al conectar con la base de datos")
    cursor = conn.cursor()
    if table_name == "metodos":
        try:
            query = "DELETE FROM " + table_name + " WHERE id_metodo=(?);"
            cursor.execute(query, [args])
            conn.commit()
        except sql.Error as error:
            print("Error al eliminar un dato en la tabla: "+table_name+" - "+error)
    elif table_name == "cuencas":
        try:
            query = "DELETE FROM " + table_name + " WHERE id_cuenca=(?);"
            cursor.execute(query, [args])
            conn.commit()
        except sql.Error as error:
            print("Error al eliminar un dato en la tabla: "+table_name+" - "+error)
    conn.close()


#Start app
eel.start("pescas.html", size=(1920,1080), position=(0,0)) #El tamaño será 1920 x 1080 y se iniciará en la posicón 0,0 (ocupará toda la pantalla en un monitor 1080)