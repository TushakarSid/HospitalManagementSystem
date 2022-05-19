import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left' style={{ width:'99.50%' ,position: 'relative' , bottom:'0'}}>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://www.nitj.ac.in/'>
                 Dr B R Ambedkar National Institute of Technology Jalandhar 
                </a>
            </div>
      </MDBFooter>

  )
}

export default Footer

