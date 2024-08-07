import os
import sys
import inspect
import importlib


from lib.common.abc import Vulnerability

# path to the directory
# where our common vulnerability subclasses are located
vulnerability_classes_path = os.path.join('lib', 'vulns')


def sys_to_mod_path(*args):
    """ Convert system file path to Python module path

    Converts a system file path to
    Python module path for dynamic importing.

    Returns:
        str: Python module path
    """
    return os.path.join(*[x[:-3] if x.endswith('.py') else x for x in args]).replace(os.path.sep, '.')


def get_vulnerability_classes():
    """ Returns common vulnerability classes

    Returns:
        list: list of common vulnerability classes
    """
    items = os.listdir(vulnerability_classes_path)
    items.remove('__init__.py')

    classes = []

    for item in items:
        if not item.endswith('.py'):
            continue

        module_name = sys_to_mod_path(vulnerability_classes_path, item)

        if not importlib.import_module(module_name):
            continue

        for _, Class in inspect.getmembers(sys.modules[module_name], inspect.isclass):
            if issubclass(Class, Vulnerability) and Class != Vulnerability:
                classes.append(Class)

    return classes
