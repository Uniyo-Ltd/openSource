// app/api/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db, ensureDbInitialized } from '../lib/db/index';
import { user } from '../lib/db/schema';



const tableConfig = {
    ...user,
    tableName: 'my_table',
  };

export const myTable = tableConfig;

export async function GET1(request: NextRequest) {
  const data = { message: 'Hello World' }
  return NextResponse.json(data, { status: 200 })
}

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    if (!db) {
      throw new Error('Database not initialized');
    }

    const result = await db.select().from(myTable);
    
    if (!result.length) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ message: 'An error occurred', error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    try {
      // Parse the request body
      const body = await request.json();
  
      // Ensure the database is initialized
      await ensureDbInitialized();
  
      // Insert the data into the database
      if (db) {
        const result = await db.insert(tableConfig).values(body);
        } else {
            throw new Error('Database not initialized');
        }
      // Return a success response
      return NextResponse.json(
        { message: 'Data inserted successfully' },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error inserting data:', error);
      return NextResponse.json({ message: 'An error occurred', error: error }, { status: 500 });
    }
  }