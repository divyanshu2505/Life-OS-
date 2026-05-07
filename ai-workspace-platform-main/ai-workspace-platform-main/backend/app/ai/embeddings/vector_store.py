class VectorStore:
    def __init__(self):
        self.vectors = []

    def add(self, item, vector):
        self.vectors.append((item, vector))
