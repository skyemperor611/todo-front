import { Outlet, useNavigate } from "react-router-dom"
import BasicLayout from "../../layouts/BasicLayout"
import { useCallback } from "react"

const IndexPage = () => {
  const navigate = useNavigate()

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" })
  })

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" })
  })

  return (
    <BasicLayout>
      <div className="flex w-full p-2 m-2">
        <div
          className="p-2 m-1 text-xl font-extrabold text-center underline"
          onClick={handleClickList}
        >
          List
        </div>

        <div
          className="p-2 m-1 text-xl font-extrabold text-center underline"
          onClick={handleClickAdd}
        >
          Add
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet />
      </div>
    </BasicLayout>
  )
}

export default IndexPage
