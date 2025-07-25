import {Routes,Route} from "react-router-dom"
import MainDashboard from "./Pages/MainDashboard";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import Community from "./Pages/Community";
import Postform from "./Subpages/Post/Postform";
import UpperNavigation from "./impComponents/UpperNav";
import BottomNavigation from "./impComponents/Navbar";
import Profile from "./Pages/Profile";
import Login from "./Subpages/Login/Login";
import Signup from "./Subpages/Signup/Signup";
import VerifyOTP from "./Subpages/verify-otp/Verifyotp";
import { Navigate } from 'react-router-dom'
import { userAuthStore } from "./store/authStore";
import LoadingPage from "./Subpages/LoadingPage/LoadingPage";
import {Toaster} from "react-hot-toast"
import { useEffect } from "react";
import ProfileUserId from "./Subpages/ProfileUserId";
import FriendList from "./Subpages/Friendlist";
import SocketIO from "./Pages/Socketio";
import News from "./Subpages/News";
import SingleNews from "./Subpages/NewsDetail";
import MarketPlace from "./Pages/MarketPlace";
import SensorData from "./Subpages/SensorData";
import Notification from "./Subpages/Notification";
import NewsPostForm from "./Subpages/Newsform";
import AddProductForm from "./Subpages/Marketform";
import ProductDetail from "./Subpages/Singleproduct";
import PaymentComponent from "./Subpages/esewa/PaymentComponent";
import Success from "./Subpages/esewa/Success";
import Failure from "./Subpages/esewa/Failure";
import Chatting from "./Subpages/chatting/Chatting";
import DeviceSetting from "./Subpages/DeviceSetting/DeviceSetting";
import SinglePage from "./Pages/Community/SinglePage";
import { useState } from "react";
import TransactionHistory from "./Subpages/Transaction/TransactionHistory";

  const ProtectedRoute=({children})=>{
  const {isAuthenticated ,user}=userAuthStore();
  if(!isAuthenticated){
    return <Navigate to='/login' replace />
  }
 if(!user.isVerified){
  return <Navigate to='/verify-otp' replace />
 }
 return children

  }
  
  const RedirectAutheticatedUser=({children})=>{
  const {isAuthenticated,user}=userAuthStore()
console.log(user)
  if(isAuthenticated&& user.isVerified){
    return <Navigate to="/" replace/>
  }
  return children
}
  const RedirectunadminUser=({children})=>{
  const {isAuthenticated,user}=userAuthStore()
console.log(user)
  if(isAuthenticated&& !user.role==="admin"){
    return <Navigate to="/" replace/>
  }
  return children
}
const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user, fetchUnreadNotifications, unreadNotifications }=userAuthStore()
  const [triggerNotificationFetch, setTriggerNotificationFetch] = useState(false);
  useEffect(()=>{
    checkAuth()
    fetchUnreadNotifications()

    if(triggerNotificationFetch){
      fetchUnreadNotifications()
      setTriggerNotificationFetch(false);
    }

  }, [checkAuth, fetchUnreadNotifications, triggerNotificationFetch])
  console.log("authentice",isAuthenticated)
  console.log("user",user)

  if(isCheckingAuth){
    return <LoadingPage/>
  }
  return (
    <div >
   
<div className="hidden md:flex md:mb-[70px] sticky top-0 z-50 bg-white shadow-md">
        <UpperNavigation unreadNotifications={unreadNotifications} />
</div>

      <Routes>
        <Route path="/" element={<Home unreadNotifications={unreadNotifications} />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="/socketio" element={<SocketIO />} />

        <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<RedirectAutheticatedUser><Login /></RedirectAutheticatedUser>} />
        <Route path="/signup" element={<RedirectAutheticatedUser><Signup /> </RedirectAutheticatedUser> } />
         <Route path="/verify-otp" element={ <VerifyOTP /> } />
        <Route path="/friends/:userId" element={<FriendList />} />
        
        <Route path="/news" element={<News />} />
                <Route path="/marketplace" element={<MarketPlace />} />

         <Route path="/news/:id" element={<SingleNews />} />



        <Route path="/profile/:profileID" element={<ProfileUserId />} />

        <Route path="/post/:userId" element={<Postform />} />
                <Route path="/sensordata" element={<SensorData />} />

        <Route path="/notification/:userId" element={<Notification setTriggerNotificationFetch={setTriggerNotificationFetch} />} />
                <Route path="/newspost/:userId" element={<RedirectunadminUser><NewsPostForm /> </RedirectunadminUser>} />
        <Route path="/addproduct" element={<AddProductForm />} />

      {/* <Route */}
        <Route path="/marketplace/:id" element={<ProductDetail />} />

        <Route path="/payment-form/success" element={<Success />} />
        <Route path="/payment-form/failure" element={<Failure />} />

        <Route path="/chatting" element={<Chatting />} />
        <Route path="/devicesetting/:deviceId" element={<DeviceSetting />} />
        <Route path="/community/singlePage/:pageId" element={<SinglePage />} />

        <Route path="/transaction/history" element={<TransactionHistory />} />

        

        
        
        

        


      </Routes>
          <Toaster/>


<div className="flex md:flex md:mb-[70px] sticky mt-12   z-50 bg-white shadow-md md:hidden"> <BottomNavigation/>
</div>

    </div>
  );
};

export default App;
