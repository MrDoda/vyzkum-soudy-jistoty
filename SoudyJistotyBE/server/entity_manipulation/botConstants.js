/*
1. Vysoká jistota, Vysoká dominance, Vysoká kompetence (chybovost)
2. Vysoká jistota, Vysoká dominance, Nízká kompetence
3. Vysoká jistota, Nízká dominance, Vysoká kompetence
4. Vysoká jistota, Nízká dominance, Nízká kompetence
5. Nízká jistota, Vysoká dominance, Vysoká kompetence
6. Nízká jistota, Vysoká dominance, Nízká kompetence
7. Nízká jistota, Nízká dominance, Vysoká kompetence
8. Nízká jistota, Nízká dominance, Nízká kompetence
 */

export const botConstants = {
  HIGH_CONFIDENCE_HIGH_COMPETENCE: 1,
  HIGH_CONFIDENCE_LOW_COMPETENCE: 2,
  LOW_CONFIDENCE_HIGH_COMPETENCE: 3,
  LOW_CONFIDENCE_LOW_COMPETENCE: 4,
}

export function getBotConstant(input) {
  try {
    const number = Number(input) + 1

    if (isNaN(number)) {
      console.error('wrong bot variant')
      return botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE
    }

    switch (number) {
      case botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE:
        return botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE
      case botConstants.HIGH_CONFIDENCE_LOW_COMPETENCE:
        return botConstants.HIGH_CONFIDENCE_LOW_COMPETENCE
      case botConstants.LOW_CONFIDENCE_HIGH_COMPETENCE:
        return botConstants.LOW_CONFIDENCE_HIGH_COMPETENCE
      case botConstants.LOW_CONFIDENCE_LOW_COMPETENCE:
        return botConstants.LOW_CONFIDENCE_LOW_COMPETENCE
      default:
        return botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE
    }
  } catch {
    console.error('wrong bot variant')
    return botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE
  }
}

export const botProperties = {
  [botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE]: {
    confidence: 80,
    competence: 80,
  },
  [botConstants.HIGH_CONFIDENCE_LOW_COMPETENCE]: {
    confidence: 80,
    competence: 50,
  },
  [botConstants.LOW_CONFIDENCE_HIGH_COMPETENCE]: {
    confidence: 50,
    competence: 80,
  },
  [botConstants.LOW_CONFIDENCE_LOW_COMPETENCE]: {
    confidence: 50,
    competence: 50,
  },
}

export const botModifier = {
  [botProperties[botConstants.HIGH_CONFIDENCE_HIGH_COMPETENCE].confidence]: 2,
  [botProperties[botConstants.HIGH_CONFIDENCE_LOW_COMPETENCE].confidence]: 2,
  [botProperties[botConstants.LOW_CONFIDENCE_HIGH_COMPETENCE].confidence]: 4,
  [botProperties[botConstants.LOW_CONFIDENCE_LOW_COMPETENCE].confidence]: 4,
}

export const pickRandomBotProperties = () => {
  const keys = Object.keys(botProperties)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return botProperties[randomKey]
}
