export function validator(data, config) {
  const errors = {}
  function validate(validateMethod, data, config) {
    let statusValidate
    switch (validateMethod) {
      case "isRequired": {
        statusValidate = data.trim() === ""
        break
      }

      case "isUrl": {
        const urlRegExp = /^\S+:\/\/\S+\.\S+$/g
        statusValidate = !urlRegExp.test(data)
        break
      }
      case "min": {
        statusValidate = data.length < config.value
        break
      }

      case "isValidDate": {
        statusValidate = Number(data) > config.value
        break
      }
      default:
        break
    }

    if (statusValidate) return config.message
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
