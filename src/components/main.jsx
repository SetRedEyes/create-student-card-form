import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Main = () => {
  const [userData, setUserData] = useState()

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")))
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="mb-3">Карточка студента</h1>
      {userData
        ? (
        <>
          <div className="my-3">
            <div>
              <strong>Имя:</strong>&nbsp;
              {userData.firstname}
            </div>
            <div>
              <strong>Фамилия:</strong>&nbsp;
              {userData.surname}
            </div>
            <div>
              <strong>Год рождения:</strong>&nbsp;
              {userData.birthYear}
            </div>
            <div>
              <strong>Портфолио:</strong>&nbsp;
              {userData.portfolio}
            </div>
          </div>
          <Link to={"/create"} href="#" className="btn btn-primary">
            Редактировать
          </Link>
        </>
          )
        : (
        <>
          <div className="my-3">Нет данных</div>
          <Link to={"/create"} href="#" className="btn btn-primary">
            Добавить
          </Link>
        </>
          )}
    </div>
  )
}

export default Main
