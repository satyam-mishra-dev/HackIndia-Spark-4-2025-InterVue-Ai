import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}:InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate =dayjs(feedback?.createdAt|| createdAt||Date.now()).format("DD/MM/YYYY");
    return(<div className="card-border w-[360px] max-sm:w-full min-h-96">
        <div className="card-interview ">
            <div>
                <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className="badge-text">{normalizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} alt="Interview Cover" width={90} height={90} className="rounded-full object-fit size-[90px]"/>
                <h3 className="mt-5 capitalize">
                    {role} Interview
                </h3>
            </div>
        </div>
        
        </div>
    );
}
export default InterviewCard;