# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import Knowledge_base, network

app = FastAPI(title="Gene Interaction Network API")



# 🔥 Allow CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include routers
app.include_router(network.router, prefix="/network", tags=["Gene Network"])
app.include_router(Knowledge_base.router2, prefix="/drug_info", tags=["Drugs Information"])

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to Gene Interaction Network API"}
