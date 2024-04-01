import { numberOfQuestionsPerVariant } from '../config'
import getDb from '../database'

const dbPromise = getDb(true)

export const getUser = async (userKey) => {
  const query = `SELECT * FROM user WHERE userKey = "${userKey}";`

  try {
    const [results] = await dbPromise.query(query)

    if (Array.isArray(results) && results.length < 1) {
      console.error('Login Failed due to no results')
      return
    }

    const user = results[0]

    try {
      user.duoTestQuestions = JSON.parse(user.duoTestQuestions)
      user.duoTestVariantOrder = JSON.parse(user.duoTestVariantOrder)

      if (!user.duoVariant) {
        user.duoVariant = user.duoTestVariantOrder[0]
      }

      if (
        user.duoTestQuestions.length >=
        numberOfQuestionsPerVariant[user.duoVariant]
      ) {
        user.duoTestVariantOrder = user.duoTestVariantOrder.filter(
          (variant) => variant !== user.duoVariant
        )
        user.duoVariant = user.duoTestVariantOrder[0]
        user.duoTestQuestions = []
      }
    } catch (error) {
      console.log('Failed to parse user data', error)
    }

    if (
      user.duoTestQuestions.length > 1 &&
      user.duoTestQuestions[user.duoTestQuestions.length - 1]
    ) {
      user.lastQuestion =
        user.duoTestQuestions[user.duoTestQuestions.length - 1]
    }

    try {
      user.soloTestQuestions = JSON.parse(user.soloTestQuestions)
      user.soloTestVariantOrder = JSON.parse(user.soloTestVariantOrder)

      if (!user.soloVariant) {
        user.soloVariant = user.soloTestVariantOrder[0]
      }

      if (
        user.soloTestQuestions.length >=
        numberOfQuestionsPerVariant[user.soloVariant]
      ) {
        user.soloTestVariantOrder = user.soloTestVariantOrder.filter(
          (variant) => variant !== user.soloVariant
        )
        user.soloVariant = user.soloTestVariantOrder[0]
        user.soloTestQuestions = []
      }
    } catch (error) {
      console.log('Failed to parse user data', error)
    }

    if (
      user.soloTestQuestions.length > 1 &&
      user.soloTestQuestions[user.soloTestQuestions.length - 1]
    ) {
      user.lastQuestion =
        user.soloTestQuestions[user.soloTestQuestions.length - 1]
    }

    return user
  } catch (error) {
    console.error('user error', error)
    return
  }
}
