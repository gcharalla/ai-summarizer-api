import express, { Request, Response, Router } from 'express';
import { SummaryResult } from '../types/types';
import { getSummary, generateSummary } from '../controller/summaryService';

const router: Router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/mock')
    .post((req: Request, res: Response) => {
        try {
            const url: string = req.body.url as string;

            const result: SummaryResult = generateSummary();

            // Encode the summary to include it in the URL
            const codedSummary = encodeURIComponent(result.summary);

            // Build the new URL with the summary as a parameter
            const newUrl = `http://localhost:8080/api/get-summary?summary=${codedSummary}`;

            // Returns the new URL as part of the JSON response
            res.status(200).json({ message: 'URL received successfully', newUrl });
        } catch (error) {
            console.error('Error in getSummary:', error);
            res.status(500).send('Internal Server Error');
        }
    })


router.route('/summarize')
    .post(async (req: Request, res: Response) => {
        try {
            const url: string = req.body.url as string;

            const result: SummaryResult = await getSummary(url);

            // Encode the summary to include it in the URL
            const codedSummary = encodeURIComponent(result.summary);

            // Build the new URL with the summary as a parameter
            const newUrl = `http://localhost:8080/api/get-summary?summary=${codedSummary}`;

            // Returns the new URL as part of the JSON response
            res.status(200).json({ message: 'URL received successfully', newUrl });
        } catch (error) {
            console.error('Error in getSummary:', error);
            res.status(500).send('Internal Server Error');
        }
    })

router.route('/get-summary')
    .get((req: Request, res: Response) => {
        try {
            const codedSummary: string = req.query.summary as string;

            // Decode the summary
            const summary: string = decodeURIComponent(codedSummary)

            // Render the Pug template with the summary
            res.render('home', { summary: summary });

        } catch (error) {
            console.error('Error rendering template:', error);
            res.status(500).send('Internal Server Error');
        }
    });

export default router;
