"""Affiche le texte d'un .docx, un paragraphe par ligne (python -I scripts/lire-docx.py fichier.docx)."""
import sys
from docx import Document

sys.stdout.reconfigure(encoding="utf-8")

for p in Document(sys.argv[1]).paragraphs:
    print(p.text)
