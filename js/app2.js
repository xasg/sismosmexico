// I. Configuración
graf = d3.select('#graf')

ancho_total = graf.style('width').slice(0, -2)
alto_total = ancho_total * 9 / 16

graf.style('width', `${ ancho_total }px`)
    .style('height', `${ alto_total }px`)

margins = { top: 30, left: 50, right: 15, bottom: 120 }

ancho = ancho_total - margins.left - margins.right
alto  = alto_total - margins.top - margins.bottom

// II. Variables globales
svg = graf.append('svg')
          .style('width', `${ ancho_total }px`)
          .style('height', `${ alto_total }px`)

g = svg.append('g')
        .attr('transform', `translate(${ margins.left }, ${ margins.top })`)
        .attr('width', ancho + 'px')
        .attr('height', alto + 'px')

y = d3.scaleLinear()
          .range([alto, 0])

// a. Para poner las barras vamos a utilizar un scaleBand()
x = d3.scaleBand()
      .range([0, ancho])
      // d. Parámetros extras del escalador
      .paddingInner(0.1)
      .paddingOuter(0.3)
      
color = d3.scaleOrdinal()
           .range(['#660000', '#990000','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CC0000'])
          // https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
          //.range(d3.schemeDark2)

// i. Ejes lo primero es crear un "grupo"
xAxisGroup = g.append('g')
              .attr('transform', `translate(0, ${ alto })`)
              .attr('class', 'eje')
yAxisGroup = g.append('g')
              .attr('class', 'eje')

// j. Título superior de la gráfica
titulo = g.append('text')
          .attr('x', `${ancho / 2}px`)
          .attr('y', '-5px')
          .attr('text-anchor', 'middle')
          .text('La profundidad de los sismos de mayor magnitud en México')
          .attr('class', 'titulo-grafica')

dataArray = []

// III. render (update o dibujo)
function render(data) {
  // function(d, i) { return d }
  // (d, i) => d
  bars = g.selectAll('rect')
            .data(data)

  bars.enter()
      .append('rect')
        .style('width', '0px')
        .style('height', '0px')
        .style('y', `${y(0)}px`)
        .style('fill', '#000')
        .style('x', d => x(d.fechamag) + 'px')
      .transition()
      // https://bl.ocks.org/d3noob/1ea51d03775b9650e8dfd03474e202fe
      .ease(d3.easeElastic)
      .duration(1500)
        .style('y', d => (y(d.profundidad)) + 'px')
        .style('height', d => (alto - y(d.profundidad)) + 'px')
        .style('fill', d => color(d.region))
        .style('width', d => `${x.bandwidth()}px`)

      // j. call que sirve para crear los ejes
      yAxisCall = d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(d => `${d} Km.`)
      yAxisGroup.call(yAxisCall)

      xAxisCall = d3.axisBottom(x)
      xAxisGroup.call(xAxisCall)
                .selectAll('text')
                .attr('x', '-8px')
                .attr('y', '-5px')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-90)')
}

// IV. Carga de datos
d3.csv('sismos3.csv')
.then(function(data) {
  data.forEach(d => {
    d.profundidad = +d.profundidad
    d.ano = +d.ano
    d.puesto = +d.puesto
  })

  // e. Seleccionar los sismos mas altos
  data = data.slice(0, 18)

  this.dataArray = data

  // Calcular la profundidad más alta dentro de
  // los datos (columna "profundidad")
  maxy = d3.max(data, d => d.profundidad)

  // Creamos una función para calcular la altura
  // de las barras y que quepan en nuestro canvas
  y.domain([0, maxy])

  // b. Poner el dominio del escalador x, convertir las fechas de los
  //    sismos en valores de X para ubicar las barras
  x.domain(data.map(d => d.fechamag))

  // V. Despliegue
  render(dataArray)
})
.catch(e => {
  console.log('No se tuvo acceso al archivo ' + e.message)
})