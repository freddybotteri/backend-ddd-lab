import errorHandler from 'errorhandler';
import app from './app';
import container from './config/dependency-injection';
import mongoose from 'mongoose';
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());


mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000
}).then(db => {
	console.log('Database is connected')
});
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
}); 
  
// If the connection throws an error
mongoose.connection.on('error',function (err) { 
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});


/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  // tslint:disable: no-console
  const winstonLogger = container.get('Lab.shared.Logger');

  winstonLogger.info(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});


export default server;
