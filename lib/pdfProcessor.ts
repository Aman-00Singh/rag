"use server"

import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import dotenv from 'dotenv';
import { OpenAI, Document, VectorStoreIndex, Settings  } from 'llamaindex';

dotenv.config();
// Set up OpenAI model
Settings.llm = new OpenAI({
  model: 'gpt4o',
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY || "",
  
});



async function loadPDF(): Promise<string> {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'documents', 'questions.pdf');
    console.log("PDF Path:", pdfPath);

    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found at path: ${pdfPath}`);
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error("Error loading PDF:", error);
    throw error;
  }
}


  // Index the PDF content and create a query engine
 
export async function initializeQueryEngine() {
  const pdfText = await loadPDF();

  // Create a Document object with PDF content
  const document = new Document({ text: pdfText, id_: 'questions_pdf' });

  // Create and index the document
  const index = await VectorStoreIndex.fromDocuments([document]);
  const retriever = index.asRetriever();
  return index.asQueryEngine({ retriever });
}


// --previous not dynamic
// /**
//  * Query the document and retrieve feedback and next question
//  */
// export async function getResponseForUserAnswer(
//   userResponse: string
// ): Promise<{ feedback: string; nextQuestion: string }> {
//   const queryEngine = await initializeQueryEngine();

//   const query = `Based on the user's answer: "${userResponse}", provide constructive feedback and suggest the next question. Ensure the next question is relevant and similar to the user's response context.`;

//   const result: any = await queryEngine.query({ query });

//   const feedback = result.response.trim() || 'No feedback available.';
 
//   const nextQuestion = 'Next question based on similarity and PDF content.';

//   return { feedback, nextQuestion };
// }



  // Query the document and retrieve feedback and next question
 
export async function getResponseForUserAnswer(
  userResponse: string
): Promise<{ feedback: string; nextQuestion: string }> {

  const queryEngine = await initializeQueryEngine();

  // Query for feedback from the LLM
  
  const feedbackQuery = `Based on the user's answer: "${userResponse}", provide constructive feedback.`;
  const feedbackResult: any = await queryEngine.query({ query: feedbackQuery });
  const feedback = feedbackResult.response.trim() || 'No feedback available.';

  // Query the document for the next question based on similarity

  const nextQuestionQuery = `Based on the user's answer: "${userResponse}", suggest the next question that is relevant and similar to the user's response context.`;
  const nextQuestionResult: any = await queryEngine.query({ query: nextQuestionQuery });
  const nextQuestion = nextQuestionResult.response.trim() || 'No next question available.';

  return { feedback, nextQuestion };
}