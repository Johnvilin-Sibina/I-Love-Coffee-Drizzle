import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { coffeesTable } from '../db/schema';

@Injectable()
export class CoffeesService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: any,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
  try {
    const result = await this.db
      .insert(coffeesTable)
      .values(createCoffeeDto)
      .returning();
    return result[0];
  } catch (error) {
    console.error('Error creating coffee:', error);
    throw error;
  }
}
  async findAll() {
    return await this.db.select().from(coffeesTable);
  }

  async findOne(id: number) {
    const result = await this.db
      .select()
      .from(coffeesTable)
      .where(eq(coffeesTable.id, id));
    return result[0];
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const result = await this.db
      .update(coffeesTable)
      .set(updateCoffeeDto)
      .where(eq(coffeesTable.id, id))
      .returning();
    return result[0];
  }

  async remove(id: number) {
    const result = await this.db
      .delete(coffeesTable)
      .where(eq(coffeesTable.id, id))
      .returning();
    return result[0];
  }
}
