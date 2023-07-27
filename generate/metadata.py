#### Generate Metadata for each Image    
import random
import json
import os

f = open('./metadata/all-traits.json',) 
data = json.load(f)

# Changes this IMAGES_BASE_URL to yours 
# IMAGES_BASE_URL = "https://gateway.pinata.cloud/ipfs/Qmb86L8mUphwJGzLPwXNTRiK1S4scBdj9cc2Sev3s8uLiB/"
PROJECT_NAME = "E-Avatar"

def getAttribute(key, value):
    return {
        "trait_type": key,
        "value": value
    }
for i in data:
    token_id = i['tokenId']
    token = {
        # "image": IMAGES_BASE_URL + str(token_id) + '.png',
        "tokenId": token_id,
        "name": PROJECT_NAME + ' ' + str(token_id),
        "attributes": []
    }
    token["attributes"].append(getAttribute("EyeLeftC", i["EyeLeftC"]))
    token["attributes"].append(getAttribute("EyeLeftE", i["EyeLeftE"]))
    token["attributes"].append(getAttribute("EyeRightC", i["EyeRightC"]))
    token["attributes"].append(getAttribute("EyeRightE", i["EyeRightE"]))
    token["attributes"].append(getAttribute("Element", i["Element"]))
    token["attributes"].append(getAttribute("Type", i["Type"]))
    token["attributes"].append(getAttribute("Blush", i["Blush"]))

    with open('./metadata/' + str(token_id) + ".json", 'w') as outfile:
        json.dump(token, outfile, indent=4)
f.close()