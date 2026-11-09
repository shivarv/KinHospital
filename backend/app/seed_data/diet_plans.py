"""Sample diet chart content loaded by `python -m app.seed`.

Each condition has a one-day vegetarian plan. The non-vegetarian plan is
the same day with a few meals swapped (`nonveg_overrides`).
Keep text ASCII: the PDF uses built-in Latin-1 fonts.
"""

EARLY = "Early morning"
BREAKFAST = "Breakfast"
MID = "Mid-morning"
LUNCH = "Lunch"
EVENING = "Evening snack"
DINNER = "Dinner"
BEDTIME = "Bedtime"

DIET_CONDITIONS: list[dict] = [
    {
        "slug": "hair-fall",
        "name": "Hair fall",
        "summary": "Protein, iron and zinc-rich meals to support hair growth.",
        "description": (
            "Hair needs a steady supply of protein, iron, zinc, biotin and healthy fats. This plan spreads "
            "those nutrients across the day and avoids the crash dieting that often triggers hair shedding."
        ),
        "foods_to_include": [
            "Protein at every meal: dal, paneer, curd, sprouts (eggs, chicken, fish if non-veg)",
            "Iron-rich greens: spinach, methi, moringa, with a vitamin C source like lemon or amla",
            "Nuts and seeds: almonds, walnuts, pumpkin, sunflower and flax seeds",
            "Colourful fruit and vegetables for antioxidants",
        ],
        "foods_to_avoid": [
            "Crash diets and long gaps between meals",
            "Excess sugar, sweets and sugary drinks",
            "Deep-fried and ultra-processed snacks",
            "Too much tea or coffee, especially with meals (reduces iron absorption)",
        ],
        "tips": [
            "Sleep 7-8 hours; stress is a common cause of hair fall",
            "Oil and massage the scalp gently once or twice a week",
            "Ask your doctor to check iron, vitamin D, B12 and thyroid levels if shedding continues",
        ],
        "veg": [
            (EARLY, "Warm water, 5 soaked almonds and 2 walnuts"),
            (BREAKFAST, "Moong dal chilla with paneer filling and mint chutney, or vegetable poha with peanuts"),
            (MID, "1 amla or an orange, with a tablespoon of pumpkin seeds"),
            (LUNCH, "2 multigrain rotis, palak dal, mixed vegetable sabzi, a bowl of curd and salad"),
            (EVENING, "Sprouts chaat or roasted chana, with green tea"),
            (DINNER, "Brown rice or quinoa with rajma or chole, and sauteed greens"),
            (BEDTIME, "Warm turmeric milk with 1 tsp flaxseed powder"),
        ],
        "nonveg_overrides": {
            BREAKFAST: "2 boiled eggs or egg bhurji with 1 multigrain toast and sauteed spinach",
            LUNCH: "2 multigrain rotis, home-style chicken curry, vegetable sabzi, curd and salad",
            DINNER: "Grilled fish (salmon, mackerel or sardines) with brown rice and sauteed greens",
        },
    },
    {
        "slug": "acne",
        "name": "Acne and pimples",
        "summary": "Low-sugar, anti-inflammatory eating for clearer skin.",
        "description": (
            "Diets high in sugar and refined carbohydrates can worsen breakouts. This plan keeps blood sugar "
            "steady and adds zinc, omega-3 fats and antioxidants that support skin healing."
        ),
        "foods_to_include": [
            "Low-glycaemic grains: millets, oats, brown rice, whole wheat",
            "Zinc sources: pumpkin seeds, chickpeas, lentils (eggs and seafood if non-veg)",
            "Omega-3 fats: walnuts, flax and chia seeds (oily fish if non-veg)",
            "Vitamin A and C rich produce: carrots, papaya, guava, amla, leafy greens",
            "2.5-3 litres of water a day",
        ],
        "foods_to_avoid": [
            "Sugar, sweets, packaged juices and soft drinks",
            "White bread, maida and bakery products",
            "Deep-fried snacks and fast food",
            "Large amounts of milk and whey protein, if you notice they trigger breakouts",
        ],
        "tips": [
            "Wash your face twice a day and do not pick at pimples",
            "Change pillow covers twice a week",
            "Manage stress and sleep well; both affect hormones that drive acne",
        ],
        "veg": [
            (EARLY, "Warm water with lemon and 5 soaked almonds"),
            (BREAKFAST, "Vegetable oats upma, or 2 millet dosas with sambar"),
            (MID, "A bowl of papaya or a guava"),
            (LUNCH, "Brown rice or 2 jowar rotis, dal, lauki or tinda sabzi, cucumber-carrot salad, buttermilk"),
            (EVENING, "Roasted makhana with spearmint or green tea"),
            (DINNER, "Moong dal vegetable khichdi with sauteed greens"),
            (BEDTIME, "Chamomile tea and a tablespoon of pumpkin seeds"),
        ],
        "nonveg_overrides": {
            BREAKFAST: "Vegetable omelette (2 eggs) with 1 multigrain toast",
            LUNCH: "Brown rice with light fish curry, cucumber-carrot salad and buttermilk",
            DINNER: "Grilled chicken with stir-fried vegetables",
        },
    },
    {
        "slug": "hypothyroidism",
        "name": "Hypothyroidism",
        "summary": "Selenium, zinc and protein-rich meals that support thyroid health.",
        "description": (
            "Food does not replace thyroid medication, but the right diet supports energy, weight and "
            "metabolism. This plan includes selenium, zinc, iodine in moderation and plenty of fibre."
        ),
        "foods_to_include": [
            "1-2 Brazil nuts a day for selenium",
            "Iodised salt in normal amounts",
            "Protein: dal, paneer, curd, sprouts (eggs, fish, chicken if non-veg)",
            "High-fibre foods: whole grains, vegetables, fruit, to ease constipation",
            "Cooked cruciferous vegetables (cabbage, cauliflower, broccoli) are fine in normal portions",
        ],
        "foods_to_avoid": [
            "Large amounts of raw cabbage, cauliflower or kale every day",
            "Excess soy products",
            "Sugar, refined flour and ultra-processed foods",
            "Calcium, iron supplements or soy within 4 hours of your thyroid tablet",
        ],
        "tips": [
            "Take your thyroid tablet on an empty stomach and wait 30-60 minutes before tea, coffee or food",
            "Stay active: 30 minutes of walking or yoga most days helps energy and weight",
            "Get your thyroid levels checked as often as your doctor advises",
        ],
        "veg": [
            (EARLY, "Thyroid tablet with water; after 30-60 minutes, 1 Brazil nut and 4 soaked almonds"),
            (BREAKFAST, "Vegetable daliya, or besan chilla with a bowl of curd"),
            (MID, "An apple or a pear"),
            (LUNCH, "2 multigrain rotis, dal, cooked seasonal vegetables, curd and salad"),
            (EVENING, "Roasted chana with herbal tea"),
            (DINNER, "Millet khichdi, or brown rice with paneer and cooked vegetables"),
            (BEDTIME, "Warm milk with a pinch of turmeric"),
        ],
        "nonveg_overrides": {
            BREAKFAST: "2-egg vegetable omelette with 1 multigrain toast",
            LUNCH: "2 multigrain rotis, grilled fish or fish curry, cooked vegetables and curd",
            DINNER: "Chicken and vegetable stew with a small portion of brown rice",
        },
    },
    {
        "slug": "pcos",
        "name": "PCOS / PCOD",
        "summary": "Low-GI, high-fibre meals to support hormonal balance.",
        "description": (
            "PCOS is closely linked to insulin resistance. Meals built on fibre, protein and healthy fats, "
            "eaten at regular times, help steady blood sugar, support cycles and manage weight."
        ),
        "foods_to_include": [
            "Millets (jowar, bajra, ragi), oats, quinoa and brown rice in place of refined grains",
            "Protein at every meal: dal, chole, tofu, paneer (eggs, fish, chicken if non-veg)",
            "Healthy fats: nuts, seeds, a little ghee or cold-pressed oil",
            "Anti-inflammatory spices: turmeric, cinnamon, methi seeds",
            "Spearmint tea, 1-2 cups a day",
        ],
        "foods_to_avoid": [
            "Sugar, sweets, honey in excess and sugary drinks",
            "Maida, white bread, biscuits and bakery items",
            "Fried snacks and fast food",
            "Skipping breakfast or long gaps between meals",
        ],
        "tips": [
            "Aim for 150 minutes of exercise a week, including 2 strength sessions",
            "Keep regular meal and sleep times",
            "Track your cycle and share it with your practitioner",
        ],
        "veg": [
            (EARLY, "Warm water with 1 tsp soaked methi seeds, or cinnamon water"),
            (BREAKFAST, "Moong dal or besan chilla with mint chutney"),
            (MID, "A handful of almonds, walnuts, flax and pumpkin seeds"),
            (LUNCH, "2 jowar or bajra rotis, dal or chole, vegetable sabzi, a large salad and buttermilk"),
            (EVENING, "Sprouts salad or roasted makhana, with spearmint tea"),
            (DINNER, "Quinoa vegetable pulao with tofu or paneer, and sauteed vegetables"),
            (BEDTIME, "Unsweetened turmeric milk (optional)"),
        ],
        "nonveg_overrides": {
            BREAKFAST: "2 boiled eggs with sauteed vegetables and 1 multigrain toast",
            LUNCH: "2 millet rotis, home-style chicken curry, a large salad and buttermilk",
            DINNER: "Grilled fish with quinoa and sauteed vegetables",
        },
    },
    {
        "slug": "diabetes",
        "name": "Type 2 diabetes and pre-diabetes",
        "summary": "Balanced, portion-controlled meals to keep blood sugar steady.",
        "description": (
            "Steady blood sugar comes from regular meals, controlled portions of carbohydrate, and plenty of "
            "fibre and protein. This plan uses the plate method: half vegetables, a quarter protein, a quarter "
            "whole grains."
        ),
        "foods_to_include": [
            "Non-starchy vegetables at every meal",
            "Whole grains in small portions: millets, oats, brown rice, multigrain atta",
            "Protein: dal, paneer, curd, sprouts (eggs, fish, chicken if non-veg)",
            "Whole fruits such as guava, apple, pear, orange, in single portions",
            "Methi seeds and cinnamon",
        ],
        "foods_to_avoid": [
            "Sugar, sweets, jaggery and honey",
            "Fruit juices, soft drinks and sweetened tea or coffee",
            "Large portions of white rice, maida, potatoes",
            "Fried snacks, namkeen and bakery items",
        ],
        "tips": [
            "Do not skip meals, especially if you take diabetes medicines",
            "Walk for 10-15 minutes after main meals",
            "Check your blood sugar as your doctor advises and never change medication on your own",
        ],
        "veg": [
            (EARLY, "Warm water with 1 tsp soaked methi seeds, and 4 almonds"),
            (BREAKFAST, "Vegetable oats or moong dal chilla, or 2 idlis with sambar"),
            (MID, "A small guava or apple, or a glass of buttermilk"),
            (LUNCH, "Half plate vegetables, quarter dal or paneer, quarter 2 small multigrain rotis; salad and curd"),
            (EVENING, "Roasted chana or sprouts, with unsweetened tea"),
            (DINNER, "2 small millet rotis with dal and vegetable sabzi, eaten early"),
            (BEDTIME, "Unsweetened warm milk (optional)"),
        ],
        "nonveg_overrides": {
            BREAKFAST: "Vegetable omelette (2 eggs) with 1 multigrain toast",
            LUNCH: "Half plate vegetables, quarter grilled chicken or fish, quarter brown rice or roti; salad",
            DINNER: "Chicken or fish stew with vegetables and 1 multigrain roti",
        },
    },
    {
        "slug": "weight-management",
        "name": "Weight management",
        "summary": "High-protein, high-fibre meals for steady, sustainable weight loss.",
        "description": (
            "Lasting weight loss comes from a modest calorie deficit you can keep up. Protein and fibre keep "
            "you full, so this plan builds every meal around them and cuts back on liquid calories and fried food."
        ),
        "foods_to_include": [
            "Protein at every meal: dal, paneer, tofu, Greek yogurt (eggs, chicken, fish if non-veg)",
            "Vegetables filling half your plate",
            "Whole grains in measured portions",
            "Whole fruit instead of juice",
            "Water before meals; 2.5-3 litres a day",
        ],
        "foods_to_avoid": [
            "Sugary drinks, packaged juices and alcohol",
            "Fried snacks, sweets and bakery items",
            "Eating late at night or straight from the packet",
            "Large portions of rice, roti or bread at one meal",
        ],
        "tips": [
            "Aim for 7,000-10,000 steps a day plus 2-3 strength sessions a week",
            "Eat slowly and stop when you are about 80% full",
            "Weigh yourself once a week at the same time, not every day",
        ],
        "veg": [
            (EARLY, "Warm water with lemon and 4 soaked almonds"),
            (BREAKFAST, "Vegetable poha or upma with sprouts, or Greek yogurt with fruit and seeds"),
            (MID, "1 fruit: apple, pear or orange"),
            (LUNCH, "1-2 multigrain rotis, dal, a large portion of vegetable sabzi, salad and buttermilk"),
            (EVENING, "Roasted makhana or chana, with green tea"),
            (DINNER, "Paneer or tofu tikka with a large salad, or vegetable soup with sauteed tofu"),
            (BEDTIME, "Nothing after dinner; herbal tea if you feel hungry"),
        ],
        "nonveg_overrides": {
            BREAKFAST: "Omelette of 3 egg whites and 1 whole egg, with vegetables",
            LUNCH: "Grilled chicken salad, or chicken curry with 1 roti and vegetables",
            DINNER: "Grilled fish or chicken with sauteed vegetables or clear soup",
        },
    },
    {
        "slug": "acidity",
        "name": "Acidity and digestion",
        "summary": "Gentle, regular meals to ease acidity, bloating and gas.",
        "description": (
            "Acidity and bloating often come from large, late, spicy or oily meals. This plan uses smaller, "
            "regular meals of easy-to-digest food, plus probiotics like curd and buttermilk."
        ),
        "foods_to_include": [
            "Cooked, lightly spiced vegetables: lauki, pumpkin, carrot, beans",
            "Moong dal, rice, oats and soft rotis",
            "Curd and buttermilk with roasted jeera",
            "Banana, papaya and coconut water",
            "Fennel (saunf), ajwain and ginger in cooking or as tea",
        ],
        "foods_to_avoid": [
            "Very spicy, oily and deep-fried food",
            "Tea or coffee on an empty stomach",
            "Carbonated drinks and alcohol",
            "Large meals and eating within 2-3 hours of bedtime",
        ],
        "tips": [
            "Eat slowly and chew well",
            "Do not lie down for at least 2 hours after meals",
            "Raise the head of your bed slightly if you get acidity at night",
        ],
        "veg": [
            (EARLY, "Lukewarm water with 5-6 soaked raisins, or a ripe banana"),
            (BREAKFAST, "Oats porridge with banana, or 2 idlis with mild sambar"),
            (MID, "A bowl of papaya or a glass of coconut water"),
            (LUNCH, "Rice or 2 soft rotis, moong dal, lauki or pumpkin sabzi, curd or jeera buttermilk"),
            (EVENING, "Fennel tea with roasted makhana"),
            (DINNER, "Moong dal khichdi with a little ghee and cooked vegetables, by 7:30 pm"),
            (BEDTIME, "Warm fennel water or chamomile tea"),
        ],
        "nonveg_overrides": {
            LUNCH: "Rice with a mild chicken stew, cooked vegetables and buttermilk",
            DINNER: "Steamed or poached fish with rice and cooked vegetables, by 7:30 pm",
        },
    },
]


def meals_for(condition: dict, diet_type: str) -> list[tuple[str, str]]:
    """Expand a condition into its ordered (meal_time, items) list for veg or nonveg."""
    if diet_type == "veg":
        return list(condition["veg"])
    overrides = condition.get("nonveg_overrides", {})
    return [(time, overrides.get(time, items)) for time, items in condition["veg"]]
