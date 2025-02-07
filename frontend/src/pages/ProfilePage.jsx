import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Loader2, Mail, User } from 'lucide-react';

const ProfilePage = () => {
     const {authUser,updateProfile,isImage,isUploadingImage,updateImage,isUpdatingProfile}=useAuthStore();
  //   const [selectedImg, setSelectedImg] = useState(null);
     const [formData,setFormData]=useState({
        fullName:""
     })
    const handleImageUpload=async(e)=>{
         const file=e.target.files[0];
         if(!file){
            return;
         }
         const reader = new FileReader();
         reader.readAsDataURL(file);

         reader.onload = async () => {
            const base64Image = reader.result;
           // setSelectedImg(base64Image);
            await updateImage({ profilePic:base64Image });
            
          };
        };



    console.log(isImage);
    console.log(isUploadingImage);
const submitHandler=(e)=>{
    e.preventDefault();

    updateProfile({
        ...formData,
        url:isImage,
    })
}
  return (
    <div className='h-screen pt-20'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
             <div className='bg-base-300 rounded-xl p-6 space-y-8'>
                  <div className='text-center'>
                           <h1 className='text-2xl font-semibold'>Profile</h1> 
                           <p className='mt-2'>Your profile information</p>
                  </div>


                  <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
               src={isImage||authUser.profilePic || "/avatar.png" }
              
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUploadingImage ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUploadingImage ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
        
<div className='space-y-5'>
<form onSubmit={submitHandler} className=''>
<div className='form-control'>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                 value={formData.fullName}
                  placeholder={authUser?.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value }) }
                />
              </div>
            </div>

            <div >
              <label className="label">
                <span className="label-text font-medium"> Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                 // type="text"
                  className={`input input-bordered w-full pl-10`}
                 readOnly
                  value={authUser?.email}
                 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-5 font-medium" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Update Profile"
              )}
            </button>

    </form>  


  
            <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
</div>

             </div>
            </div>


    </div>
  )}


export default ProfilePage
