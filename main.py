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
    l_ans = []
    for row in cursor.execute("SELECT * FROM " + table_name):
        l_ans.append(row)
    conn.close()
    encoded = json.dumps(l_ans, ensure_ascii=False).encode('utf8')
    decoded = encoded.decode()
    return decoded


#Start app
eel.start("pescas.html", size=(1920,1080), position=(0,0)) #El tamaño será 1920 x 1080 y se iniciará en la posicón 0,0 (ocupará toda la pantalla en un monitor 1080)