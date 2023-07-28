# from PIL import Image 
# from IPython.display import display 
import random
import json
import os

# Each image is made up a series of traits
# The weightings for each trait drive the rarity and add up to 100%

isItem = ["Item", "Dummy"]
isItem_weights = [90, 10]

hpBoost = ["None", "20", "40", "50", "70", "90", "100"]
hpBoost_weights = [35, 35, 15, 8, 4, 2, 1]

apBoost = ["None", "20", "40", "50", "70", "90", "100"]
apBoost_weights = [35, 35, 15, 8, 4, 2, 1]

speedBoost = ["None", "20", "40", "50", "70", "90", "100"]
speedBoost_weights = [35, 35, 15, 8, 4, 2, 1]

### Potion Traits
potionType = ["Jewelweed", "Cactus", "Groot", "Bioglow", "Hellebore", "Beanstalk", "Duckweed", "PixieDust", "Shrooms"]
potionType_weights = [17, 17, 16, 13, 13, 11, 11, 1, 1]

# Generate Potion Traits
TOTAL_POTIONS = 5 # Number of random unique potions we want to generate
all_potions = [] 
def create_new_potion():
    new_potion = {} 
    # For each trait category, select a random trait based on the weightings 
    # new_potion ["Item"] = random.choices(isItem, isItem_weights)[0]
    new_potion ["Type"] = random.choices(potionType, potionType_weights)[0]
    new_potion ["HpBoost"] = random.choices(hpBoost, hpBoost_weights)[0]
    new_potion ["ApBoost"] = random.choices(apBoost, apBoost_weights)[0]
    new_potion ["SpeedBoost"] = random.choices(speedBoost, speedBoost_weights)[0]
    
    if new_potion in all_potions:
        return create_new_potion()
    else:
        return new_potion
    
# Generate the unique combinations based on trait weightings
for i in range(TOTAL_POTIONS): 
    new_trait_potion = create_new_potion()
    all_potions.append(new_trait_potion)

### Weapon Traits

weaponType = ["Sword", "Scythe", "Axe", "Sabre", "Bow and Arrow", "Grenade", "Crossbow", "Machine Gun", "Nuclear Bomb", "Natural Disasters"]
weaponType_weights = [15, 15, 15, 15, 12, 12, 7, 7, 1, 1]


# Generate Weapon Traits
TOTAL_WEAPONS = 5 # Number of random unique potions we want to generate
all_weapons = [] 
def create_new_weapon():
    new_weapon = {} 
    # For each trait category, select a random trait based on the weightings 
    # new_weapon ["Item"] = random.choices(isItem, isItem_weights)[0]
    new_weapon ["Type"] = random.choices(weaponType, weaponType_weights)[0]
    new_weapon ["HpBoost"] = random.choices(hpBoost, hpBoost_weights)[0]
    new_weapon ["ApBoost"] = random.choices(apBoost, apBoost_weights)[0]
    new_weapon ["SpeedBoost"] = random.choices(speedBoost, speedBoost_weights)[0]
    
    if new_weapon in all_weapons:
        return create_new_weapon()
    else:
        return new_weapon
    
# Generate the unique combinations based on trait weightings
for i in range(TOTAL_WEAPONS): 
    new_trait_weapon = create_new_weapon()
    all_weapons.append(new_trait_weapon)

# Returns true if all items are unique
def all_items_unique(all_items):
    seen = list()
    return not any(i in seen or seen.append(i) for i in all_items)

print("Are all potions unique?", all_items_unique(all_potions))
print("Are all weapons unique?", all_items_unique(all_weapons))

# Add token Id to each image
for i in range(len(all_potions)):
    all_potions[i]["tokenId"] = i+1
   
print(all_potions)

for i in range(len(all_weapons)):
    all_weapons[i]["tokenId"] = i+1
   
print(all_weapons)


#### Generate Metadata for all Traits 
os.mkdir(f'./metadata-items')
os.mkdir(f'./metadata-items/potions')
os.mkdir(f'./metadata-items/weapons')
METADATA_FILE_NAME = './metadata-items/potions/all-potion-traits.json'; 
with open(METADATA_FILE_NAME, 'w') as outfile:
    json.dump(all_potions, outfile, indent=4)
    
METADATA_FILE_NAME = './metadata-items/weapons/all-weapon-traits.json'; 
with open(METADATA_FILE_NAME, 'w') as outfile:
    json.dump(all_weapons, outfile, indent=4)


#### Generate Images
from PIL import Image 

#code below for when the images are created
'''
os.mkdir(f'./images')

for item in all_images:
    im1 = Image.open(f'../assets/images/character/body.png').convert('RGBA')
    im2 = Image.open(f'../assets/images/character/{[item["Element"]]}.png').convert('RGBA')
    im3 = Image.open(f'../assets/images/character/{[item["Type"]]}.png').convert('RGBA')
    im4 = Image.open(f'../assets/images/character/{[item["EyeLeftC"] ]}.png').convert('RGBA')
    im5 = Image.open(f'../assets/images/character/{[item["EyeLeftE"]]}.png').convert('RGBA')
    im6 = Image.open(f'../assets/images/character/{[item["EyeRightC"]]}.png').convert('RGBA')
    im7 = Image.open(f'../assets/images/character/{[item["EyeRightE"]]}.png').convert('RGBA')
    im8 = Image.open(f'../assets/images/character/{[item["Blush"]]}.png').convert('RGBA')

    #Create each composite
    com1 = Image.alpha_composite(im1, im2)
    com2 = Image.alpha_composite(com1, im3)
    com3 = Image.alpha_composite(com2, im4)
    com4 = Image.alpha_composite(com3, im5)
    com5 = Image.alpha_composite(com4, im6)   
    com6 = Image.alpha_composite(com5, im7)
    comFinal = Image.alpha_composite(com6, im8)          

    #Convert to RGB
    rgb_im = com5.convert('RGB')
    file_name = str(item["tokenId"]) + ".png"
    rgb_im.save("./images/" + file_name)
'''