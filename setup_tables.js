const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://mitpvuvaihjkvcxvsvzg.supabase.co";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdHB2dXZhaWhqa3ZjeHZzdnpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTE2MzY2MywiZXhwIjoyMTAwNzM5NjYzfQ.RjQT4Jt7hVYV3-6D0nAH_J4XPO6tNjseWwHwFktpcNk";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setup() {
  console.log("Checking storage bucket 'media'...");
  const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
  console.log("Existing buckets:", buckets, bErr);

  const mediaBucketExists = buckets && buckets.some((b) => b.name === "media");
  if (!mediaBucketExists) {
    const { data: bRes, error: createBErr } = await supabase.storage.createBucket(
      "media",
      { public: true }
    );
    console.log("Created media bucket:", bRes, createBErr);
  } else {
    console.log("Media bucket already exists.");
  }
}

setup();
