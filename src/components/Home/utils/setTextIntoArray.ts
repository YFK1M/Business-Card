export const setTextIntoArray = (
	array: string[],
	setAllText: (allText: string[][]) => void,
	allText: string[][],
	setEnteringEnabled: (enteringEnabled: boolean) => void,
	charRunDelay = 30
) => {
	let counter = 0
	const arr: string[][] = []
	
	const run = () => {
		let charId = 0
		const arr2: string[] = []
		
		const charRun = () => {
			arr2.push(array[counter].charAt(charId++))
			
			if (!arr.length) arr.push(arr2)
			else arr.splice(counter, 1, arr2)
			
			setAllText([...allText, ...arr.slice()])
			
			if (charId < array[counter].length) {
				setTimeout(charRun, charRunDelay)
			} else {
				if (counter < array.length - 1) {
					setTimeout(run, (array[counter].length - 2) * charRunDelay)
					counter = counter + 1
				} else {
					setEnteringEnabled(false)
				}
			}
		}
		
		setTimeout(charRun)
	}
	
	setTimeout(run)
}