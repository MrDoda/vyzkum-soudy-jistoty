import getDb from '../database'

const dbPromise = getDb(true)

export const getCurrentQuestion = async (user, type = 'duo') => {
  const variant = user[`${type}TestVariant`]
  const questions = user[`${type}TestQuestions`]
  const currentVariant = user[`${type}Variant`]
  const variantOrder = user[`${type}TestVariantOrder`]

  const questionQuery = `
                              SELECT 
                                  Q.*,
                                  O1.content AS option1Content,
                                  O2.content AS option2Content,
                                  O3.content AS option3Content,
                                  O4.content AS option4Content
                              FROM 
                                  Question Q
                              LEFT JOIN 
                                  QOption O1 ON Q.option1 = O1.ID
                              LEFT JOIN 
                                  QOption O2 ON Q.option2 = O2.ID
                              LEFT JOIN 
                                  QOption O3 ON Q.option3 = O3.ID
                              LEFT JOIN 
                                  QOption O4 ON Q.option4 = O4.ID
                              WHERE 
                                  ${
                                    questions.length > 0
                                      ? `Q.ID NOT IN (${questions.join(
                                          ','
                                        )}) AND`
                                      : ''
                                  } 
                                  Q.variant = '${variant}' AND 
                                  Q.type = '${currentVariant}' 
                              ORDER BY 
                                  RAND() 
                              LIMIT 1;
                              `

  let question = undefined
  try {
    const [questionResult] = await dbPromise.query(questionQuery)

    if (questionResult.length < 1) {
      return { testFinished: true }
    }

    question = questionResult[0]
  } catch (error) {
    console.error('No Question?', error)
    return
  }

  questions.push(question.ID)
  const stringifiedQuestions = JSON.stringify(questions)
  const stringifiedTestVariantOrder = JSON.stringify(variantOrder)

  const updateQuestions = `UPDATE User SET ${type}TestQuestions = '${stringifiedQuestions}', ${type}TestVariantOrder = '${stringifiedTestVariantOrder}' WHERE userKey = '${user.userKey}';`
  console.log('updateUser', updateQuestions)
  try {
    await dbPromise.query(updateQuestions)
    return { question }
  } catch (error) {
    console.error('Failed to update user', error)
    return
  }
}
