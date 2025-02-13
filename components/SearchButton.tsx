'use client';

import { useEffect, useState, useRef } from 'react';
import { usePostContext } from '../context/PostContext';
import { isErrorResponse } from '../types/error-response';
import { useRouter } from 'next/navigation';
import { PostList } from '../types/post';
import { IoSearch } from 'react-icons/io5';

const SearchButton = () => {
	const { getPostListSearch } = usePostContext();
	const router = useRouter();
	const [keyword, setKeyword] = useState('');
	const [searchResults, setSearchResults] = useState<PostList[]>([]);
	const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng modal
	const inputRef = useRef<HTMLInputElement | null>(null); // Tham chiếu đến input

	// Fetch dữ liệu khi keyword thay đổi
	useEffect(() => {
		const fetchSearchResults = async () => {
			if (!keyword.trim()) {
				setSearchResults([]);
				return;
			}

			const data = await getPostListSearch(keyword);

			if (isErrorResponse(data) || !data.length) {
				setSearchResults([]);
				return;
			}

			setSearchResults(data);
		};

		fetchSearchResults();
	}, [keyword]);

	// Tự động focus vào input khi mở modal
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus(); // Đặt trỏ chuột vào input
		}
	}, [isOpen]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	const handleSelectPost = (slug: string) => {
		setKeyword('');
		setSearchResults([]);
		setIsOpen(false); // Đóng modal sau khi chọn bài viết
		router.push(`/posts/${slug}`);
	};

	const handleOutsideClick = (event: React.MouseEvent) => {
		// Kiểm tra nếu click ra ngoài modal thì đóng modal
		if (event.target === event.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{/* Nút icon search */}
			<button
				onClick={() => setIsOpen(true)}
				className="rounded-full bg-gray-200 p-2 transition-all hover:bg-gray-300"
			>
				<IoSearch size={20} />
			</button>

			{/* Modal tìm kiếm */}
			{isOpen && (
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
				<div
					onClick={handleOutsideClick}
					className="fixed inset-0 z-50 flex items-center justify-center"
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.3)', // Màu nền mờ
					}}
					onKeyDown={(event) => {
						if (event.key === 'Escape') {
							setIsOpen(false);
						}
					}}
				>
					<div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
						{/* Header */}
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold">Search Posts</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								✖
							</button>
						</div>

						{/* Ô nhập liệu tìm kiếm */}
						<input
							ref={inputRef} // Gán ref cho input
							type="text"
							value={keyword}
							onChange={handleInputChange}
							placeholder="Type to search..."
							className="mt-3 w-full rounded-lg border p-2 focus:border-blue-500 focus:ring focus:outline-none"
						/>

						{/* Hiển thị kết quả tìm kiếm */}
						{searchResults.length > 0 ? (
							<ul className="mt-3 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-md">
								{searchResults.map((post) => (
									// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
									<li
										key={post.slug}
										onClick={() => handleSelectPost(post.slug)}
										className="cursor-pointer p-2 hover:bg-gray-200"
									>
										{post.title}
									</li>
								))}
							</ul>
						) : (
							<div className="mt-3 text-center text-gray-500">No results found</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default SearchButton;
