import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../redux/actions/admin/blogAction'
import Card from '../../components/global/Card'

const Blogs = () => {
  const dispatch = useDispatch()
  const token = useSelector(state=> state.authReducer.accessToken)
  const blogs = useSelector(state => state.blogReducer)

  useEffect(()=>{
    dispatch(getBlogs(token))
  }, [dispatch, token])

  return (
    <div className='d-flex flex-wrap'>
      { blogs.length >0 &&
        blogs.map(blog => (
          <Card key={blog._id} blog={blog} />
        ))
      }
    </div>
  )
}

export default Blogs