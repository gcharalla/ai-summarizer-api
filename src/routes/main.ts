import express, { Request, Response, Router } from 'express';

const router: Router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/')
    .get((req: Request, res: Response) => {
        return res.json({
            status: "Hola mundo, feliz",
        });
    })

router.route('/summarize')
    .post((req: Request, res: Response) => {
        const url: string = req.body.url;

        // Aquí puedes realizar cualquier procesamiento con la URL recibida
        console.log('Received URL:', url);

        // Responde a la extensión (puedes personalizar esta respuesta)
        res.json({ message: 'URL received successfully' });
    });

export default router;
