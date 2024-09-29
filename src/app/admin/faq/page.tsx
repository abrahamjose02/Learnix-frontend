"use client"
import Sidebar from '@/components/Admin/Sidebar/Sidebar'
import React from 'react'
import DashboardHero from '@/components/Instructor/DashboardHero'
import Heading from '@/utils/Heading'
import EditFAQ from '@/components/Admin/Customization/EditFAQ'

type Props = {}

const page = (props:Props) => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Heading
          title="Learnix - Admin | FAQ"
          description="Platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux"
        />
        <div className="flex mx-auto z-[9999]">
          <div className="mx-auto pl-14 mt-20 w-[85%] ">
            <DashboardHero />

            <EditFAQ />

          </div>
          <Sidebar active={3} />
        </div>
        
    </div>
  )
}

export default page
