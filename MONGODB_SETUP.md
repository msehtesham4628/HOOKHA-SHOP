# MongoDB Setup Guide for HOOKHA SHOP

## Quick Start with MongoDB Atlas

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for a free account
- Create a new project (e.g., "hookha-shop")

### 2. Create a Database Cluster
1. Click "Create a Database"
2. Choose "M0 Sandbox" (free tier)
3. Select your region (closest to your users)
4. Wait for cluster creation (2-5 minutes)

### 3. Get Connection String
1. Click "Connect" button
2. Choose "Connect your application"
3. Select "Node.js" and the latest driver version
4. Copy the connection string

### 4. Configure Environment Variables
```bash
# .env.local
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/hookha-shop?retryWrites=true&w=majority"
```

Replace:
- `username` and `password` with your database user credentials
- `cluster` with your cluster name
- `hookha-shop` with your database name

### 5. Create Database User
1. In MongoDB Atlas, go to Database Access
2. Click "Add New Database User"
3. Create username and password
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### 6. Allow IP Access
1. Go to Network Access in MongoDB Atlas
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. For production, add your server's specific IP

## Setup Prisma with MongoDB

### 1. Generate Prisma Client
```bash
npm install @prisma/client
npx prisma generate
```

### 2. Create Database Collections
```bash
npx prisma db push
```

### 3. Seed Database (Optional)
```bash
npx prisma db seed
```

## MongoDB Features Used

- **ObjectId**: Native MongoDB object identifiers
- **Arrays**: Native support for tags, images array fields
- **Relationships**: Foreign key references between collections
- **Indexes**: Automatic indexing on unique and relationship fields

## Prisma MongoDB Advantages

✅ **Native Array Fields**: Store tags and images directly in products
✅ **Flexible Schema**: Easy to add new fields without migrations
✅ **Document Relationships**: Embedded documents and references
✅ **Transactions**: ACID transactions for complex operations
✅ **Geospatial Queries**: For location-based features
✅ **Aggregation Pipeline**: Advanced data analysis

## Local MongoDB Setup (Alternative)

### Using Docker
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

### Connection String
```
DATABASE_URL="mongodb://admin:password@localhost:27017/hookha-shop?authSource=admin"
```

### Using MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect with: `mongodb://admin:password@localhost:27017`
3. Browse collections visually

## Common Issues & Solutions

### Connection Timeout
- Check IP whitelist in MongoDB Atlas Network Access
- Verify DATABASE_URL is correct
- Ensure .env.local file exists

### Prisma Generation Issues
```bash
# Clear cache and regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

### Collection Not Found
```bash
# Push schema to MongoDB
npx prisma db push --skip-generate
```

## Production Deployment

### MongoDB Atlas Production Cluster
1. Upgrade to at least M2 cluster
2. Enable encryption at rest
3. Set up automated backups
4. Configure IP whitelist with server IP only
5. Use strong database passwords

### Environment Variables for Production
```bash
DATABASE_URL="mongodb+srv://prod-user:strong-password@prod-cluster.mongodb.net/hookha-shop?retryWrites=true&w=majority"
NEXTAUTH_SECRET="long-random-secret-key"
NEXT_PUBLIC_SITE_URL="https://hookha-shop.com"
```

## Monitoring & Optimization

- Use MongoDB Atlas Charts for analytics
- Monitor connection pool usage
- Review slow query logs
- Create indexes for frequently queried fields
- Use Prisma query optimization

## References

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/reference/database-reference/mongodb)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-checklist/)
