import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import các styles của Quill
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai'
import { PiShareFat } from 'react-icons/pi'

import { getBlog, updateBlogStatus } from '../../../redux/actions/blogAction';


const MyEditor = () => {
  const token = useSelector(state => state.authReducer.accessToken)
  const dispatch = useDispatch()
  const { slug } = useParams()
  const blog = useSelector(state => state.blogReducer)
  const [handle, setHandle] = useState(false)

  useEffect(() => {
    dispatch(getBlog(slug, token))
  }, [dispatch, slug, token])


  const handleStatusBlog = (status) => {
    dispatch(updateBlogStatus(blog, status, token))
  }

  return (
    <div className='relative'>
      <div className='absolute top-[56px] right-0 w-auto'>
        {
          !handle
            ? (
              <div className="w-[4rem] h-[4rem] bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-[2rem] h-[2rem] rounded-full text-white flex items-center justify-center transform scale-110">
                  <AiOutlineSetting size={50} onClick={() => setHandle(true)} />
                </div>
              </div>
            )
            : (
              <div className='flex flex-col bg-gray-500 py-2 px-4 rounded-lg shadow-md' onClick={() => setHandle(false)}>
                <button className="btn btn-danger m-1" onClick={() => handleStatusBlog("decline")} >Decline</button>
                <button className="btn btn-primary m-1" onClick={() => handleStatusBlog("normal")}>Accept</button>
              </div>


            )
        }
      </div>

      <div className='w-[80%] m-auto'>
        <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md flex">
          <div className="w-70">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mb-2">Content</h1>
              <p className="text-lg">{blog.title}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2">Description</h1>
              <p className="text-lg">{blog.description}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2">Date created</h1>
              <p className="text-lg">{blog.createdAt}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2">Status</h1>
              <p className="text-lg">{blog.status}</p>
            </div>
          </div>
          <div className="ml-4 w-30">
            <h1 className="text-2xl font-semibold mb-2">Thumbnail</h1>
            <img src={blog.thumbnail} alt="thumbnail" className="w-[333px] rounded-lg" />
          </div>
        </div>

        <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md flex">
          <div className='d-flex mx-4'>
            <AiOutlineLike size={30} /> {blog.countLike}
          </div>
          <div className='d-flex mx-4'>
            <AiOutlineDislike size={30} /> {blog.countDislike}
          </div>
          <div className='d-flex mx-4'>
            <AiOutlineComment size={30} /> {blog.countComment}
          </div>
          <div className='d-flex mx-4'>
            <PiShareFat size={30} /> {blog.share}
          </div>
        </div>



        <ReactQuill
          value={blog.content}
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              ['link'], ['image'], ['video']
            ],
          }}
        />
      </div>
    </div>

  );
};

export default MyEditor;
