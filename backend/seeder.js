const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');

dotenv.config();

const destinations = [
  {
    name: "Goa",
    state: "Goa",
    description: "India's beach paradise, known for golden sands, Portuguese-era architecture, vibrant nightlife, and a laid-back coastal culture.",
    bestTimeToVisit: "November to February",
    attractions: [
      { name: "Baga Beach", description: "Popular beach known for water sports and nightlife" },
      { name: "Fort Aguada", description: "17th-century Portuguese fort with sea views" },
      { name: "Basilica of Bom Jesus", description: "UNESCO World Heritage church housing St. Francis Xavier's remains" },
      { name: "Dudhsagar Falls", description: "One of India's tallest waterfalls, on the Goa-Karnataka border" },
      { name: "Anjuna Beach", description: "Bohemian beach famous for its flea market and trance parties" },
      { name: "Chapora Fort", description: "Hilltop fort with panoramic views, made famous by Bollywood" },
      { name: "Se Cathedral", description: "One of Asia's largest churches, built in Portuguese Gothic style" },
      { name: "Palolem Beach", description: "Crescent-shaped, palm-fringed beach in South Goa" },
    ],
    nearestAirport: "Dabolim Airport (GOI), Goa",
    nearestRailwayStation: "Madgaon Junction",
    hotels: [
      { name: "Zostel Goa", priceRange: "Budget", pricePerNight: 800 },
      { name: "The Baga Beach Resort", priceRange: "Mid-range", pricePerNight: 3500 },
      { name: "Taj Fort Aguada Resort & Spa", priceRange: "Luxury", pricePerNight: 12000 },
    ],
    coordinates: { lat: 15.2993, lng: 74.1240 },
  },


//  MANALI

  {
  name: "Manali",
  state: "Himachal Pradesh",
  description: "A Himalayan hill town famous for snow-capped mountains, adventure sports, and as a gateway to Ladakh via the Rohtang Pass.",
  bestTimeToVisit: "October to June (for snow), March to June (for pleasant weather)",
  attractions: [
    { name: "Rohtang Pass", description: "High mountain pass with snow activities" },
    { name: "Solang Valley", description: "Adventure sports hub — paragliding, skiing, zorbing" },
    { name: "Hadimba Temple", description: "Ancient wooden temple set in a cedar forest" },
    { name: "Old Manali", description: "Charming village with cafes and backpacker culture" },
    { name: "Manu Temple", description: "Ancient temple dedicated to sage Manu, in Old Manali" },
    { name: "Vashisht Hot Springs", description: "Natural sulphur hot springs with a temple complex" },
    { name: "Manali Wildlife Sanctuary", description: "Forested sanctuary home to Himalayan brown bear and leopard" },
    { name: "Jogini Waterfall", description: "Scenic waterfall reachable via a pleasant forest trek" },
    
  ],
  nearestAirport: "Bhuntar Airport (KUU), Kullu",
  nearestRailwayStation: "Joginder Nagar Railway Station",
  hotels: [
    { name: "Zostel Manali", priceRange: "Budget", pricePerNight: 700 },
    { name: "Snow Valley Resorts", priceRange: "Mid-range", pricePerNight: 3200 },
    { name: "The Himalayan", priceRange: "Luxury", pricePerNight: 9500 },
  ],
  coordinates: { lat: 32.2432, lng: 77.1892 },
},


//  DELHI

{
  name: "Delhi",
  state: "Delhi",
  description: "India's capital city, blending Mughal-era monuments, colonial architecture, bustling markets, and modern urban life.",
  bestTimeToVisit: "October to March",
  attractions: [
    { name: "Red Fort", description: "17th-century Mughal fortress and UNESCO World Heritage Site" },
    { name: "India Gate", description: "War memorial and iconic landmark" },
    { name: "Qutub Minar", description: "Tallest brick minaret in the world, built in 1193" },
    { name: "Humayun's Tomb", description: "Mughal garden-tomb, precursor to the Taj Mahal" },
    { name: "Lotus Temple", description: "Lotus-shaped Bahá'í House of Worship, open to all faiths" },
    { name: "Akshardham Temple", description: "Modern architectural marvel showcasing Indian art and culture" },
    { name: "Chandni Chowk", description: "Historic, bustling market lane in Old Delhi" },
    { name: "National Museum", description: "India's largest museum, spanning 5,000 years of history" },
  ],
  
  nearestAirport: "Indira Gandhi International Airport (DEL)",
  nearestRailwayStation: "New Delhi Railway Station",
  hotels: [
    { name: "Zostel Delhi", priceRange: "Budget", pricePerNight: 900 },
    { name: "Bloom Rooms @ New Friends Colony", priceRange: "Mid-range", pricePerNight: 3800 },
    { name: "The Imperial New Delhi", priceRange: "Luxury", pricePerNight: 15000 },
  ],
  coordinates: { lat: 28.6139, lng: 77.2090 },
},


//  JAIPUR

{
  name: "Jaipur",
  state: "Rajasthan",
  description: "The 'Pink City', known for majestic forts, royal palaces, vibrant bazaars, and Rajasthani culture.",
  bestTimeToVisit: "October to March",
  attractions: [
    { name: "Amber Fort", description: "Hilltop fort with mirror work and elephant rides" },
    { name: "Hawa Mahal", description: "Iconic 'Palace of Winds' with intricate pink facade" },
    { name: "City Palace", description: "Royal residence blending Rajput and Mughal architecture" },
    { name: "Jantar Mantar", description: "UNESCO-listed astronomical observatory" },
    { name: "Nahargarh Fort", description: "Hilltop fort offering panoramic sunset views over Jaipur" },
    { name: "Albert Hall Museum", description: "Oldest museum in Rajasthan, housed in an Indo-Saracenic building" },
    { name: "Jal Mahal", description: "Palace that appears to float in the middle of Man Sagar Lake" },
    { name: "Birla Mandir", description: "White marble temple dedicated to Vishnu and Lakshmi" },
  ],
  nearestAirport: "Jaipur International Airport (JAI)",
  nearestRailwayStation: "Jaipur Junction",
  hotels: [
    { name: "Zostel Jaipur", priceRange: "Budget", pricePerNight: 750 },
    { name: "Trident Jaipur", priceRange: "Mid-range", pricePerNight: 4500 },
    { name: "Rambagh Palace", priceRange: "Luxury", pricePerNight: 18000 },
  ],
  coordinates: { lat: 26.9124, lng: 75.7873 },
},


//  AGRA


{
  name: "Agra",
  state: "Uttar Pradesh",
  description: "Home to the iconic Taj Mahal, Agra is a city steeped in Mughal history and architectural grandeur.",
  bestTimeToVisit: "October to March",
  attractions: [
    { name: "Taj Mahal", description: "UNESCO World Heritage Site and one of the New Seven Wonders of the World" },
    { name: "Agra Fort", description: "Red sandstone Mughal fortress overlooking the Yamuna River" },
    { name: "Fatehpur Sikri", description: "Abandoned Mughal capital city, UNESCO World Heritage Site" },
    { name: "Mehtab Bagh", description: "Garden offering sunset views of the Taj Mahal from across the river" },
    { name: "Itmad-ud-Daulah's Tomb", description: "Marble tomb often called the 'Baby Taj', a precursor to the Taj Mahal" },
    { name: "Akbar's Tomb", description: "Grand mausoleum of Emperor Akbar in nearby Sikandra" },
    { name: "Jama Masjid, Agra", description: "17th-century mosque built by Shah Jahan's daughter" },
    { name: "Chini ka Rauza", description: "Persian-style tomb known for its glazed tile decoration" },
  ],
  nearestAirport: "Agra Airport (AGR)",
  nearestRailwayStation: "Agra Cantt Railway Station",
  hotels: [
    { name: "Zostel Agra", priceRange: "Budget", pricePerNight: 700 },
    { name: "Howard Plaza - The Fern", priceRange: "Mid-range", pricePerNight: 3600 },
    { name: "The Oberoi Amarvilas", priceRange: "Luxury", pricePerNight: 25000 },
  ],
  coordinates: { lat: 27.1767, lng: 78.0081 },
},


//  SHIMLA


{
  name: "Shimla",
  state: "Himachal Pradesh",
  description: "The former British summer capital, known for colonial architecture, pine forests, and pleasant hill-station charm.",
  bestTimeToVisit: "March to June, December to February (for snow)",
  attractions: [
    { name: "The Ridge", description: "Open promenade with panoramic Himalayan views" },
    { name: "Mall Road", description: "Vibrant pedestrian street with shops and cafes" },
    { name: "Jakhoo Temple", description: "Hilltop temple dedicated to Lord Hanuman" },
    { name: "Kufri", description: "Nearby hill station known for adventure sports and snow" },
    { name: "Christ Church", description: "India's second-oldest church, a Shimla landmark on the Ridge" },
    { name: "Viceregal Lodge", description: "Former British viceroy's residence, now an institute" },
    { name: "Chadwick Falls", description: "Secluded waterfall surrounded by dense forest" },
    { name: "Summer Hill", description: "Quiet, forested hill offering scenic views away from the crowds" },
  ],
  nearestAirport: "Shimla Airport (SLV)",
  nearestRailwayStation: "Shimla Railway Station (narrow-gauge toy train)",
  hotels: [
    { name: "Zostel Shimla", priceRange: "Budget", pricePerNight: 750 },
    { name: "Woodville Palace", priceRange: "Mid-range", pricePerNight: 4200 },
    { name: "The Oberoi Cecil", priceRange: "Luxury", pricePerNight: 14000 },
  ],
  coordinates: { lat: 31.1048, lng: 77.1734 },
},


//  UDAIPUR

{
  name: "Udaipur",
  state: "Rajasthan",
  description: "Known as the 'City of Lakes', Udaipur is famed for its romantic palaces, serene lakes, and rich Rajput heritage.",
  bestTimeToVisit: "September to March",
  attractions: [
    { name: "City Palace", description: "Grand palace complex overlooking Lake Pichola" },
    { name: "Lake Pichola", description: "Scenic artificial lake with boat rides and island palaces" },
    { name: "Jag Mandir", description: "Palace built on an island in Lake Pichola" },
    { name: "Saheliyon ki Bari", description: "Ornamental garden with fountains, built for royal ladies" },
    { name: "Fateh Sagar Lake", description: "Scenic lake with an island garden and boat rides" },
    { name: "Sajjangarh (Monsoon Palace)", description: "Hilltop palace offering sweeping sunset views over the city" },
    { name: "Bagore ki Haveli", description: "Restored haveli hosting nightly traditional Rajasthani dance shows" },
    { name: "Jagdish Temple", description: "Ornate 17th-century temple near the City Palace" },
  ],
  nearestAirport: "Maharana Pratap Airport (UDR), Udaipur",
  nearestRailwayStation: "Udaipur City Railway Station",
  hotels: [
    { name: "Zostel Udaipur", priceRange: "Budget", pricePerNight: 700 },
    { name: "Ramada Udaipur Resort & Spa", priceRange: "Mid-range", pricePerNight: 4800 },
    { name: "Taj Lake Palace", priceRange: "Luxury", pricePerNight: 32000 },
  ],
  coordinates: { lat: 24.5854, lng: 73.7125 },
},


// DARJEELING 

{
  name: "Darjeeling",
  state: "West Bengal",
  description: "A picturesque Himalayan hill station famous for its tea gardens, misty mountains, and views of Kanchenjunga.",
  bestTimeToVisit: "March to May, October to November",
  attractions: [
    { name: "Tiger Hill", description: "Famous sunrise viewpoint over Kanchenjunga" },
    { name: "Darjeeling Himalayan Railway", description: "UNESCO World Heritage 'toy train' through the hills" },
    { name: "Padmaja Naidu Himalayan Zoological Park", description: "High-altitude zoo, home to red pandas and snow leopards" },
    { name: "Tea Gardens", description: "World-famous Darjeeling tea plantations open for tours" },
    { name: "Peace Pagoda", description: "Serene Japanese Buddhist stupa with hilltop views" },
    { name: "Rock Garden", description: "Terraced garden built around a natural waterfall" },
    { name: "Batasia Loop", description: "Scenic railway loop with a war memorial and mountain views" },
    { name: "Himalayan Mountaineering Institute", description: "Museum honoring Everest pioneers, including Tenzing Norgay" },

  ],
  nearestAirport: "Bagdogra Airport (IXB)",
  nearestRailwayStation: "New Jalpaiguri (NJP) Railway Station",
  hotels: [
    { name: "Zostel Darjeeling", priceRange: "Budget", pricePerNight: 700 },
    { name: "Mayfair Darjeeling", priceRange: "Mid-range", pricePerNight: 5500 },
    { name: "Glenburn Tea Estate", priceRange: "Luxury", pricePerNight: 20000 },
  ],
  coordinates: { lat: 27.0410, lng: 88.2663 },
},


//  AMRITSAR


{
  name: "Amritsar",
  state: "Punjab",
  description: "Home to the Golden Temple, Amritsar is the spiritual center of Sikhism and known for its warm hospitality and rich history.",
  bestTimeToVisit: "October to March",
  attractions: [
    { name: "Golden Temple", description: "Holiest Sikh shrine, plated in gold, open 24 hours to all" },
    { name: "Jallianwala Bagh", description: "Historic memorial garden marking the 1919 massacre" },
    { name: "Wagah Border", description: "Site of the daily India-Pakistan border-closing ceremony" },
    { name: "Partition Museum", description: "Museum documenting the 1947 Partition of India" },
    { name: "Gobindgarh Fort", description: "18th-century fort with cultural shows and a museum" },
    { name: "Durgiana Temple", description: "Hindu temple with striking similarity to the Golden Temple" },
    { name: "Maharaja Ranjit Singh Museum", description: "Museum dedicated to the founder of the Sikh Empire" },
    { name: "Central Sikh Museum", description: "Museum documenting Sikh history and martyrdom, inside the Golden Temple complex" },
  ],
  nearestAirport: "Sri Guru Ram Dass Jee International Airport (ATQ)",
  nearestRailwayStation: "Amritsar Junction",
  hotels: [
    { name: "Zostel Amritsar", priceRange: "Budget", pricePerNight: 700 },
    { name: "Ramada Amritsar", priceRange: "Mid-range", pricePerNight: 3500 },
    { name: "Taj Swarna Amritsar", priceRange: "Luxury", pricePerNight: 13000 },
  ],
  coordinates: { lat: 31.6340, lng: 74.8723 },
},


//  VARANASI

{
  name: "Varanasi",
  state: "Uttar Pradesh",
  description: "One of the world's oldest living cities, sacred to Hindus, known for its ghats along the Ganges and spiritual atmosphere.",
  bestTimeToVisit: "October to March",
  attractions: [
    { name: "Dashashwamedh Ghat", description: "Main ghat famous for the nightly Ganga Aarti ceremony" },
    { name: "Kashi Vishwanath Temple", description: "One of the twelve Jyotirlinga shrines of Lord Shiva" },
    { name: "Sarnath", description: "Site where Buddha gave his first sermon, near Varanasi" },
    { name: "Assi Ghat", description: "Popular ghat for sunrise boat rides" },
    { name: "Manikarnika Ghat", description: "One of the holiest cremation ghats along the Ganges" },
    { name: "Ramnagar Fort", description: "18th-century fort and museum across the river" },
    { name: "Banaras Hindu University", description: "One of Asia's largest residential universities, with a scenic campus" },
    { name: "Tulsi Manas Temple", description: "Marble temple with verses of the Ramcharitmanas inscribed on its walls" },
  ],
  nearestAirport: "Lal Bahadur Shastri Airport (VNS)",
  nearestRailwayStation: "Varanasi Junction (Varanasi Cantt)",
  hotels: [
    { name: "Zostel Varanasi", priceRange: "Budget", pricePerNight: 650 },
    { name: "Ganges Grand", priceRange: "Mid-range", pricePerNight: 3200 },
    { name: "Taj Nadesar Palace", priceRange: "Luxury", pricePerNight: 22000 },
  ],
  coordinates: { lat: 25.3176, lng: 82.9739 },
},


//  KHAJURAHO

{
  name: "Khajuraho",
  state: "Madhya Pradesh",
  description: "A UNESCO World Heritage Site famous for its intricately carved medieval Hindu and Jain temples, showcasing exceptional ancient sculptural art.",
  bestTimeToVisit: "October to March",
  attractions: [
    { name: "Kandariya Mahadev Temple", description: "Largest and most ornate temple in the Western Group, dedicated to Shiva" },
    { name: "Lakshmana Temple", description: "Well-preserved temple with detailed friezes and carvings" },
    { name: "Duladeo Temple", description: "Temple known for its elaborate sculptural work" },
    { name: "Khajuraho Dance Festival", description: "Annual classical dance festival held against the temple backdrop" },
    { name: "Chitragupta Temple", description: "Rare temple dedicated to the Sun God, with vivid carvings" },
    { name: "Vishwanath Temple", description: "Temple in the Western Group known for its detailed sculptures" },
    { name: "Chausath Yogini Temple", description: "Oldest surviving temple in Khajuraho, dedicated to 64 yoginis" },
    { name: "Panna National Park", description: "Nearby tiger reserve along the Ken River" },
  ],
  nearestAirport: "Khajuraho Airport (HJR)",
  nearestRailwayStation: "Khajuraho Railway Station",
  hotels: [
    { name: "Zostel Khajuraho", priceRange: "Budget", pricePerNight: 650 },
    { name: "Ramada Khajuraho", priceRange: "Mid-range", pricePerNight: 3800 },
    { name: "The Lalit Temple View Khajuraho", priceRange: "Luxury", pricePerNight: 14000 },
  ],
  coordinates: { lat: 24.8318, lng: 79.9199 },
},


//  MUMBAI

{
  name: "Mumbai",
  state: "Maharashtra",
  description: "India's financial capital and the heart of Bollywood, Mumbai blends colonial architecture, bustling street life, and a vibrant coastal energy.",
  bestTimeToVisit: "November to February",
  attractions: [
    { name: "Gateway of India", description: "Iconic waterfront monument built during British rule" },
    { name: "Marine Drive", description: "Scenic promenade along the Arabian Sea, nicknamed the 'Queen's Necklace'" },
    { name: "Elephanta Caves", description: "UNESCO World Heritage rock-cut caves on an island near Mumbai" },
    { name: "Chhatrapati Shivaji Maharaj Terminus", description: "UNESCO-listed Victorian Gothic railway station" },
    { name: "Siddhivinayak Temple", description: "One of Mumbai's most visited and revered Ganesh temples" },
    { name: "Juhu Beach", description: "Popular beach known for street food and Bollywood-star sightings" },
    { name: "Haji Ali Dargah", description: "Mosque and tomb on an islet, connected by a causeway" },
    { name: "CSMVS Museum", description: "Premier art and history museum in an Indo-Saracenic building" },
  ],
  nearestAirport: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
  nearestRailwayStation: "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
  hotels: [
    { name: "Zostel Mumbai", priceRange: "Budget", pricePerNight: 1000 },
    { name: "Fariyas Hotel Colaba", priceRange: "Mid-range", pricePerNight: 6000 },
    { name: "The Taj Mahal Palace, Mumbai", priceRange: "Luxury", pricePerNight: 35000 },
  ],
  coordinates: { lat: 19.0760, lng: 72.8777 },
},


// RISHIKESH 

{
  name: "Rishikesh",
  state: "Uttarakhand",
  description: "The 'Yoga Capital of the World', nestled in the Himalayan foothills along the Ganges, known for spirituality and adventure sports.",
  bestTimeToVisit: "September to April",
  attractions: [
    { name: "Laxman Jhula", description: "Iconic suspension bridge over the Ganges" },
    { name: "Triveni Ghat", description: "Sacred riverbank known for evening Ganga Aarti" },
    { name: "Beatles Ashram", description: "Former ashram where The Beatles stayed in 1968" },
    { name: "River Rafting on the Ganges", description: "Popular white-water rafting stretch" },
    { name: "Ram Jhula", description: "Another iconic suspension bridge, lined with temples and ashrams" },
    { name: "Neelkanth Mahadev Temple", description: "Ancient Shiva temple set in the forested hills above town" },
    { name: "Parmarth Niketan Ashram", description: "One of Rishikesh's largest ashrams, hosting the nightly Aarti" },
    { name: "Kaudiyala", description: "Scenic riverside spot popular for camping and rafting" },
  ],
  nearestAirport: "Jolly Grant Airport (DED), Dehradun",
  nearestRailwayStation: "Rishikesh Railway Station",
  hotels: [
    { name: "Zostel Rishikesh", priceRange: "Budget", pricePerNight: 650 },
    { name: "Ganga Kinare", priceRange: "Mid-range", pricePerNight: 3000 },
    { name: "Ananda in the Himalayas", priceRange: "Luxury", pricePerNight: 28000 },
  ],
  coordinates: { lat: 30.0869, lng: 78.2676 },
},


//  KASHMIR


{
  name: "Srinagar",
  state: "Jammu and Kashmir",
  description: "The summer capital of Jammu and Kashmir, Srinagar is famed for its Mughal gardens, houseboats on Dal Lake, and stunning Himalayan scenery — often called 'Paradise on Earth'.",
  bestTimeToVisit: "March to October (April–June for gardens, December–February for snow)",
  attractions: [
    { name: "Dal Lake", description: "Iconic lake known for houseboats and shikara boat rides" },
    { name: "Mughal Gardens", description: "Terraced gardens including Shalimar Bagh and Nishat Bagh" },
    { name: "Gulmarg", description: "Popular hill station and ski resort, home to one of the world's highest gondola rides" },
    { name: "Pahalgam", description: "Scenic valley town, gateway to the Amarnath Yatra" },
    { name: "Shankaracharya Temple", description: "Ancient hilltop temple offering panoramic views of Srinagar" },
    { name: "Hazratbal Shrine", description: "Revered shrine on the banks of Dal Lake" },
    { name: "Nishat Bagh", description: "Mughal terrace garden known as the 'Garden of Bliss'" },
    { name: "Nigeen Lake", description: "Quieter, cleaner lake often called the 'jewel in the ring'" },
  ],
  nearestAirport: "Sheikh ul-Alam International Airport (SXR), Srinagar",
  nearestRailwayStation: "Srinagar Railway Station (limited connectivity; Jammu Tawi is the major railhead)",
  hotels: [
    { name: "Zostel Srinagar", priceRange: "Budget", pricePerNight: 800 },
    { name: "Vivanta Dal View", priceRange: "Mid-range", pricePerNight: 6500 },
    { name: "The Lalit Grand Palace Srinagar", priceRange: "Luxury", pricePerNight: 20000 },
  ],
  coordinates: { lat: 34.0837, lng: 74.7973 },
},


//  ANDAMAN ISLANDS

{
  name: "Andaman Islands",
  state: "Andaman and Nicobar Islands",
  description: "A tropical archipelago known for pristine beaches, coral reefs, and crystal-clear waters, ideal for water sports and relaxation.",
  bestTimeToVisit: "October to May",
  attractions: [
    { name: "Radhanagar Beach", description: "Award-winning beach on Havelock Island" },
    { name: "Cellular Jail", description: "Historic colonial prison, now a national memorial" },
    { name: "Ross Island", description: "Former British administrative headquarters, now ruins amid nature" },
    { name: "Neil Island", description: "Quiet island known for snorkeling and coral reefs" },
    { name: "Chidiya Tapu", description: "Known as 'Bird Island', famous for sunset views and birdwatching" },
    { name: "Baratang Island", description: "Home to limestone caves and mud volcanoes, reached via mangrove creeks" },
    { name: "Ross and Smith Islands", description: "Twin islands joined by a natural sandbar" },
    { name: "Mahatma Gandhi Marine National Park", description: "Marine park known for coral reefs and glass-bottom boat rides" },
  ],
  nearestAirport: "Veer Savarkar International Airport (IXZ), Port Blair",
  nearestRailwayStation: "No rail connectivity — accessible only by air or sea",
  hotels: [
    { name: "Zostel Andaman", priceRange: "Budget", pricePerNight: 900 },
    { name: "Symphony Palms Beach Resort", priceRange: "Mid-range", pricePerNight: 5500 },
    { name: "Taj Exotica Resort & Spa, Andamans", priceRange: "Luxury", pricePerNight: 30000 },
  ],
  coordinates: { lat: 11.7401, lng: 92.6586 },
},


];

const seedDestinations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Destination.deleteMany(); // clears old data first, so we don't get duplicates
    await Destination.insertMany(destinations);

    console.log('Destinations seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDestinations();