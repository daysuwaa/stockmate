"use client"
import { Upload, User } from "lucide-react";
import Image from "next/image";
import React, {useState, useRef} from "react"

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState ('');
  const [number, setNumber] = useState ('')
  const [website, setWebsite] = useState ('')
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
    }
  };
    const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className=" lg:max-w-3xl lg:mx-0 border-gray-200 border shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-6 flex items-center"><span><User className="mr-2"/></span>Profile Infomation</h2>
       <div className="flex items-center mb-6 space-x-6">
            <div className="w-20 h-20  bg-gray-900 rounded-full overflow-hidden flex items-center justify-center">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-white text-sm font-medium">Profile</span>
              )}
            </div>

            <div className="space-y-1 border border-gray-400 px-3 py-2 rounded-md">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                className="flex border-gray-300 hover:scale-105 transition-transform"
                onClick={handleClick}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Photo
              </button>
              
            </div>
          </div>
      <label>Business Name</label>
      <input
        type="text"
        placeholder="Luxury Hairs.."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      <label>Business Email</label>
      <input
        type="email"
        placeholder="luxuryhairs@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
     <label>Business Number</label>
      <input
        type="phone"
        placeholder="+234 901 2345 678"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      </div>
      <div className="flex flex-col">
        <label>Website Url</label>
      <input
        type="text"
        placeholder="Business website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
         </div>
         </div>
      <label>Business Address</label>
      <textarea
      rows={4}
        placeholder="32 Hair Street, Off...."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
     <button type="submit" className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md">Update Password</button>
      
    </div>
  );
};

export default Profile;