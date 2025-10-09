import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { coffeesTable, flavorsTable, coffeeFlavorsTable } from '../db/schema';

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
  try {
    const coffees = await this.db.select().from(coffeesTable);

    // For each coffee, fetch related flavors
    const result = await Promise.all(
      coffees.map(async (coffee) => {
        const flavorRelations = await this.db
          .select({
            id: flavorsTable.id,
            name: flavorsTable.name,
          })
          .from(flavorsTable)
          .innerJoin(
            coffeeFlavorsTable,
            eq(flavorsTable.id, coffeeFlavorsTable.flavorId),
          )
          .where(eq(coffeeFlavorsTable.coffeeId, coffee.id));

        return {
          ...coffee,
          flavors: flavorRelations.map((f) => ({
            id: f.id,
            name: f.name,
          })),
        };
      }),
    );
    return result;
  } catch (error) {
   console.error('Error fetching coffees:', error);
    throw error;
  }
    
  }
  async findOne(id: number) {
    try{
        const coffee = await this.db
      .select()
      .from(coffeesTable)
      .where(eq(coffeesTable.id, id));

    if (!coffee.length) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    const flavors = await this.db
      .select({
        id: flavorsTable.id,
        name: flavorsTable.name,
      })
      .from(flavorsTable)
      .innerJoin(
        coffeeFlavorsTable,
        eq(flavorsTable.id, coffeeFlavorsTable.flavorId),
      )
      .where(eq(coffeeFlavorsTable.coffeeId, id));

    return {
      ...coffee[0],
      flavors,
    };
    } catch (error) {
       console.error('Error fetching coffee:', error);
      throw error;
    }
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
   try {
      const updatedCoffee = await this.db
      .update(coffeesTable)
      .set(updateCoffeeDto)
      .where(eq(coffeesTable.id, id))
      .returning();
    return updatedCoffee[0];
    } catch (error) {
      console.error('Error updating coffee:', error);
      throw error;
    }
  }

  async remove(id: number) {
     try {
      const result = await this.db
      .delete(coffeesTable)
      .where(eq(coffeesTable.id, id))
      .returning();
    } catch (error) {
      console.error('Error deleting coffee:', error);
      throw error;
    }
  }
}
