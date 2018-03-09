const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const typeDefs = require('./../controller/graphqlSchema.js');
const { resolvers, directiveResolvers }  = require('./../controller/resolvers.js');

// Put together a schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	directiveResolvers
});

app.use('*', cors({ origin: 'http://localhost:8080' }));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), bodyParser.urlencoded({extended: true}), graphqlExpress({ schema }));

// app.post('/graphql', bodyParser.json(), graphqlExpress({ schema }), (req, res) => {
// 	console.log('got here');
// 	res.send('fuck yeah');
// });


app.use('/', graphiqlExpress({
	endpointURL: '/graphql',
}));


server.listen(3000, () => {
	console.log('GraphQL Server is now running on http://localhost:3000');
});

//loads bundle
app.use(express.static(__dirname + './..public'));



