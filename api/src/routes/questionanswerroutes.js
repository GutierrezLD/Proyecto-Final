const { Product, User, Category, Qa, Review } = require("../db")
const { Router } = require("express")

const router = Router()


router.post("/:id/question", async (req, res) => {
    const { id } = req.params
    const { question, userId } = req.body

    if (!question || question.length < 1) return res.status(400).send("Questions can't be empty")

    try {
        const product = await Product.findOne({ where: { id: id } })
        const q = await Qa.create({
            question
        })
        product.addQa(q)

        const user = await User.findOne({ where: { id: userId.trim() } })
        user.addQa(q)
        return res.status(200).send("Question Added")
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

// //Answer Question / Add Answer
// router.put("/:questionId/answer", async (req, res) => {
//     const { questionId } = req.params
//     const { answer } = req.body

//     if (!answer || answer.length < 1) {
//         return res.status(404).send("Answer must not be empty")
//     }

//     try {
//         await Qa.update({
//             answer,
//             resolved: true,
//         }, { where: { id: questionId } })

//         return res.status(200).send("Answer Added")
//     }
//     catch (err) {
//         res.status(400).send(err)
//     }
// })

module.exports = router;