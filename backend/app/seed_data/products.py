"""Sample products loaded by `python -m app.seed`. Edit them later in the admin UI."""

from decimal import Decimal

PRODUCTS: list[dict] = [
    # Homeopathy
    {
        "name": "Arnica Montana 30C",
        "category": "homeopathy",
        "short_description": "Traditionally used for bruises, muscle soreness and strain.",
        "pack_size": "30 ml dilution",
        "price": Decimal("8.00"),
    },
    {
        "name": "Nux Vomica 30C",
        "category": "homeopathy",
        "short_description": "Traditionally used for indigestion and acidity after rich meals.",
        "pack_size": "30 ml dilution",
        "price": Decimal("8.00"),
    },
    {
        "name": "Calendula Officinalis Q",
        "category": "homeopathy",
        "short_description": "Mother tincture traditionally used on minor cuts and skin irritation.",
        "pack_size": "30 ml tincture",
        "price": Decimal("10.00"),
    },
    {
        "name": "Kali Phosphoricum 6X",
        "category": "homeopathy",
        "short_description": "Tissue salt traditionally used for mental fatigue and stress.",
        "pack_size": "25 g tablets",
        "price": Decimal("7.00"),
    },
    {
        "name": "Five Phos 6X",
        "category": "homeopathy",
        "short_description": "Combination tissue salt traditionally used for general weakness.",
        "pack_size": "25 g tablets",
        "price": Decimal("7.50"),
    },
    # Hair supplements
    {
        "name": "KIN Hair Nourish Biotin Complex",
        "category": "hair_supplement",
        "short_description": "Biotin, zinc and selenium to support healthy hair and nails.",
        "pack_size": "60 tablets",
        "price": Decimal("24.00"),
    },
    {
        "name": "KIN Root Strength Hair Gummies",
        "category": "hair_supplement",
        "short_description": "Biotin and vitamin D in a sugar-light daily gummy.",
        "pack_size": "60 gummies",
        "price": Decimal("19.00"),
    },
    {
        "name": "Bhringraj & Amla Hair Capsules",
        "category": "hair_supplement",
        "short_description": "Traditional Ayurvedic herbs for hair and scalp health.",
        "pack_size": "60 capsules",
        "price": Decimal("18.00"),
    },
    # Other supplements
    {
        "name": "Vitamin D3 2000 IU",
        "category": "supplement",
        "short_description": "Daily vitamin D for bone, muscle and immune health.",
        "pack_size": "60 softgels",
        "price": Decimal("12.00"),
    },
    {
        "name": "Omega-3 Fish Oil 1000 mg",
        "category": "supplement",
        "short_description": "EPA and DHA to support heart, brain and skin health.",
        "pack_size": "60 softgels",
        "price": Decimal("20.00"),
    },
    {
        "name": "Ashwagandha Root Extract 500 mg",
        "category": "supplement",
        "short_description": "Adaptogenic herb traditionally used for stress and sleep.",
        "pack_size": "60 capsules",
        "price": Decimal("15.00"),
    },
    {
        "name": "Triphala Tablets",
        "category": "supplement",
        "short_description": "Classic Ayurvedic blend traditionally used for digestion.",
        "pack_size": "60 tablets",
        "price": Decimal("10.00"),
    },
]
