import { Outlet } from "react-router-dom"
import BasicLayout from "../../layouts/BasicLayout"

const IndexPage = () => {
  return (
    <BasicLayout>
      <div className="flex w-full p-2 m-2">
        <div className="w-20 p-2 m-1 text-xl font-extrabold text-center underline">
          LIST
        </div>
        <div className="w-20 p-2 m-1 text-xl font-extrabold text-center underline">
          ADD
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet />
      </div>
    </BasicLayout>
  )
}

export default IndexPage
