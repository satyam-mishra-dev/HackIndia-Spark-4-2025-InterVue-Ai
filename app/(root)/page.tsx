import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
const Page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Practice mock interviews or take AI-powered speech tests with real-time feedback and insights. </h2>
        <p>Practice real interview questions and get feedback</p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start an Interview</Link>
          </Button>
      </div>
      <Image
      src='/robot.png'
      alt='robot'
      width={400}
      height={400}
      className='max-sm:hidden'
      />
    </section>
    <section className='flex flex-col gap-6 -scroll-mt-80'>
    <h2>Your Interviews</h2>
    <div className='interviews-section'>
    {dummyInterviews.map((interview) => (
          <InterviewCard {...interview}/>
        ))}
    </div>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
          <InterviewCard {...interview} key ={interview.id}/>
        ))}
      </div>
    </section>
    </>
  );
}
export default Page;