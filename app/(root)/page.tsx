import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
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
      <p>You have not taken any Interviews yet</p>
    </div>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
          <InterviewCard/>
        ))}
      </div>
    </section>
    </>
  );
}
export default Page;