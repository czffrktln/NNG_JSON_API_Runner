import app from './backend/dispatcher.js'
import { log, logTypes } from './backend/logger.js'

const port = 3000;

app.listen(port, () => {
  log(`Server is running on port ${port}`, logTypes.INIT);
});
