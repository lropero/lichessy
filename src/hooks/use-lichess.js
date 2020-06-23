import axios from 'axios'

const useLichess = () => {
  return {
    getAccount: async () => {
      const response = await axios.get(
        `${process.env.REDIRECT}/.netlify/functions/api?command=account`
      )
      return response.status === 200 && response.data
    },
    getPlaying: async () => {
      const response = await axios.get(
        `${process.env.REDIRECT}/.netlify/functions/api?command=playing`
      )
      return response.status === 200 && response.data
    }
  }
}

export default useLichess
