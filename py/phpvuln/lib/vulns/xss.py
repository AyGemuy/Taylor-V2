import re

from lib.common.abc import Vulnerability


class XSS(Vulnerability):

    name = 'CROSS-SITE SCRIPTING (XSS)'
    keyname = 'xss'

    def __init__(self, file_path):
        super().__init__(file_path)

    def find(self):
        return self._find(r'<.+>.*(\'|").*(\$[a-zA-Z0-9_]+).*(\'|").*</.+>|<.*(\'|").*<\?php.*(\$[a-zA-Z0-9_]+).*(\'|").*>', False)

    def __is_user_input(self, field):
        for line in self.get_lines():

            if re.search(r'_(GET|POST|DELETE|PUT|PATCH|OPTIONS)\[(.*)%s.*\]' % field, line):
                return True

        return False
