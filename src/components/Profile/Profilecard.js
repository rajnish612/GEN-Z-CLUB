import React from 'react'

const Profilecard = ({username,fullname,followers,followings,post}) => {
  console.log(followers)
  console.log(followings)
  return (
    <div className=" flex ml-70   flex-col md:ml-0 w-100 items-center w-50 ">
        <div className="bg-slate-50 flex flex-col w-100  shadow-md rounded-100   rounded-lg p-2">
          <div className="lg:h-80 md:h-70 lg:h-60 w-full ">
            <img
              src="/noCover.png"
              alt="cover"
              className="w-full rounded-md h-full object-center "
            />
          </div>
          <div className="flex flex-col items-center gap-5 relative bottom-10">
            <img
              className="h-20 w-20 rounded-full ring-2  ring-amber-300 "
              src="/noCover.png"
            />
            <h1 className="font-semibold">{fullname}</h1>
            <div />
          </div>
          <div className="flex gap-7  justify-center   h-fit mb-3 ">
            <h4>Following {followings}</h4>
            <h4>Followers {followers}</h4>
            <h4>Posts {post}</h4>
          </div>
        </div>
      </div>
  )
}

export default Profilecard
