# Import dependencies
import eel

# Initializes everything inside the web folder
eel.init("web", allowed_extensions=['.js', '.html']) 
  
# * —————————————————— Importing Python Modules —————————————————— * #

# Imports all serial functionalities
# and adds all callble functions to ell
from src.Serialport import SerialPy

@eel.expose
def SerialList():
    serial_list = SerialPy.list_ports()
    return serial_list()

@eel.expose
def openSerialPort(port):
    serial_port = port
    try: 
        SerialPy.start_serial(port=serial_port)
        return 1
    except: 
        print(f"Unable to open port {serial_port}")
        return 0

# " —————————————————— PAGE INITIALIZATION —————————————————— " #
  
# Start the index.html file
eel.start('./pages/index.html', mode='edge')