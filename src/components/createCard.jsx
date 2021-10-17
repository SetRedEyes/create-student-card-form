import React, { useEffect, useState } from "react"
import TextField from "./textField"
import { validator } from "../utils/validator"
import { Link, useHistory } from "react-router-dom"

const CreateCard = () => {
  const history = useHistory()

  const [data, setData] = useState({
    firstname: "",
    surname: "",
    birthYear: "",
    portfolio: ""
  })

  const [createdCard, setCreatedCard] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    firstname: {
      isRequired: { message: "Поле 'Имя' обязательно для заполнения" }
    },
    surname: {
      isRequired: { message: "Поле 'Фамилия' обязательно для заполнения" }
    },
    birthYear: {
      isRequired: {
        message: "Поле 'Год рождения' обязательно для заполнения"
      },
      min: { message: "Поле 'Год рождения' не корректно", value: 4 },
      isValidDate: {
        message: "Поле 'Год рождения' не корректно",
        value: new Date().getFullYear()
      }
    },
    portfolio: {
      isRequired: { message: "Поле 'Портфолио' обязательно для заполнения" },
      isUrl: { message: "Поле 'Портфолио' должно быть ссылкой" }
    }
  }
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("userData")))
    setCreatedCard(true)
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length !== 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    setCreatedCard(true)
    console.log(createdCard)
    localStorage.setItem("userData", JSON.stringify(data))
    alert("Обновлено!")
    history.push("/")
  }
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1> {createdCard ? "Редактировать" : "Создать"}</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
              error={errors.firstname}
            />
            <TextField
              label="Фамилия"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              error={errors.surname}
            />
            <TextField
              type="number"
              label="Год Рождения"
              name="birthYear"
              value={data.birthYear}
              onChange={handleChange}
              error={errors.birthYear}
            />
            <TextField
              label="Портфолио"
              name="portfolio"
              value={data.portfolio}
              onChange={handleChange}
              error={errors.portfolio}
            />

            {createdCard && (
              <Link to="/" className="btn btn-secondary me-2">
                Назад
              </Link>
            )}
            <button
              type="submit"
              disabled={isValid}
              className="btn btn-primary"
            >
              {createdCard ? "Обновить" : "Создать"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCard
