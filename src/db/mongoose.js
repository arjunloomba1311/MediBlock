const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/medichain-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
}
)