import * as express from 'express';
import { router as matrixRouter } from './controllers/matrix-controller';  // Import the router here

const app = express();
const port = 3000;

// Use the matrixRouter for the /api route
app.use('/api', matrixRouter);  // Ensure you're using the correct router

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
