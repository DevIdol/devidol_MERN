import { useEffect, useState } from 'react'
import { debounce } from '../../utilities/helpers'
import styles from './NavBar.module.css'
import NavCenter from './NavCenter'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);


  return (
    <nav className={styles.navBar} style={{top: visible ? 0 : '-90px'}}>
      <NavLeft/>
      <NavCenter/>
      <NavRight/>
    </nav>
  )
}

export default NavBar
