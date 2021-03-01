const express = require('express')
const router = express.Router()

const Potlucks = require('./potlucks-model')

router.get('/', (req, res) => {
	Potlucks.find()
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	Potlucks.findById(id)
		.then(potluck => {
			res.status(200).json(potluck)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

// router.post('/', (req, res) => {
// 	Potlucks.insert(req.body)
// 		.then(potluck => {
// 			res.status(201).json(potluck)
// 		})
// 		.catch(err => {
// 			res.status(500).json(`Server error: ${err}`)
// 		})
// })

router.put('/:id', (req, res) => {
	const { id } = req.params
	Potlucks.update(id, req.body)
		.then(potluck => {
			res.status(200).json(potluck)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.delete('/:id', (req, res) => {
	const { id } = req.params
	Potlucks.remove(id)
		.then(() => {
			res.status(200).json(`Potluck with id ${id} removed succesfully`)
		})
		.catch(err => {
			res.status(500).json(`Server error; ${err}`)
		})
})

module.exports = router
