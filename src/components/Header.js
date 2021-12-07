import PropTypes from 'prop-types'
import Button from './button'


const Header = ({title, onShow, onOpen}) => {
  // const onShow = () => console.log('hi')
  return (
    <header className='header'>
      <h1>Hello from {title}</h1>
      <Button text = {onOpen ? 'close' : 'add'}  onClick = {onShow}/>     
    </header>
  )
}

Header.defaultProps = {
  title: 'Gints - khm... Hello',
}

Header.prototype = {
  title: PropTypes.string.isRequired,
}

export default Header
