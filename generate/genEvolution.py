#### Generate Evolution given Character
import random
import json
import os
#file of existing nft 
def evolve (file, evolution):
    f = open(file) 
    data = json.load(f)
    newEvolution = {}
    newEvolution ["EyeLeftC"] = data["EyeLeftC"]
    newEvolution ["EyeLeftE"] = data["EyeLeftE"]
    newEvolution ["EyeRightC"] = data ["EyeRightC"]
    newEvolution ["EyeRightE"] = data ["EyeRightE"]
    newEvolution ["Element"] = data ["Element"]
    newEvolution ["Type"] = data ["Type"]
    newEvolution ["Blush"] = data ["Blush"]
    
    
    
    
