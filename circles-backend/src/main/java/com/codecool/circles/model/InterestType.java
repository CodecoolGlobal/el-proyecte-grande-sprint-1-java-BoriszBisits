package com.codecool.circles.model;
public enum InterestType {
    MUSIC("Rock", "Pop", "Jazz", "Classical", "Hip-Hop"),
    BUSINESS("Entrepreneurship", "Finance", "Marketing", "Management", "Startups"),
    SPORTS("Soccer", "Basketball", "Tennis", "Swimming", "Golf"),
    TECHNOLOGY("Web Development", "Mobile Apps", "Data Science", "Artificial Intelligence", "Cybersecurity"),
    COOKING("Italian Cuisine", "Baking", "Sushi Making", "Barbecue", "Vegan Cooking"),
    TRAVEL("Adventure Travel", "Cultural Exploration", "Road Trips", "Backpacking", "Luxury Travel"),
    READING("Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Biographies"),
    ART("Painting", "Sculpture", "Photography", "Drawing", "Street Art"),
    PHOTOGRAPHY("Landscape", "Portraits", "Macro", "Wildlife", "Fashion"),
    WRITING("Novels", "Poetry", "Journalism", "Blogging", "Screenwriting"),
    GAMING("Video Games", "Board Games", "Role-Playing", "Strategy", "Puzzle"),
    FITNESS("Cardio", "Strength Training", "Yoga", "Pilates", "Crossfit"),
    FILM("Action", "Comedy", "Drama", "Science Fiction", "Documentary"),
    DESIGN("Graphic Design", "Interior Design", "Fashion Design", "Industrial Design", "User Interface (UI)"),
    FASHION("Streetwear", "High Fashion", "Eco-Fashion", "Vintage", "Sustainable Fashion"),
    CRAFTS("Knitting", "Pottery", "Jewelry Making", "Woodworking", "Origami"),
    ANIMALS("Dogs", "Cats", "Birds", "Aquarium Fish", "Reptiles"),
    ENVIRONMENT("Sustainability", "Renewable Energy", "Conservation", "Climate Change", "Environmental Education"),
    SCIENCE("Physics", "Biology", "Chemistry", "Astronomy", "Geology"),
    HISTORY("Ancient History", "Medieval History", "World Wars", "Art History", "Archaeology"),
    POLITICS("Democracy", "Socialism", "Capitalism", "International Relations", "Political Theory"),
    EDUCATION("Language Learning", "Online Courses", "Home Schooling", "E-Learning", "STEM Education"),
    HEALTH("Mental Health", "Nutrition", "Fitness", "Wellness", "Disease Prevention"),
    FOOD("International Cuisine", "Desserts", "Vegetarian", "Fast Food", "Fine Dining"),
    DRINKS("Coffee", "Tea", "Wine", "Craft Beer", "Cocktails"),
    DANCE("Ballet", "Hip-Hop", "Salsa", "Ballroom", "Contemporary"),
    YOGA("Hatha Yoga", "Vinyasa Yoga", "Bikram Yoga", "Kundalini Yoga", "Ashtanga Yoga"),
    MEDITATION("Mindfulness", "Transcendental Meditation", "Guided Meditation", "Loving-Kindness Meditation", "Body Scan"),
    ASTRONOMY("Stargazing", "Cosmology", "Astrophotography", "Exoplanets", "Black Holes"),
    ASTROLOGY("Western Astrology", "Vedic Astrology", "Natal Charts", "Zodiac Signs", "Horoscope Readings"),
    PHILOSOPHY("Ethics", "Epistemology", "Metaphysics", "Logic", "Aesthetics"),
    PSYCHOLOGY("Clinical Psychology", "Cognitive Psychology", "Social Psychology", "Behavioral Psychology", "Positive Psychology"),
    LANGUAGES("Spanish", "French", "German", "Chinese", "Arabic"),
    CULTURE("Cultural Festivals", "Traditions", "Customs", "Folklore", "Heritage"),
    VOLUNTEERING("Community Service", "Animal Welfare", "Environmental Causes", "Youth Empowerment", "Disaster Relief"),
    HIKING("Mountain Hiking", "Forest Hiking", "Desert Hiking", "Coastal Hiking", "Urban Hiking"),
    CAMPING("Tent Camping", "RV Camping", "Backcountry Camping", "Glamping", "Wilderness Survival"),
    FISHING("Freshwater Fishing", "Saltwater Fishing", "Fly Fishing", "Ice Fishing", "Sport Fishing"),
    CYCLING("Road Cycling", "Mountain Biking", "BMX", "Touring", "Cyclocross"),
    MOTORSPORTS("Formula 1", "NASCAR", "Motocross", "Drag Racing", "Endurance Racing"),
    SURFING("Surfboards", "Bodyboarding", "Longboarding", "Kite Surfing", "Windsurfing"),
    SKIING("Alpine Skiing", "Cross-Country Skiing", "Freestyle Skiing", "Telemark Skiing", "Snow Skiing"),
    SNOWBOARDING("Freestyle Snowboarding", "Alpine Snowboarding", "Backcountry Snowboarding", "Halfpipe", "Slopestyle"),
    HOCKEY("Ice Hockey", "Field Hockey", "Inline Hockey", "Street Hockey", "Ball Hockey"),
    SOCCER("Association Football", "Futsal", "Beach Soccer", "Indoor Soccer", "Freestyle Football");

    private final String[] subInterests;

    InterestType(String... subInterests) {
        this.subInterests = subInterests;
    }

    public String[] getSubInterests() {
        return subInterests;
    }
}
