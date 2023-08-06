function checkData(data, ...keys) {
  const obj = Object.assign({}, data);
  const err = []
  if (typeof keys === "object") {
    for (const key of keys) {
      if (!obj.hasOwnProperty(key)) {
        err.push(`Missing ${key}`)
      }
      delete obj[key]
    }

    if(err.length != 0) return err
    if (Object.keys(obj).length != 0) return Object.keys(obj)
    return true;
  } else {
    if (!obj.hasOwnProperty(keys)) {
      return err.push("No data bo backend");
    }
    return true;
  }
}

export default checkData