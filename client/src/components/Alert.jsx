import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
const Alert = () => {
  const [listAlert, setListAlert] = useState([])
  const dispatch = useDispatch();

  const alert = useSelector(state => state.alertReducer)
  useEffect(() => {
    if (Object.keys(alert).length > 0) {
      setListAlert(listAlert => [...listAlert, alert]);
      dispatch({ type: 'ALERT', payload: {} })
    }
  }, [alert, dispatch])


  const handleClose = (index) => {
    setListAlert(listAlert => listAlert.filter((_, i) => i !== index));
  }

  const handleSuccess = () => {
    dispatch({ type: 'ALERT', payload: { type: "success", msg: "Success" } })
  }
  const handleFail = () => {
    dispatch({ type: 'ALERT', payload: { type: "Fail", msg: "Fail" } })
  }

  return (
    <>
      <div style={{ position: "relative", minHeight: "200px" }}>
        {
          listAlert.map((alert, index) => {
            return (
              <div key={index} className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{ position: "absolute", top: index * 100, right: 0, display: "block" }}>
                <div className="toast-header">
                  <strong className="mr-auto">{alert.type}</strong>
                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => handleClose(index)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="toast-body">
                  {alert.msg}
                </div>
              </div>
            )
          })
        }
      </div>
      <button onClick={handleSuccess}>success</button>
      <button onClick={handleFail}>fail</button>
    </>
  )
}

export default Alert