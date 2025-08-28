# 🚀 Sundown Studio Backend

## Overview
A comprehensive backend system for Sundown Studio Creative Management System, built with Node.js, Express.js, and MongoDB.

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control** (Admin, Manager, Designer, Developer, Client)
- **Permission-based authorization** for fine-grained access control
- **Password security** with bcrypt hashing
- **Rate limiting** to prevent abuse

### 🗄️ Database & Models
- **MongoDB** with Mongoose ODM
- **User Management** with comprehensive profiles
- **Project Management** with full CRUD operations
- **Advanced indexing** for optimal performance
- **Data validation** and sanitization

### 🛡️ Security Features
- **Helmet.js** for security headers
- **CORS** configuration
- **Input validation** with express-validator
- **SQL injection protection**
- **XSS protection**
- **Rate limiting** and abuse prevention

### 📊 API Endpoints
- **RESTful API** design
- **Comprehensive error handling**
- **Request/response logging**
- **Health check endpoints**
- **API versioning ready**

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/sundown_studio
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Security Configuration
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
   ```

3. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

4. **Run the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "designer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "designer",
      "avatar": "/assets/default-avatar.jpg",
      "isVerified": false
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "designer",
      "avatar": "/assets/default-avatar.jpg",
      "isVerified": false,
      "permissions": ["edit_project", "view_analytics"]
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/api/auth/me`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### PUT `/api/auth/profile`
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "bio": "Creative designer with 5+ years experience",
  "phone": "+1234567890",
  "location": {
    "city": "New York",
    "country": "USA",
    "timezone": "America/New_York"
  }
}
```

#### PUT `/api/auth/password`
Change user password (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "SecurePass123!",
  "newPassword": "NewSecurePass456!"
}
```

#### POST `/api/auth/logout`
Logout user (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Health Check

#### GET `/api/health`
Check API health status.

**Response:**
```json
{
  "success": true,
  "message": "Sundown Studio API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

## 🔐 Authentication

### JWT Token Usage
Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

### Role-Based Access Control
- **Admin**: Full access to all features
- **Manager**: Project and client management
- **Designer**: Project editing and analytics
- **Developer**: Project editing and analytics
- **Client**: View analytics only

### Permission System
- `create_project`: Create new projects
- `edit_project`: Edit existing projects
- `delete_project`: Delete projects
- `manage_users`: Manage user accounts
- `view_analytics`: View project analytics
- `manage_clients`: Manage client relationships

## 🗄️ Database Models

### User Model
- Basic information (name, email, password)
- Role and permissions
- Profile details (bio, phone, location)
- Professional information (skills, experience)
- Portfolio links
- Account preferences

### Project Model
- Project details (title, description, category)
- Client information
- Team assignments
- Timeline and progress tracking
- Budget and financial data
- Media assets and deliverables
- SEO and analytics

## 🛡️ Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Rate Limiting
- Authentication endpoints: 5 requests per 15 minutes
- API endpoints: 100 requests per 15 minutes

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security

## 🚀 Development

### Scripts
```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Seed database with sample data
npm run seed
```

### File Structure
```
├── config/
│   └── database.js          # Database connection
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── User.js             # User model
│   └── Project.js          # Project model
├── routes/
│   └── auth.js             # Authentication routes
├── server.js               # Main server file
└── package.json
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 8000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `ALLOWED_ORIGINS`: CORS allowed origins

### Database Configuration
- Local MongoDB: `mongodb://localhost:27017/sundown_studio`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/sundown_studio`

## 📊 Monitoring & Logging

### Logging
- Development: Morgan dev format
- Production: Morgan combined format
- Request/response logging
- Error logging with stack traces

### Health Monitoring
- API health check endpoint
- Database connection status
- Server uptime monitoring
- Error tracking and reporting

## 🚀 Deployment

### Production Considerations
1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas
4. Set up proper CORS origins
5. Enable HTTPS
6. Set up monitoring and logging
7. Configure backup strategies

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the error logs
- Contact the development team

---

**Sundown Studio Backend** - Powering creative project management with modern web technologies! 🎨✨

