

import axios from 'axios'
// const KEY = 'AIzaSyACPUVcES9XwGzLSbsEAeGSRjJ9wSBQcz4'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/'
})