class StorageError(Exception):
    def __init__(self, code: str, message: str):
        super().__init__(message)
        self.code: str = code

class Storage:
    def __init__(self, *args: tuple[str]):
        self.__storage = {i[0]: {'message': i[1], 'password': i[2]} for i in args}

    def put(self, title: str, message: str, password: str = None):
        if title is None:
            raise StorageError('ARGS.WRONG', 'Null title was given!')
        if self.__storage.__contains__(title):
            raise StorageError('TITLE.EXIST', f'Title "{title}" is using already!')
        self.__storage[title] = {'password': password, 'message': message}

    def get(self, title: str, password: str = None):
        if title is None:
            raise StorageError('ARGS.WRONG', 'Null title was given!')
        if not self.__storage.__contains__(title):
            raise StorageError('TITLE.NOT.EXIST', f'Title "{title}" do not exist!')
        if (self.__storage[title]['password'] is not None) and password != self.__storage[title]['password']:
            raise StorageError('PASSWORD.WRONG', f'Wrong password for Title "{title}"!')
        return self.__storage.pop(title)['message']
