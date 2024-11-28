import os
import sys
import argparse

from colorama import Fore

from lib.core.banner import BANNER
from lib.core import utils
from lib.core import log

# globals
found = 0

def main():
    vuln_classes = utils.get_vulnerability_classes()
    vulns_list = [(_class.name, _class.keyname) for _class in vuln_classes]

    print(BANNER)

    parser = argparse.ArgumentParser(usage='%(prog)s [options]')

    parser.error = log.error

    parser.add_argument('-p', '--path', help='php project path', dest='path', metavar='')
    parser.add_argument('-f', '--file', help='specific file to check', dest='file', metavar='')
    parser.add_argument('-v', '--vulns', help='common vulnerabilities to look for. Default: all', dest='included', metavar='', default=','.join(x[1] for x in vulns_list))
    parser.add_argument('--exclude', help='exclude common vulnerabilities', dest='excluded', metavar='')
    parser.add_argument('--list-vulns', help='list common vulnerabilities', dest='list_vulns', action='store_true')

    args = parser.parse_args()

    if len(sys.argv) < 2:
        parser.print_usage()
        exit()

    if args.list_vulns:
        print('list of valid vulnerabilities:')
        print('\n'.join(f' {Fore.YELLOW}{x[1]:<8}{Fore.RESET}{x[0]}' for x in vulns_list))
        exit(0)

    if not args.path and not args.file:
        log.error('missing mandatory option: -p/--path or -f/--file')

    if args.path:
        args.file = None

        if not os.path.exists(args.path) or not os.path.isdir(args.path):
            log.error('directory not found')
    else:
        if not os.path.exists(args.file) or not os.path.isfile(args.file) or not args.file.endswith('.php') and not args.file.endswith('.html'):
            log.error('php file not found')

    if not args.included:
        log.error('no vulnerabilities to check is selected')

    included_vulns = args.included.lower().split(',')
    excluded_vulns = args.excluded.lower().split(',') if args.excluded else []
    
    for vuln in excluded_vulns:
        if not [_class for _class in vuln_classes if _class.keyname == vuln]:
            log.error(f'unrecognized common vulnerability: {vuln}')
            exit(0)
        included_vulns.remove(vuln)
    
    for vuln in included_vulns:
        if not [_class for _class in vuln_classes if _class.keyname == vuln]:
            log.error(f'unrecognized common vulnerability: {vuln}')
            exit(0)

    global found

    if args.path:
        for root, _, directory in os.walk(args.path):
            for file in directory:
                if not file.endswith('.php') and not file.endswith('.html'):
                    continue

                file_path = os.path.join(root, file)

                for vuln in included_vulns:
                    Vulnerability = [_class for _class in vuln_classes if _class.keyname == vuln][0]

                    vuln_obj = Vulnerability(file_path)

                    for line, no, vuln_part in vuln_obj.find():
                        while line.endswith(' '):
                            line = line[:-1]
                        log.found(file_path, line, no, vuln_part, vuln_obj.name)
                        found += 1
    else:
        for vuln in included_vulns:
            Vulnerability = [_class for _class in vuln_classes if _class.keyname == vuln][0]

            vuln_obj = Vulnerability(args.file)

            for line, no, vuln_part in vuln_obj.find():
                while line.endswith(' '):
                    line = line[:-1]
                log.found(args.file, line, no, vuln_part, vuln_obj.name)
                found += 1

    if found > 0:
        log.info(f'phpvuln finished with {Fore.GREEN}{found} {Fore.RESET}potential vulnerabilit{"y" if found == 1 else "ies"} found')
    else:
        log.info(f'phpvuln finished, but no potential vulnerabilities were found')


if __name__ == '__main__':
    main()
