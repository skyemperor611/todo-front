import { useEffect, useRef, useState } from "react"
import FetchingModal from "../common/FetchingModal"
import { API_SERVER_HOST } from "../../api/todoApi"
import { getOne, putOne } from "../../api/productsApi"

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  deFlag: false,
  uploadFileNames: [],
}

const host = API_SERVER_HOST

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState)

  const [fetching, setFetching] = useState(false)

  const uploadRef = useRef()

  useEffect(() => {
    setFetching(true)

    getOne(pno).then((data) => {
      setProduct(data)
      setFetching(false)
    })
  }, [pno])

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value

    setProduct({ ...product })
  }

  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    )

    product.uploadFileNames = resultFileNames

    setProduct({ ...product })
  }

  const handleClickModify = () => {
    const files = uploadRef.current.files
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    formData.append("pname", product.pname)
    formData.append("pdesc", product.pdesc)
    formData.append("price", product.price)
    formData.append("deFlag", product.deFlag)

    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i])
    }
    putOne(pno, formData)
  }

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      Product Modify Component
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">Product Name</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-300"
            name="pname"
            type={"text"}
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">Desc</div>
          <textarea
            className="w-4/5 p-6 border border-solid rounded-r shadow-md resize-y border-neutral-300"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">Price</div>
          <input
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-300"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">Delete</div>
          <select
            name="deFlag"
            value={product.deFlag}
            onChange={handleChangeProduct}
            className="w-4/6 p-6 border border-solid rounded-r shadow-md border-neutral-300"
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 border border-solid rounded-r shadow-md border-neutral-300"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex flex-wrap items-stretch w-full mb-4">
          <div className="w-1/5 p-6 font-bold text-right">Images</div>
          <div className="flex flex-wrap items-start justify-center w-4/6">
            {product.uploadFileNames.map((imgFile, i) => (
              <div
                className="flex flex-col justify-center w-1/3 m-1 align-baseline"
                key={i}
              >
                <button
                  className="text-3xl text-white bg-blue-500"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="w-32 p-4 m-2 text-xl text-white bg-red-500 rounded"
        >
          Delete
        </button>

        <button
          type="button"
          className="inline-block w-32 p-4 m-2 text-xl text-white bg-orange-500 rounded"
          onClick={handleClickModify}
        >
          Modify
        </button>

        <button
          type="button"
          className="w-32 p-4 m-2 text-xl text-white bg-blue-500 rounded"
        >
          List
        </button>
      </div>
    </div>
  )
}

export default ModifyComponent
