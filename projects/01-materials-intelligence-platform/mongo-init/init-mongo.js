// ==============================================================================
// MongoDB Initialization Script (Executed automatically on container creation)
// ==============================================================================

db = db.getSiblingDB("materials_db");

// Create dedicated application user with readWrite permissions
db.createUser({
  user: "matdb_app_user",
  pwd: "matdb_secure_password_2026",
  roles: [
    {
      role: "readWrite",
      db: "materials_db"
    }
  ]
});

// Create collections and unique indexes
db.createCollection("materials");
db.materials.createIndex({ id: 1 }, { unique: true });
db.materials.createIndex({ polymer_family: 1 });
db.materials.createIndex({ "mechanical.tensile_modulus_mpa": 1 });

// Insert Initial Seed Dataset directly on container creation
db.materials.insertMany([
  {
    id: "MAT-PC-101",
    trade_name: "Makroblend Polycarb High-Flow",
    polymer_family: "Polycarbonate (PC)",
    filler_type: "Unfilled",
    filler_percentage: 0.0,
    density_g_cm3: 1.20,
    mechanical: {
      tensile_modulus_mpa: 2400.0,
      tensile_strength_mpa: 66.0,
      elongation_at_break_pct: 115.0,
      charpy_impact_kj_m2: 75.0,
      shore_hardness_d: 85
    },
    thermal: {
      melt_temperature_c: 285.0,
      hdt_a_c: 132.0,
      flammability_ul94: "V-0"
    },
    reach_compliant: true,
    rohs_compliant: true,
    applications: ["Automotive Lighting", "EV Battery Housings", "Medical Diagnostics"],
    created_by: "R&D Scientist Dr. Müller",
    version: 1
  },
  {
    id: "MAT-PA66-204",
    trade_name: "Durethan High-Strength GF30",
    polymer_family: "Polyamide 66 (PA66)",
    filler_type: "Glass Fiber",
    filler_percentage: 30.0,
    density_g_cm3: 1.36,
    mechanical: {
      tensile_modulus_mpa: 9500.0,
      tensile_strength_mpa: 175.0,
      elongation_at_break_pct: 3.8,
      charpy_impact_kj_m2: 11.0,
      shore_hardness_d: 90
    },
    thermal: {
      melt_temperature_c: 260.0,
      hdt_a_c: 235.0,
      flammability_ul94: "HB"
    },
    reach_compliant: true,
    rohs_compliant: true,
    applications: ["Under-the-Hood Structural", "Gear Housings", "Industrial Valves"],
    created_by: "Senior Materials Engineer",
    version: 2
  },
  {
    id: "MAT-TPU-309",
    trade_name: "Desmopan Bio-Circular Thermoplastic",
    polymer_family: "Thermoplastic Polyurethane (TPU)",
    filler_type: "Bio-based Carbon",
    filler_percentage: 15.0,
    density_g_cm3: 1.18,
    mechanical: {
      tensile_modulus_mpa: 650.0,
      tensile_strength_mpa: 42.0,
      elongation_at_break_pct: 480.0,
      charpy_impact_kj_m2: 120.0,
      shore_hardness_d: 55
    },
    thermal: {
      melt_temperature_c: 210.0,
      hdt_a_c: 78.0,
      flammability_ul94: "V-2"
    },
    reach_compliant: true,
    rohs_compliant: true,
    applications: ["Flexible Wearables", "Industrial Sealings", "Athletic Footwear"],
    created_by: "Sustainability Lab Lead",
    version: 1
  }
]);

print("Successfully initialized materials_db with user 'matdb_app_user' and pre-seeded materials.");
