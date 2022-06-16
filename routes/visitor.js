import express from 'express'
import { getVisitor } from '../controllers/visitor.js'
const router = express.Router()

router.get('/', getVisitor)

export default router
