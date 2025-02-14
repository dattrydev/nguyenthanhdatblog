'use client';

import { useEffect, useMemo, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
	const el = useRef(null);
	const options = useMemo(
		() => ({
			strings: [
				"Welcome! I'm <b>Nguyen Thanh Dat.</b> You can call me <b>Dat</b>. 😊",
				'I’m from <b>Vietnam</b>, and currently studying in Ho Chi Minh City.',
				'I’m majoring in Information Systems and interested in new things in the software\n' +
					'\t\t\t\t\tworld. This website is mainly to document my life, personal hobbies, and some\n' +
					'\t\t\t\t\ttravels.',
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
