import { IsNotEmpty } from 'class-validator'

export class UploadFileConfigDto {
  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  projectId: string
}