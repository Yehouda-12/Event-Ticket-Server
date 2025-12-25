import express from "express"
import { buyTicket } from "../controllers/buyTicketsController.js"
import { userSummary } from "../controllers/usersController.js"



const router = express.Router()
router.route('/:username/summary').get(userSummary)
router.route('/tickets/buy').post(buyTicket)
// router.route('/:username/summary ').get(userSummary)







export default router