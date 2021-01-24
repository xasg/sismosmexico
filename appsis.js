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

x = d3.scaleBand()
      .range([0, ancho])
      .paddingInner(0.1)
      .paddingOuter(0.3)

color = d3.scaleOrdinal()
          // .range(['red', 'green', 'blue', 'yellow'])
          // https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
          .range(d3.schemeDark2)

xAxisGroup = g.append('g')
              .attr('transform', `translate(0, ${ alto })`)
              .attr('class', 'eje')
yAxisGroup = g.append('g')
              .attr('class', 'eje')

titulo = g.append('text')
          .attr('x', `${ancho / 2}px`)
          .attr('y', '-5px')
          .attr('text-anchor', 'middle')
          .text('Sismos 1974-2000')
          .attr('class', 'titulo-grafica')

//dataArray = [10, 20, 23, 12, 18, 25, 32, 28]
dataArray = [
   {valor:10, color: 'red' },
   {valor:20, color: 'green' },
   {valor:23, color: 'blue' },
   {valor:12, color: 'orange' },
   {valor:18, color: 'yellow' },
   {valor:25, color: 'teal' },
   {valor:32, color: '#cc0000' },
   {valor:28, color: '#cc00cc' },
   
]



// III. render (update o dibujo)
function render(data) {
  bars = g.selectAll('rect')
            .data(data)

  bars.enter()
      .append('rect')
        .style('width', '50px')
        .style('height', d => d.valor * 5)
        .style('x', (d, i) => 50 + i * 70)
        .style('y',0)
        .style('fill', d => d.color)

    

}

// IV. Carga de datos
/**
d3.csv('sismos.csv')
.then(function(data) {
  data.forEach(d => {
    d.id = +d.id
    d.latitud = +d.latitud
    d.longitud = +d.longitud
    d.profundidad = +d.profundidad
    d.magnitud   = +d.magnitud
    d.profundidad = +d.profundidad
    d.mes = +d.mes
    d.ano = +d.ano
    d.hora = +d.hora
    d.minuto = +d.minuto
    d.id = +d.id
    // damos formato como números a los valores del archivo CSV
  })
  //Comprobamos en consola que se haya cargado el archivo
  console.log("Archivo cargado")
  dataArray = data
  console.log(dataArray)

  color.domain(data.map(d => d.entidad))


  // <select>
  //   <option value="x">despliega</option>
  // </select>
  regionSelect.append('option')
              .attr('value', 'todas')
              .text('Todas')
  color.domain().forEach(d => {
    console.log(d)
    regionSelect.append('option')
                .attr('value', d)
                .text(d)
  })


  frame()
  
})
.catch(e => {
  console.log('No se tuvo acceso al archivo ' + e.message)
})
*/
  // V. Despliegue
    render(dataArray)
