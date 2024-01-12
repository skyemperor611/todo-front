import { useEffect, useState } from "react"
import { getList } from "../../api/productsApi"
import useCustomMove from "../../hooks/useCustomMove"
import FetchingModal from "../common/FetchingModal"
import PageComponent from "../common/PageComponent"

import { API_SERVER_HOST } from "../../api/todoApi"

const host = API_SERVER_HOST

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDto: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
}

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove()

  const [serverData, setServerData] = useState(initState)

  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setFetching(true)

    getList({ page, size }).then((data) => {
      console.log(data)
      setServerData(data)
      setFetching(false)
    })
  }, [page, size, refresh])

  return (
    <div className="mt-10 ml-2 mr-2 border-2 border-blue-100">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex flex-wrap p-6 mx-auto">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 border-2 rounded shadow-md"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              <div className="w-full p-2 text-2xl font-extrabold">
                {product.pno}
              </div>
              <div className="flex flex-col w-full p-2 m-1 text-1xl">
                <div className="w-full overflow-hidden">
                  <img
                    alt="product"
                    className="m-auto rounded-md w-60"
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                  />
                </div>
                <div className="bottom-0 font-extrabold bg-white">
                  <div className="p-1 text-center">이름: {product.pname}</div>
                  <div className="p-1 text-center">가격: {product.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  )
}

export default ListComponent
