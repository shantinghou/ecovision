# from PIL import Image 
# from IPython.display import display 
import random
import json
import os

# Each image is made up a series of traits
# The weightings for each trait drive the rarity and add up to 100%

eyeLeftC = ["Black", "Blue", "Red", "Green"]
eyeLeftC_weights = [55, 15, 10, 20]

eyeRightC = ["Black", "Blue", "Red", "Green"]
eyeRightC_weights = [55, 15, 10, 20]

eyeLeftE = ["Closed", "Round", "Oval", "Wink"]
eyeLeftE_weights = [20, 30, 40, 10]

eyeRightE = ["Closed", "Round", "Oval", "Wink"]
eyeRightE_weights = [20, 30, 40, 10]

element = ["Air", "Water", "Earth", "Fire"]
element_weights = [25, 25, 25, 25]

type = ["Original", "Fierce", "Elegant", "Calm"]
type_weights = [60, 7, 13, 20]

blush = ["Pink", "Purple", "Red", "Orange"]
mouth_weights = [25, 10, 15, 50]

# Generate Traits

TOTAL_IMAGES = 10 # Number of random unique images we want to generate

all_images = [] 

# A recursive function to generate unique image combinations
def create_new_image():
    
    new_image = {} 

    # For each trait category, select a random trait based on the weightings 
    new_image ["EyeLeftC"] = random.choices(eyeLeftC, eyeLeftC_weights)[0]
    new_image ["EyeLeftE"] = random.choices(eyeLeftE, eyeLeftE_weights)[0]
    new_image ["EyeRightC"] = random.choices(eyeRightC, eyeRightC_weights)[0]
    new_image ["EyeRightE"] = random.choices(eyeRightE, eyeRightE_weights)[0]
    new_image ["Element"] = random.choices(element, element_weights)[0]
    new_image ["Type"] = random.choices(type, type_weights)[0]
    new_image ["Blush"] = random.choices(type, type_weights)[0]
    
    if new_image in all_images:
        return create_new_image()
    else:
        return new_image
    
# Generate the unique combinations based on trait weightings
for i in range(TOTAL_IMAGES): 
    new_trait_image = create_new_image()
    all_images.append(new_trait_image)

# Returns true if all images are unique
def all_images_unique(all_images):
    seen = list()
    return not any(i in seen or seen.append(i) for i in all_images)

print("Are all images unique?", all_images_unique(all_images))

# Add token Id to each image
for i in range(len(all_images)):
    all_images[i]["tokenId"] = i+1
   
print(all_images)


#### Generate Metadata for all Traits 
os.mkdir(f'./metadata')

METADATA_FILE_NAME = './metadata/all-traits.json'; 
with open(METADATA_FILE_NAME, 'w') as outfile:
    json.dump(all_images, outfile, indent=4)