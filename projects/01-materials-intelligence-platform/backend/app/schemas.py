from typing import List, Optional
from pydantic import BaseModel, Field

class MechanicalProperties(BaseModel):
    tensile_modulus_mpa: float = Field(..., description="Tensile modulus according to ISO 527 in MPa")
    tensile_strength_mpa: float = Field(..., description="Tensile strength in MPa")
    elongation_at_break_pct: float = Field(..., description="Elongation at break in %")
    charpy_impact_kj_m2: Optional[float] = Field(None, description="Charpy notched impact strength in kJ/m² (ISO 179)")
    shore_hardness_d: Optional[int] = Field(None, description="Shore D hardness")

class ThermalProperties(BaseModel):
    melt_temperature_c: float = Field(..., description="Melting temperature in Celsius")
    hdt_a_c: Optional[float] = Field(None, description="Heat Deflection Temp at 1.8 MPa (ISO 75)")
    flammability_ul94: Optional[str] = Field("V-0", description="UL94 Flammability rating")

class Material(BaseModel):
    id: str = Field(..., description="Unique Material Code e.g. MAT-PC-001")
    trade_name: str = Field(..., description="Trade/Commercial Name e.g. Makrolon 2805")
    polymer_family: str = Field(..., description="Polymer category (Polycarbonate, TPU, Polyamide, etc.)")
    filler_type: Optional[str] = Field("Unfilled", description="Glass Fiber, Carbon Fiber, Mineral, etc.")
    filler_percentage: float = Field(0.0, description="Filler percentage by weight")
    density_g_cm3: float = Field(..., description="Density in g/cm³")
    mechanical: MechanicalProperties
    thermal: ThermalProperties
    reach_compliant: bool = True
    rohs_compliant: bool = True
    applications: List[str] = Field(default_factory=list)
    created_by: str = "R&D Lead"
    version: int = 1

class MaterialFilter(BaseModel):
    polymer_family: Optional[str] = None
    min_tensile_modulus: Optional[float] = None
    max_tensile_modulus: Optional[float] = None
    flammability: Optional[str] = None
    search_query: Optional[str] = None
