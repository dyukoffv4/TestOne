class Connect:
    def __init__(self, *args: str):
        self.__connections = {i: 0 for i in args}
    
    def attach(self, user: str):
        if self.__connections.get(user) == None or self.__connections[user] == 0:
            self.__connections[user] = 1
            return True
        return False

    def detach(self, user: str):
        if self.__connections.get(user) != None and self.__connections[user] == 1:
            self.__connections[user] = 0
            return True
        return False
    
    def getAllUsers(self):
        return self.__connections
    
    def getAttachedUsers(self):
        return [i[0] for i in self.__connections.items() if i[1] == 1]
    
    def getDetachedUsers(self):
        return [i[0] for i in self.__connections.items() if i[1] == 0]
