const fs = require('fs');
const path = require('path');

console.log('🚀 Sundown Studio MongoDB Atlas Setup');
console.log('=====================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    
    const envContent = `# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://Kush2004:Kush2004@cluster0.hy2lc9f.mongodb.net/sundown_studio?retryWrites=true&w=majority&appName=Cluster0

# Server Configuration
PORT=8000
NODE_ENV=development
JWT_SECRET=sundown-studio-super-secret-key-2024
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
`;
    
    try {
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully!');
    } catch (error) {
        console.error('❌ Failed to create .env file:', error.message);
        console.log('\n📝 Please create .env file manually with this content:');
        console.log(envContent);
    }
} else {
    console.log('✅ .env file already exists');
}

console.log('\n🔍 Checking project setup...');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
    console.error('❌ package.json not found. Please run this script from your project root directory.');
    process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    console.log('   Run: npm install');
} else {
    console.log('✅ Dependencies are installed');
}

// Check if config directory exists
if (!fs.existsSync('config')) {
    console.log('📁 Creating config directory...');
    fs.mkdirSync('config');
}

// Check if models directory exists
if (!fs.existsSync('models')) {
    console.log('📁 Creating models directory...');
    fs.mkdirSync('models');
}

// Check if routes directory exists
if (!fs.existsSync('routes')) {
    console.log('📁 Creating routes directory...');
    fs.mkdirSync('routes');
}

// Check if middleware directory exists
if (!fs.existsSync('middleware')) {
    console.log('📁 Creating middleware directory...');
    fs.mkdirSync('middleware');
}

console.log('\n🎯 Next Steps:');
console.log('1. Run: npm install (if dependencies not installed)');
console.log('2. Run: node test-connection.js (to test MongoDB connection)');
console.log('3. Run: npm run dev (to start your server)');
console.log('4. Database is ready for your data');

console.log('\n🔗 MongoDB Atlas Dashboard: https://cloud.mongodb.com');
console.log('📱 Make sure your IP is whitelisted in Network Access');
console.log('👤 Verify user "Kush2004" exists in Database Access');

console.log('\n🚀 Ready to test your connection!');

