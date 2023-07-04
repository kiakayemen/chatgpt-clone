// import { useState } from 'react'

// const Loader = () => {

// 	let [loaderContent, setLoaderContent] = useState("");

// 		setInterval(() => {
// 			setLoaderContent(loaderContent += '.');
// 			if (loaderContent === '....') {
// 				setLoaderContent("");
// 			}
// 		}, 300)

// 	return (
// 		<span>
// 			{loaderContent}
// 		</span>
// 	)
// }

// export default Loader

import React from 'react'
import { HashLoader } from 'react-spinners'

const Loader = () => {
  return (
	  <div>
		  <HashLoader
			  color="#36d7b7"
			  cssOverride={{}}
			  size={30}
		  />
	</div>
  )
}
export default Loader

// {
// 	messageHistory.length <= 0 ? <h1 className="text-center text-3xl font-bold">KiaGPT</h1> : messageHistory.map((message, index) => {
// 		// console.log(message)
// 		return (
// 			<div key={index} className="text-[20px] flex justify-start  items-center gap-4 my-4">
// 				{/* <div key={index} className="grid grid-cols-3 place-items-center"> */}
				// <div className="profile min-w-[40px]" ai={`${message.role === "assistant" && "true"}`}>
				// 	<img
				// 		alt={`${message.role === "assistant" ? "bot" : "user"} `}
				// 		src={`${message.role === "assistant" ? bot : user}`}

				// 	/>
				// </div>
				// {isLoading ? <Loader /> :
				// 	<div className="">
				// 		{message.content}
				// 	</div>
				// }
// 				{/* </div> */}
// 			</div>
// 		)
// 	}
// 	)
// }
