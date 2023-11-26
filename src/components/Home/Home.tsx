'use client'

import {KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";

import styles from './Home.module.css'
import {setTextIntoArray} from "./utils/setTextIntoArray";
import {authorNameText, helpText, imageText, errorText} from './assets'
import {linksText} from "@/components/Home/assets/linksText";
import {aboutText} from "@/components/Home/assets/aboutText";

export default function HomeComponent() {
	
	const [allText, setAllText] = useState<string[][]>([])
	const [isStarted, setStarted] = useState(true)
	const [enteringEnabled, setEnteringEnabled] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [command, setCommand] = useState('')
	const terminal = useRef<HTMLDivElement | null>(null)
	
	const clear = () => {
		setAllText([])
		setEnteringEnabled(false)
	}
	
	useEffect(() => {
		const handleCommand = () => {
			if (enteringEnabled) {
				switch (command) {
					case 'start':
						setTextIntoArray(authorNameText, setAllText, allText, setEnteringEnabled)
						break
					case 'clear':
						clear()
						break
					case 'help':
						setTextIntoArray(helpText, setAllText, allText, setEnteringEnabled)
						break
					case 'image':
						setTextIntoArray(imageText, setAllText, allText, setEnteringEnabled, 5)
						break
					case 'links':
						setTextIntoArray(linksText, setAllText, allText, setEnteringEnabled)
						break
					case 'about':
						setTextIntoArray(aboutText, setAllText, allText, setEnteringEnabled)
						break
					default:
						setTextIntoArray(errorText, setAllText, allText, setEnteringEnabled)
						break
				}
			}
		}
		
		handleCommand()
	}, [command, enteringEnabled])
	
	useEffect(() => {
		const element = terminal.current;
		if (element) {
			element.scrollTop = element.scrollHeight;
		}
	}, [allText])
	
	const handleStartButtonClick = () => {
		setStarted(false)
		setEnteringEnabled(true)
		setCommand('start')
	}
	
	const handleInputKeyEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const element = event.target as HTMLInputElement
		if (event.code === 'Enter') {
			setInputValue('')
			setEnteringEnabled(true)
			setCommand(element.value)
			setAllText([...allText, element.value.split('')])
		}
	}
	
	return (
		<main className={styles.main}>
			<div className={styles.home}>
				{
					isStarted ? (
						<button onClick={handleStartButtonClick} className={styles.startButton}>START</button>
					) : (
						<div
							className={styles.terminal}
							ref={terminal}
						>
							<div>
								{
									allText.map((word, wordIndex) => (
										<p key={wordIndex} className={styles.terminal__stroke}>
											{'> '}
											{
												word.map((char, charIndex) => (
													<span key={`${wordIndex}${charIndex}`}>{char}</span>
												))
											}
										</p>
									))
								}
								{
									!enteringEnabled && (
										<p className={styles.terminal__input}>
											<span>{'>'}</span>
											<input
												className={styles.terminal__input_inp}
												autoFocus={true}
												onKeyDown={e => handleInputKeyEnterDown(e)}
												onChange={(e) => setInputValue(e.target.value)}
												value={inputValue}
											/>
										</p>
									)
								}
							</div>
						</div>
					)
				}
			</div>
		</main>
	)
}
