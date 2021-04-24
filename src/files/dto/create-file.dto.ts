import { IsNotEmpty } from 'class-validator'

export class CreateFileDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  size: number

  @IsNotEmpty()
  key: string

  @IsNotEmpty()
  url: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  projectId: string
}