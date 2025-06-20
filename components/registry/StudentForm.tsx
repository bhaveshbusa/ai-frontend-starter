'use client'
export default function StudentForm() {
  return (
    <form className='p-4'>
      <h2 className='text-xl font-bold mb-2'>Register Student</h2>
      <input placeholder='Name' className='block border p-2 mb-2 w-full' />
      <input placeholder='Age' className='block border p-2 mb-2 w-full' />
      <input placeholder='Parent Email' className='block border p-2 mb-2 w-full' />
      <button className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
    </form>
  )
}
