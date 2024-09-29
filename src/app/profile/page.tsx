"use client"
import Header from "../../components/Header"
import Protected from "../../hooks/useProtected"
import { FC, useState } from "react"
import Profile from '../../components/Profile/Profile'
import Heading from "../../utils/Heading"
import { useSelector } from "react-redux"

type Props = {}

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(5)
    const [route, setRoute] = useState("Login")
    const {user} = useSelector((state: any) => state.auth)
    return (
        <div>
            <Protected>

                <Heading
                    title={`${user?.name} profile`}
                    description=''
                    keywords=''
                />
                <Header 
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile  user={user}/>

            </Protected>
        </div>
    )
}

export default Page;