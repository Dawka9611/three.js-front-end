import { io } from 'socket.io-client'

const socket = io('http://192.168.88.225:4000')

export default socket