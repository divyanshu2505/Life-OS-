async def echo_handler(ws, data):
    await ws.send_json({'echo': data})
