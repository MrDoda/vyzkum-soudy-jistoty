export interface Question {
  ID: number
  questionType: string
  firstWord: string
  description: string
  createdDate: string
  orderNumber: number
  option1: number
  option2: number
  option3: number
  option4: number
  variant: string
  type: 'bool' | 'alltext' | 'anatext' | 'image'
}
