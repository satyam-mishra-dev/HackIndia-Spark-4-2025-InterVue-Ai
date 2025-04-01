"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: true
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to generate a structured JSON feedback report.
        
        IMPORTANT: Your response MUST be a valid JSON object with the following structure:
        {
          "totalScore": number (0-100),
          "categoryScores": [
            {
              "name": "Communication Skills",
              "score": number (0-100),
              "comment": "detailed explanation"
            },
            {
              "name": "Technical Knowledge",
              "score": number (0-100),
              "comment": "detailed explanation"
            },
            {
              "name": "Problem Solving",
              "score": number (0-100),
              "comment": "detailed explanation"
            },
            {
              "name": "Cultural Fit",
              "score": number (0-100),
              "comment": "detailed explanation"
            },
            {
              "name": "Confidence and Clarity",
              "score": number (0-100),
              "comment": "detailed explanation"
            }
          ],
          "strengths": ["strength1", "strength2", "strength3"],
          "areasForImprovement": ["area1", "area2", "area3"],
          "finalAssessment": "concise summary text"
        }

        Interview Transcript to Analyze:
        ${formattedTranscript}

        Guidelines:
        1. All scores must be integers between 0 and 100
        2. Each category must have a detailed comment explaining the score
        3. Provide at least 3 specific strengths
        4. Provide at least 3 specific areas for improvement
        5. The final assessment should be a concise summary of overall performance
        
        IMPORTANT: Ensure your response is a valid JSON object that exactly matches the schema structure above.
        Do not include any additional text or explanations outside the JSON structure.
        `,
      system:
        "You are a professional interviewer generating structured JSON feedback. Your output must strictly follow the specified schema format without any additional text or markdown formatting.",
    });

    if (!object) {
      throw new Error("Failed to generate feedback object");
    }

    console.log("Generated feedback object:", JSON.stringify(object, null, 2));

    // Validate the object against the schema
    const validatedObject = feedbackSchema.parse(object);

    // Additional validation for scores
    if (validatedObject.totalScore < 0 || validatedObject.totalScore > 100) {
      throw new Error("Total score must be between 0 and 100");
    }

    for (const category of validatedObject.categoryScores) {
      if (category.score < 0 || category.score > 100) {
        throw new Error(`${category.name} score must be between 0 and 100`);
      }
    }

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: validatedObject.totalScore,
      categoryScores: validatedObject.categoryScores,
      strengths: validatedObject.strengths,
      areasForImprovement: validatedObject.areasForImprovement,
      finalAssessment: validatedObject.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: error instanceof Error ? error.stack : undefined
    };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
