'use client';

import { useEffect, useMemo, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
	const el = useRef(null);
	const options = useMemo(
		() => ({
			strings: [
				"Welcome! I'm <b>Nguyen Thanh Dat.</b> You can call me <b>Dat</b>. 😊",
				"I'm from <b>Vietnam</b>, and currently working as a <b>Fullstack Developer</b>.",
				'This website documents my projects, personal hobbies, travels, and experiments with new technologies.',
				'Feel free to get to know me!',
			],
			typeSpeed: 50,
			backSpeed: 25,
			backDelay: 1000,
			loop: true,
			showCursor: true,
			cursorChar: '|',
		}),
		[]
	);

	useEffect(() => {
		const typed = new Typed(el.current, options);

		return () => {
			typed.destroy();
		};
	}, [options]);

	return (
		<div className="TypedText">
			<span ref={el} className={'text-xl'} />
		</div>
	);
};

export default TypedText;
