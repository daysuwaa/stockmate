"use client";
import { Upload, User } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { updateProfile } from "../redux/slices/settingsSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.settings.profile);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(profile.avatarUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      dispatch(updateProfile({ avatarUrl: previewUrl })); // save to Redux
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="lg:max-w-3xl lg:mx-0 border-gray-200 border shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <User className="mr-2" /> Profile Information
      </h2>

      {/* Avatar */}
      <div className="flex items-center mb-6 space-x-6">
        <div className="w-20 h-20 bg-gray-900 rounded-full overflow-hidden flex items-center justify-center">
          {profileImage ? (
            <Image src={profileImage} alt="Profile Preview" width={80} height={80} className="object-cover w-full h-full" />
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
          <button onClick={handleClick} className="flex border-gray-300 hover:scale-105 transition-transform">
            <Upload className="h-4 w-4 mr-2" /> Change Photo
          </button>
        </div>
      </div>

      {/* Form Inputs hooked directly to Redux */}
      <label>Business Name</label>
      <input
        type="text"
        placeholder="Luxury Hairs.."
        value={profile.name}
        onChange={(e) => dispatch(updateProfile({ name: e.target.value }))}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label>Business Email</label>
      <input
        type="email"
        placeholder="luxuryhairs@email.com"
        value={profile.email}
        onChange={(e) => dispatch(updateProfile({ email: e.target.value }))}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Business Number</label>
          <input
            type="tel"
            placeholder="+234 901 2345 678"
            value={profile.phone || ""}
            onChange={(e) => dispatch(updateProfile({ phone: Number(e.target.value) }))}
            className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label>Website Url</label>
          <input
            type="text"
            placeholder="Business website"
            value={profile.website || ""}
            onChange={(e) => dispatch(updateProfile({ website: e.target.value }))}
            className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <label>Business Address</label>
      <textarea
        rows={4}
        placeholder="32 Hair Street, Off...."
        value={profile.address || ""}
        onChange={(e) => dispatch(updateProfile({ address: e.target.value }))}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button type="submit" className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;