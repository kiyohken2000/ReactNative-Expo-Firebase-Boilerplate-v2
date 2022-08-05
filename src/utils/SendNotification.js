import axios from "axios";

const sendNotification = async({title, body, token, data}) => {
  const response = await axios.post(
    'https://exp.host/--/api/v2/push/send',
    {
      'to': token,
      'title': title,
      'body': body,
      'data': { data }
    },
    {headers: {'Content-Type': 'application/json'}}
  )
  const { status } = response
  return status
}

export { sendNotification }