import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import App from './App.jsx'
import UserSignup from './component/Signup.jsx'
import Protected from './ProtectedRouteConfig/Protected.jsx'
import UserLogin from './component/Login.jsx'
import Profile from './component/Profile.jsx'
import UploadVideo from './component/Upload-Video.jsx'
import Feed from './component/Feed.jsx'
import VideoUI from './component/VideoUI.jsx'
import Subscription from './component/Subscription.jsx'
import Channel from "./component/Channel.jsx"
import NotFound from './component/NotFound.jsx'

const router = createBrowserRouter([
 {
  path:"/",
  element:<App/>,
  children:[
      {
         path:"registration",
         element: (
           <Protected authentication = {false}>
             <UserSignup/>
           </Protected>
          )
      },
      {
         path:"login",
         element: (
           <Protected authentication = {false}>
             <UserLogin/>
           </Protected>
          )
      },
      {
         path:"profile",
         element: (
           <Protected authentication = {true}>
             <Profile/>
           </Protected>
          )
      },
      {
         path:"upload-video",
         element: (
           <Protected authentication = {true}>
             <UploadVideo/>
           </Protected>
          )
      },
      {
         path:"/",
         element: (
           <Protected authentication = {false}>
             <Feed/>
           </Protected>
          )
      },
      {
         path:"/video/:id",
         element: (
           <Protected authentication = {true}>
             <VideoUI/>
           </Protected>
          )
      },
      {
        path:"subscription",
        element:(
          <Protected authentication={true}>
            <Subscription/>
          </Protected>
        )
      },
      {
        path:"/channel/:id",
        element:(
          <Protected authentication={true}>
            <Channel/>
          </Protected>
        )
      },
      {
        path:"*",
        element:(
         <NotFound/>
        )
      }
  ]
 }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
