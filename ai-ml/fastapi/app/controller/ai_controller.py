    # controller/ai_controller.py
    
import torch
from torchvision import transforms, models
from PIL import Image
import tensorflow as tf
import numpy as np
import cv2
from app.controller.labels import labels
import torch.nn as nn


from pydantic import BaseModel
def print_hello():
    print("Hello from AI Controller!")
    return {"hello world "}




class Person(BaseModel):
    name:str
    age:int

# def getperson(person:Person):
#     return {"helo"}


def getperson(person: Person):
    return {"message": f"Hello {person.name}, age {person.age}"}



                
def detectDisease(image_path: str):
    class_names = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___healthy', 'Cherry_(including_sour)___Powdery_mildew',
    'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___healthy',
    'Corn_(maize)___Northern_Leaf_Blight', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)','Grape___healthy',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight', 'Raspberry___healthy',
    'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___healthy', 'Strawberry___Leaf_scorch',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites_Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus'
    ]


    

    disease_info = {
    "Apple___Apple_scab": {
        "Plant": "Apple",
        "Symptoms": "Olive-green or brown spots on leaves and fruit",
        "Warning": "Fungal disease caused by Venturia inaequalis",
        "Solution": (
            "Apply recommended fungicides according to local agricultural guidelines early in the season and continue at intervals "
            "to prevent disease spread. Regularly remove and destroy fallen leaves and infected fruit to reduce fungal spores in the environment. "
            "Prune trees to improve air circulation and sunlight penetration, which helps lessen conditions favorable for fungal growth. "
            "Maintain proper irrigation practices to avoid excess leaf wetness."
        )
    },
    "Apple___Black_rot": {
        "Plant": "Apple",
        "Symptoms": "Dark, sunken lesions on fruit; leaf spots",
        "Warning": "Fungal disease caused by Botryosphaeria obtusa",
        "Solution": (
            "Remove and destroy all infected fruits and leaf debris to minimize sources of infection. Use fungicides labeled for black rot management during "
            "the growing season, especially in wet conditions. Prune out and remove affected limbs promptly and disinfect pruning tools after use. "
            "Maintain adequate tree spacing to improve airflow."
        )
    },
    "Apple___Cedar_apple_rust": {
        "Plant": "Apple",
        "Symptoms": "Yellow-orange leaf spots with red borders",
        "Warning": "Fungal disease spread from cedar trees",
        "Solution": (
            "Remove nearby cedar trees within a 1-2 mile radius to reduce the source of spores. Apply fungicides beginning at pink bud and continue through "
            "the growing season as recommended. Prune and destroy affected leaves and branches to decrease inoculum sources. Maintain good orchard sanitation."
        )
    },
    "Apple___healthy": {
        "Plant": "Apple",
        "Symptoms": "No visible signs of disease",
        "Warning": "Healthy",
        "Solution": (
            "Maintain good orchard sanitation by removing fallen leaves and debris. Practice proper pruning to enhance air circulation. "
            "Provide balanced fertilization and irrigation tailored to apple trees. Monitor regularly for pests and diseases and act promptly if symptoms occur."
        )
    },
    "Blueberry___healthy": {
        "Plant": "Blueberry",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Maintain soil pH between 4.5 and 5.5 for optimal growth. Ensure proper and consistent watering, especially during fruit development. "
            "Regularly mulch to conserve moisture and control weeds. Monitor plants for signs of pests or diseases and manage promptly."
        )
    },
    "Cherry_(including_sour)___healthy": {
        "Plant": "Cherry",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Maintain routine care including proper pruning to increase light penetration and airflow. Implement regular pest monitoring and control measures as needed. "
            "Provide adequate fertilization and irrigation according to growth stage and local guidelines."
        )
    },
    "Cherry_(including_sour)___Powdery_mildew": {
        "Plant": "Cherry",
        "Symptoms": "White powdery fungal growth on leaves and shoots",
        "Warning": "Fungal disease favored by humid conditions",
        "Solution": (
            "Apply sulfur-based fungicides early at bud swell and repeat at label intervals during the growing season. Improve air circulation by pruning dense growth. "
            "Avoid overhead irrigation to reduce leaf moisture. Remove and destroy severely infected plant parts to reduce inoculum."
        )
    },
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot": {
        "Plant": "Corn",
        "Symptoms": "Gray or tan lesions on leaves, rectangular spots",
        "Warning": "Fungal leaf spot disease",
        "Solution": (
            "Implement crop rotation with non-host crops to reduce inoculum buildup. Use resistant hybrids if available. Apply fungicides when early lesions appear, following local recommendations. "
            "Practicing good field sanitation and residue management helps reduce fungal spores."
        )
    },
    "Corn_(maize)___Common_rust_": {
        "Plant": "Corn",
        "Symptoms": "Reddish-brown pustules on both leaf surfaces",
        "Warning": "Fungal disease caused by Puccinia sorghi",
        "Solution": (
            "Plant resistant corn varieties when possible. Apply fungicides if disease severity exceeds economic thresholds, particularly during wet and humid weather. "
            "Avoid excessive nitrogen fertilization which can increase susceptibility."
        )
    },
    "Corn_(maize)___healthy": {
        "Plant": "Corn",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Monitor regularly for pests and diseases. Provide balanced fertilization and adequate irrigation to promote healthy growth. "
            "Practice crop rotation and residue management to prevent disease occurrence."
        )
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "Plant": "Corn",
        "Symptoms": "Long gray-green lesions on lower leaves",
        "Warning": "Caused by Exserohilum turcicum fungus",
        "Solution": (
            "Use resistant varieties and rotate crops to reduce disease risk. Apply fungicides when disease symptoms first appear, especially in wetter conditions. "
            "Manage crop residue by tillage or removal to break the disease cycle."
        )
    },
    "Grape___Black_rot": {
        "Plant": "Grape",
        "Symptoms": "Black spots on leaves and fruit, fruit shriveling",
        "Warning": "Fungal infection caused by Guignardia bidwellii",
        "Solution": (
            "Remove and destroy all infected leaves and fruit during and after the growing season to reduce inoculum. Apply fungicides beginning at early shoot stage and continue on schedule. "
            "Ensure good canopy management for air circulation."
        )
    },
    "Grape___Esca_(Black_Measles)": {
        "Plant": "Grape",
        "Symptoms": "Striped leaves, dry berries, trunk discoloration",
        "Warning": "Complex fungal trunk disease",
        "Solution": (
            "Remove and destroy infected vines promptly to limit spread. Avoid pruning during wet weather and disinfect pruning tools thoroughly. "
            "Apply protective fungicides as recommended and maintain vine vigor through proper nutrition and irrigation."
        )
    },
    "Grape___healthy": {
        "Plant": "Grape",
        "Symptoms": "No visible signs of disease or stress",
        "Warning": "Healthy",
        "Solution": (
            "Maintain proper pruning and trellising to maximize airflow and sunlight exposure. Implement a regular irrigation and pest management program. "
            "Apply fertilizers based on soil and tissue tests to avoid nutrient deficiencies or excesses."
        )
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "Plant": "Grape",
        "Symptoms": "Irregular black or brown spots on leaves",
        "Warning": "Caused by Isariopsis fungus",
        "Solution": (
            "Prune affected vines and remove fallen leaves to reduce inoculum. Apply contact fungicides according to label directions during the growing season. "
            "Improve air circulation within the canopy by proper training and thinning."
        )
    },
    "Orange___Haunglongbing_(Citrus_greening)": {
        "Plant": "Orange",
        "Symptoms": "Yellow shoots, blotchy mottled leaves, fruit drop",
        "Warning": "Bacterial disease spread by psyllids",
        "Solution": (
            "Control psyllid vector populations using insecticides and integrated pest management strategies. Remove and destroy infected trees to prevent disease spread. "
            "Use certified disease-free nursery stock and implement strict sanitation measures. Monitor regularly for symptoms."
        )
    },
    "Peach___Bacterial_spot": {
        "Plant": "Peach",
        "Symptoms": "Dark spots on leaves and fruit, premature leaf drop",
        "Warning": "Caused by Xanthomonas bacteria",
        "Solution": (
            "Apply copper-based sprays during leaf development and prior to rainy periods to reduce bacterial populations. Plant resistant or tolerant cultivars where available. "
            "Prune and destroy infected plant material and maintain good orchard sanitation. Avoid overhead irrigation to limit bacterial spread."
        )
    },
    "Peach___healthy": {
        "Plant": "Peach",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Ensure proper fertilization and irrigation tailored to peach growth stages. Prune regularly to maintain good air circulation. "
            "Keep an active pest and disease monitoring program and apply controls as necessary."
        )
    },
    "Pepper,_bell___Bacterial_spot": {
        "Plant": "Bell Pepper",
        "Symptoms": "Water-soaked lesions on leaves and fruit",
        "Warning": "Bacterial infection by Xanthomonas",
        "Solution": (
            "Avoid overhead watering to reduce leaf wetness and limit bacterial spread. Use copper-based bactericides regularly as a preventive measure, following label instructions carefully. "
            "Practice crop rotation and employ resistant cultivars if available. Sanitize tools and implement strict hygiene to reduce contamination."
        )
    },
    "Pepper,_bell___healthy": {
        "Plant": "Bell Pepper",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Maintain regular and adequate watering avoiding water stress. Implement integrated pest management including monitoring and controlling common pests. "
            "Provide balanced fertilization and maintain good soil health."
        )
    },
    "Potato___Early_blight": {
        "Plant": "Potato",
        "Symptoms": "Dark brown spots with concentric rings on older leaves",
        "Warning": "Fungal disease caused by Alternaria solani",
        "Solution": (
            "Rotate crops annually to non-host crops to reduce disease pressure. Apply fungicides preventively or at early symptom development following local guidelines. "
            "Remove and destroy infected plant debris, and avoid overhead irrigation to reduce moisture on foliage."
        )
    },
    "Potato___healthy": {
        "Plant": "Potato",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Practice regular hilling to protect tubers and reduce weed competition. Monitor for pests and diseases frequently. "
            "Provide appropriate fertilization and irrigation to support vigorous growth."
        )
    },
    "Potato___Late_blight": {
        "Plant": "Potato",
        "Symptoms": "Dark lesions on leaves and stems, rapid plant collapse",
        "Warning": "Caused by Phytophthora infestans",
        "Solution": (
            "Use resistant potato varieties to minimize the risk of late blight. Apply fungicides at first signs of disease and repeat as recommended for effective control. "
            "Remove and destroy infected plants promptly. Avoid overhead irrigation and manage canopy density to reduce moisture retention."
        )
    },
    "Raspberry___healthy": {
        "Plant": "Raspberry",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Ensure good soil drainage to prevent root diseases. Prune regularly to maintain air flow and remove dead or diseased cane tissue. "
            "Apply proper fertilizers based on soil testing and monitor for insects and diseases."
        )
    },
    "Soybean___healthy": {
        "Plant": "Soybean",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Practice crop rotation to reduce pest and disease pressure. Plant soybeans at recommended times for your region to optimize growth. "
            "Monitor for early signs of disease and pests to apply timely controls."
        )
    },
    "Squash___Powdery_mildew": {
        "Plant": "Squash",
        "Symptoms": "White, powdery spots on leaves and stems",
        "Warning": "Common fungal disease",
        "Solution": (
            "Improve air circulation by spacing plants properly and pruning overcrowded growth. Apply fungicides specifically labeled for powdery mildew prevention or control on squash. "
            "Avoid overhead watering and water early in the day to allow rapid drying. Remove and destroy infected plant parts."
        )
    },
    "Strawberry___healthy": {
        "Plant": "Strawberry",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Maintain soil fertility with proper amendments and pH management. Implement pest monitoring and control programs. "
            "Practice good sanitation by removing old leaves and debris regularly."
        )
    },
    "Strawberry___Leaf_scorch": {
        "Plant": "Strawberry",
        "Symptoms": "Purple spots with brown centers on leaves",
        "Warning": "Caused by Diplocarpon earlianum fungus",
        "Solution": (
            "Remove and destroy infected leaves to reduce spore spread. Apply fungicides during early infection stages and repeat as per label instructions. "
            "Avoid overhead irrigation and improve air circulation with proper plant spacing."
        )
    },
    "Tomato___Bacterial_spot": {
        "Plant": "Tomato",
        "Symptoms": "Small, dark spots on leaves and fruits",
        "Warning": "Caused by Xanthomonas species",
        "Solution": (
            "Use certified disease-free seeds or transplants. Apply copper-based sprays as a preventive and curative measure following label rates. "
            "Maintain good garden hygiene by removing infected plants promptly and disinfecting tools regularly."
        )
    },
    "Tomato___Early_blight": {
        "Plant": "Tomato",
        "Symptoms": "Dark spots with target-like rings on leaves",
        "Warning": "Fungal infection by Alternaria solani",
        "Solution": (
            "Apply fungicides preventively or at early symptom appearance, repeating applications as necessary. Rotate crops and remove plant debris after harvest. "
            "Avoid overhead watering and prune lower leaves to reduce humidity near the soil surface."
        )
    },
    "Tomato___healthy": {
        "Plant": "Tomato",
        "Symptoms": "No symptoms",
        "Warning": "Healthy",
        "Solution": (
            "Provide adequate nutrients with balanced fertilization. Manage irrigation evenly to avoid water stress. "
            "Regularly scout for pests and diseases to apply timely control measures."
        )
    },
    "Tomato___Late_blight": {
        "Plant": "Tomato",
        "Symptoms": "Large, dark blotches on leaves, stems, fruit",
        "Warning": "Caused by Phytophthora infestans",
        "Solution": (
            "Apply fungicides promptly at the first sign of symptoms and follow label instructions for repeat applications. Avoid overhead watering to reduce leaf wetness. "
            "Remove infected plants immediately to prevent spread. Use resistant varieties when available."
        )
    },
    "Tomato___Leaf_Mold": {
        "Plant": "Tomato",
        "Symptoms": "Yellow spots on upper leaf surface, mold underneath",
        "Warning": "Caused by Passalora fulva",
        "Solution": (
            "Increase ventilation around plants by pruning and proper spacing. Use resistant varieties if possible. Apply fungicides preventively or at first symptoms according to label recommendations. "
            "Avoid prolonged leaf wetness through irrigation management."
        )
    },
    "Tomato___Septoria_leaf_spot": {
        "Plant": "Tomato",
        "Symptoms": "Small, circular spots with dark borders on leaves",
        "Warning": "Caused by Septoria lycopersici fungus",
        "Solution": (
            "Remove and destroy infected leaves frequently to reduce inoculum. Apply fungicides preventively or at early disease stages as advised. "
            "Use mulches to prevent soil splash and rotate crops to non-host plants."
        )
    },
    "Tomato___Spider_mites_Two-spotted_spider_mite": {
        "Plant": "Tomato",
        "Symptoms": "Speckled leaves, webbing on undersides",
        "Warning": "Infestation by tiny spider mites",
        "Solution": (
            "Spray with insecticidal soap or neem oil regularly, especially during hot, dry weather periods when mites thrive. Increase humidity if possible, as mites prefer dry conditions. "
            "Encourage natural predators like lady beetles and predatory mites. Avoid broad-spectrum insecticides that kill beneficial insects."
        )
    },
    "Tomato___Target_Spot": {
        "Plant": "Tomato",
        "Symptoms": "Circular lesions with concentric rings on leaves",
        "Warning": "Caused by Corynespora cassiicola",
        "Solution": (
            "Use preventive fungicide treatments starting early in the season and repeat as necessary. Remove and destroy infected plant debris. "
            "Improve air circulation around plants by proper spacing and pruning."
        )
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "Plant": "Tomato",
        "Symptoms": "Upward curling leaves, yellowing, stunted growth",
        "Warning": "Transmitted by whiteflies",
        "Solution": (
            "Control whitefly populations with insecticides and by using reflective mulches. Use resistant or tolerant cultivars when available. "
            "Remove and destroy infected plants to reduce virus spread. Utilize yellow sticky traps to monitor and reduce whitefly numbers."
        )
    },
    "Tomato___Tomato_mosaic_virus": {
        "Plant": "Tomato",
        "Symptoms": "Mottled leaves, distorted growth",
        "Warning": "Viral infection, spreads by contact",
        "Solution": (
            "Remove infected plants and destroy them immediately to limit spread. Disinfect tools and hands frequently while working in the garden. "
            "Use resistant varieties when possible and avoid handling plants when wet. Rotate crops and practice good sanitation."
        )
    }
    }

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, len(class_names))
    model.load_state_dict(torch.load('app/controller/plant_disease_model_final.pth', map_location=device))
    model = model.to(device)
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
    ])

    image = Image.open(image_path).convert('RGB')
    input_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred_class = torch.max(probs, 1)

    label = class_names[pred_class.item()]
    confidence = confidence.item()

    info = disease_info.get(label, {
        "Plant": "Unknown",
        "Symptoms": "Not available",
        "Warning": "Not available",
        "Solution": "Not available"
    })

    return {
        "prediction": label,
        "confidence": round(confidence, 2),
        "info": info
    }


