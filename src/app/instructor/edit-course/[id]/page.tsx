"use client"
import InstructorProtected from '../../../../hooks/instructorProtected'
import EditCourse from '../../../../components/Instructor/EditCourse/EditCourse'
import React from 'react'
import Heading from '../../../../utils/Heading'
import Sidebar from '../../../../components/Instructor/Sidebar/Sidebar'


type Props = {}

const EditCoursePage = ({params}: any) => {
  const id = params?.id;
  return (
    <div>
    {/* <InstructorProtected > */}
    <Heading
      title="Learnix - Instructor"
      description="Platform for students to learn and get help from teachers"
      keywords="Programming, MERN, Redux"
    />
  <div className="flex mx-auto z-[9999]">
    <Sidebar active={2}  />

      <div className="mx-auto 800px:w-[85%] pl-20 800px:pl-5 mr-0 800px:mr-16">
        
            <EditCourse id={id} />
      </div>
    </div>
    {/* </InstructorProtected> */}
    </div>
  )
}

export default EditCoursePage