'use client'
import { useState } from "react";
import { createUser } from "@/_actions/UserActions";
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { isLoaded, isSignedIn, user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const result = await createUser(name, email);

      console.log(result);
      
      
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage('User created successfully!');
        // Clear form after successful submission
        setName('');
        setEmail('');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  }

  return (
    <>
      <div className="mt-40">
        <h2>Create User</h2>
        {message && (
          <div className={`p-4 mb-4 rounded ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-4">
            <label htmlFor="name">Name: </label>
            <input 
              type="text" 
              placeholder="Enter name" 
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email: </label>
            <input 
              type="email"
              placeholder="Enter email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="border p-2 rounded"
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}