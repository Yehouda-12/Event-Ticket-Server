import express from "express"
import { buyTicket } from "../controllers/buyTicketsController.js"



const router = express.Router()

router.route('/tickets/buy').post(buyTicket)







export default router