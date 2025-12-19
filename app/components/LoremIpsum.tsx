interface LoremIpsumProps {
  paragraphs?: number
  sentences?: number
  words?: number
  className?: string
}

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

function generateWords(count: number): string {
  const words: string[] = []
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[i % LOREM_WORDS.length])
  }
  return words.join(' ')
}

function generateSentence(wordCount: number = 10): string {
  const sentence = generateWords(wordCount)
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
}

function generateParagraph(sentenceCount: number = 5): string {
  const sentences: string[] = []
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(Math.floor(Math.random() * 10) + 5))
  }
  return sentences.join(' ')
}

export function LoremIpsum({
  paragraphs,
  sentences,
  words,
  className = '',
}: LoremIpsumProps) {
  let content: React.ReactNode

  if (paragraphs) {
    const paragraphElements = []
    for (let i = 0; i < paragraphs; i++) {
      paragraphElements.push(
        <p key={i} className="mb-4 last:mb-0">
          {generateParagraph()}
        </p>
      )
    }
    content = <div className={className}>{paragraphElements}</div>
  } else if (sentences) {
    const sentenceTexts = []
    for (let i = 0; i < sentences; i++) {
      sentenceTexts.push(generateSentence())
    }
    content = <p className={className}>{sentenceTexts.join(' ')}</p>
  } else if (words) {
    content = <span className={className}>{generateWords(words)}</span>
  } else {
    // Default: 3 paragraphs
    const paragraphElements = []
    for (let i = 0; i < 3; i++) {
      paragraphElements.push(
        <p key={i} className="mb-4 last:mb-0">
          {generateParagraph()}
        </p>
      )
    }
    content = <div className={className}>{paragraphElements}</div>
  }

  return <>{content}</>
}
