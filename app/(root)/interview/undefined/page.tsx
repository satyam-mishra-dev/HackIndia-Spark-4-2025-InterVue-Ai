import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const questions=["Describe a complex frontend challenge you faced while using Next.js and how you overcame it.",
    "Explain your approach to optimizing Next.js application performance, including specific techniques you've used.",
    "How do you stay up to date with the latest advancements in Next.js and the broader frontend ecosystem? ",
    "Walk me through your experience with server side rendering, static site generation, and client side rendering in Next.js. What are the trade offs?",
]

  const user = await getCurrentUser();

  // const interview = await getInterviewById(id);
  // if (!interview) redirect("/");

  // const feedback = await getFeedbackByInterviewId({
  //   interviewId: id,
  //   userId: user?.id!,
  // });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">Frontend Developer Interview</h3>
          </div>

          <DisplayTechIcons techStack={['Reactjs','typescript','nextjs']} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          Technical Interview
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={questions}
        feedbackId={""}
      />
    </>
  );
};

export default InterviewDetails;
