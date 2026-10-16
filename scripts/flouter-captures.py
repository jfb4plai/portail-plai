"""Floute les donnees personnelles des captures des reglages Claude.

Usage : python -I scripts/flouter-captures.py <dossier_originaux> <dossier_sortie>

Originaux (jamais copies dans public/) : 2.png, 3.png, 4.png.
Rectangles = (x0, y0, x1, y1) en pixels de l'original, releves a la main le 2026-10-16.

Points d'ancrage des numeros (pourcentage largeur, hauteur de l'original),
reutilises par les guides HTML :
  parametrer-01-menu-parametres  (4.png, 484x933)
    1 = puce profil en bas a gauche   (13, 97)
    2 = ligne "Parametres"            (14, 61.6)
  parametrer-02-profil           (3.png, 1366x852)
    1 = "Compte" dans la liste        (7, 18.5)
    2 = titre "Profil"               (19, 8.8)
    3 = "Instructions pour Claude"    (25, 45.8)
    4 = "Instructions enregistrees sur cet ordinateur" (35, 77.5)
  parametrer-03-zones-instructions (2.png, 1380x858)
    1 = "Instructions pour Claude"    (25, 23)
    2 = "Instructions enregistrees sur cet ordinateur" (35, 54.4)
    3 = bouton "Ne pas ajouter"       (70.5, 95.9)
    4 = bouton "Ajouter aux Instructions pour Claude" (86.9, 95.9)
"""
import sys
from pathlib import Path
from PIL import Image, ImageFilter

LARGEUR_MAX = 1200
FLOU = 14

CAPTURES = {
    "4.png": ("parametrer-01-menu-parametres.png", [
        (10, 225, 450, 533),    # titres de sessions
        (22, 541, 215, 560),    # e-mail
        (300, 700, 484, 860),   # fragment de texte derriere le menu
        (10, 893, 125, 923),    # pastille nom
    ]),
    "3.png": ("parametrer-02-profil.png", [
        (1288, 119, 1334, 165),  # initiales
        (1088, 193, 1333, 228),  # nom complet
        (1088, 256, 1333, 291),  # comment vous appeler
        (233, 441, 1333, 617),   # contenu Instructions pour Claude
        (233, 777, 1333, 852),   # contenu zone locale
    ]),
    "2.png": ("parametrer-03-zones-instructions.png", [
        (0, 0, 12, 858),         # fragments de la liste de sessions
        (1098, 62, 1342, 97),    # comment vous appeler
        (242, 248, 1343, 423),   # contenu Instructions pour Claude
        (242, 583, 1343, 758),   # contenu zone locale
    ]),
}


def main(dossier_in: Path, dossier_out: Path) -> None:
    dossier_out.mkdir(parents=True, exist_ok=True)
    for source, (sortie, rectangles) in CAPTURES.items():
        img = Image.open(dossier_in / source).convert("RGB")
        for box in rectangles:
            zone = img.crop(box).filter(ImageFilter.GaussianBlur(FLOU))
            img.paste(zone, box[:2])
        if img.width > LARGEUR_MAX:
            h = round(img.height * LARGEUR_MAX / img.width)
            img = img.resize((LARGEUR_MAX, h), Image.LANCZOS)
        img.save(dossier_out / sortie, optimize=True)
        print(sortie, img.size)


if __name__ == "__main__":
    main(Path(sys.argv[1]), Path(sys.argv[2]))
