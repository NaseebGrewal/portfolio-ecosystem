import sys
from pathlib import Path

# Ensure backend root is on sys.path for Vercel serverless execution
backend_root = Path(__file__).parent.parent
if str(backend_root) not in sys.path:
    sys.path.insert(0, str(backend_root))

from app.main import app
