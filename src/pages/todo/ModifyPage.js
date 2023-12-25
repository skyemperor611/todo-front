import { useNavigate } from "react-router-dom"

const ModifyPage = ({ tno }) => {
  const navigate = useNavigate()

  const moveToRead = () => {
    navigate({ pathname: `/todo/read/${tno}` })
  }

  const moveToList = () => {
    navigate({ pathname: `/todo/list` })
  }

  return <div className="font-extrabold text-3x1">Todo Modify Page</div>
}

export default ModifyPage
