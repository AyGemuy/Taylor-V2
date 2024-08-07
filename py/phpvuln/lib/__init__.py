import os

from colorama import Fore
from colorama import init

__version__ = '0.1.2'

if os.name == 'nt':
    init(convert=True)