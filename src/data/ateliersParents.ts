import type { AtelierParent } from '../types';

export const INTRO_ATELIERS = {
  clair:
    "Vivre soi-même, quelques minutes, ce que peut vivre un enfant porteur d'un trouble d'apprentissage change souvent plus le regard qu'une explication théorique. Ces deux ateliers, conçus au départ pour les enseignants, sont ouverts aux parents : essayez-les seul, à votre rythme, chez vous.",
  falc:
    "Essayer soi-même, quelques minutes, aide à comprendre son enfant. Ces deux ateliers étaient prévus pour les enseignants. Vous pouvez les essayer aussi. Seul, chez vous, à votre rythme.",
};

const ateliersParents: AtelierParent[] = [
  {
    id: 'dyslexie',
    emoji: '🧠',
    titre: 'Atelier Dyslexie',
    description: "Vivez de l'intérieur la lecture dyslexique : mélange de lettres, décalages, confusions b/d/p/q.",
    url: 'https://atelier-dyslexie-plai.vercel.app/?public=parent',
    questions: {
      clair:
        "Qu'avez-vous ressenti en essayant de lire ce texte déformé ? Beaucoup de parents décrivent de la fatigue, de la frustration, parfois de l'anxiété — c'est exactement ce que peut ressentir votre enfant face à un texte scolaire ordinaire. Qu'est-ce que ça change dans votre regard sur le temps qu'il met à faire ses devoirs de lecture ?",
      falc:
        "Comment vous êtes-vous senti en lisant ce texte difficile ? Fatigué ? Frustré ? C'est peut-être ce que ressent votre enfant à l'école. Ça change quelque chose dans votre regard sur ses devoirs ?",
    },
  },
  {
    id: 'maya',
    emoji: '🏺',
    titre: 'Atelier Maya',
    description: 'Placez des chiffres mayas sur une droite graduée, chronomètre en marche — vivez la désorientation numérique.',
    url: 'https://atelier-maya.vercel.app/?public=parent',
    questions: {
      clair:
        "Qu'avez-vous ressenti face à ces chiffres mayas, avec le chronomètre qui tourne ? Beaucoup de parents décrivent un stress qui empêche de réfléchir clairement — c'est le mécanisme même de l'anxiété mathématique que peut vivre un enfant dyscalculique face à un exercice chronométré. Qu'est-ce que ça change dans votre regard sur la pression du temps lors des devoirs de mathématiques ?",
      falc:
        "Comment vous êtes-vous senti avec le chronomètre qui tourne ? Stressé ? C'est peut-être ce que ressent votre enfant en maths. Ça change quelque chose dans votre regard sur la pression du temps pendant les devoirs ?",
    },
  },
];

export default ateliersParents;
