import server from './services/server'

const PORT = process.env.PORT || 8080

const init = async () => {
    server.listen(PORT)
}

init()