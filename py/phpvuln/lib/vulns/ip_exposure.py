import ipaddress

from lib.common.abc import Vulnerability


class IPExposure(Vulnerability):

    name = 'IP EXPOSURE'
    keyname = 'ips'

    def __init__(self, file_path):
        super().__init__(file_path)

    def find(self):
        vulns = []

        for code, line_no, match in self._find(r'("|\')[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}("|\')'):
            ip = match[1:-1]

            if ipaddress.IPv4Address(ip).is_private:
                continue

            vulns.append((code, line_no, match))

        return vulns
