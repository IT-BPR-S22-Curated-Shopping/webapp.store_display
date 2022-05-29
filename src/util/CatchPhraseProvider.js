
const p1 = 'WAIT! CHECK OUT THESE\nITEMS RECOMMENDED FOR YOU!'
const p2 = 'IT´S NOT\nTOO LATE!'
const p3 = 'Look what just arrived\nin store now'
const p4 = 'You´ve got great taste!\n...and this is only 5 meters away :)'

const phrases = [p1, p2, p3, p4]

export const getCatchPhrase = () => phrases[Math.floor(Math.random() * phrases.length)]