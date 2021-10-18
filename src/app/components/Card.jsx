import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FIELDS, localStorageId } from "../constants"
import { calculateAge, plural } from "../utils"

const Card = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const storageData = localStorage.getItem(localStorageId)
    if (storageData) {
      setData(JSON.parse(storageData))
    }
  }, [])

  const renderContent = (type, value) => {
    return renderTemplates[type] || value
  }

  const renderTemplates = {
    year: (
      <>
        {data.year} ({calculateAge(data.year)}
        {plural(calculateAge(data.year), ["год", "года", "лет"])})
      </>
    ),
    portfolio: (
      <a
        href={data.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className="link-primary"
      >
        {data.portfolio}
      </a>
    )
  }

  const isCreatedUser = !!Object.keys(data).length

  return (
    <div className="col-md-6 offset-md-3">
      <h1>Карточка студента</h1>
      {isCreatedUser
        ? (
            Object.keys(data).map((type) => (
          <div key={type}>
            <small>
              <b>{FIELDS[type].label}</b>
            </small>
            :{renderContent(type, data[type])}
          </div>
            ))
          )
        : (
        <div>Нет данных</div>
          )}
      <Link to="/edit" className="btn btn-primary mt-3">
        {isCreatedUser ? "Редактировать" : "Добавить"}
      </Link>
    </div>
  )
}

export default Card
