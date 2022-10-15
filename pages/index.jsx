import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
 import { toast, ToastContainer } from 'react-toastify';
import IframeResizer from 'iframe-resizer-react'
import axios from 'axios';


const Home = () => {
  const [posts, setPosts] = React.useState('')

  React.useEffect(() => {
    getPosts();
  }, [])

  const onResized = (data) => {
    console.log(data)
  }

  const getPosts = async () => {
    const request = {
      "ResponseLimit": 1,
    };
    const { data } =  await axios.post(`https://node.deso.org/api/v0/get-hot-feed`,request)
    if (data && data.HotFeedPage) {
      const posts = data.HotFeedPage;
      setPosts(posts)
    }
  }
   
  return (
    <>
      <div className='main-section bg-[#031128] bg-gradient-to-br from-[#031128] to-[#0000ff33] w-full flex-col z-10 relative items-start justify-center'>
        <div className='header-section flex flex-row items-start justify-between w-full px-20 py-5'>
          <div className='flex flex-row items-center'>
            <a href='https://deso.com' className='flex flex-row items-center justify-center'>
              <Image src="/logo-deso-white.svg" alt="Deso Logo" width={100} height={35} />
            </a>
            <h3 className='font-semibold ml-2 text-[#daedff]'>/</h3>
            <h3 className='font-semibold ml-2 text-[#daedff]'>Embed</h3>
          </div>
        </div>
        <div className='content-section flex flex-col items-center justify-center w-full px-20 py-5'>
          <div className='w-full max-w-7xl max-auto grid grid-cols-3 gap-4'>
            {posts?.length > 0 && posts.map((post) => {
              return (
                <div key={post.PostHashHex} className='w-full relative mb-4'>
                  <IframeResizer
                    heightCalculationMethod="lowestElement"
                    inPageLinks
                    log={false}
                    onResized={onResized}
                    src={`https://embed.withdeso.com/embed/${post.PostHashHex}`}
                    style={{ minWidth: '400px' }}
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

