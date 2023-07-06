import React from 'react'
import Button from './Button'

const ButtonList = () => {
  return (
    <div className='flex'>
    <Button name='movies' />
    <Button name='cricket' />
    <Button name='soccer'/>
    <Button name='news'/>
    <Button name='programming'/>
    <Button name='updates'/>
    </div>

  )
}

export default ButtonList