const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Granting table permissions and disabling RLS for Supabase PostgREST...");
  try {
    const tables = ['users', 'links', 'social_media', 'link_blocks', 'stats', 'plans'];
    
    for (const table of tables) {
      console.log(`Disabling RLS on ${table}...`);
      await prisma.$executeRawUnsafe(`ALTER TABLE public."${table}" DISABLE ROW LEVEL SECURITY;`);
      
      console.log(`Granting permissions on ${table}...`);
      await prisma.$executeRawUnsafe(`GRANT ALL ON TABLE public."${table}" TO anon, authenticated, service_role;`);
    }
    
    console.log("SUCCESS: All Supabase table permissions granted and RLS disabled!");
  } catch (err) {
    console.error("Error executing fix_rls:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
