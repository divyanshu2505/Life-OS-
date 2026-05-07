from fastapi import FastAPI

app = FastAPI(title="AI Workspace Platform API (skeleton)")


@app.get("/")
async def root():
    return {"message": "AI Workspace Platform Backend - Skeleton"}
