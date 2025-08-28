# 🚀 Sundown Studio Server Setup

## **Why This Server?**

The default Python HTTP server doesn't serve JavaScript files with the correct MIME type (`application/javascript`), which causes Service Worker registration to fail. This custom server fixes that issue.

## **How to Start the Server**

### **Option 1: Using the Custom Python Server (Recommended)**
```bash
# Navigate to the App directory
cd App

# Start the server
python server.py
```

### **Option 2: Using the Batch File (Windows)**
```bash
# Double-click or run from command line
start-server.bat
```

### **Option 3: Using PowerShell (Windows)**
```powershell
# Run from PowerShell
.\start-server.ps1
```

### **Option 4: Using the Default Python Server (Not Recommended)**
```bash
# This will cause Service Worker MIME type errors
python -m http.server 8000
```

## **What This Server Fixes**

✅ **Service Worker Registration** - Serves `.js` files with correct MIME type  
✅ **PWA Manifest** - Serves `.json` files with correct MIME type  
✅ **CORS Headers** - Adds necessary headers for PWA development  
✅ **All File Types** - Proper MIME types for images, fonts, videos, etc.  

## **Server Features**

- 🎯 **Correct MIME Types** for all file extensions
- 🌐 **CORS Support** for cross-origin requests
- 📱 **PWA Ready** with proper headers
- 🔄 **Auto-reload** friendly
- 🛡️ **Security** headers for development

## **Access Your Project**

Once the server is running, visit:
- **Main Site**: http://localhost:8000
- **Dashboard**: http://localhost:8000/pages/Dashboard.html
- **Login**: http://localhost:8000/pages/Login.html

## **Troubleshooting**

### **Service Worker Still Not Working?**
1. Clear browser cache (Ctrl+Shift+R)
2. Open DevTools → Application → Service Workers
3. Click "Unregister" if any old service workers exist
4. Refresh the page

### **Port Already in Use?**
Change the port in `server.py`:
```python
run_server(port=8001)  # Use different port
```

### **Python Not Found?**
Make sure Python is installed and in your PATH:
```bash
python --version
```

## **Development Tips**

- Keep the server running while developing
- Use browser DevTools to monitor Service Worker registration
- Check the Network tab to verify correct MIME types
- Use the Application tab to manage PWA features 