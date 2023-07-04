import React, { useEffect, useRef, useState } from "react";
import user from "../assets/user.svg"
import bot from "../assets/bot.svg"
import Loader from "./Loader"

const ChatContainer = () => {

	const chatContainerRef = useRef(null);
	const formRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isAi, setIsAi] = useState(false);
	// const [uniqueId, setUniqueId] = useState('');
	const [prompt, setPrompt] = useState("");
	const [promptMessage, setPromptMessage] = useState(null);
	const [responseMessage, setResponseMessage] = useState(null);
	const [messageHistory, setMessageHistory] = useState([]);
	const [currentTitle, setCurrentTitle] = useState(null)


	const createNewChat = () => {
		setResponseMessage(null)
		setPrompt("")
		setCurrentTitle(null)
	}

	const handleClick = (uniqueTitle) => {
		setCurrentTitle(uniqueTitle)
		setPrompt("")
		setPromptMessage(prompt, uniqueTitle)
	}

	// set message history upon every api call or a new chat is created
	useEffect(() => {
		if (!currentTitle && promptMessage && responseMessage) {
			setCurrentTitle(promptMessage)
		}
		if (currentTitle && promptMessage && responseMessage) {
			setMessageHistory(prevMessages => (
				[...prevMessages,
				{
					title: currentTitle,
					role: "user",
					content: promptMessage
				}, {
					title: currentTitle,
					role: responseMessage.role,
					content: responseMessage.data
				}
				]
			))
			console.log(currentTitle, promptMessage, responseMessage)
		}
	}, [responseMessage, currentTitle])
	console.log("messageHistory : ", messageHistory)

	useEffect(() => {
		console.log(isAi)
	}, isAi)

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true)
		setIsAi(false)
		setPromptMessage(prompt);
		setPrompt("")

		const response = await fetch('http://localhost:5000/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: prompt
			})
		})
		if (response.ok) {
			const data = await response.json();
			console.log("data:", data)
			setResponseMessage(data)
			setIsAi(true)
			setIsLoading(false)
		} else {
			const err = await response.text();
			setResponseMessage(`error: sth went wrong! ${err}`);
		}
	}

	// press enter to submit
	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			handleSubmit(e);
		}
	};
	useEffect(() => {
		if (formRef.current) {
			formRef.current.addEventListener("keyup", handleKeyUp);
		}
		return () => {
			if (formRef.current) {
				formRef.current.removeEventListener("keyup", handleKeyUp);
			}
		};
	}, [prompt]);


	// function generateUniqueId() {
	// 	const timeStamp = Date.now();
	// 	const randomNumber = Math.random();
	// 	const hexadecimalString = randomNumber.toString(16);
	// 	return (
	// 		setUniqueId(
	// 			`id-${timeStamp}-${hexadecimalString}`
	// 		)
	// 	);
	// }

	// useEffect(() => {
	// 	generateUniqueId();
	// }, [isAi]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [promptMessage]);

	const currentChat = messageHistory.filter(prevChat => prevChat.title === currentTitle)
	const uniqueTitles = Array.from(new Set(messageHistory.map(prevChat => prevChat.title)))
	console.log("uniqueTitles: ", uniqueTitles)


	return (
		<div className="flex items-center  flex-row dark">
			{/* sidebar */}
			<div className="sticky basis-1/6 top-0 bottom-0 left-0 z-40 w-64 h-screen">
				{/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
					<span className="sr-only">Open sidebar</span>
					<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
					</svg>
				</button> */}
				<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
					<span className="sr-only">Open sidebar</span>
					<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
					</svg>
				</button>

				<aside id="default-sidebar" className="  sticky top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
					<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#1e1e24]">
						<button className="bg-zinc-950 duration-300 p-2 mt-2 text-center text-lg text-white rounded-lg w-full font-bold tracking-wide focus:outline-none focus:ring-2 mb-8 hover:bg-gray-700 focus:ring-gray-600" onClick={createNewChat}>
							+ New Chat
						</button>
						<h2 className="text-xl dark:text-white my-3 font-bold text-center">History</h2>
							{uniqueTitles?.map((uniqueTitle, index) =>
						<ul className="space-y-2 font-medium">
								<li key={index}>
									<button onClick={() => handleClick(uniqueTitle)} className="flex mt-3 w-full items-center p-2 bg-zinc-950 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700">
										<svg aria-hidden="true" className="basis-1/3 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
										<span className=" overflow-hidden">{uniqueTitle}</span>
									</button>
								</li>
						</ul>
							)}
					</div>
				</aside>
			</div>

			{/* chat */}
			<div className="relative w-full max-w-full min-h-screen z-40">
				<div className="flex text-white flex-col w-full max-w-full  pb-24 ">
					<div ref={chatContainerRef} className=""
					>
						<div className="w-full shadow-lg py-4 absolute text-center font-black text-3xl bg-[#1e1e24] top-0">
							<h1 className="">{currentTitle ? currentTitle : "KiaGPT"}</h1>
						</div>
						<div className="chat py-8 px-12 my-10">
							{currentChat?.map((chatMessage, index) =>
								<li className="list-none flex flex-row gap-4  my-3 items-center" key={index}>
									<div className={`min-w-[40px] flex justify-center items-center ${chatMessage.role === "assistant" ? "bg-[#5436da]" : "bg-[#10a37f]"} rounded w-9 h-9`} ai={`${chatMessage.role === "assistant" && "true"}`}>
										<img
											alt={`${chatMessage.role === "assistant" ? "bot" : "user"} `}
											src={`${chatMessage.role === "assistant" ? bot : user}`}

										/>
									</div>
									{isLoading ? <Loader /> :
										<p className="">
											{chatMessage.content}
										</p>
									}
								</li>)}
						</div>
					</div>

				</div>
				<form ref={formRef} onSubmit={handleSubmit} className='fixed bg-[#40414F] bottom-0  px-10 w-5/6 p-3 flex flex-row gap-3'>
					<textarea className='w-full text-white bg-transparent text-base p-3 rounded-lg outline-none border-none max-w-full
				' name="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} cols="1" rows="1" placeholder='Ask chatGPT...'></textarea>
					<button className=" outline-0 border-0 cursor-pointer bg-transparent" type="submit">
						<img className="w-[30px] h-[30px]" src="src/assets/send.svg" alt="Send" />
					</button>
				</form>
			</div>

		</div>
	)
}

export default ChatContainer