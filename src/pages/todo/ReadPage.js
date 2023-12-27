import { useParams } from "react-router-dom"
import ReadComponent from "../../components/todo/ReadComponents"

const ReadPage = () => {
  const { tno } = useParams()

  return (
    <div className="w-full mt-6 font-extrabold bg-white">
      <div className="text-2xl">Todo Read Page Component {tno}</div>

      <ReadComponent tno={tno}></ReadComponent>
    </div>
  )
}

export default ReadPage
