import React from 'react'

function JobView() {
  return (
		<div>
			<div className="border-b-2 py-2 border-gray-500 ">
				<h4 className="text-center font-semibold text-md">
					Mern Stack Developer
				</h4>
			</div>
			<div className="my-3 border border-gray-500 py-3 px-2 rounded-md text-sm leading-6">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Repudiandae, neque voluptates doloremque, eveniet aperiam a
					cum eius hic numquam laborum provident eum corporis atque
					repellat dolore quibusdam, nobis necessitatibus consectetur.
				</p>
			</div>

            <div className='my-3 border flex gap-2 flex-wrap items-center'>
                <div className=' bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium'>html</div>
                <div className=' bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium'>css</div>
                <div className=' bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium'>java</div>
            </div>
		</div>
  );
}

export default JobView