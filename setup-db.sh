#!/bin/bash
# ===========================================
# PostgreSQL Database Setup Script
# Run this once: sudo bash setup-db.sh
# ===========================================

echo "🔧 Setting up PostgreSQL for Ecommerce Web Design..."

# Create the sinnan role if it doesn't exist
sudo -u postgres psql -c "DO \$\$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'sinnan') THEN
    CREATE ROLE sinnan WITH LOGIN SUPERUSER PASSWORD 'password';
  END IF;
END \$\$;"

echo "✅ Role 'sinnan' created/verified"

# Create the database if it doesn't exist
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'ecommerce_db'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE DATABASE ecommerce_db OWNER sinnan"

echo "✅ Database 'ecommerce_db' created/verified"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO sinnan"

echo "✅ Privileges granted"

# Update pg_hba.conf to allow password auth for local connections
PG_HBA=$(sudo -u postgres psql -t -c "SHOW hba_file" | xargs)
if ! sudo grep -q "local.*ecommerce_db.*sinnan.*md5" "$PG_HBA" 2>/dev/null; then
  # Add auth rule before the first "local" line
  sudo sed -i "/^local.*all.*all.*peer/i local   ecommerce_db   sinnan   md5" "$PG_HBA"
  sudo systemctl reload postgresql
  echo "✅ pg_hba.conf updated, PostgreSQL reloaded"
else
  echo "✅ pg_hba.conf already configured"
fi

echo ""
echo "🎉 Database setup complete! Now run:"
echo "   cd $(pwd)"
echo "   npm run seed"
echo "   npm run dev:all"
