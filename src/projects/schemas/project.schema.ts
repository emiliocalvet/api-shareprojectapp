import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProjectDocument = Project & Document

@Schema()
export class Project{
  @Prop({required: true})
  name1: string

  @Prop()
  name2: string

  @Prop()
  phone1: string

  @Prop()
  phone2: string

  @Prop()
  address: string

  @Prop({required: true})
  key: string

  @Prop()
  type: string

  @Prop()
  branch: string

  @Prop()
  area: number

  @Prop()
  rrtNumber: string
}

export const ProjectSchema = SchemaFactory.createForClass(Project)