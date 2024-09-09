import { Link } from '@inertiajs/react'
import React from 'react'

export default function SiteFooter() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 bg-slate-200">
          <div className='flex flex-col'>
              <Link>Home</Link>
              <Link>Login</Link>
          </div>
          <div className='flex flex-col'>
              <Link>Home</Link>
              <Link>Login</Link>
          </div>
          <div className='flex flex-col'>
              <Link>Home</Link>
              <Link>Login</Link>
          </div>
          <div className='flex flex-col'>
              <Link>Home</Link>
              <Link>Login</Link>
          </div>
      </div>
  );
}
