module.exports = (() => {
	const datosLlenos = (req, res, next) => {
		const { nombre, apellidos, edad, peso, ojos } = req.body;

		if (!nombre) return res.send('Falta el nombre');
		if (!edad) return res.send('Falta la edad');
		if (!apellidos) return res.send('Faltan los apellidos');
		
		const { paterno, materno } = apellidos;

		if (!paterno) return res.send('Falta el paterno.');
		if (!materno) return res.send('Falta el materno.');

		next();
	};

	const tipoDato = (req, res, next) => {
		const { nombre, apellidos, edad, peso, ojos } = req.body;
		const { paterno, materno } = apellidos;

		if (typeof(nombre) !== 'string') return res.send('Nombre debe de ser texto.');

		if (typeof(edad) !== 'number') 
			return res.send('Edad debe de ser número.');

		if (typeof(apellidos) !== 'object') {
			return res.send('Apellidos debe ser objeto');
		}

		if (typeof(paterno) !== 'string') return res.send('Paterno debe de ser texto.');
		if (typeof(materno) !== 'string') return res.send('Materno debe de ser texto.');

		next();
	};

	return {
		datosLlenos,
		tipoDato
	}
})();