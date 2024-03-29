export interface Question {
  ID: number
  questionType: string
  firstWord: string
  description: string
  createdDate: string
  orderNumber: number
  option1: number
  option1Content: string
  option2: number
  option2Content: string
  option3: number
  option3Content: string
  option4: number
  option4Content: string
  variant: string
  type: 'bool' | 'alltext' | 'anatext' | 'image'
}
