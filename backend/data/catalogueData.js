/**
 * Realistic product catalogue dataset for CodeAlpha Simple E-commerce Store.
 * Contains 112 unique products across 10 diverse categories.
 * All prices, stocks, ratings, review counts, and descriptions are realistic demo data.
 */

const catalogueProducts = [
  // ==========================================
  // 1. ELECTRONICS (12 products)
  // ==========================================
  {
    name: 'Anker 737 Power Bank (PowerCore 24K) 140W',
    description:
      'Ultra-powerful two-way charging power bank with smart digital display. 24,000mAh capacity capable of fast-charging laptops, tablets, and phones simultaneously with Power Delivery 3.1.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 35,
    rating: 4.8,
    numReviews: 124,
  },
  {
    name: 'Bose QuietComfort 45 Wireless Noise-Cancelling Headphones',
    description:
      'High-fidelity audio with proprietary acoustic technology. Deep, clear sound and adjustable Quiet and Aware modes with up to 24 hours of battery on a single charge.',
    price: 329.00,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 20,
    rating: 4.7,
    numReviews: 98,
  },
  {
    name: 'Logitech MX Master 3S Performance Wireless Mouse',
    description:
      'Quiet clicks and 8K DPI any-surface tracking sensor. MagSpeed electromagnetic scrolling wheel with ergonomic sculpted thumb rest and gesture buttons.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 45,
    rating: 4.9,
    numReviews: 215,
  },
  {
    name: 'Sony WF-1000XM5 Truly Wireless Earbuds',
    description:
      'Precision audio with dual dynamic drivers and active noise cancellation. Multipoint connection, AI-powered bone conduction sensor for clear calls, and IPX4 splash resistance.',
    price: 278.00,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 28,
    rating: 4.6,
    numReviews: 87,
  },
  {
    name: 'Dell UltraSharp 27-inch 4K USB-C Hub Monitor',
    description:
      'Brilliant 4K UHD resolution with 98% DCI-P3 color gamut and IPS Black technology. Built-in USB-C hub delivering 90W power delivery, Ethernet, and daisy-chain connectivity.',
    price: 579.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 12,
    rating: 4.8,
    numReviews: 64,
  },
  {
    name: 'JBL Charge 5 Waterproof Portable Bluetooth Speaker',
    description:
      'Bold JBL Original Pro Sound with long-excursion driver and separate tweeter. Rugged IP67 dustproof and waterproof build with 20 hours playtime and built-in powerbank.',
    price: 179.95,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 40,
    rating: 4.7,
    numReviews: 140,
  },
  {
    name: 'Shure MV7 USB/XLR Podcast Microphone',
    description:
      'Dynamic hybrid microphone inspired by the legendary SM7B. Voice Isolation Technology, intuitive touch panel controls, and built-in headphone monitoring for streamers and creators.',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 18,
    rating: 4.9,
    numReviews: 110,
  },
  {
    name: 'DJI Mini 4 Pro Drone with 4K HDR Camera',
    description:
      'Under 249 grams lightweight folding drone. Omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and up to 34 minutes of flight time.',
    price: 759.00,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 8,
    rating: 4.9,
    numReviews: 45,
  },
  {
    name: 'Elgato Stream Deck MK.2 Studio Controller',
    description:
      '15 customizable LCD keys to trigger unlimited actions in OBS, Twitch, YouTube, Spotify, and smart home apps with detachable faceplate and magnetic stand.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 22,
    rating: 4.8,
    numReviews: 133,
  },
  {
    name: 'Logitech Brio 4K Ultra HD Pro Webcam',
    description:
      'Ultra 4K HD video streaming at 30fps or 1080p at 60fps with HDR RightLight 3 technology. Dual omnidirectional noise-reducing microphones and facial recognition login.',
    price: 169.00,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 30,
    rating: 4.5,
    numReviews: 76,
  },
  {
    name: 'Belkin BoostCharge Pro 3-in-1 MagSafe Wireless Charger',
    description:
      'Fast wireless charging pad for iPhone, Apple Watch, and AirPods. 15W MagSafe alignment architecture with modern architectural chrome tree stand.',
    price: 149.95,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 25,
    rating: 4.7,
    numReviews: 82,
  },
  {
    name: 'Kindle Paperwhite 16GB Waterproof E-Reader',
    description:
      '6.8-inch glare-free 300 ppi Paperwhite display with adjustable warm light. Up to 10 weeks of battery life and 20% faster page turns with IPX8 waterproofing.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 36,
    rating: 4.8,
    numReviews: 195,
  },

  // ==========================================
  // 2. FASHION (12 products)
  // ==========================================
  {
    name: 'Relaxed Fit Heavyweight Cotton Crewneck Tee',
    description:
      'Crafted from combed 280 GSM ring-spun organic cotton. Features drop shoulder silhouette, reinforced double-needle collar, and soft vintage wash finish.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 65,
    rating: 4.6,
    numReviews: 112,
  },
  {
    name: 'Selvedge Denim Classic Trucker Jacket',
    description:
      '14oz Japanese raw selvedge denim woven on traditional shuttle looms. Custom antique brass buttons, deep welt side pockets, and adjustable waist tabs.',
    price: 165.00,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 24,
    rating: 4.8,
    numReviews: 54,
  },
  {
    name: '100% Mongolian Cashmere Ribbed Turtleneck Sweater',
    description:
      'Ethically sourced grade-A 2-ply Mongolian cashmere. Incredibly lightweight yet luxurious warmth with ribbed cuffs, hem, and timeless folded turtleneck collar.',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 18,
    rating: 4.9,
    numReviews: 43,
  },
  {
    name: 'Classic Double-Breasted Wool Blend Trench Coat',
    description:
      'Tailored water-repellent wool blend trench coat. Features notched storm flap, adjustable belted waist, horn buttons, and breathable satin interior lining.',
    price: 245.00,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 14,
    rating: 4.7,
    numReviews: 38,
  },
  {
    name: 'Bespoke Pleated Relaxed Trousers',
    description:
      'Smart casual pleated dress pants cut from breathable tropical wool blend. Features concealed hook closure, slanted pockets, and clean tailored taper.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 32,
    rating: 4.5,
    numReviews: 67,
  },
  {
    name: 'Waterproof Packable Hooded Windbreaker',
    description:
      'Ultralight ripstop nylon with DWR waterproof coating. Packs neatly into its own interior chest pocket with reflective accents and elasticized drawcord cuffs.',
    price: 74.00,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 42,
    rating: 4.6,
    numReviews: 89,
  },
  {
    name: 'Pure French Linen Long Sleeve Button-Down Shirt',
    description:
      'Pre-washed pure Normandy linen for a naturally textured, airy drape. Button-down point collar with natural mother-of-pearl buttons and curved hem.',
    price: 82.00,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 38,
    rating: 4.7,
    numReviews: 78,
  },
  {
    name: 'Chunky Knit Fishermans Merino Wool Cardigan',
    description:
      'Heavy gauge 100% merino wool knit in authentic cable stitch patterns. Shawl collar with genuine horn toggle buttons and reinforced elbows.',
    price: 155.00,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 20,
    rating: 4.8,
    numReviews: 49,
  },
  {
    name: 'Vintage Wash Slub Cotton Henley Shirt',
    description:
      'Classic 3-button placket henley spun from breathable slub jersey knit. Textured uneven weave gives a rugged vintage look that softens with every wash.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 48,
    rating: 4.5,
    numReviews: 63,
  },
  {
    name: 'Thermal Waffle-Knit Long-Sleeve Base Layer',
    description:
      'Honeycomb thermal knit trapping heat without adding bulk. Flatlock anti-chafing seams and ribbed collar and wrist cuffs for active outdoor layering.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 55,
    rating: 4.6,
    numReviews: 71,
  },
  {
    name: 'Modern Utility Stretch Cargo Pants',
    description:
      'Durable stretch-cotton twill with articulated knees and low-profile gusseted cargo pockets. Elastic waistband with internal drawstrings and tapered ankle cuffs.',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 29,
    rating: 4.4,
    numReviews: 52,
  },
  {
    name: 'Classic Quilted Insulated Puffer Vest',
    description:
      'Weather-resistant shell insulated with lightweight recycled down fill. Stand collar with fleece chin guard and zippered fleece-lined handwarmer pockets.',
    price: 98.00,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 33,
    rating: 4.7,
    numReviews: 60,
  },

  // ==========================================
  // 3. SHOES (11 products)
  // ==========================================
  {
    name: 'Nike Air Zoom Pegasus Road Running Shoes',
    description:
      'Engineered mesh upper for breathability and springy responsive foam midsole. Dual Zoom Air units deliver energized transitions through every stride.',
    price: 130.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 45,
    rating: 4.8,
    numReviews: 189,
  },
  {
    name: 'Heritage Goodyear-Welted Leather Chelsea Boots',
    description:
      'Handcrafted full-grain calfskin leather with elastic side gores and Goodyear welt construction. Vibram lug rubber outsoles deliver durability in all weather.',
    price: 240.00,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 18,
    rating: 4.9,
    numReviews: 76,
  },
  {
    name: 'Minimalist White Leather Low-Top Sneakers',
    description:
      'Buttery-soft Italian nappa leather low-top sneakers. Margom rubber cupsole, waxed cotton laces, and calfskin lined interior for pristine all-day comfort.',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 35,
    rating: 4.7,
    numReviews: 142,
  },
  {
    name: 'Vibram Waterproof Mountain Trail Hiking Boots',
    description:
      'Waterproof eVent breathable membrane with nubuck leather upper. Molded EVA midsole, protective rubber toe rand, and deep multi-directional traction lugs.',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 22,
    rating: 4.8,
    numReviews: 83,
  },
  {
    name: 'Retro Canvas Skate Low-Top Sneakers',
    description:
      'Heavy 12oz canvas upper with vulcanized waffle rubber outsole. Padded collar, reinforced toe caps, and vintage off-white foxing tape.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 50,
    rating: 4.6,
    numReviews: 110,
  },
  {
    name: 'Carbon-Plated Marathon Racing Shoes',
    description:
      'Featherweight engineered mesh with full-length curved carbon fiber propulsion plate. High-rebound PEBA foam midsole for race-day speed and endurance.',
    price: 225.00,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 15,
    rating: 4.9,
    numReviews: 61,
  },
  {
    name: 'Handcrafted Cap-Toe Leather Oxford Shoes',
    description:
      'Formal dress oxfords crafted from burnished French calfskin leather. Channeled leather sole, closed lacing system, and memory foam cushioned footbed.',
    price: 215.00,
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 16,
    rating: 4.7,
    numReviews: 47,
  },
  {
    name: 'Breathable Knit Daily Walking Slip-Ons',
    description:
      'Seamless sock-knit upper with responsive cushioning sole. Slip-on design with elastic collar and supportive TPU heel clip for effortless daily commutes.',
    price: 78.00,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 40,
    rating: 4.5,
    numReviews: 95,
  },
  {
    name: 'Urban Tactical Waterproof Chukka Boots',
    description:
      'Waxed suede upper with gusseted tongue and seam-sealed waterproof lining. OrthoLite Eco footbed and shock-absorbing lightweight polyurethane midsole.',
    price: 160.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 26,
    rating: 4.6,
    numReviews: 68,
  },
  {
    name: 'Cushioned Cloud Foam Athletic Slides',
    description:
      'One-piece molded EVA recovery slide. Ergonomic contoured footbed cradles arches and relieves foot fatigue after workouts and long walking sessions.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 60,
    rating: 4.4,
    numReviews: 125,
  },
  {
    name: 'All-Weather Trail Hybrid Cross-Trainers',
    description:
      'Gore-Tex waterproof membrane combined with sticky Contagrip rubber tread. Quicklace one-pull tightening system and protective rock plate.',
    price: 155.00,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80',
    category: 'Shoes',
    stock: 28,
    rating: 4.7,
    numReviews: 73,
  },

  // ==========================================
  // 4. ACCESSORIES (11 products)
  // ==========================================
  {
    name: 'RFID-Blocking Slim Full-Grain Leather Wallet',
    description:
      'Ultra-compact bifold wallet in vegetable-tanned top-grain leather. Built-in aerospace RFID blocking shield, 8 card slots, and pull-tab quick access pocket.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 55,
    rating: 4.8,
    numReviews: 162,
  },
  {
    name: 'Automatic Mechanical Skeleton Exhibition Watch',
    description:
      'Self-winding mechanical movement with open-heart skeleton dial. Exhibition case back, 42mm 316L stainless steel case, and genuine leather alligator strap.',
    price: 280.00,
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 15,
    rating: 4.9,
    numReviews: 58,
  },
  {
    name: 'Italian Vegetable-Tanned Heavy Leather Belt',
    description:
      'Solid 1.5-inch wide full-grain bridle leather strap with hand-burnished edges. Solid brass roller buckle fastened with Chicago screws for longevity.',
    price: 68.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 45,
    rating: 4.7,
    numReviews: 92,
  },
  {
    name: 'Polarized Retro Square Acetate Sunglasses',
    description:
      'Handcrafted plant-based cellulose acetate frames with five-barrel stainless steel hinges. CR-39 scratch-resistant polarized lenses with 100% UV400 protection.',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 32,
    rating: 4.6,
    numReviews: 74,
  },
  {
    name: 'Sterling Silver 925 Minimalist Curb Chain',
    description:
      'Solid 925 sterling silver diamond-cut curb link chain. Polished rhodium finish resists tarnishing, secured with a custom lobster clasp.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 28,
    rating: 4.8,
    numReviews: 81,
  },
  {
    name: 'Brushed Titanium Minimalist Key Organizer',
    description:
      'Grade 5 aerospace titanium key holder silencing up to 8 keys in a slim footprint. Integrated pocket clip, bottle opener, and stainless steel loop for car fobs.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 40,
    rating: 4.7,
    numReviews: 104,
  },
  {
    name: 'Pure Mulberry Silk Hand-Rolled Pocket Square',
    description:
      '100% Grade 6A mulberry silk twill with artisan hand-rolled edges. Subtle geometric pattern designed to elevate tailored suit blazers and formal attire.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 35,
    rating: 4.5,
    numReviews: 39,
  },
  {
    name: 'Matte Black Stainless Steel Signet Ring',
    description:
      'Surgical 316L stainless steel with vacuum ion-plated matte finish. Hypoallergenic, sweatproof, and corrosion resistant with comfortable comfort-fit inner profile.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1611591475152-4783113f60bc?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 48,
    rating: 4.6,
    numReviews: 66,
  },
  {
    name: '14K Gold Plated Paperclip Link Pendant Necklace',
    description:
      'Dainty paperclip chain dipped in 14K real yellow gold over hypoallergenic brass. Protective anti-tarnish coating with 2-inch extender chain.',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 30,
    rating: 4.8,
    numReviews: 87,
  },
  {
    name: 'Waxed Canvas and Brass Tech Cable Organizer Pouch',
    description:
      'Weatherproof 10oz waxed canvas pouch with YKK brass zipper. Elastic loops and mesh pockets keep charging cords, power bricks, and adapters neatly separated.',
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 50,
    rating: 4.7,
    numReviews: 118,
  },
  {
    name: 'Stainless Steel Beveled Edge Cufflinks Set',
    description:
      'Precision machined stainless steel cufflinks with brushed face and mirrored beveled edge. Swivel torpedo backing for secure fit on French cuff dress shirts.',
    price: 44.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 25,
    rating: 4.6,
    numReviews: 42,
  },

  // ==========================================
  // 5. HOME & KITCHEN (12 products)
  // ==========================================
  {
    name: 'Breville Barista Touch Espresso Machine',
    description:
      'Automated touchscreen coffee machine with integrated conical burr grinder. 3-second ThermoJet heating system and automatic microfoam milk texturing.',
    price: 999.95,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 10,
    rating: 4.9,
    numReviews: 88,
  },
  {
    name: 'Pre-Seasoned 12-Inch Cast Iron Skillet',
    description:
      'Heavy-duty cast iron pan seasoned with 100% natural vegetable oil. Exceptional heat retention and even cooking for searing steaks, baking cornbread, and roasting veggies.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 50,
    rating: 4.8,
    numReviews: 245,
  },
  {
    name: 'Japanese VG-10 Damascus 8-Inch Chef Knife',
    description:
      '67 layers of high-carbon Damascus steel with VG-10 core vacuum heat treated to 62 HRC. Ergonomic G10 composite handle with mosaic center pin.',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 25,
    rating: 4.9,
    numReviews: 115,
  },
  {
    name: 'End-Grain Teak Wood Kitchen Cutting Board',
    description:
      'Sustainably harvested teak wood constructed in durable end-grain design that preserves knife edges. Deep perimeter juice groove and carved recessed handles.',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 35,
    rating: 4.8,
    numReviews: 94,
  },
  {
    name: 'Digital Vortex Air Fryer 6-Quart',
    description:
      'Crispy 360-degree rapid hot air circulation with 8 one-touch cooking presets. Non-stick dishwasher-safe fry basket uses up to 85% less oil than deep frying.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 28,
    rating: 4.7,
    numReviews: 178,
  },
  {
    name: 'Vitamix Professional Series 750 Blender',
    description:
      'Commercial-grade 2.2 peak horsepower motor with 64-ounce low-profile container. 5 pre-programmed settings for smoothies, hot soups, frozen desserts, and purées.',
    price: 549.95,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 14,
    rating: 4.9,
    numReviews: 132,
  },
  {
    name: 'Artisan Stoneware 16-Piece Dinnerware Set',
    description:
      'High-fired organic ceramic stoneware with matte reactive glaze. Service for 4 includes dinner plates, salad plates, soup bowls, and coffee mugs.',
    price: 135.00,
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 20,
    rating: 4.6,
    numReviews: 67,
  },
  {
    name: 'Double-Walled Borosilicate Glass Coffee Mug Set (4-Pack)',
    description:
      'Hand-blown heat-resistant borosilicate glass mugs. Double-wall thermal insulation keeps espresso and latte hot without burning fingers or sweating on tables.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 45,
    rating: 4.7,
    numReviews: 120,
  },
  {
    name: 'Hand-Poured Soy Wax Scented Aromatherapy Candle',
    description:
      '100% natural soy wax infused with essential oils of cedarwood, amber, and vanilla. Lead-free crackling wood wick with 60-hour clean burn in amber glass jar.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 60,
    rating: 4.8,
    numReviews: 156,
  },
  {
    name: 'Smart WiFi Indoor Herb Garden Hydroponic Kit',
    description:
      'Full-spectrum 24W LED grow light with automatic timer and water circulation pump. Grow fresh basil, mint, and cherry tomatoes indoors year-round without soil.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 24,
    rating: 4.6,
    numReviews: 73,
  },
  {
    name: 'Stainless Steel Magnetic Knife Wall Strip 16-Inch',
    description:
      'Ultra-strong neodymium magnets encased in satin finish food-grade stainless steel. Safely organizes kitchen cutlery, shears, and cooking tools with heavy grip.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 42,
    rating: 4.7,
    numReviews: 89,
  },
  {
    name: 'Ergonomic Mid-Century Modern Upholstered Armchair',
    description:
      'Solid rubberwood frame with tapered legs and high-density foam cushion. Upholstered in stain-resistant textured boucle fabric for reading nooks and living rooms.',
    price: 295.00,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 12,
    rating: 4.8,
    numReviews: 51,
  },

  // ==========================================
  // 6. BEAUTY & PERSONAL CARE (11 products)
  // ==========================================
  {
    name: 'Vitamin C + Ferulic Acid Brightening Serum',
    description:
      'Potent 15% pure L-ascorbic acid, 1% alpha tocopherol, and 0.5% ferulic acid. Shields skin from free radicals and noticeably brightens skin tone in 4 weeks.',
    price: 68.00,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 40,
    rating: 4.8,
    numReviews: 182,
  },
  {
    name: 'Triple Hyaluronic Acid Deep Moisture Cream',
    description:
      'Intense hydrating face cream powered by three molecular weights of hyaluronic acid and ceramides. Restores moisture barrier without greasy residue.',
    price: 46.00,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 55,
    rating: 4.7,
    numReviews: 144,
  },
  {
    name: 'Sonic Pulsating Electric Toothbrush with Travel Case',
    description:
      '40,000 vibrations per minute magnetic levitation motor. 4 brushing modes, 2-minute smart quadpacer timer, and 30-day battery life per USB charge.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e6a0d33e?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 35,
    rating: 4.7,
    numReviews: 128,
  },
  {
    name: '100% Organic Cold-Pressed Rosehip Seed Oil',
    description:
      'Pure unrefined virgin rosehip oil rich in pro-vitamin A and linolenic acid. Nourishes dry skin, reduces appearance of fine lines, and promotes skin radiance.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 60,
    rating: 4.6,
    numReviews: 210,
  },
  {
    name: 'Ionic Salon-Grade Ultralight Hair Dryer',
    description:
      '110,000 RPM high-speed brushless digital motor. Emits 200 million negative ions to eliminate static, reduce frizz, and dry hair in half the time without heat damage.',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 18,
    rating: 4.9,
    numReviews: 96,
  },
  {
    name: 'Dead Sea Minerals & Himalayan Salt Body Scrub',
    description:
      'Exfoliating body polish infused with sweet almond oil, jojoba, and vitamin E. Gently buffs away dry skin cells to leave skin silky smooth and nourished.',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 45,
    rating: 4.6,
    numReviews: 87,
  },
  {
    name: 'Natural Xiuyan Jade Facial Roller and Gua Sha Set',
    description:
      'Hand-carved authentic Xiuyan jade roller and heart-shaped gua sha scraper. Promotes facial lymphatic drainage, eases muscle tension, and reduces puffiness.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 50,
    rating: 4.5,
    numReviews: 114,
  },
  {
    name: 'French Pink Clay Detoxifying Pore Mask',
    description:
      'Purifying mask formulated with organic French rose clay, witch hazel, and aloe vera. Tightens enlarged pores, absorbs excess oil, and revitalizes tired skin.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1608248597359-bb436a561dc3?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 38,
    rating: 4.7,
    numReviews: 93,
  },
  {
    name: 'Artisan Lavender and Shea Butter Botanical Soap Bar',
    description:
      'Cold-processed organic soap bar enriched with raw unrefined shea butter, pure lavender essential oil, and goat milk. Ultra-gentle cleansing for sensitive skin.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 75,
    rating: 4.8,
    numReviews: 165,
  },
  {
    name: 'Mineral SPF 50 Invisible Sheer Face Sunscreen',
    description:
      '100% zinc oxide broad spectrum sunscreen that blends sheer on all skin tones with zero white cast. Packed with niacinamide and green tea extract for antioxidant defense.',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 52,
    rating: 4.8,
    numReviews: 138,
  },
  {
    name: 'Professional 12-Piece Cruelty-Free Makeup Brush Set',
    description:
      'Ultra-plush synthetic nanofiber bristles with FSC-certified wooden handles. Includes powder, foundation, contour, eyeshadow blending, and precision detail brushes with roll-up case.',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80',
    category: 'Beauty & Personal Care',
    stock: 30,
    rating: 4.6,
    numReviews: 79,
  },

  // ==========================================
  // 7. SPORTS & FITNESS (11 products)
  // ==========================================
  {
    name: 'Non-Slip Eco-Friendly Natural Rubber Yoga Mat',
    description:
      '5mm thick natural tree rubber base topped with moisture-absorbing polyurethane grip surface. Laser-etched alignment system assists mindful posture in hot yoga and pilates.',
    price: 88.00,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 32,
    rating: 4.9,
    numReviews: 147,
  },
  {
    name: 'Adjustable Quick-Select Dumbbell Pair (5-52.5 lbs)',
    description:
      'Replaces 15 sets of weights with intuitive dial adjustment system. Space-saving cast iron plates coated with durable thermoplastic for quiet, clatter-free home workouts.',
    price: 399.00,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 12,
    rating: 4.8,
    numReviews: 95,
  },
  {
    name: 'Insulated 32oz Stainless Steel Sports Water Bottle',
    description:
      'Double-wall vacuum insulation keeps drinks ice-cold for 24 hours or piping hot for 12. Leakproof chug straw lid, powder-coat exterior finish, and BPA-free 18/8 steel.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 65,
    rating: 4.7,
    numReviews: 230,
  },
  {
    name: 'Heavy-Duty Resistance Loop Exercise Bands (Set of 5)',
    description:
      '100% natural Malaysian latex bands offering 10 to 50 lbs of resistance. Ideal for physical therapy, glute activation, pull-up assistance, and mobility training.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 70,
    rating: 4.6,
    numReviews: 185,
  },
  {
    name: 'High-Density Deep Tissue Grid Foam Roller',
    description:
      'Multi-density EVA foam molded over a rigid hollow core. Distributes targeted pressure to relieve muscle soreness, trigger points, and tight IT bands after training.',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 45,
    rating: 4.7,
    numReviews: 122,
  },
  {
    name: 'Ball Bearing High-Speed Aluminum Jump Rope',
    description:
      '360-degree dual ball bearing mechanism prevents twisting and tangling. Kink-free coated steel cable with knurled non-slip aluminum alloy handles for double-unders.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 55,
    rating: 4.8,
    numReviews: 140,
  },
  {
    name: 'Professional Training Boxing Gloves 14oz',
    description:
      'Handcrafted engineered leather with multi-layered foam padding that absorbs impact. Hook-and-loop wrap-around wrist strap provides maximum support for heavy bag sparring.',
    price: 69.00,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 25,
    rating: 4.7,
    numReviews: 78,
  },
  {
    name: 'High-Density Supportive Cork Yoga Blocks (2-Pack)',
    description:
      '100% solid sustainable natural cork blocks. Beveled contoured edges provide stable grip and firm non-slip support to deepen stretches and enhance poses safely.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 40,
    rating: 4.8,
    numReviews: 89,
  },
  {
    name: 'Ultralight Hydration Running Vest with 500ml Flasks',
    description:
      'Breathable 3D mesh chassis with dual front bottle pockets and 5L rear storage. Includes two 500ml soft flasks with bite valves and bungee trekking pole holders.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 22,
    rating: 4.6,
    numReviews: 64,
  },
  {
    name: 'Smart Heart Rate & GPS Fitness Tracker Band',
    description:
      'Continuous heart rate, SpO2, sleep stages, and VO2 max monitoring. Built-in GPS tracks outdoor runs with 14-day battery life and 50m water resistance.',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 30,
    rating: 4.7,
    numReviews: 108,
  },
  {
    name: 'Cast Iron Kettlebell with Color-Coded Vinyl Base (24kg)',
    description:
      'Single-piece cast iron bell with smooth textured wide handle. Protective vinyl bottom shields hardwood floors from scratches during swings, cleans, and squats.',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&auto=format&fit=crop&q=80',
    category: 'Sports & Fitness',
    stock: 18,
    rating: 4.8,
    numReviews: 82,
  },

  // ==========================================
  // 8. BOOKS & STATIONERY (11 products)
  // ==========================================
  {
    name: 'Hardcover Dotted Grid Journal (160 GSM Bamboo Paper)',
    description:
      'Bleed-proof ultra-thick 160 GSM pure bamboo pages. Lay-flat binding, dual ribbon bookmarks, expandable back pocket, and debossed vegan leather cover.',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 60,
    rating: 4.9,
    numReviews: 176,
  },
  {
    name: 'Solid Brass Heavyweight Fountain Pen (Medium Nib)',
    description:
      'Machined from raw solid untreated brass that patinas gracefully with use. German Schmidt iridium medium nib and included international ink converter.',
    price: 58.00,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 25,
    rating: 4.8,
    numReviews: 92,
  },
  {
    name: 'Walnut Wood and Aluminum Desk Organizer Tray',
    description:
      'Solid North American walnut carved with precision CNC routed slots for phones, pens, paperclips, and keys with weighted anodized aluminum base.',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 35,
    rating: 4.7,
    numReviews: 64,
  },
  {
    name: 'Fine-Liner Archival Pigment Ink Pens (Set of 8)',
    description:
      'Waterproof, fade-resistant, and chemical-proof Japanese pigment ink. Tip sizes from ultra-fine 0.05mm to bold 0.8mm for technical drawing and journaling.',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 55,
    rating: 4.8,
    numReviews: 142,
  },
  {
    name: 'Handcrafted Refillable Leather Travelers Notebook',
    description:
      'Full-grain distressed crazy horse leather cover with elastic closure. Includes 3 modular notebook inserts (grid, lined, and blank) and PVC zipper card pouch.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 30,
    rating: 4.8,
    numReviews: 110,
  },
  {
    name: 'Solid Wood Adjustable Book and Tablet Reading Stand',
    description:
      'Natural solid beechwood book holder with 5 adjustable reading angles. Spring-loaded page pegs hold thick cookbooks, textbooks, and tablets effortlessly.',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 28,
    rating: 4.7,
    numReviews: 75,
  },
  {
    name: 'Japanese Brass Ruler and Bookmark with Etched Scales',
    description:
      'Vintage-style 15cm solid brass ruler with metric and imperial laser-etched markings. Slim profile slips easily between book pages as a luxury bookmark.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 45,
    rating: 4.6,
    numReviews: 53,
  },
  {
    name: 'Bottled Calligraphy Dye Ink 50ml (Deep Midnight Blue)',
    description:
      'Rich, free-flowing archival fountain pen ink with subtle red sheen and shading. Ph-neutral water-based formula gentle on delicate vintage pen feeds.',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 40,
    rating: 4.8,
    numReviews: 68,
  },
  {
    name: 'Minimalist Undated Productivity Planner & Daily Goal Tracker',
    description:
      'Structured 6-month goal-setting framework with weekly review spreads and daily time-blocking schedules. 120 GSM bleed-resistant cream paper.',
    price: 27.00,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 50,
    rating: 4.7,
    numReviews: 125,
  },
  {
    name: 'Drafting Mechanical Pencil 0.5mm with Knurled Grip',
    description:
      'All-metal barrel with brass mechanism and non-slip knurled metal grip. Fixed 4mm lead sleeve engineered for precision architectural drafting and lettering.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 60,
    rating: 4.9,
    numReviews: 138,
  },
  {
    name: 'Heavy Glass and Solid Brass Inkwell Paperweight',
    description:
      'Mouth-blown optical glass cube paperweight with recessed brass pen holder. Adds vintage elegance and weighted stability to executive office desks.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    category: 'Books & Stationery',
    stock: 22,
    rating: 4.6,
    numReviews: 37,
  },

  // ==========================================
  // 9. GAMING (11 products)
  // ==========================================
  {
    name: 'SteelSeries Apex Pro TKL Mechanical Gaming Keyboard',
    description:
      'World’s fastest OmniPoint 2.0 adjustable hypermagnetic switches with 0.1mm actuation. OLED smart display, per-key RGB, and aircraft-grade aluminum frame.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1612287232252-788191fa30a8?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 20,
    rating: 4.8,
    numReviews: 165,
  },
  {
    name: 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse',
    description:
      'Featherweight 60-gram esports mouse with HERO 2 sensor offering 32,000 DPI and LIGHTFORCE hybrid optical-mechanical switches. 95 hours of battery life.',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 32,
    rating: 4.9,
    numReviews: 240,
  },
  {
    name: 'Razer BlackShark V2 Pro Wireless Gaming Headset',
    description:
      'TriForce Titanium 50mm drivers and wideband detachable hyperclear boom mic. Ultra-soft breathable memory foam ear cushions and THX Spatial Audio.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 25,
    rating: 4.7,
    numReviews: 142,
  },
  {
    name: 'Xbox Elite Wireless Controller Series 2',
    description:
      'Adjustable-tension thumbsticks, wrap-around rubberized grip, and shorter hair trigger locks. Interchangeable paddles and up to 40 hours of rechargeable battery.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 28,
    rating: 4.8,
    numReviews: 190,
  },
  {
    name: 'Samsung Odyssey Neo G8 32-Inch 4K 240Hz Curved Gaming Monitor',
    description:
      'Quantum Mini-LED 4K display with 240Hz refresh rate and 1ms response time. 1000R curvature and Quantum HDR2000 for breathtaking gaming immersion.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 8,
    rating: 4.8,
    numReviews: 72,
  },
  {
    name: 'Extended XL RGB Cloth Gaming Desk Mousepad (900x400mm)',
    description:
      'Micro-woven cloth surface optimized for both low and high DPI mouse tracking. 14 customizable dynamic RGB lighting zones with water-resistant coating.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 55,
    rating: 4.7,
    numReviews: 188,
  },
  {
    name: 'Ergonomic High-Back Racing Style Gaming Chair',
    description:
      'Steel frame reinforced with cold-cure foam cushioning and breathable PU leather. 4D armrests, 165-degree reclining seatback, and magnetic memory foam head pillow.',
    price: 349.00,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 14,
    rating: 4.6,
    numReviews: 89,
  },
  {
    name: 'HOTAS Flight Simulator Joystick and Throttle System',
    description:
      'Precision magnetic Hall effect sensors with dual throttles, rudder control, and illuminated toggle switches for space and combat flight simulation.',
    price: 219.00,
    image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 12,
    rating: 4.8,
    numReviews: 46,
  },
  {
    name: 'Retro Handheld Portable Gaming Console 3.5-Inch IPS',
    description:
      'Vibrant IPS screen powered by quad-core processor with 64GB storage preloaded with open-source firmware. Dual analog sticks and 3500mAh battery.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1552824722-ddab1374e622?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 35,
    rating: 4.6,
    numReviews: 104,
  },
  {
    name: 'Gaming Headset Stand with Integrated USB 3.0 Hub',
    description:
      'Sturdy aluminum headset holder with anti-slip silicone pads. Built-in 3-port USB 3.0 data hub and 3.5mm AUX headphone jack with ambient base illumination.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 42,
    rating: 4.5,
    numReviews: 83,
  },
  {
    name: 'Wireless Low-Profile Mechanical Gaming Keyboard RGB',
    description:
      'Ultra-thin linear red optical switches with PBT double-shot keycaps. Bluetooth 5.0, 2.4GHz wireless, and USB-C connectivity with volume roller wheel.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    category: 'Gaming',
    stock: 24,
    rating: 4.7,
    numReviews: 97,
  },

  // ==========================================
  // 10. BAGS & TRAVEL (11 products)
  // ==========================================
  {
    name: 'Aer Travel Pack 3 Carry-On Backpack 35L',
    description:
      '1680D Cordura ballistic nylon exterior with YKK AquaGuard zippers. Lay-flat clamshell opening, padded 16-inch laptop pocket, and load-lifter ergonomic straps.',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 22,
    rating: 4.9,
    numReviews: 148,
  },
  {
    name: 'Polycarbonate Hardshell Spinner Carry-On Suitcase',
    description:
      'Aerospace-grade German polycarbonate shell that flexes on impact. 360-degree whisper-quiet Hinomoto spinner wheels, TSA combination lock, and interior compression pad.',
    price: 225.00,
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 18,
    rating: 4.8,
    numReviews: 116,
  },
  {
    name: 'Waterproof Commuter Roll-Top Cycling Backpack 26L',
    description:
      'Seam-welded waterproof TPU coated fabric with magnetic roll-top buckle closure. Ergonomic ventilated back panel and reflective detailing for night safety.',
    price: 115.00,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 30,
    rating: 4.7,
    numReviews: 76,
  },
  {
    name: 'Minimalist EDC Crossbody Sling Bag 4L',
    description:
      'Weather-resistant X-Pac sailcloth sling bag with Fidlock V-buckle magnetic strap. Padded tablet sleeve and hidden passport security pocket against the body.',
    price: 68.00,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 45,
    rating: 4.7,
    numReviews: 134,
  },
  {
    name: 'Heavy 18oz Waxed Canvas Briefcase Messenger Bag',
    description:
      'Treated water-repellent duck canvas trimmed with thick harness leather. Solid brass buckles, dual storm flap compartments, and removable padded shoulder strap.',
    price: 175.00,
    image: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 16,
    rating: 4.8,
    numReviews: 59,
  },
  {
    name: 'Compression Travel Packing Cubes Set (6 Pieces)',
    description:
      'Ultralight ripstop nylon cubes with dual-zipper compression system reducing clothing bulk by 60%. Includes laundry bag and shoe pouch with breathable mesh panels.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 65,
    rating: 4.8,
    numReviews: 215,
  },
  {
    name: 'Heavy Duty Internal Frame Hiking Backpack 65L',
    description:
      'Adjustable torso suspension with breathable lumbar padding. Integrated waterproof rain fly cover, sleeping bag compartment, and hydration reservoir sleeve.',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 15,
    rating: 4.7,
    numReviews: 68,
  },
  {
    name: 'Distressed Leather Passport Holder and Travel Wallet',
    description:
      'Crazy horse cowhide leather with slots for passport, boarding passes, currency, SIM cards, and 5 credit cards with built-in RFID shielding.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 50,
    rating: 4.6,
    numReviews: 92,
  },
  {
    name: 'Heavy Canvas Utility Market Tote Bag',
    description:
      '20oz heavy-duty cotton canvas with reinforced riveted leather carry handles. 6 interior organizer pockets for water bottles, tablets, and groceries.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 40,
    rating: 4.5,
    numReviews: 84,
  },
  {
    name: 'Ultralight Packable Duffle Gym Bag 30L',
    description:
      'Waterproof silicone-coated Cordura ripstop nylon. Weighs under 5oz and packs down to the size of an apple, yet carries up to 30 liters of gym and travel gear.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 50,
    rating: 4.7,
    numReviews: 98,
  },
  {
    name: 'Waterproof Hanging Toiletry Kit Organizer',
    description:
      'Durable water-resistant 300D polyester with stowaway swivel metal hook. 4 transparent zip compartments keep bottles upright and leakproof in hotel bathrooms.',
    price: 26.50,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    category: 'Bags & Travel',
    stock: 55,
    rating: 4.8,
    numReviews: 140,
  },
];

module.exports = catalogueProducts;
