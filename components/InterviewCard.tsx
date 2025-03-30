import React from "react";
import dayjs from "dayjs";
const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}:InterviewCardProps) => {
const feedback = null as Feedback | null;
const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
const formattedDate =dayjs(feedback?.createdAt|| createdAt||Date.now()).format("DD/MM/YYYY");
}
export default InterviewCard;