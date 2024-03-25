const { v4: uuidv4 } = require('uuid')

let words = [
  'freedom',
  'elegant',
  'harmony',
  'adventure',
  'serenity',
  'mystery',
  'journey',
  'destiny',
  'discovery',
  'dream',
  'vision',
  'promise',
  'dawn',
  'insight',
  'wisdom',
  'courage',
  'hope',
  'spirit',
  'valor',
  'bliss',
  'miracle',
  'peace',
  'zenith',
  'renaissance',
  'genesis',
  'oasis',
  'nirvana',
  'utopia',
  'serendipity',
  'epiphany',
  'vibrance',
  'clarity',
  'solace',
  'ascent',
  'infinity',
  'radiance',
  'aurora',
  'symphony',
  'harbinger',
  'voyage',
  'odyssey',
  'legacy',
  'paradise',
  'spectacle',
  'reverie',
]

let usedWords = new Set()

const sessionIDMiddleware = (req, res, next) => {
  if (!req.session.sessionId) {
    let randomWord
    if (usedWords.size === words.length) {
      usedWords.clear()
    }

    do {
      randomWord = words[Math.floor(Math.random() * words.length)]
    } while (usedWords.has(randomWord))

    usedWords.add(randomWord)
    req.session.sessionId = `${uuidv4()}_${randomWord}`
  }
  console.log('session_', req.session.sessionId.split('_')[1])
  console.log('admin', req.session.isAdmin)
  console.log('req', req.body)
  next()
}

module.exports = sessionIDMiddleware
