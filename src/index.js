const express = require('express');
const app = express();
const morgan = require('morgan');

app.set('port', process.env.PORT || 8080)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index'));
app.use('/api/groups',require('./routes/groups'));
app.use('/api/courses',require('./routes/courses'));
app.use('/api/groupDetails',require('./routes/groupDetails'));
app.use('/api/profileDetails',require('./routes/profileDetails'));
app.use('/api/myGroups',require('./routes/myGroups'));
app.use('/api/auth',require('./routes/auth'));

app.listen(app.get('port'), () => {
    console.log("server on port ${8080}");
});
