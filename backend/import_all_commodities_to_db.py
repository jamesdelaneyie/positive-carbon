from models import db, Commodity
from app import app


# Got to add the app context to the db
app.app_context().push()

# List of Symbols taken from https://commodities-api.com/symbols
# Copilot to autocomplete the rest of the Commodity info to add to db

symbols = 'ALU,COFFEE,BRENTOIL,CANO,LCO,COCOA,XCU,CORN,COTTON,CPO,ETHANOL,GFU22,XAU,HOU22,IRD,LHOG,LCAT,LGOU22,LUMBER,NG,COAL,NI,OAT,XPD,XPT,POTATOES,XRX22,RICE,XRP2,ROBUSTA,RUBBER,RUTH,XAG,SOYBEAN,SUGAR,TIN,UK-EL,UK-NG,ZWH23,WTIOIL,ZNC'


db.session.add(Commodity(name='Aluminium', symbol='ALU', description='Aluminium is a silvery-white, soft, non-magnetic and ductile metal in the boron group.'))

db.session.add(Commodity(name='Coffee', symbol='COFFEE', description='Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.'))

db.session.add(Commodity(name='Brent Crude Oil', symbol='BRENTOIL', description='Brent Crude Oil is a major trading classification of sweet light crude oil that serves as a major benchmark price for purchases of oil worldwide.'))

db.session.add(Commodity(name='Canola', symbol='CANO', description='Canola is a variety of rapeseed that is low in erucic acid, as opposed to colza, which is high in erucic acid.'))

db.session.add(Commodity(name='Cheese', symbol='CSCU22', description='Cheese is a dairy product, derived from milk and produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein.'))

db.session.add(Commodity(name='Cobalt', symbol='LCO', description='Cobalt is a chemical element with the symbol Co and atomic number 27.'))

db.session.add(Commodity(name='Cocoa', symbol='COCOA', description='Cocoa is a product of the Theobroma cacao tree. The tree is native to the deep tropical regions of Central and South America.'))

db.session.add(Commodity(name='Copper', symbol='XCU', description='Copper is a chemical element with the symbol Cu (from Latin: cuprum) and atomic number 29.'))

db.session.add(Commodity(name='Corn', symbol='CORN', description='Corn is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago.'))

db.session.add(Commodity(name='Cotton', symbol='COTTON', description='Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants of the genus Gossypium.'))

db.session.add(Commodity(name='Crude Palm Oil', symbol='CPO', description='Crude Palm Oil is a vegetable oil derived from the mesocarp (reddish pulp) of the fruit of the oil palms, primarily the African oil palm Elaeis guineensis, and to a lesser extent from the American oil palm Elaeis oleifera and the maripa palm Attalea maripa.'))

db.session.add(Commodity(name='Ethanol', symbol='ETHANOL', description='Ethanol is an organic compound, a simple alcohol with the chemical formula C2H5OH.'))

db.session.add(Commodity(name='Feeder Cattle', symbol='GFU22', description='Feeder Cattle is a contract for the delivery of live cattle at a specified future date.'))

db.session.add(Commodity(name='Gold', symbol='XAU', description='Gold is a chemical element with the symbol Au (from Latin: aurum) and atomic number 79, making it one of the higher atomic number elements that occur naturally.'))

db.session.add(Commodity(name='Heating Oil', symbol='HOU22', description='Heating Oil is a low viscosity, liquid petroleum product used as a fuel oil for furnaces or boilers in buildings.'))

db.session.add(Commodity(name='Iridium', symbol='IRD', description='Iridium is a chemical element with the symbol Ir and atomic number 77.'))

db.session.add(Commodity(name='Lean Hogs', symbol='LHOG', description='Lean Hogs is a contract for the delivery of live hogs at a specified future date.'))

db.session.add(Commodity(name='Live Cattle', symbol='LCAT', description='Live Cattle is a contract for the delivery of live cattle at a specified future date.'))

db.session.add(Commodity(name='London Gas Oil', symbol='LGOU22', description='London Gas Oil is a contract for the delivery of gas oil at a specified future date.'))

db.session.add(Commodity(name='Lumber', symbol='LUMBER', description='Lumber is a type of wood that has been processed into beams and planks, a stage in the process of wood production.'))

db.session.add(Commodity(name='Milk', symbol='DCU22', description='Milk is a nutrient-rich, white liquid food produced by the mammary glands of mammals.'))

db.session.add(Commodity(name='Natural Gas', symbol='NG', description='Natural Gas is a naturally occurring hydrocarbon gas mixture consisting primarily of methane, but commonly including varying amounts of other higher alkanes, and sometimes a small percentage of carbon dioxide, nitrogen, oxygen, and sulfur.'))

db.session.add(Commodity(name='Newcastle Coal Futures', symbol='COAL', description='Coal is a combustible black or brownish-black sedimentary rock usually occurring in rock strata in layers or veins called coal beds or coal seams.'))

db.session.add(Commodity(name='Nickel', symbol='NI', description='Nickel is a chemical element with the symbol Ni and atomic number 28.'))

db.session.add(Commodity(name='Oats', symbol='OAT', description='Oats are a type of cereal grain grown for its seed, which is known by the same name (usually in the plural, unlike other cereals and pseudocereals).'))

db.session.add(Commodity(name='Palladium', symbol='XPD', description='Palladium is a chemical element with the symbol Pd and atomic number 46.'))

db.session.add(Commodity(name='Platinum', symbol='XPT', description='Platinum is a chemical element with the symbol Pt and atomic number 78.'))

db.session.add(Commodity(name='Potatoes', symbol='POTATOES', description='Potatoes are a starchy, tuberous crop from the perennial nightshade Solanum tuberosum.'))

db.session.add(Commodity(name='Rapeseed', symbol='XRX22', description='Rapeseed is a bright yellow flowering cruciferous plant of the genus Brassica grown for its oil-rich seed.'))

db.session.add(Commodity(name='Rice', symbol='RICE', description='Rough Rice is a contract for the delivery of rice at a specified future date.'))

db.session.add(Commodity(name='Robusta Coffee', symbol='ROBUSTA', description='Robusta Coffee is a contract for the delivery of Robusta Coffee at a specified future date.'))

db.session.add(Commodity(name='Rubber', symbol='RUBBER', description='Rubber is a natural polymer of isoprene, an organic compound, that is used in many applications.'))

db.session.add(Commodity(name='Ruthenium', symbol='RUTH', description='Ruthenium is a chemical element with the symbol Ru and atomic number 44.'))

db.session.add(Commodity(name='Silver', symbol='XAG', description='Silver is a chemical element with the symbol Ag (from the Latin argentum, derived from the Indo-European root *argy- for "shiny" or "white") and atomic number 47.'))

db.session.add(Commodity(name='Soybeans', symbol='SOYBEANS', description='Soybeans are a species of legume native to East Asia, widely grown for its edible bean which has numerous uses.'))

db.session.add(Commodity(name='Sugar', symbol='SBH23', description='Sugar is the generic name for sweet, soluble carbohydrates, many of which are used in food.'))

db.session.add(Commodity(name='Tin', symbol='TIN', description='Tin is a chemical element with the symbol Sn (from Latin: stannum) and atomic number 50.'))

db.session.add(Commodity(name='UK Electricity', symbol='UK-EL', description='UK Electricity is a contract for the delivery of electricity at a specified future date.'))

db.session.add(Commodity(name='UK Gas', symbol='UK-NG', description='UK Gas is a contract for the delivery of gas at a specified future date.'))

db.session.add(Commodity(name='Wheat', symbol='ZWH23', description='Wheat is a cereal grain, originally from the Levant region but now cultivated worldwide.'))

db.session.add(Commodity(name='WTI Crude Oil', symbol='WTIOIL', description='WTI Crude Oil is a contract for the delivery of crude oil at a specified future date.'))

db.session.add(Commodity(name='Zinc', symbol='ZINC', description='Zinc is a chemical element with the symbol Zn and atomic number 30.'))

# Commit the changes to the database
db.session.commit()
