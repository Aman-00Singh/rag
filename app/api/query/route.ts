

import { NextRequest, NextResponse } from 'next/server';
import { getResponseForUserAnswer } from '../../../lib/pdfProcessor';


export async function POST(request: NextRequest) {
  console.log('Processing user response...');
  try {
    const { userResponse } = await request.json();
    const { feedback, nextQuestion } = await getResponseForUserAnswer(userResponse);
    console.log('User response:', userResponse);
    return NextResponse.json(
      { feedback, nextQuestion },
      { status: 200 }
    );
    
  } catch (error) {
    
    console.error('Error processing user response:', error);
    return NextResponse.json({ error: 'Failed to process response' }, { status: 500 });
  }
}
