import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
 import { toast, ToastContainer } from 'react-toastify';
import IframeResizer from 'iframe-resizer-react'
import axios from 'axios';
import { Loader } from '../components/Loader';

const Home = () => {
  const [posts, setPosts] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getPosts();
  }, [])

  const onResized = (data) => {
    //console.log(data)
  }

  const getPosts = async () => {
    const request = {
      "ResponseLimit": 19,
    };
    const { data } =  await axios.post(`https://node.deso.org/api/v0/get-hot-feed`,request)
    if (data && data.HotFeedPage) {
      setLoading(false)
      const posts = data.HotFeedPage;
      setPosts(posts)
    }
  }
   
  return (
    <>
      <div className='main-section bg-[#031128] bg-gradient-to-br from-[#031128] to-[#0000ff33] w-full flex-col z-10 relative items-start justify-center'>
        <div className='header-section flex flex-row items-start justify-between w-full lg:px-20 px-4 py-5'>
          <div className='flex flex-row items-center'>
            <a href='https://deso.com' className='flex flex-row items-center justify-center'>
              <Image src="/logo-deso-white.svg" alt="Deso Logo" width={100} height={35} />
            </a>
            <h3 className='font-semibold ml-2 text-[#daedff]'>/</h3>
            <h3 className='font-semibold ml-2 text-[#daedff]'>Embed</h3>
          </div>
          <div className='flex flex-row items-center justify-end'>
            <a href='https://embed.withdeso.com' rel='noopener noreferrer nofollow' className='bg-[#ffda59] text-[#6d4800] hover:bg-[#ffcf26] font-bold py-2 px-6 rounded-full'>Get Embed</a>
          </div>
        </div>          
      </div>
      <div className='flex flex-col w-full items-center'>
        <div className='content-section lg:max-w-7xl lg:px-0 px-4 w-full mx-auto py-5'>
          {loading && <div className='flex-1 flex items-center justify-center w-full'><Loader className='h-10 w-10 text-[#5634ee]' /></div>}
          <div className='w-full columns-1 md:columns-2 lg:columns-3'>
            {posts?.length > 0 && posts.map((post) => {
              return (
                <div key={post.PostHashHex} className='w-full relative mb-4'>
                  <IframeResizer
                    heightCalculationMethod="lowestElement"
                    inPageLinks
                    log={false}
                    onResized={onResized}
                    src={`https://embed.withdeso.com/embed/posts/${post.PostHashHex}`}
                    width="100%"
                    checkOrigin={false}
                  />
                </div>
              )
            })}
          </div>
        </div>  
      </div>
    </>
  )
}

export default Home

