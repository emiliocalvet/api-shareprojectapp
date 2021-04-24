import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FilesDocument = Files & Document

@Schema()
export class Files{
  @Prop({required: true})
  name: string

  @Prop({required: true})
  size: number

  @Prop({required: true})
  key: string

  @Prop({required: true})
  url: string

  @Prop({required: true})
  type: string

  @Prop({required: true})
  projectId: string
}

export const FilesSchema = SchemaFactory.createForClass(Files)