import axios from 'axios'

const useApi = () => {
  return {
    getAccount: async () => {
      const response = await axios.get(
        '/.netlify/functions/api?command=account'
      )
      return response.status === 200 && response.data
    },
    getBoard: async gameId => {
      const response = await axios.get('/.netlify/functions/api?command=token')
      const token = response.status === 200 && response.data
      const board = await fetch(
        `${token.baseURL}/api/board/game/stream/${gameId}`,
        { headers: token.headers }
      )
      return board
    },
    getPlaying: async () => {
      const response = await axios.get(
        '/.netlify/functions/api?command=playing'
      )
      return response.status === 200 && response.data
    }
  }
}

export default useApi
