from lib.common.abc import Vulnerability


class LocalFileInclusion(Vulnerability):

    name = 'LOCAL FILE INCLUSION'
    keyname = 'lfi'

    def __init__(self, file_path):
        super().__init__(file_path)

    def find(self):
        return self._find(r'(include|require|require_once)\(.*[\$].+\)|(\s+|^)(\$_(GET|POST)\[("|\')(path|filepath|filename|image|imagename)("|\')\])')
