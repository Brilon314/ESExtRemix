class edificioclass {
	#bonoParaRutas;
	#nombre;
	#construidos;
	#costosIniciales;
	#produccion;
	#recusoProducido;
	#seleccionados = 0;
	constructor(nombre, construido, costosIniciales, produccionBase, multiplicador){
		this.#bonoParaRutas      = multiplicador.RUTAS*60*1.44;
		this.#nombre             = nombre;
		// console.log('this.#nombre:', this.#nombre);
		this.#construidos        = construido;
		this.#costosIniciales    = costosIniciales[nombre];
		// console.log('this.#costosIniciales:', this.#costosIniciales);
		this.#produccion         = (produccionBase[nombre][0]*multiplicador[produccionBase[nombre][1]]);
		this.#recusoProducido    = produccionBase[nombre][1];
	}
	setSeleccionado(seleccionados){
		this.#seleccionados = seleccionados;
	}
	getProduccion(){
		return this.#produccion*this.#construidos;
	}
	getNombre(){
		return this.#nombre;
	}
	getCosto(){
		return this.#costosIniciales;
	}
	getConstruido(){
		if (this.#seleccionados>this.#construidos)
			return this.#seleccionados;
		else
			return this.#construidos;
	}
	getRentabilizacion(valorRecursos,numeroEstrella,gastoTurnos){
		var costoRecurso = this.#costosIniciales["cantidadRecurso"]*valorRecursos[this.#costosIniciales["recurso"]]*numeroEstrella;
		var costoOro     = this.#costosIniciales["oro"]*valorRecursos["ORO"]*numeroEstrella;
		var costoTurnos  = gastoTurnos*valorRecursos["TURNOS"];
		var produccion   = this.#produccion*valorRecursos[this.#recusoProducido];
		return (costoRecurso+costoOro)/(produccion+this.#bonoParaRutas);
	}
}
