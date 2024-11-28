import re

from lib.common.abc import Vulnerability


class Interesting(Vulnerability):

    name = 'REMOTE FILE INCLUSION'
    keyname = 'rfi'

    def __init__(self, file_path):
        super().__init__(file_path)

    def find(self):
        vulns = []

        for code, no, match in self._find(r'(\$_(GET|POST)\[("|\')(file|image)("|\')\])', False):
            vulns.append((code, no, match))

        return vulns
