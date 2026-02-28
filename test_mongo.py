import langchain_community
import pkgutil

print("Checking langchain_community for mongo...")
for importer, modname, ispkg in pkgutil.walk_packages(langchain_community.__path__, langchain_community.__name__ + "."):
    if "mongo" in modname.lower():
        print(modname)
