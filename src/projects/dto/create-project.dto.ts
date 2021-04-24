import { IsNotEmpty } from 'class-validator'

export class CreateProjectDto {
  @IsNotEmpty()
  name1: string

  name2: string

  phone1: string

  phone2: string

  address: string

  @IsNotEmpty()
  key: string

  type: string

  brach: string

  area: number
  
  rrtNumber: string
}