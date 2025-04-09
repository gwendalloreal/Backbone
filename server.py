from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import os

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    print("Serveur démarré sur http://localhost:8000")
    webbrowser.open('http://localhost:8000')
    httpd.serve_forever()

if __name__ == '__main__':
    run() 