class WSManager:
    def __init__(self):
        self.clients = []

    async def connect(self, ws):
        self.clients.append(ws)

    async def disconnect(self, ws):
        self.clients.remove(ws)
