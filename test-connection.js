const mongoose = require('mongoose');

// MongoDB Atlas connection string
const uri = "mongodb+srv://Kush2004:Kush2004@cluster0.hy2lc9f.mongodb.net/sundown_studio?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
    try {
        console.log('🔌 Testing MongoDB Atlas connection...');
        console.log('📍 Connecting to:', uri.replace(/\/\/.*@/, '//***:***@'));
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ Successfully connected to MongoDB Atlas!');
        console.log('📍 Host:', mongoose.connection.host);
        console.log('🗄️ Database:', mongoose.connection.name);
        
        // Test creating a simple document
        const testCollection = mongoose.connection.db.collection('test');
        await testCollection.insertOne({ 
            message: 'Connection test successful', 
            timestamp: new Date() 
        });
        console.log('✅ Database write test successful!');
        
        // Clean up test document
        await testCollection.deleteOne({ message: 'Connection test successful' });
        console.log('✅ Database cleanup successful!');
        
        console.log('\n🎉 MongoDB Atlas connection is working perfectly!');
        console.log('🚀 You can now start your server with: npm run dev');
        
    } catch (error) {
        console.error('\n❌ Connection failed:', error.message);
        console.error('\n🔍 Troubleshooting tips:');
        console.error('1. Check if your MongoDB Atlas cluster is running');
        console.error('2. Verify username/password are correct');
        console.error('3. Ensure your IP is whitelisted in Atlas');
        console.error('4. Check if the cluster URL is correct');
        console.error('\n📱 Go to MongoDB Atlas dashboard to verify settings');
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('🔌 Connection closed');
        }
        process.exit(0);
    }
}

testConnection();

