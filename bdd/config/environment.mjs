import { config } from 'dotenv'
config()
const host = 'http://localhost'

export default {
  schoolManagerService: {
    url: process.env.PORT ? `${host}:${process.env.PORT}` : `${host}:3000`
  }
}
