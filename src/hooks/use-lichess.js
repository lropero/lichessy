import axios from 'axios'
import { useSelector } from 'react-redux'

const useLichess = () => {
  const { token } = useSelector(state => state.session)

  const baseURL = 'https://lichess.org/'

  return {
    getAccount: async () => {
      if (token.access_token) {
        const response = await axios.get('/api/account', {
          baseURL,
          headers: { Authorization: `Bearer ${token.access_token}` }
        })
        return response.status === 200 && response.data
      }
    }
  }
}

export default useLichess
