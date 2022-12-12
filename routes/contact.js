import express, { Router } from 'express'

import { Contact } from '../controllers/Contact.js'
const router = express.Router();

router.post('/send-email', Contact);

export default router;