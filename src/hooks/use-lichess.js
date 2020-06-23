import axios from 'axios'

const useLichess = () => {
  return {
    getPlaying: async () => {
      const response = await axios.get(
        'http://www.lichessy.org/.netlify/functions/api?command=playing'
      )
      return response.status === 200 && response.data
    }
  }
}

export default useLichess
