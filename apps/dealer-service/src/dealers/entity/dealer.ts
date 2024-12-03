import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: 'dealers'
})
export class Dealer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string
}
