//! Rheology Core: High-Performance ISO 527 Mechanics & Numerical Invariant Engine
//! Built for both Native and WebAssembly (WASM) execution.

pub mod iso527;

pub use iso527::{compute_youngs_modulus, compute_fracture_toughness, analyze_curve, TensileInvariants};
use wasm_bindgen::prelude::*;

// -----------------------------------------------------------------------------
// Native C-ABI Exports (for Python ctypes / High-Speed SIMD Backend)
// -----------------------------------------------------------------------------
#[repr(C)]
pub struct CRheologyResult {
    pub youngs_modulus_mpa: f64,
    pub tensile_strength_mpa: f64,
    pub strain_at_peak_pct: f64,
    pub elongation_at_break_pct: f64,
    pub toughness_mj_m3: f64,
    pub status_code: i32,
}

#[no_mangle]
pub unsafe extern "C" fn rust_compute_tensile_invariants(
    strain_ptr: *const f64,
    stress_ptr: *const f64,
    len: usize,
    out: *mut CRheologyResult,
) -> i32 {
    if strain_ptr.is_null() || stress_ptr.is_null() || out.is_null() || len < 4 {
        return -1;
    }
    let strain_slice = std::slice::from_raw_parts(strain_ptr, len);
    let stress_slice = std::slice::from_raw_parts(stress_ptr, len);

    match analyze_curve(strain_slice, stress_slice) {
        Ok(res) => {
            (*out).youngs_modulus_mpa = res.youngs_modulus_mpa;
            (*out).tensile_strength_mpa = res.tensile_strength_mpa;
            (*out).strain_at_peak_pct = res.strain_at_yield_or_peak_pct;
            (*out).elongation_at_break_pct = res.elongation_at_break_pct;
            (*out).toughness_mj_m3 = res.toughness_mj_m3;
            (*out).status_code = 0;
            0
        }
        Err(_) => {
            (*out).status_code = -1;
            -1
        }
    }
}

// -----------------------------------------------------------------------------
// WebAssembly (WASM) Entrypoints (for Next.js Browser Client Execution)
// -----------------------------------------------------------------------------
#[wasm_bindgen]
pub fn wasm_analyze_curve(strain_json: &str, stress_json: &str) -> Result<String, JsValue> {
    let strain: Vec<f64> = serde_json::from_str(strain_json)
        .map_err(|e| JsValue::from_str(&format!("Invalid strain vector JSON: {}", e)))?;
    let stress: Vec<f64> = serde_json::from_str(stress_json)
        .map_err(|e| JsValue::from_str(&format!("Invalid stress vector JSON: {}", e)))?;

    let result = analyze_curve(&strain, &stress)
        .map_err(|e| JsValue::from_str(&e))?;

    serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}

/// WebAssembly Fast Modulus Solver
#[wasm_bindgen]
pub fn wasm_compute_modulus(strain_json: &str, stress_json: &str) -> Result<f64, JsValue> {
    let strain: Vec<f64> = serde_json::from_str(strain_json)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let stress: Vec<f64> = serde_json::from_str(stress_json)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    compute_youngs_modulus(&strain, &stress)
        .map_err(|e| JsValue::from_str(&e))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_polycarbonate_tensile_curve() {
        let strain = vec![0.0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.50, 1.0, 2.0, 5.0, 10.0, 20.0];
        let stress = vec![0.0, 1.2, 2.4, 3.6, 4.8, 6.0, 11.5, 21.8, 38.2, 62.5, 64.2, 58.0];

        let res = analyze_curve(&strain, &stress).expect("Failed to analyze curve");
        
        // Young's modulus should be (6.0 - 1.2) / (0.0025 - 0.0005) = 4.8 / 0.002 = 2400.0 MPa
        assert_eq!(res.youngs_modulus_mpa, 2400.0);
        assert_eq!(res.tensile_strength_mpa, 64.2);
        assert_eq!(res.elongation_at_break_pct, 20.0);
        assert!(res.toughness_mj_m3 > 5.0);
    }

    #[test]
    fn test_short_vector_error() {
        let strain = vec![0.0, 0.1];
        let stress = vec![0.0, 1.0];
        assert!(analyze_curve(&strain, &stress).is_err());
    }
}
