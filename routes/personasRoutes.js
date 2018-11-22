const mongoose = require('mongoose');

// const personasMiddleware = require('../lib/personasMiddleware');
const { datosLlenos, tipoDato } = require('../lib/personasMiddleware');

require('../models/Persona')
const Persona = mongoose.model('personas');

module.exports = (app) =>  {
	app.get(
		'/api/personas', 
		async (req, res) => {
			try {
				const respuesta = await Persona.find({});
			res.send(respuesta);
			} 
			catch (error) {
				res.send(error.message);
			}
	});

	app.get(
		'/api/personas/:id', 
		async (req, res) => {
			try {
				const _id = req.params.id;
			const respuesta = await Persona.find({ _id });
			res.send(respuesta); 
			}
			catch (error) {
				res.send(error.message);
			}
	});

	app.post(
		'/api/personas', 
		datosLlenos,
		tipoDato,
		async (req, res) => {
			try {
				const nueva = new Persona(req.body);
			const respuesta = await nueva.save();
			return res.send(respuesta);
			}
			catch (error) {
				res.send(error.message);
			}
		}	
	);

	app.post(
		'/api/personas/:identificador', 
		datosLlenos,
		tipoDato,
		async (req, res) => {
			try {
				const respuesta = await Persona.findOneAndUpdate(
						{ _id: req.params.identificador },
						{ ...req.body },
						{ new: true }
					).exec();

					res.send(respuesta);
			}
			catch(error){
				res.send(error.message);
			}
		}	
	);

	app.delete('/api/personas/:id', async (req, res) => {
		try {
			const respuesta = await Persona.deleteOne({ _id: req.params.id });
			res.send(respuesta);
		}
		catch(error) {
			res.send(error.message);
		}
	});
};