"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { CldImage, CldUploadWidget } from "next-cloudinary";
const Stories = () => {
  const [image, setImage] = useState("");
  const [storyIdx, setStoryIdx] = useState(0);
  let [seeStory, setSeeStory] = useState(false);
  let [seeTargetUserStory,setSeeTargetUserStory] = useState(false)
  let [followingStory, setFollowingStory] = useState([]);
  let [targetUserStory, setTargetUserStory] = useState("");
  let [story, setStory] = useState("");
  let [selfStory, setSelfStory] = useState([]);
  const [publicId, setPublicId] = useState("");
  const [url, setInfoUrl] = useState("");

  function handleStoryChange(e) {
    if (e.target.files && e.target.files[0]) {
      setStory(e.target.files[0]);
    }
    e.target.value = "";
  }
  async function handleStorySubmit(e) {
    e.preventDefault();
    if (!story) {
      return;
    }
    const formData = new FormData();
    formData.append("story", story);
    setStory("");
    const res = await fetch("/api/stories", {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  function handleChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    e.target.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    setImage("");
    const res = await fetch("/api/upload", {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  useEffect(() => {
    async function fetchStories(params) {
      await fetch("/api/stories", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setSelfStory(data.self.stories);
          setFollowingStory(
            data.users.filter((val) => {
              return data.self.followings.includes(val._id);
            })
          );
        });
    }

    document.body.style.height = "100vh";
    fetchStories();
    return (document.body.style.height = "auto");
  }, []);

  if (seeStory) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <div className="flex justify-center gap-3   items-center">
        {seeStory && selfStory?.length > 0 && (
          // selfStory?.map((val) => {
          //  return (
          <div
            onClick={() => {
              setSeeStory(false);
              setStoryIdx(0);
            }}
            className="w-screen h-screen absolute top-0  left-0 z-30 flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" flex flex-col justify-center items-center"
            >
              <div className="w-20 absolute top-10 z-10 h-fit flex left-5 flex-col justify-center items-center">
                <img
                  src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
                  className={`lg:w-13 lg:h-13 h-12 w-12 md:h-10 md:w-10 ${
                    selfStory.length !== 0 ? "ring-4 ring-amber-300" : ""
                  } hover:scale-[1.1] transition-transform cursor-pointer rounded-full object-cover`}
                />
                <h4 className="font-medium text-[10px] mt-2">
                  {selfStory[storyIdx].username}
                </h4>
              </div>
              <div className="lg:w-150  lg:h-150  ">
                <img
                  className="w-full  rounded-md  object-cover shadow-lg h-full"
                  src={selfStory[storyIdx].Story}
                />
              </div>
              {storyIdx > 0 && (
                <button
                  onClick={() => {
                    if (storyIdx > 0) {
                      setStoryIdx((prev) => --prev);
                    }
                    console.log(storyIdx < selfStory.length);

                    console.log(storyIdx);
                  }}
                  className="bg-blue absolute left-20 cursor-pointer z-40 font-bold rounded-lg text-2xl hover:scale-[1.1] transition-transform text-white px-5 py-2 bg-blue-400 self-"
                >
                  Prev
                </button>
              )}
              {storyIdx >= 0 && storyIdx < selfStory.length - 1 && (
                <button
                  onClick={() => {
                    if (storyIdx < selfStory.length) {
                      setStoryIdx((prev) => ++prev);
                    }
                    console.log(storyIdx < selfStory.length);

                    console.log(storyIdx);
                  }}
                  className="bg-blue absolute cursor-pointer right-20 font-bold z-40 rounded-lg text-2xl hover:scale-[1.1] transition-transform text-white px-5 py-2 bg-blue-400 self-"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {seeTargetUserStory && targetUserStory?.stories?.length !== 0 && (
          <div
            onClick={() => {
             
              setSeeTargetUserStory(false)
              setTargetUserStory("");
              setStoryIdx(0);
            }}
            className="w-screen h-screen absolute top-0 z-30  left-0  flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" flex flex-col justify-center items-center"
            >
              <div className="w-20 absolute  top-10 z-10 h-fit flex left-5 flex-col justify-center items-center">
                <img
                  src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
                  className={`lg:w-13 lg:h-13 h-12 w-12 md:h-10 md:w-10  ${
                    targetUserStory.stories.length !== 0 ? "ring-4 ring-amber-300" : ""
                  }  hover:scale-[1.1] transition-transform cursor-pointer rounded-full object-cover`}
                />
                <h4 className="font-medium text-[10px] mt-2">
                  {targetUserStory.username}
                </h4>
              </div>
              <div className="lg:w-150  lg:h-150  ">
                <img
                  className="w-full  rounded-md  object-cover shadow-lg h-full"
                  src={targetUserStory.stories[storyIdx].Story}
                />
              </div>
              {storyIdx > 0 && (
                <button
                  onClick={() => {
                    if (storyIdx > 0) {
                      setStoryIdx((prev) => --prev);
                    }
                    console.log(storyIdx < targetUserStory.stories.length);

                    console.log(storyIdx);
                  }}
                  className="bg-blue absolute left-20 cursor-pointer z-40 font-bold rounded-lg text-2xl hover:scale-[1.1] transition-transform text-white px-5 py-2 bg-blue-400 self-"
                >
                  Prev
                </button>
              )}
              {storyIdx >= 0 && storyIdx < targetUserStory.stories.length - 1 && (
                <button
                  onClick={() => {
                    if (storyIdx < targetUserStory.stories.length) {
                      setStoryIdx((prev) => ++prev);
                    }
                    console.log(storyIdx < targetUserStory.stories.length);

                    console.log(storyIdx);
                  }}
                  className="bg-blue absolute cursor-pointer right-20 font-bold z-40 rounded-lg text-2xl hover:scale-[1.1] transition-transform text-white px-5 py-2 bg-blue-400 self-"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        <form>
          <input
            type="file"
            id="files"
            className="hidden"
            onChange={handleChange}
            accept="image/*"
          />

          <label
            className=" transition-p duration-200 p-1 hover:p-1.2 hover:text-lg bg-blue-400 cursor-pointer  rounded-lg text-white shadow-lg"
            htmlFor="files"
          >
            Upload
          </label>

          {image && (
            <button onClick={handleSubmit} className="mt-2  font-bold">
              Confirm
            </button>
          )}
        </form>
        {/* </div> */}
        <input
          onChange={handleStoryChange}
          id="files2"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <label htmlFor="files2">
          {story ? (
            <button onClick={handleStorySubmit}>confirm</button>
          ) : (
            <div className="flex justify-center items-center gap-2 hover:scale-[1.1] transition-transform cursor-pointer">
              {/* <Link className="flex  mr-10 items-center gap-2"> */}
              <img
                src="/stories.png"
                alt="Stories"
                width={16}
                height={16}
                className="w-4 h-4"
              />

              <span> Add Story</span>
              {/* </Link> */}
            </div>
          )}
        </label>
        <div
          className={`bg-slate-50 ${
            seeStory && "z-1"
          }    rounded-md  md:w-100 lg:w-full w-90 h-25 p-5 flex`}
        >
          <div
            onClick={() => {
              selfStory.length !== 0 ? setSeeStory(true) : setSeeStory(false);

              //  seeStory && document.body.style.backgroundColor="black";
            }}
            className="w-20 z-10 h-fit flex flex-col justify-center items-center"
          >
            <img
              src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
              className={`lg:w-13 lg:h-13 h-12 w-12 md:h-10 md:w-10 ${
                seeStory?.length !== 0 ? "ring-4 ring-amber-300" : ""
              } hover:scale-[1.1] transition-transform cursor-pointer rounded-full object-cover`}
            />
            <h4 className="font-medium text-[12px] mt-2">Your Story</h4>
          </div>

          <div className="w-100 h-max relative bottom-2 left-10 gap-2     flex overflow-x-scroll ">
            {followingStory?.map((val, idx) => {
              return (
                val.stories.length !== 0 && (
                  <div
                    key={idx}
                    className={`p-2 h-fit cursor-pointer z-25    flex shrink-0 flex-col justify-center items-center`}
                  >
                    <img
                      src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
                      onClick={() => {
                        setSeeTargetUserStory(true);
                        setTargetUserStory(followingStory[idx]);
                      }}
                      className={`lg:w-13   ${
                        seeStory ||targetUserStory ? "" : "z-20"
                      }  ring-4 cursor-pointer hover:scale-[1.1] transition-transform ring-amber-500  lg:h-13 h-12  w-12 md:h-10 md:w-10 object-cover rounded-full`}
                    />
                    <h4 className="font-sm mt-1 font-medium text-center text-[13px] truncate w-full break-words">
                      {val.username}
                    </h4>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stories;
