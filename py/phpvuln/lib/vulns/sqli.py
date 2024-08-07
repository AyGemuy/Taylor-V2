from lib.common.abc import Vulnerability


class SQLInjection(Vulnerability):

    name = 'SQL INJECTION'
    keyname = 'sqli'

    def __init__(self, file_path):
        super().__init__(file_path)

    def find(self):
        return self._find(r'(mysqli?_|\->)query\(("|\').*[\$].+("|\')\)', False)
