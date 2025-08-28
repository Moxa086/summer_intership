#!/usr/bin/env python3
"""
Simple HTTP server with correct MIME types for PWA development
"""
import http.server
import socketserver
import os
import mimetypes

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Set correct MIME types for common files
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        elif self.path.endswith('.json'):
            self.send_header('Content-Type', 'application/json')
        elif self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')
        elif self.path.endswith('.html'):
            self.send_header('Content-Type', 'text/html')
        elif self.path.endswith('.ico'):
            self.send_header('Content-Type', 'image/x-icon')
        elif self.path.endswith('.png'):
            self.send_header('Content-Type', 'image/png')
        elif self.path.endswith('.jpg') or self.path.endswith('.jpeg'):
            self.send_header('Content-Type', 'image/jpeg')
        elif self.path.endswith('.svg'):
            self.send_header('Content-Type', 'image/svg+xml')
        elif self.path.endswith('.webp'):
            self.send_header('Content-Type', 'image/webp')
        elif self.path.endswith('.mp4'):
            self.send_header('Content-Type', 'video/mp4')
        elif self.path.endswith('.woff2'):
            self.send_header('Content-Type', 'font/woff2')
        elif self.path.endswith('.ttf'):
            self.send_header('Content-Type', 'font/ttf')
        
        # Add CORS headers for PWA development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        super().end_headers()

def run_server(port=8000):
    """Run the server on the specified port"""
    with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{port}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print("🔄 Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    run_server() 