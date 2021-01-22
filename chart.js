

var options = {
    series: [{
        name: 'Cases',
        data: []
    }],
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    title: {
        text: 'Daily change',
        align: 'left'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return val
            },
        },
        title: {
            text: 'Cases'
        },
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        shared: false,
        y: {
            formatter: function (val) {
                return (val / 1000000).toFixed(0)
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

async function onSelectCountry() {

    const flatData = (originalData, originalSchema) => {
        console.log('originalSchema', originalSchema)
        const properties = Object.keys(originalSchema)

        const extractedData = originalData.map(item => {
            const { [properties[0]]: cases, [properties[1]]: date } = item
            return [Date.parse(date), parseInt(cases)]
        })
        return extractedData
    }

    const locationSelect = document.getElementById('location-select').value
    console.log('locationSelect', locationSelect)
    const countries = await fetch('api.json')
        .then(response => response.json())
        .then(data => data['covid-stats']);

    const countryConfigure = countries.filter(countrie => countrie.name === locationSelect)[0]

    const request = await fetch(countryConfigure['get-history-api']).then(data => data.json())
    console.log('countryConfigure', countryConfigure['get-history-schema'])

    Promise.resolve(request).then(data => {
        const flattenData = flatData(data, countryConfigure['get-history-schema'])
        console.log('flattenData', flattenData)
        chart.updateSeries([{
            data: [...flattenData]
        }])
    })


}