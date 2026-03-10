//Artificial delay for async simulations
export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Sort an array of elements that have language dependant names
export function sortElements(elements: any, language: 'fi' | 'en') {
    const sortedElements = elements.sort((a: any, b: any) => {
        if (a.name[language] > b.name[language]) return 1
        if (a.name[language] < b.name[language]) return -1
        return 0
    })

    return sortedElements;
}