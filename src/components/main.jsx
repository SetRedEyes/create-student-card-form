import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Main = () => {
  const [userData, setUserData] = useState()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))
    if (data) {
      setUserData(data)
    }
  }, [])

  const renderAge = (birthYear) => {
    const usersAge = new Date().getFullYear() - Number(birthYear)
    const lastOne = Number(usersAge.toString().slice(-1))
    if (usersAge > 4 && usersAge < 15) return `${usersAge} лет`
    if ([2, 3, 4].includes(lastOne)) return `${usersAge} года`
    if (lastOne === 1) return `${usersAge} год`
    return `${usersAge} лет`
  }

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
              {userData.birthYear} ({`${renderAge(userData.birthYear)}`})
            </div>
            <div>
              <strong>Портфолио:</strong>&nbsp;
              <a href={userData.portfolio} target="_blank" rel="noreferrer">
                {userData.portfolio}
              </a>
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
