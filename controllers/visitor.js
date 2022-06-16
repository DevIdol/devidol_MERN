import Visitor from '../models/Visitor.js'

export const getVisitor = async (req, res, next) => {
  try {
    let visitors = await Visitor.findOne({ _id: '6296f8362946fc0746846242' })

    if (visitors == null) {
      const beginCount = new Visitor({
        _id: '6296f8362946fc0746846242',
        count: 1,
      })
      beginCount.save()
      res.status(200).send({ counter: 1 })
    } else {
      visitors.count += 1
      visitors.save()
      res.status(200).json({ counter: visitors.count })
    }
  } catch (error) {
    next(createError(500, 'Internet Connection Fail!'))
  }
}
