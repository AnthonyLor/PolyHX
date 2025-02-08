import * as express from 'express';
import { MatrixService } from '../services/generate-world-service';

const router = express.Router();


const matrixService = new MatrixService();

router.get('/matrix', async (req: express.Request, res: express.Response) => {
    try {
        const rows = parseInt(req.query.rows as string, 10);
        const cols = parseInt(req.query.cols as string, 10);

        if (isNaN(rows) || isNaN(cols)) {
            return res.status(400).json({
                message: 'Rows and cols must be valid integers',
            });
        }

        const matrix = matrixService.generateMatrix(rows, cols);
        return res.status(200).json(matrix);
    } catch (error) {
        return res.status(500).json({
            message: 'Error generating matrix',
            error: error.message || error,
        });
    }
});

// Export the router
export { router };
