package com.codecool.circles.service;

import com.codecool.circles.model.SubType;
import com.codecool.circles.model.Type;
import com.codecool.circles.repositories.SubTypeRepository;
import com.codecool.circles.repositories.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class SeedDataService {

    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private SubTypeRepository subTypeRepository;


        public void seedDatabase() {
            String[][] parentInterestAndSubtypes = {
                    { "MUSIC", "Rock Music", "Pop Music", "Jazz Music", "Classical Music", "Hip-Hop Music" },
                    { "BUSINESS", "Entrepreneurship", "Finance", "Marketing", "Management", "Startups" },
                    { "SPORTS", "Soccer", "Basketball", "Tennis", "Swimming", "Golf" },
                    { "TECHNOLOGY", "Web Development", "Mobile Apps", "Data Science", "Artificial Intelligence", "Cybersecurity" },
                    { "COOKING", "Italian Cuisine", "Baking", "Sushi Making", "Barbecue", "Vegan Cooking" },
                    { "TRAVEL", "Adventure Travel", "Cultural Exploration", "Road Trips", "Backpacking", "Luxury Travel" },
                    { "READING", "Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Biographies" },
                    { "ART", "Painting", "Sculpture", "Photography", "Drawing", "Street Art" },
                    { "PHOTOGRAPHY", "Landscape Photography", "Portrait Photography", "Macro Photography", "Wildlife Photography", "Fashion Photography" },
                    { "WRITING", "Novels", "Poetry", "Journalism", "Blogging", "Screenwriting" },
                    { "GAMING", "Video Games", "Board Games", "Role-Playing Games", "Strategy Games", "Puzzle Games" },
                    { "FITNESS", "Cardio Workouts", "Strength Training", "Yoga", "Pilates", "Crossfit" },
                    { "FILM", "Action Films", "Comedy Films", "Drama Films", "Science Fiction Films", "Documentaries" },
                    { "DESIGN", "Graphic Design", "Interior Design", "Fashion Design", "Industrial Design", "User Interface (UI) Design" },
                    { "FASHION", "Streetwear", "High Fashion", "Eco-Fashion", "Vintage Fashion", "Sustainable Fashion" },
                    { "CRAFTS", "Knitting", "Pottery", "Jewelry Making", "Woodworking", "Origami" },
                    { "ANIMALS", "Dogs", "Cats", "Birds", "Aquarium Fish", "Reptiles" },
                    { "ENVIRONMENT", "Sustainability", "Renewable Energy", "Conservation", "Climate Change", "Environmental Education" },
                    { "SCIENCE", "Physics", "Biology", "Chemistry", "Astronomy", "Geology" },
                    { "HISTORY", "Ancient History", "Medieval History", "World Wars", "Art History", "Archaeology" },
                    { "POLITICS", "Democracy", "Socialism", "Capitalism", "International Relations", "Political Theory" },
                    { "EDUCATION", "Language Learning", "Online Courses", "Home Schooling", "E-Learning", "STEM Education" },
                    { "HEALTH", "Mental Health", "Nutrition", "Fitness", "Wellness", "Disease Prevention" },
                    { "FOOD", "International Cuisine", "Desserts", "Vegetarian", "Fast Food", "Fine Dining" },
                    { "DRINKS", "Coffee", "Tea", "Wine", "Craft Beer", "Cocktails" },
                    { "DANCE", "Ballet", "Hip-Hop Dance", "Salsa", "Ballroom Dance", "Contemporary Dance" },
                    { "YOGA", "Hatha Yoga", "Vinyasa Yoga", "Bikram Yoga", "Kundalini Yoga", "Ashtanga Yoga" },
                    { "MEDITATION", "Mindfulness Meditation", "Transcendental Meditation", "Guided Meditation", "Loving-Kindness Meditation", "Body Scan" },
                    { "ASTRONOMY", "Stargazing", "Cosmology", "Astrophotography", "Exoplanets", "Black Holes" },
                    { "ASTROLOGY", "Western Astrology", "Vedic Astrology", "Natal Charts", "Zodiac Signs", "Horoscope Readings" },
                    { "PHILOSOPHY", "Ethics", "Epistemology", "Metaphysics", "Logic", "Aesthetics" },
                    { "PSYCHOLOGY", "Clinical Psychology", "Cognitive Psychology", "Social Psychology", "Behavioral Psychology", "Positive Psychology" },
                    { "LANGUAGES", "Spanish", "French", "German", "Chinese", "Arabic" },
                    { "CULTURE", "Cultural Festivals", "Traditions", "Customs", "Folklore", "Heritage" },
                    { "VOLUNTEERING", "Community Service", "Animal Welfare", "Environmental Causes", "Youth Empowerment", "Disaster Relief" },
                    { "HIKING", "Mountain Hiking", "Forest Hiking", "Desert Hiking", "Coastal Hiking", "Urban Hiking" },
                    { "CAMPING", "Tent Camping", "RV Camping", "Backcountry Camping", "Glamping", "Wilderness Survival" },
                    { "FISHING", "Freshwater Fishing", "Saltwater Fishing", "Fly Fishing", "Ice Fishing", "Sport Fishing" },
                    { "CYCLING", "Road Cycling", "Mountain Biking", "BMX", "Touring", "Cyclocross" },
                    { "MOTORSPORTS", "Formula 1", "NASCAR", "Motocross", "Drag Racing", "Endurance Racing" },
                    { "SURFING", "Surfboards", "Bodyboarding", "Longboarding", "Kite Surfing", "Windsurfing" },
                    { "SKIING", "Alpine Skiing", "Cross-Country Skiing", "Freestyle Skiing", "Telemark Skiing", "Snow Skiing" },
                    { "SNOWBOARDING", "Freestyle Snowboarding", "Alpine Snowboarding", "Backcountry Snowboarding", "Halfpipe", "Slopestyle" },
                    { "HOCKEY", "Ice Hockey", "Field Hockey", "Inline Hockey", "Street Hockey", "Ball Hockey" },
                    { "SOCCER", "Association Football", "Futsal", "Beach Soccer", "Indoor Soccer", "Freestyle Football" },

            };

            for (String[] data : parentInterestAndSubtypes) {
                Type type = new Type(data[0]);
                typeRepository.save(type);

                for (int i = 1; i < data.length; i++) {
                    SubType subType = new SubType(data[i], type);
                    subTypeRepository.save(subType);
                }
            }
        }
}

