# Dependencies
import serial
import serial.tools.list_ports

# Class
class SerialPython:

    # Class members
    _selected_port = ''
    _ports = []
    _ser = 0

    def __init__(self, select='COM0') -> None:
        ''' Manually selects the Serial port '''

        self._selected_port = select
        pass

    def list_ports(self, limit=99):
        ''' Updates the list of available ports '''

        self._ports = []
        ports = serial.tools.list_ports.comports()
        for port, desc, hwid in sorted(ports):
            self._ports.append([port, desc, hwid])

        def list():
            ''' Lists all the available ports '''

            return self._ports

        return list

    def start_serial(self, port=_selected_port, speed=9600):
        ''' Lists all the available ports '''

        self._selected_port = port
        self._ser = serial.Serial(port, speed, timeout=1)
        self._ser.flushInput()
        self._ser.flush()

        # Reads the input and throws it away
        for i in range(10):
            self._ser.readline()

    def read_serial(self):
        ''' Reads the serial buffer and 
            returns the decoded string '''

        try:
            ser_bytes = self._ser.readline()

            # converts the byte stram into string
            ser_num = ser_bytes.decode("utf-8")
            return ser_num

        except:
            raise Exception("Unable to read serial...")

    def close_serial(self):
        ''' Closes the serial stream '''

        self._ser.close()

# Sets an object to be used by the index page
SerialPy = SerialPython()
