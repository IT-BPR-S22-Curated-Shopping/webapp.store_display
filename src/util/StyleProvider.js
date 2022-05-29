
const fonts = ['default', 'helvetica', 'Monospace', 'roboto', 'Arial', 'sans-serif', '"Segoe UI"']

export const getFont = () => fonts[Math.floor(Math.random() * fonts.length)]

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

export const getColor = () => colors[Math.floor(Math.random() * colors.length)]

const randomStyle = {
    text: {
        wrapper: {
            sx: {
                backgroundColor: getColor(),
                padding: 4,
                width: 1
            }
        },
        head: {
            sx: {
                typography: 'h5',
                textTransform: 'capitalize',
                textAlign: 'center',
                color: 'black',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 35,
                fontFamily: getFont(),
                letterSpacing: 5,
                lineHeight: 'normal',
                marginBottom: 1
            }
        },
        sub: {
            sx: {
                typography: 'subtitle1',
                textTransform: 'capitalize',
                textAlign: 'center',
                color: 'black',
                fontStyle: 'normal',
                fontWeight: 'light',
                fontSize: 15,
                fontFamily: getFont(),
                letterSpacing: 4,
                lineHeight: 'normal'
            }
        }
    }
}

export const getStyle = () => randomStyle