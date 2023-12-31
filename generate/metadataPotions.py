#### Generate Metadata for each Image    
import random
import json
import os

f = open('./metadata-items/potions/all-potion-traits.json',) 
data = json.load(f)

# Changes this IMAGES_BASE_URL to yours 
# IMAGES_BASE_URL = "https://gateway.pinata.cloud/ipfs/Qmb86L8mUphwJGzLPwXNTRiK1S4scBdj9cc2Sev3s8uLiB/"
PROJECT_NAME = "EcoItems"
IMAGES_BASE_URI = "ipfs://"
def getAttribute(key, value):
    return {
        "trait_type": key,
        "value": value
    }
for i in data:
    token_id = i['tokenId']
    token = {
        "image": IMAGES_BASE_URI,
        "tokenId": token_id,
        "name": PROJECT_NAME + ' ' + str(token_id),
        "attributes": []
    }
    token["attributes"].append(getAttribute("Type", i["Type"]))
    token["attributes"].append(getAttribute("HpBoost", i["HpBoost"]))
    token["attributes"].append(getAttribute("ApBoost", i["ApBoost"]))
    token["attributes"].append(getAttribute("SpeedBoost", i["SpeedBoost"]))

    with open('./metadata-items/potions/' + str(token_id) + ".json", 'w') as outfile:
        json.dump(token, outfile, indent=4)
f.close()